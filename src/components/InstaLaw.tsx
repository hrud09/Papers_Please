import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  FileText,
  Download,
  Languages,
  Users,
  Gavel,
  HelpCircle,
  Zap,
  Home,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  userRole: string;
  incidentType: string;
  otherIncident: string;
  location: string;
  timeOfIncident: string;
  immediateDanger: string;
  description: string;
}

interface ActionStep {
  title: string;
  content: string[];
  icon: string;
  color: string;
  bgColor: string;
}

interface ActionGuide {
  steps: ActionStep[];
  emergencyContacts: { name: string; number: string; description: string }[];
  disclaimer: string;
}

function InstaLawContent() {
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userRole: "",
    incidentType: "",
    otherIncident: "",
    location: "",
    timeOfIncident: "",
    immediateDanger: "",
    description: "",
  });
  const [showGuide, setShowGuide] = useState(false);
  const [actionGuide, setActionGuide] = useState<ActionGuide | null>(null);

  const incidentTypes = [
    { value: "assault", label: t("incident.assault"), icon: "👊" },
    { value: "theft", label: t("incident.theft"), icon: "💰" },
    { value: "domestic", label: t("incident.domestic"), icon: "🏠" },
    { value: "sexual", label: t("incident.sexual"), icon: "⚠️" },
    { value: "cyber", label: t("incident.cyber"), icon: "💻" },
    { value: "drug", label: t("incident.drug"), icon: "💊" },
    { value: "accident", label: t("incident.accident"), icon: "🚗" },
    { value: "police", label: t("incident.police"), icon: "👮" },
    { value: "other", label: t("incident.other"), icon: "❓" },
  ];

  const generateActionGuide = (data: FormData): ActionGuide => {
    const isVictim = data.userRole === "victim";
    const isWitness = data.userRole === "witness";
    const isAccused = data.userRole === "accused";
    const inDanger = data.immediateDanger === "yes";

    let steps: ActionStep[] = [];

    // Step 1: Immediate Actions
    if (inDanger) {
      steps.push({
        title: t("instaLaw.step1.titleDanger"),
        content: [
          "📞 Call 999 immediately",
          "🏃 Move to safety if possible",
          "🚫 Don't confront anyone",
          "📸 Preserve evidence - don't wash/change clothes",
        ],
        icon: "🚨",
        color: "text-red-600",
        bgColor: "from-red-50 to-red-100",
      });
    } else {
      steps.push({
        title: t("instaLaw.step1.titleSafe"),
        content: [
          "✅ Ensure your safety first",
          "📸 Take photos/videos if safe",
          "📝 Write down details immediately",
          "🏥 Get medical help if injured",
        ],
        icon: "🛡️",
        color: "text-blue-600",
        bgColor: "from-blue-50 to-blue-100",
      });
    }

    // Step 2: Where to Go
    let whereToGo: string[] = [];
    if (isVictim) {
      whereToGo = [
        "🚓 Nearest police station (file FIR)",
        "🏥 Hospital for medical check",
        "⚖️ Magistrate court if police refuse",
        "🆓 District Legal Aid Office",
      ];
    } else if (isWitness) {
      whereToGo = [
        "🚓 Police station (witness statement)",
        "⚖️ Court when summoned",
        "🛡️ Legal Aid if you need protection",
      ];
    } else if (isAccused) {
      whereToGo = [
        "👨‍💼 Lawyer's office IMMEDIATELY",
        "🚓 Police station (with lawyer only)",
        "⚖️ Court for bail application",
        "🆓 Legal Aid Office",
      ];
    }

    steps.push({
      title: t("instaLaw.step2.title"),
      content: whereToGo,
      icon: "📍",
      color: "text-green-600",
      bgColor: "from-green-50 to-green-100",
    });

    // Step 3: Documents to Collect
    let documents = [
      "🏥 Medical certificates",
      "📸 Photos of injuries/damage",
      "👥 Witness contact info",
      "📄 Any relevant documents",
      "📋 Copy of FIR once filed",
    ];

    if (data.incidentType === "cyber") {
      documents.push(
        "📱 Screenshots of threats",
        "📞 Phone/call records",
        "💻 Social media evidence",
      );
    }

    steps.push({
      title: t("instaLaw.step3.title"),
      content: documents,
      icon: "🧾",
      color: "text-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    });

    // Step 4: Your Rights
    let rights: string[] = [];
    if (isVictim) {
      rights = [
        "⚖️ Right to file FIR anywhere",
        "🏥 Right to free medical exam",
        "👨‍💼 Right to free legal aid",
        "💰 Right to state compensation",
        "🛡️ Right to protection",
      ];
    } else if (isAccused) {
      rights = [
        "🤐 Right to remain silent",
        "👨‍💼 Right to lawyer",
        "🆓 Right to bail (most cases)",
        "📋 Right to know charges",
        "⚖️ Right to fair trial",
      ];
    } else if (isWitness) {
      rights = [
        "🛡️ Right to protection",
        "👨‍💼 Right to legal help",
        "💰 Right to expense compensation",
        "🤐 Right to refuse self-incrimination",
      ];
    }

    steps.push({
      title: t("instaLaw.step4.title"),
      content: rights,
      icon: "⚖️",
      color: "text-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    });

    const emergencyContacts = [
      {
        name: "Emergency Services",
        number: "999",
        description: "Police, Fire, Ambulance",
      },
      {
        name: "Women & Children Helpline",
        number: "109",
        description: "24/7 support",
      },
      {
        name: "Legal Aid Services",
        number: "16430",
        description: "Free legal help",
      },
    ];

    if (data.incidentType === "domestic" || data.incidentType === "sexual") {
      emergencyContacts.push({
        name: "Blast Call Center",
        number: "333",
        description: "Violence against women/children",
      });
    }

    return {
      steps,
      emergencyContacts,
      disclaimer: t("instaLaw.disclaimer"),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guide = generateActionGuide(formData);
    setActionGuide(guide);
    setShowGuide(true);
  };

  const handleDownload = () => {
    const content = `
INSTALAW GUIDE
==============

Incident Details:
- Role: ${formData.userRole}
- Type: ${formData.incidentType}
- Location: ${formData.location}
- Time: ${formData.timeOfIncident}
- Immediate Danger: ${formData.immediateDanger}

${actionGuide?.steps
  .map(
    (step, index) => `
STEP ${index + 1}: ${step.title.toUpperCase()}
${step.content.map((item) => `• ${item.replace(/[🔥📞🏃🚫📸✅📝🏥🚓⚖️🆓🛡️👨‍💼📍🧾💰👥📄📋📱💻⚖️🤐🆓💰]/g, "")}`).join("\n")}`,
  )
  .join("\n")}

EMERGENCY CONTACTS:
${actionGuide?.emergencyContacts.map((contact) => `• ${contact.name}: ${contact.number} - ${contact.description}`).join("\n")}

${actionGuide?.disclaimer}

Generated by InstaLaw - Papers Please
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instalaw-guide.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      userRole: "",
      incidentType: "",
      otherIncident: "",
      location: "",
      timeOfIncident: "",
      immediateDanger: "",
      description: "",
    });
    setShowGuide(false);
    setActionGuide(null);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 hover:scale-105 transform"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {t("instaLaw.backToHome")}
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-300 mx-4" />
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t("instaLaw.title")}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {t("instaLaw.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                className="flex items-center space-x-1"
              >
                <Languages className="h-4 w-4" />
                <span>{t("header.language")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showGuide ? (
          <>
            {/* Introduction */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 p-4 rounded-lg mb-6 flex items-center justify-center space-x-2 shadow-lg border border-red-200">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">
                  {t("instaLaw.emergencyCall")}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("instaLaw.knowRights")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("instaLaw.description")}
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${currentStep === 1 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                >
                  <span className="font-semibold">1</span>
                  <span className="text-sm">{t("instaLaw.progress.role")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${currentStep === 2 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                >
                  <span className="font-semibold">2</span>
                  <span className="text-sm">
                    {t("instaLaw.progress.incident")}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${currentStep === 3 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                >
                  <span className="font-semibold">3</span>
                  <span className="text-sm">
                    {t("instaLaw.progress.steps")}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-gray-800 text-xl">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <span>{t("instaLaw.tellSituation")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: User Role */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {t("instaLaw.userRole")}
                        </h3>
                        <p className="text-gray-600">
                          {t("instaLaw.chooseRole")}
                        </p>
                      </div>
                      <RadioGroup
                        value={formData.userRole}
                        onValueChange={(value) =>
                          setFormData({ ...formData, userRole: value })
                        }
                        className="grid grid-cols-1 gap-4"
                      >
                        <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer">
                          <RadioGroupItem
                            value="victim"
                            id="victim"
                            className="text-blue-600 w-6 h-6"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="victim"
                              className="cursor-pointer text-lg font-semibold text-gray-800"
                            >
                              🛡️ {t("instaLaw.victim")}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {t("instaLaw.victimDesc")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:border-green-300 transition-all duration-300 cursor-pointer">
                          <RadioGroupItem
                            value="witness"
                            id="witness"
                            className="text-green-600 w-6 h-6"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="witness"
                              className="cursor-pointer text-lg font-semibold text-gray-800"
                            >
                              👁️ {t("instaLaw.witness")}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {t("instaLaw.witnessDesc")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all duration-300 cursor-pointer">
                          <RadioGroupItem
                            value="accused"
                            id="accused"
                            className="text-orange-600 w-6 h-6"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="accused"
                              className="cursor-pointer text-lg font-semibold text-gray-800"
                            >
                              ⚖️ {t("instaLaw.accused")}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {t("instaLaw.accusedDesc")}
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.userRole}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                        >
                          {t("instaLaw.continue")}{" "}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Incident Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {t("instaLaw.incidentDetails")}
                        </h3>
                        <p className="text-gray-600">
                          {t("instaLaw.describeIncident")}
                        </p>
                      </div>

                      {/* Incident Type */}
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold text-gray-800">
                          {t("instaLaw.incidentType")}
                        </Label>
                        <Select
                          value={formData.incidentType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, incidentType: value })
                          }
                        >
                          <SelectTrigger className="border-2 h-12 text-lg">
                            <SelectValue
                              placeholder={t("instaLaw.selectIncident")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {incidentTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-lg py-3"
                              >
                                <span className="flex items-center space-x-3">
                                  <span className="text-xl">{type.icon}</span>
                                  <span>{type.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Other Incident */}
                      {formData.incidentType === "other" && (
                        <div className="space-y-3">
                          <Label
                            htmlFor="otherIncident"
                            className="text-lg font-semibold text-gray-800"
                          >
                            {t("instaLaw.specifyIncident")}
                          </Label>
                          <Input
                            id="otherIncident"
                            value={formData.otherIncident}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                otherIncident: e.target.value,
                              })
                            }
                            placeholder={t(
                              "instaLaw.describeIncidentPlaceholder",
                            )}
                            className="h-12 text-lg"
                          />
                        </div>
                      )}

                      {/* Immediate Danger */}
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center space-x-2 text-gray-800">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <span>{t("instaLaw.immediateDanger")}</span>
                        </Label>
                        <RadioGroup
                          value={formData.immediateDanger}
                          onValueChange={(value) =>
                            setFormData({ ...formData, immediateDanger: value })
                          }
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-3 p-4 border-2 border-red-200 rounded-lg cursor-pointer">
                            <RadioGroupItem
                              value="yes"
                              id="danger-yes"
                              className="text-red-600 w-5 h-5"
                            />
                            <Label
                              htmlFor="danger-yes"
                              className="cursor-pointer text-red-600 font-semibold text-lg"
                            >
                              🚨 {t("instaLaw.yes")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer">
                            <RadioGroupItem
                              value="no"
                              id="danger-no"
                              className="text-gray-600 w-5 h-5"
                            />
                            <Label
                              htmlFor="danger-no"
                              className="cursor-pointer font-semibold text-lg"
                            >
                              ✅ {t("instaLaw.no")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="px-8 py-3 text-lg"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />{" "}
                          {t("instaLaw.back")}
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !formData.incidentType || !formData.immediateDanger
                          }
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                        >
                          {t("instaLaw.continue")}{" "}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Additional Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {t("instaLaw.additionalDetails")}
                        </h3>
                        <p className="text-gray-600">
                          {t("instaLaw.optionalInfo")}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="location"
                          className="flex items-center space-x-2 text-lg font-semibold text-gray-800"
                        >
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span>{t("instaLaw.location")}</span>
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder={t("instaLaw.locationPlaceholder")}
                          className="h-12 text-lg"
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="time"
                          className="flex items-center space-x-2 text-lg font-semibold text-gray-800"
                        >
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span>{t("instaLaw.timeOfIncident")}</span>
                        </Label>
                        <Input
                          id="time"
                          type="datetime-local"
                          value={formData.timeOfIncident}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeOfIncident: e.target.value,
                            })
                          }
                          className="h-12 text-lg"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="description"
                          className="text-lg font-semibold text-gray-800"
                        >
                          {t("instaLaw.additionalContext")}
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder={t("instaLaw.contextPlaceholder")}
                          rows={4}
                          className="text-lg resize-none"
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="px-8 py-3 text-lg"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />{" "}
                          {t("instaLaw.back")}
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
                        >
                          <Zap className="mr-2 h-5 w-5" />{" "}
                          {t("instaLaw.getGuide")}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Action Guide Display */
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {t("instaLaw.personalizedGuide")}
              </h2>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center space-x-2 px-6 py-3"
                >
                  <Download className="h-5 w-5" />
                  <span>{t("instaLaw.downloadGuide")}</span>
                </Button>
                <Button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
                >
                  <Home className="mr-2 h-5 w-5" /> {t("instaLaw.newSituation")}
                </Button>
              </div>
            </div>

            {formData.immediateDanger === "yes" && (
              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 text-red-800 mb-3">
                    <div className="bg-red-600 text-white p-2 rounded-full">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-xl">
                      {t("instaLaw.dangerDetected")}
                    </span>
                  </div>
                  <p className="text-red-700 text-lg font-medium">
                    {t("instaLaw.callNow")}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Steps with Large Numbers */}
            <div className="space-y-6">
              {actionGuide?.steps.map((step, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-r ${step.bgColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Large Number */}
                      <div
                        className={`${step.color} bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <span className="text-3xl font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-3xl">{step.icon}</span>
                          <h3 className={`text-2xl font-bold ${step.color}`}>
                            {step.title}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.content.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center space-x-2 p-3 bg-white/50 rounded-lg"
                            >
                              <CheckCircle
                                className={`h-5 w-5 ${step.color} flex-shrink-0`}
                              />
                              <span className="font-medium text-gray-800">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contacts */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-blue-600 text-xl">
                  <Phone className="h-6 w-6" />
                  <span>{t("instaLaw.emergencyContacts")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {actionGuide?.emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg shadow border"
                    >
                      <div className="font-bold text-blue-800 text-lg">
                        {contact.name}
                      </div>
                      <div className="text-2xl font-bold text-blue-600 my-1">
                        📞 {contact.number}
                      </div>
                      <div className="text-sm text-blue-700">
                        {contact.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Disclaimer */}
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="text-yellow-800">
                    <p className="font-bold text-lg mb-2">
                      {t("instaLaw.aiDisclaimer")}
                    </p>
                    <p className="text-base">{actionGuide?.disclaimer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function InstaLaw() {
  return (
    <LanguageProvider>
      <InstaLawContent />
    </LanguageProvider>
  );
}

export default InstaLaw;
