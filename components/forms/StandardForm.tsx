'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"

export type StandardFormData = {
  genre: string
  title: string
  logline: string
  summary: string
}

type Props = {
  onChange: (data: Partial<StandardFormData>) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function StandardForm({ onChange, onSubmit, isLoading }: Props) {
  return (
    <div className="space-y-4 pt-6">
      <div>
        <Label htmlFor="genre">Genre</Label>
        <Input id="genre" placeholder="e.g., Sci-Fi, Comedy, Thriller" onChange={(e) => onChange({ genre: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="title">What is the name of your movie?</Label>
        <Input id="title" placeholder="Your Movie Title" onChange={(e) => onChange({ title: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="logline">Logline</Label>
        <Textarea id="logline" placeholder="This is the one or two line summary..." onChange={(e) => onChange({ logline: e.target.value })} />
      </div>
       <div>
        <Label htmlFor="summary">Summary / Synopsis</Label>
        <Textarea id="summary" placeholder="This is the longer summary or synopsis. It should be 3-5 paragraphs..." rows={6} onChange={(e) => onChange({ summary: e.target.value })} />
      </div>
      <Button onClick={onSubmit} disabled={isLoading} className="w-full" size="lg">
        {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
        Generate Outline
      </Button>
    </div>
  )
}
