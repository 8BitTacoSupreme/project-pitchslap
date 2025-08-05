// In /components/RefineModal.tsx

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
};

export default function RefineModal({ isOpen, onClose, onSubmit, isLoading }: Props) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt(""); // Clear prompt after submission
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Refine Your Outline</DialogTitle>
          <DialogDescription>
            Tell the story editor what you'd like to change or add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Label htmlFor="refine-prompt">Your Instructions</Label>
            <Textarea
                id="refine-prompt"
                placeholder="e.g., Add a love interest and change the setting to Victorian England..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
            />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading || !prompt.trim()}>
            {isLoading ? "Refining..." : "Submit Refinements"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
