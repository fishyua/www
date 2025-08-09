import FishSymbol from "@/assets/fish.svg";

export default function Home() {
  return (
    <main className="pointer-events-none overflow-clip absolute top-0 w-full h-dvh flex items-center justify-center">
      <FishSymbol className="rotate-18" />
    </main>
  );
}
