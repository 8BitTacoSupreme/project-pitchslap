'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"

export type RandomFormData = {
  genre: string
}

type Props = {
  onChange: (data: Partial<RandomFormData>) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function RandomForm({ onChange, onSubmit, isLoading }: Props) {
  return (
    <div className="space-y-4 pt-6 flex flex-col items-center text-center h-64 justify-center">
        <div className="w-full max-w-sm">
            <Label htmlFor="genre">First, give us a genre</Label>
            <Input id="genre" placeholder="e.g., Cyberpunk Noir, Romantic Fantasy" onChange={(e) => onChange({ genre: e.target.value })} />
        </div>
        <p className="text-muted-foreground">Just press the jolly, candy-like button and we will do the rest.</p>
        <Button onClick={onSubmit} disabled={isLoading} className="w-full max-w-sm" size="lg">
            {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
            Surprise Me!
        </Button>
    </div>
  )
}
