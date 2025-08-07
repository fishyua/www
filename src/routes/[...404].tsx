import SEO from "~/lib/seo";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <SEO title="404" description="hi. not here">
      <main>
        <HttpStatusCode code={404} />
        <h1>fish not found</h1>
      </main>
    </SEO>
  );
}
