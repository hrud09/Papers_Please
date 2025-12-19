import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Scale,
  Shield,
  Users,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Languages,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalysisResult {
  severity: "low" | "medium" | "high";
  steps: string[];
  resources: string[];
  timeline: string;
}

function InstaLaw() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedIncident, setSelectedIncident] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const roles = [
    {
      id: "victim",
      label: "Victim (ভুক্তভোগী)",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: "witness",
      label: "Witness (সাক্ষী)",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "accused",
      label: "Accused (অভিযুক্ত)",
      icon: <Shield className="h-4 w-4" />,
    },
  ];

  const incidentTypes = [
    { id: "theft", label: "Theft/Robbery (চুরি/ডাকাতি)" },
    { id: "fraud", label: "Fraud/Cheating (প্রতারণা)" },
    { id: "assault", label: "Physical Assault (শারীরিক নির্যাতন)" },
    { id: "harassment", label: "Harassment (হয়রানি)" },
    { id: "property", label: "Property Dispute (সম্পত্তি বিরোধ)" },
    { id: "family", label: "Family Matter (পারিবারিক বিষয়)" },
    { id: "cyber", label: "Cyber Crime (সাইবার অপরাধ)" },
    { id: "other", label: "Other (অন্যান্য)" },
  ];

  const emergencyContacts = [
    {
      name: "National Emergency",
      number: "999",
      icon: <Phone className="h-4 w-4" />,
    },
    {
      name: "Police Helpline",
      number: "100",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      name: "Women & Children",
      number: "109",
      icon: <Users className="h-4 w-4" />,
    },
    { name: "Legal Aid", number: "16430", icon: <Scale className="h-4 w-4" /> },
  ];

  const handleAnalyze = async () => {
    if (!selectedRole || !selectedIncident || !description.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        severity:
          selectedIncident === "assault"
            ? "high"
            : selectedIncident === "fraud"
              ? "medium"
              : "low",
        steps: [
          "File a General Diary (GD) at the nearest police station",
          "Collect all relevant documents and evidence",
          "Contact a lawyer for legal consultation",
          "Follow up with investigating officer regularly",
          "Keep records of all communications",
        ],
        resources: [
          "Nearest Police Station",
          "Legal Aid Services",
          "District Magistrate Office",
          "Human Rights Commission",
        ],
        timeline: "Initial steps: 24-48 hours, Full process: 2-6 months",
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">InstaLaw</h1>
                <p className="text-xs text-muted-foreground">
                  Instant Legal Guidance (তাৎক্ষণিক আইনি পরামর্শ)
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center space-x-1"
            >
              <Languages className="h-4 w-4" />
              <span>{language === "en" ? "বাংলা" : "English"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Instant Legal Guidance
            <span className="block text-lg text-muted-foreground mt-2">
              তাৎক্ষণিক আইনি পরামর্শ পান
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your legal situation and get step-by-step guidance based on
            Bangladeshi law
          </p>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Contacts (জরুরি যোগাযোগ)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-100 text-red-600 p-2 rounded-full w-fit mx-auto mb-2">
                    {contact.icon}
                  </div>
                  <div className="text-sm font-medium text-red-800">
                    {contact.name}
                  </div>
                  <div className="text-lg font-bold text-red-900">
                    {contact.number}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Role Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Your Role (আপনার ভূমিকা)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <Button
                      key={role.id}
                      variant={selectedRole === role.id ? "default" : "outline"}
                      className="justify-start h-auto p-4"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center space-x-3">
                        {role.icon}
                        <span>{role.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Incident Type */}
            <Card>
              <CardHeader>
                <CardTitle>Type of Incident (ঘটনার ধরন)</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedIncident}
                  onValueChange={setSelectedIncident}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Describe Your Situation (আপনার পরিস্থিতি বর্ণনা করুন)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Please provide as much detail as possible about what happened, when, where, and who was involved..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleAnalyze}
              disabled={
                !selectedRole ||
                !selectedIncident ||
                !description.trim() ||
                isAnalyzing
              }
              className="w-full h-12 text-lg"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                "Get Legal Guidance (আইনি পরামর্শ পান)"
              )}
            </Button>
          </div>

          {/* Analysis Results */}
          <div>
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Legal Guidance (আইনি পরামর্শ)</span>
                    <Badge className={getSeverityColor(analysis.severity)}>
                      {analysis.severity.toUpperCase()} PRIORITY
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Steps */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Recommended Steps (প্রস্তাবিত পদক্ষেপ)</span>
                    </h4>
                    <ol className="space-y-2">
                      {analysis.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>Helpful Resources (সহায়ক সংস্থা)</span>
                    </h4>
                    <ul className="space-y-1">
                      {analysis.resources.map((resource, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Expected Timeline (প্রত্যাশিত সময়সীমা)</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.timeline}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-xs text-yellow-800">
                      <strong>Disclaimer:</strong> This guidance is for
                      informational purposes only and does not constitute legal
                      advice. Please consult with a qualified lawyer for your
                      specific situation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!analysis && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill out the form to get personalized legal guidance
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstaLaw;
