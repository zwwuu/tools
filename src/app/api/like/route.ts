import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

import { getToolBySlug } from "~/lib/api";
import { MAX_LIKES } from "~/lib/constants";
import { dbAdmin } from "~/lib/firebase-admin";
import { getHashedIpAddress } from "~/lib/utils";

const likeSchema = z.object({
  likes: z.coerce.number().min(1).max(MAX_LIKES),
  slug: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = likeSchema.safeParse(body);
  if (!data.success) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }

  const { likes, slug } = data.data;
  const isSlugExist = getToolBySlug(slug);
  if (!isSlugExist) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }

  const ipAddress = getHashedIpAddress(req.headers.get("x-real-ip"));

  const likeDocRef = dbAdmin.collection(`tools/${slug}/likes`).doc(ipAddress);
  const toolDocRef = dbAdmin.collection("tools").doc(slug);

  try {
    await dbAdmin.runTransaction(async (transaction) => {
      const likeDoc = await transaction.get(likeDocRef);
      const currentLikes = likeDoc.data()?.likes ?? 0;
      const likesToBeAdded = MAX_LIKES - currentLikes >= likes ? likes : MAX_LIKES - currentLikes;
      if (likesToBeAdded > 0) {
        transaction.set(
          likeDocRef,
          {
            likes: FieldValue.increment(likesToBeAdded),
            by: ipAddress,
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
        transaction.set(toolDocRef, { totalLikes: FieldValue.increment(likesToBeAdded) }, { merge: true });
        return;
      }

      throw new Error("Over the limit");
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
  }
}
