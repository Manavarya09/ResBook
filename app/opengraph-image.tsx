export const runtime = "edge";

export const alt = "ResBook - AI Tools & Workflow Directory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new Response("OG image placeholder", { status: 200 });
}
