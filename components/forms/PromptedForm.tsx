'use client';

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import ExampleModal from "../ExampleModal";
import { Input } from "../ui/input";

export type PromptedFormData = { genre: string, q1: string, q2: string, q3: string, q4: string, q5: string, q6: string, q7: string };

type Props = { onChange: (data: Partial<PromptedFormData>) => void, onSubmit: () => void, isLoading: boolean };

const prompts = [
  { id: 'q1', label: 'Once upon a time...' },
  { id: 'q2', label: 'Until one day...' },
  { id: 'q3', label: 'And because of that...' },
  { id: 'q4', label: 'And because of that...' },
  { id: 'q5', label: 'And because of that...' },
  { id: 'q6', label: 'Until finally...' },
  { id: 'q7', label: 'And every day after that...' },
];

const carsExample = {
  title: 'Example: "Cars"',
  content: `**Once upon a time…** An ambitious young rookie is introduced.\n\n**Every day…** His independent spirit and inherent skills gave him the ability to win races without relying on others.\n\n**But, one day…** He loses his way and finds himself in Radiator Springs.\n\n**Because of that…** It was now his responsibility to repair the road he damaged.\n\n**Because of that…** Along the way, he encounters new companions to help assist each other when facing obstacles.\n\n**Because of that…** He understands the meaning of friendship and the importance of being a team player.\n\n**Until Finally…** He is allowed to race competitively and has a new edge with his new skills and friendships.\n\n**And Ever Since then…** He starts to place friendships above medals and winning races.`
};

export default function PromptedForm({ onChange, onSubmit, isLoading }: Props) {
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
          <Textarea id={prompt.id} placeholder="..." onChange={(e) => onChange({ [prompt.id]: e.target.value })} />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onSubmit} disabled={isLoading} size="lg">
          {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Generate
        </Button>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Example</Button>
      </div>
      <ExampleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={carsExample.title} content={carsExample.content} />
    </div>
  );
}
