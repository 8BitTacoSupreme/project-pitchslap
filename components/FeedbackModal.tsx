import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outline: string;
};

const personas = [
  { id: "producer", label: "Producer" },
  { id: "market_analyst", label: "Market Analyst" },
  { id: "reader", label: "Studio Reader" },
];

export default function FeedbackModal({ isOpen, onClose, outline }: Props) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");

  const handleCheckboxChange = (personaId: string, checked: boolean) => {
    setSelectedPersonas(prev =>
      checked ? [...prev, personaId] : prev.filter(id => id !== personaId)
    );
  };

  const handleSubmit = async () => {
    if (selectedPersonas.length === 0) {
      setError("Please select at least one persona.");
      return;
    }
    setIsLoading(true);
    setError("");
    setFeedback(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outline, personas: selectedPersonas }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to get feedback');
      }

      const data = await response.json();
      setFeedback(data.feedback);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setFeedback(null);
    setSelectedPersonas([]);
    setError("");
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Get Expert Feedback</DialogTitle>
          <DialogDescription>
            Submit your outline for analysis from different industry perspectives.
          </DialogDescription>
        </DialogHeader>
        
        {!feedback ? (
            <div className="space-y-4">
            <p>Select personas for feedback:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personas.map(persona => (
                <div key={persona.id} className="flex items-center space-x-2 p-4 border rounded-md">
                    <Checkbox
                    id={persona.id}
                    onCheckedChange={(checked) => handleCheckboxChange(persona.id, !!checked)}
                    />
                    <Label htmlFor={persona.id} className="cursor-pointer">{persona.label}</Label>
                </div>
                ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        ) : (
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {Object.entries(feedback).map(([persona, text]) => (
                    <Card key={persona}>
                        <CardHeader>
                            <CardTitle className="capitalize text-lg">
                                {persona.replace('_', ' ')}'s Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm prose-invert whitespace-pre-wrap">
                            {text}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
        
        <DialogFooter>
            {!feedback ? (
                <Button onClick={handleSubmit} disabled={isLoading || selectedPersonas.length === 0} className="w-full">
                    {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                    Submit for Feedback
                </Button>
            ) : (
                <Button onClick={handleClose} className="w-full">Close</Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}