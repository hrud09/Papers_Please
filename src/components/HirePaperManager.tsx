import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Briefcase, FileText, Mail, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import SharedNavigation from "./SharedNavigation";

const HirePaperManager = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    documentType: "",
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const documentTypes = [
    "NID (National ID)",
    "Driving Licence",
    "Passport",
    "Birth Certificate",
    "TIN (Tax Identification Number)",
    "Trade License",
    "Bank Account",
    "Investment Account",
    "Company Registration",
    "Reissue of Any Document",
    "Other Certificates",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.documentType) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Web3Forms API for email sending
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // User needs to replace this
          subject: `New Paper Manager Request - ${formData.documentType}`,
          from_name: formData.fullName,
          email: formData.email,
          to_email: "mahadi.hassan.hriday@gmail.com",
          message: `
New Paper Manager Hiring Request

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Document Type: ${formData.documentType}
Service Charge: ৳500

Additional Details:
${formData.additionalDetails || "None provided"}

---
This request was submitted through Papers Please Bangladesh
          `.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          documentType: "",
          additionalDetails: "",
        });
        
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <SharedNavigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Pricing Banner */}
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">Fixed Service Charge</h3>
                    <p className="text-green-50">Professional document management</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">৳500</div>
                  <p className="text-sm text-green-50">Per document</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-green-50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>What We Offer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 hover:translate-x-2 transition-transform">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Document Assistance:</strong> Help you gather all required documents
                  </span>
                </li>
                <li className="flex items-start space-x-2 hover:translate-x-2 transition-transform">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Office Guidance:</strong> Suggest optimal visit dates based on office traffic
                  </span>
                </li>
                <li className="flex items-start space-x-2 hover:translate-x-2 transition-transform">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Step-by-Step Support:</strong> Guide you through the entire process
                  </span>
                </li>
                <li className="flex items-start space-x-2 hover:translate-x-2 transition-transform">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Regular Updates:</strong> Keep you informed about dates, calls, and visits
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Request Paper Manager Service</CardTitle>
              <CardDescription>
                Fill out the form below and we'll contact you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="hover:border-green-500 transition-colors"
                  />
                </div>

                {/* Document Type */}
                <div className="space-y-2">
                  <Label htmlFor="documentType">
                    Document Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.documentType}
                    onValueChange={(value) => handleInputChange("documentType", value)}
                  >
                    <SelectTrigger id="documentType" className="hover:border-green-500 transition-colors">
                      <SelectValue placeholder="Select the document you need" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Details */}
                <div className="space-y-2">
                  <Label htmlFor="additionalDetails">
                    Additional Details (Optional)
                  </Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Tell us more about your requirements, timeline, or any specific concerns..."
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                    className="min-h-[120px] hover:border-green-500 transition-colors"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "error" && (
                  <Alert variant="destructive" className="bg-red-50 animate-in slide-in-from-top">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                {submitStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200 animate-in slide-in-from-top">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you! Your request has been submitted successfully. We'll contact you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request - ৳500"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mt-6 bg-gray-50 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Need immediate assistance?
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <a
                    href="mailto:mahadi.hassan.hriday@gmail.com"
                    className="flex items-center space-x-1 text-primary hover:underline hover:scale-110 transition-transform"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HirePaperManager;