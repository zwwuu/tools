"use client";

import { useEffect, useState } from "react";
import { IconPhoto } from "@tabler/icons-react";
import ExifReader from "exifreader";

import Main from "~/app/t/components/Main";
import { Card, CardBody } from "~/components/Card";
import FileUpload from "~/components/FileUpload";
import Heading from "~/components/Typography/Heading";
import Pre from "~/components/Typography/Pre";

export default function ExifViewerPage() {
  const [image, setImage] = useState<File | null>(null);
  const [exif, setExif] = useState<ExifReader.Tags | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!image) {
        return;
      }

      try {
        const tags = await ExifReader.load(image, { includeUnknown: true });
        const orderedTags = Object.keys(tags)
          .sort()
          .reduce((prev: any, curr: any) => {
            prev[curr] = tags[curr];
            return prev;
          }, {});
        setExif(orderedTags);
      } catch (error) {
        setExif(null);
        setError("Failed to load EXIF data from image.");
      }
    })();
  }, [image]);

  return (
    <Main>
      <Card>
        <CardBody>
          <FileUpload
            dropzoneProps={{
              onDropAccepted: ([file]) => {
                setImage(file);
                setError(null);
              },
              onDropRejected: () => {
                setError("Invalid file type.");
              },
              maxFiles: 1,
              accept: { "image/*": [] },
            }}
            name={"image"}
          >
            <div className={"flex flex-col items-center space-y-2"}>
              <p>
                <IconPhoto className={"mr-2 inline-block"} size={"2em"} aria-hidden />
                Drag and drop an image here, or click to select an image.
              </p>
              {image && (
                <figure>
                  <img
                    alt={"Uploaded image"}
                    className={"mx-auto max-h-96 max-w-full"}
                    src={URL.createObjectURL(image)}
                  />
                  <figcaption className={"break-all opacity-80 text-xs"}>{image.name}</figcaption>
                </figure>
              )}
            </div>
          </FileUpload>
          {error && (
            <span className={"text-red-500"} role={"alert"}>
              {error}
            </span>
          )}
        </CardBody>
      </Card>

      {exif && (
        <Card>
          <CardBody className={"space-y-4"}>
            <Heading as={"h2"} className={"mb-2"}>
              EXIF data
            </Heading>
            <Pre>{JSON.stringify(exif, null, 2)}</Pre>
          </CardBody>
        </Card>
      )}
    </Main>
  );
}
