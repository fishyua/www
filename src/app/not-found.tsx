import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "hi. not here",
};

export default function NotFound() {
  return <p>fish not found</p>;
}
