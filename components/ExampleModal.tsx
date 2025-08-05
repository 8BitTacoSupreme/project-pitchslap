import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
};

export default function ExampleModal({ isOpen, onClose, title, content }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm md:prose-base prose-invert max-h-[70vh] overflow-y-auto pr-4">
           {/* Using a simple replace for markdown-like formatting */}
           {content.split('\n\n').map((paragraph, i) => (
             <p key={i}>
                {paragraph.split('**').map((text, j) =>
                  j % 2 === 1 ? <strong key={j}>{text}</strong> : text
                )}
             </p>
           ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
