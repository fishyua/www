import SEO from "~/lib/seo";
import FishSymbol from "~/assets/fish.svg";

export default function Home() {
  return (
    <SEO title="feiyeur" description="hi. i live here">
      <main>
        <FishSymbol />
      </main>
    </SEO>
  );
}
