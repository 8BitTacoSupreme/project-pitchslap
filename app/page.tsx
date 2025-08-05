import OutlineGenerator from "@/components/OutlineGenerator";

export default function Home() {
  return (
    <div className="w-full max-w-5xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Project Pitchslap</h1>
        <p className="text-muted-foreground mt-2">AI-powered story development</p>
      </header>
      <OutlineGenerator />
    </div>
  );
}
