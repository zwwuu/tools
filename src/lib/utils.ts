import crypto from "crypto";

export function getHashedIpAddress(ipAddress?: string | null): string {
  const hash = crypto.createHash("sha256");
  hash.update(Buffer.from(ipAddress ?? crypto.randomUUID()));
  return hash.digest("hex");
}
