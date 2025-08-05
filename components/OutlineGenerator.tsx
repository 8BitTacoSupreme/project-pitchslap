"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StandardForm, { StandardFormData } from "./forms/StandardForm";
import PromptedForm, { PromptedFormData } from "./forms/PromptedForm";
import AdvancedForm, { AdvancedFormData } from "./forms/AdvancedForm";
import RandomForm, { RandomFormData } from "./forms/RandomForm";
import { LoaderCircle } from "lucide-react";
import FeedbackModal from "./FeedbackModal";
import RefineModal from "./RefineModal";

type FormData = StandardFormData | PromptedFormData | AdvancedFormData | RandomFormData;

export default function OutlineGenerator() {
  const [activeTab, setActiveTab] = useState("standard");
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState("");
  const [error, setError] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRefineModal, setShowRefineModal] = useState(false);

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setGeneratedOutline("");

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: activeTab, formData }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Something went wrong');
      }

      const data = await response.json();
      setGeneratedOutline(data.outline);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (refinementPrompt: string) => {
    setIsLoading(true);
    setError("");
    setGeneratedOutline("");
    setShowRefineModal(false);

    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousOutline: generatedOutline,
          refinementPrompt,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Something went wrong during refinement');
      }

      const data = await response.json();
      setGeneratedOutline(data.newOutline);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (generatedOutline) {
      setShowFeedbackModal(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="prompted">Prompted</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="random">Random</TabsTrigger>
            </TabsList>
            <TabsContent value="standard">
              <StandardForm onChange={handleFormChange} onSubmit={handleSubmit} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="prompted">
              <PromptedForm onChange={handleFormChange} onSubmit={handleSubmit} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedForm onChange={handleFormChange} onSubmit={handleSubmit} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="random">
              <RandomForm onChange={handleFormChange} onSubmit={handleSubmit} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Outline</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Generating...</p>
            </div>
          )}
          {error && <div className="text-destructive p-4 bg-destructive/10 rounded-md">{error}</div>}
          {generatedOutline && (
            <div className="prose prose-invert prose-sm md:prose-base whitespace-pre-wrap rounded-md bg-secondary/50 p-4 h-full overflow-y-auto">
                {generatedOutline}
            </div>
          )}
          {!isLoading && !generatedOutline && !error && (
            <div className="text-center text-muted-foreground flex items-center justify-center h-full">
                Your generated story outline will appear here.
            </div>
          )}
        </CardContent>
      
        {generatedOutline && (
          <div className="p-6 pt-0 flex flex-col gap-2">
            <Button onClick={() => setShowRefineModal(true)} className="w-full" variant="outline">
                Refine Outline...
            </Button>
            <Button onClick={handleAccept} className="w-full" size="lg">
                Accept & Get Feedback
            </Button>
          </div>
        )}
      </Card>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        outline={generatedOutline}
      />

      <RefineModal
        isOpen={showRefineModal}
        onClose={() => setShowRefineModal(false)}
        onSubmit={handleRefine}
        isLoading={isLoading}
      />
    </div>
  );
}
