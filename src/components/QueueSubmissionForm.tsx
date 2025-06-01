import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QueueSubmissionFormProps {
  onSubmit?: (data: {
    office: string;
    waitTime: string;
    comments: string;
  }) => void;
  offices?: Array<{ id: string; name: string }>;
}

const QueueSubmissionForm = ({
  onSubmit = () => {},
  offices = [
    { id: "dhaka-north", name: "Dhaka North City Corporation" },
    { id: "dhaka-south", name: "Dhaka South City Corporation" },
    { id: "passport-office", name: "Department of Immigration & Passports" },
    { id: "nid-center", name: "National ID Registration Center" },
    { id: "birth-reg", name: "Birth Registration Office" },
  ],
}: QueueSubmissionFormProps) => {
  const [office, setOffice] = useState<string>("");
  const [waitTime, setWaitTime] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!office) {
      setSubmitStatus("error");
      setErrorMessage("Please select an office");
      return;
    }

    if (!waitTime) {
      setSubmitStatus("error");
      setErrorMessage("Please select a wait time");
      return;
    }

    // Submit form data
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to submit the data
      // For now, we'll simulate a successful submission
      setTimeout(() => {
        onSubmit({ office, waitTime, comments });
        setSubmitStatus("success");
        setIsSubmitting(false);

        // Reset form after successful submission
        setTimeout(() => {
          setOffice("");
          setWaitTime("");
          setComments("");
          setSubmitStatus("idle");
        }, 3000);
      }, 1000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-primary">
          Submit Queue Status
        </CardTitle>
        <CardDescription className="text-center">
          Help others by sharing the current wait time at government offices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="office">Select Office</Label>
            <Select value={office} onValueChange={setOffice}>
              <SelectTrigger id="office" className="w-full">
                <SelectValue placeholder="Select a government office" />
              </SelectTrigger>
              <SelectContent>
                {offices.map((office) => (
                  <SelectItem key={office.id} value={office.id}>
                    {office.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Current Wait Time</Label>
            <RadioGroup
              value={waitTime}
              onValueChange={setWaitTime}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                  Light (0-30 minutes)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate" className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                  Moderate (30-60 minutes)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="heavy" id="heavy" />
                <Label htmlFor="heavy" className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                  Heavy (60+ minutes)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Additional Comments (Optional)</Label>
            <Textarea
              id="comments"
              placeholder="Any helpful details about the current situation"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {submitStatus === "error" && (
            <Alert variant="destructive" className="bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {submitStatus === "success" && (
            <Alert className="bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Thank you for your submission!
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Queue Status"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QueueSubmissionForm;
