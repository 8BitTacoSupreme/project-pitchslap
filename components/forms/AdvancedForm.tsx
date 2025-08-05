'use client';

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import ExampleModal from "../ExampleModal";
import { Input } from "../ui/input";

export type AdvancedFormData = { genre: string } & { [key: string]: string };

type Props = { onChange: (data: Partial<AdvancedFormData>) => void, onSubmit: () => void, isLoading: boolean };

const prompts = [
  { id: 'q1', label: 'The Ordinary World' },
  { id: 'q2', label: 'Call to Adventure' },
  { id: 'q3', label: 'Refusal of the Call' },
  { id: 'q4', label: 'Meet the Mentor' },
  { id: 'q5', label: 'Crossing the Threshold' },
  { id: 'q6', label: 'Tests, Allies, Enemies' },
  { id: 'q7', label: 'Approach to the Inmost Cave' },
  { id: 'q8', label: 'Supreme Ordeal' },
  { id: 'q9', label: 'Reward (Sizing the Sword)' },
  { id: 'q10', label: 'The Road Back' },
  { id: 'q11', label: 'Resurrection' },
  { id: 'q12', label: 'Return With the Elixir' },
];

const starWarsExample = {
  title: 'Example: "Star Wars: A New Hope"',
  content: `**1. The Ordinary World:** Luke lives in Tatooine but doesn't like it. His eyes are drawn to the horizon where he longs to achieve heroic deeds.\n\n**2. Call to Adventure:** Luke discovers his R2 droid contains the Death Star plans and could help the Rebels. Obi-Wan Kenobi then calls Luke to action.\n\n**3. Refusal of the Call:** Luke balks, saying, “I can't get involved! I've got work to do!”\n\n**4. Meeting the Mentor:** After finding his aunt and uncle murdered, Luke commits to joining Obi-Wan.\n\n**5. Crossing the Threshold:** Luke and Obi-Wan enter the “wretched hive of scum and villainy” at Mos Eisley Spaceport.\n\n**6. Trials, Allies, and Enemies:** Luke acquires allies (Han, Chewie), faces enemies, rescues Leia, and escapes the Death Star.\n\n**7. The Approach:** The heroes fly to the Rebel Base on Yavin 4 and plan their attack on the Death Star.\n\n**8. The Ordeal:** Luke and his fellow pilots attack the Death Star, facing skilled enemies and Darth Vader himself.\n\n**9. The Reward:** The heroes are rewarded with safety and freedom after escaping the Death Star.\n\n**10. The Road Back:** The "fake-out ending" where the heroes seem safe, but the larger threat remains.\n\n**11. Resurrection:** During the final trench run, Luke hears Obi-Wan's voice, uses the Force, and destroys the Death Star. Han Solo also has a moral resurrection, returning to help.\n\n**12. Return with the Elixir:** The heroes return not just with safety, but with hope for the galaxy. They receive medals, symbolizing their new heroic identities.`
};

export default function AdvancedForm({ onChange, onSubmit, isLoading }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4 pt-6">
       <div>
        <Label htmlFor="genre">Genre</Label>
        <Input id="genre" placeholder="e.g., Sci-Fi, Comedy, Thriller" onChange={(e) => onChange({ genre: e.target.value })} />
      </div>
      {prompts.map(prompt => (
        <div key={prompt.id}>
          <Label htmlFor={prompt.id}>{prompt.label}</Label>
          <Textarea id={prompt.id} placeholder="..." rows={1} onChange={(e) => onChange({ [prompt.id]: e.target.value })} />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onSubmit} disabled={isLoading} size="lg">
          {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Generate
        </Button>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Example</Button>
      </div>
      <ExampleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={starWarsExample.title} content={starWarsExample.content} />
    </div>
  );
}
