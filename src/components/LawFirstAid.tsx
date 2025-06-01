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
  Heart,
  Car,
  Smartphone,
  Home,
  Users,
  Gavel,
  HelpCircle,
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

interface ActionGuide {
  immediateActions: string[];
  emergencyContacts: { name: string; number: string; description: string }[];
  whereToGo: string[];
  documentsToCollect: string[];
  legalRights: string[];
  whoToContact: { name: string; contact: string; description: string }[];
  dos: string[];
  donts: string[];
}

function LawFirstAidContent() {
  const { language, setLanguage, t } = useLanguage();
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
    {
      value: "cyber",
      label: t("incident.cyber"),
      icon: "💻",
    },
    { value: "drug", label: t("incident.drug"), icon: "💊" },
    { value: "accident", label: t("incident.accident"), icon: "🚗" },
    {
      value: "police",
      label: t("incident.police"),
      icon: "👮",
    },
    { value: "other", label: t("incident.other"), icon: "❓" },
  ];

  const generateActionGuide = (data: FormData): ActionGuide => {
    const isVictim = data.userRole === "victim";
    const isWitness = data.userRole === "witness";
    const isAccused = data.userRole === "accused";
    const inDanger = data.immediateDanger === "yes";

    let guide: ActionGuide = {
      immediateActions: [],
      emergencyContacts: [],
      whereToGo: [],
      documentsToCollect: [],
      legalRights: [],
      whoToContact: [],
      dos: [],
      donts: [],
    };

    // Immediate Actions
    if (inDanger) {
      guide.immediateActions = [
        "Call 999 immediately for emergency assistance",
        "Move to a safe location if possible",
        "Do not confront the perpetrator",
        "Preserve evidence - do not wash or change clothes if applicable",
      ];
    } else {
      guide.immediateActions = [
        "Ensure your safety first",
        "Document the incident with photos/videos if safe to do so",
        "Write down details while memory is fresh",
        "Seek medical attention if injured",
      ];
    }

    // Emergency Contacts
    guide.emergencyContacts = [
      {
        name: "National Emergency Service",
        number: "999",
        description: "Police, Fire, Ambulance",
      },
      {
        name: "Women & Children Helpline",
        number: "109",
        description: "24/7 support for women and children",
      },
      {
        name: "Legal Aid Services",
        number: "16430",
        description: "Free legal assistance",
      },
    ];

    if (data.incidentType === "domestic" || data.incidentType === "sexual") {
      guide.emergencyContacts.push({
        name: "Blast Call Center",
        number: "333",
        description: "Violence against women and children",
      });
    }

    // Where to Go
    if (isVictim) {
      guide.whereToGo = [
        "Nearest police station to file FIR (First Information Report)",
        "Hospital for medical examination and treatment",
        "Magistrate court if police refuse to file case",
        "District Legal Aid Office for free legal support",
      ];
    } else if (isWitness) {
      guide.whereToGo = [
        "Police station to provide witness statement",
        "Court when summoned for testimony",
        "Legal Aid Office if you need protection",
      ];
    } else if (isAccused) {
      guide.whereToGo = [
        "Lawyer's office immediately",
        "Police station if summoned (with lawyer)",
        "Court for bail application if arrested",
        "District Legal Aid Office for free legal representation",
      ];
    }

    // Documents to Collect
    guide.documentsToCollect = [
      "Medical certificates if injured",
      "Photos of injuries or damage",
      "Witness contact information",
      "Any relevant documents or evidence",
      "Copy of FIR once filed",
    ];

    if (data.incidentType === "cyber") {
      guide.documentsToCollect.push(
        "Screenshots of threats or harassment",
        "Phone records or call logs",
        "Social media evidence",
      );
    }

    // Legal Rights
    if (isVictim) {
      guide.legalRights = [
        "Right to file FIR at any police station",
        "Right to free medical examination",
        "Right to legal aid if you cannot afford a lawyer",
        "Right to compensation from the state",
        "Right to protection from intimidation",
      ];
    } else if (isAccused) {
      guide.legalRights = [
        "Right to remain silent",
        "Right to legal representation",
        "Right to bail (except in non-bailable offenses)",
        "Right to be informed of charges against you",
        "Right to fair trial",
        "Right against self-incrimination",
      ];
    } else if (isWitness) {
      guide.legalRights = [
        "Right to protection from intimidation",
        "Right to legal assistance",
        "Right to compensation for expenses",
        "Right to refuse to answer incriminating questions",
      ];
    }

    // Who to Contact
    guide.whoToContact = [
      {
        name: "District Legal Aid Officer",
        contact: "Visit district court",
        description: "Free legal assistance",
      },
      {
        name: "Human Rights Organizations",
        contact: "ASK: 02-9888587",
        description: "Rights advocacy and support",
      },
      {
        name: "Bangladesh Bar Council",
        contact: "02-9562248",
        description: "Lawyer referrals",
      },
    ];

    if (data.incidentType === "domestic" || data.incidentType === "sexual") {
      guide.whoToContact.push(
        {
          name: "BNWLA",
          contact: "02-8619884",
          description: "Women's legal aid",
        },
        {
          name: "Manusher Jonno Foundation",
          contact: "02-9889792",
          description: "Human rights support",
        },
      );
    }

    // Do's
    guide.dos = [
      "Keep all evidence safe",
      "Maintain a record of all interactions",
      "Follow legal procedures properly",
      "Seek professional legal advice",
      "Stay calm and composed",
    ];

    if (isAccused) {
      guide.dos.push(
        "Cooperate with legal process",
        "Always have a lawyer present during questioning",
      );
    }

    // Don'ts
    guide.donts = [
      "Don't destroy any evidence",
      "Don't take law into your own hands",
      "Don't ignore legal summons",
      "Don't discuss case details publicly",
    ];

    if (isAccused) {
      guide.donts.push(
        "Don't speak to police without a lawyer",
        "Don't flee or avoid legal process",
      );
    }

    return guide;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guide = generateActionGuide(formData);
    setActionGuide(guide);
    setShowGuide(true);
  };

  const handleDownload = () => {
    const content = `
LAW FIRST AID GUIDE
==================

Incident Details:
- Role: ${formData.userRole}
- Type: ${formData.incidentType}
- Location: ${formData.location}
- Time: ${formData.timeOfIncident}
- Immediate Danger: ${formData.immediateDanger}

IMMEDIATE ACTIONS:
${actionGuide?.immediateActions.map((action) => `• ${action}`).join("\n")}

EMERGENCY CONTACTS:
${actionGuide?.emergencyContacts.map((contact) => `• ${contact.name}: ${contact.number} - ${contact.description}`).join("\n")}

WHERE TO GO:
${actionGuide?.whereToGo.map((place) => `• ${place}`).join("\n")}

DOCUMENTS TO COLLECT:
${actionGuide?.documentsToCollect.map((doc) => `• ${doc}`).join("\n")}

YOUR LEGAL RIGHTS:
${actionGuide?.legalRights.map((right) => `• ${right}`).join("\n")}

WHO TO CONTACT FOR HELP:
${actionGuide?.whoToContact.map((contact) => `• ${contact.name}: ${contact.contact} - ${contact.description}`).join("\n")}

DO'S:
${actionGuide?.dos.map((item) => `• ${item}`).join("\n")}

DON'TS:
${actionGuide?.donts.map((item) => `• ${item}`).join("\n")}

Generated by Papers Please - Bangladesh Document Guide
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "law-first-aid-guide.txt";
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 hover:scale-105 transform"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {t("lawFirstAid.backToHome")}
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-300 mx-4" />
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-lg shadow-lg animate-pulse">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-600">
                    {t("lawFirstAid.title")}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {t("lawFirstAid.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                className="flex items-center space-x-1 hover:scale-105 transform transition-all duration-200"
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
            <div className="text-center mb-8 animate-in slide-in-from-top duration-700">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 p-4 rounded-lg mb-6 flex items-center justify-center space-x-2 animate-bounce shadow-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
                <span className="font-semibold">
                  {t("lawFirstAid.emergencyCall")}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {t("lawFirstAid.knowRights")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("lawFirstAid.description")}
              </p>
            </div>

            {/* Form */}
            <Card className="bg-white shadow-xl border-0 animate-in slide-in-from-bottom duration-700 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>{t("lawFirstAid.tellSituation")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Role */}
                  <div className="space-y-3 animate-in slide-in-from-left duration-500">
                    <Label className="text-base font-semibold text-gray-800">
                      {t("lawFirstAid.userRole")}
                    </Label>
                    <RadioGroup
                      value={formData.userRole}
                      onValueChange={(value) =>
                        setFormData({ ...formData, userRole: value })
                      }
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 p-3 border-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 transform cursor-pointer">
                        <RadioGroupItem
                          value="victim"
                          id="victim"
                          className="text-blue-600"
                        />
                        <Label
                          htmlFor="victim"
                          className="cursor-pointer flex-1 font-medium"
                        >
                          {t("lawFirstAid.victim")}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border-2 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:border-green-300 transition-all duration-300 hover:scale-105 transform cursor-pointer">
                        <RadioGroupItem
                          value="witness"
                          id="witness"
                          className="text-green-600"
                        />
                        <Label
                          htmlFor="witness"
                          className="cursor-pointer flex-1 font-medium"
                        >
                          {t("lawFirstAid.witness")}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105 transform cursor-pointer">
                        <RadioGroupItem
                          value="accused"
                          id="accused"
                          className="text-orange-600"
                        />
                        <Label
                          htmlFor="accused"
                          className="cursor-pointer flex-1 font-medium"
                        >
                          {t("lawFirstAid.accused")}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Incident Type */}
                  <div className="space-y-3 animate-in slide-in-from-right duration-500">
                    <Label className="text-base font-semibold text-gray-800">
                      {t("lawFirstAid.incidentType")}
                    </Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, incidentType: value })
                      }
                    >
                      <SelectTrigger className="border-2 hover:border-purple-300 transition-colors duration-200 bg-gradient-to-r from-white to-purple-50">
                        <SelectValue
                          placeholder={t("lawFirstAid.selectIncident")}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-purple-200 shadow-xl">
                        {incidentTypes.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors duration-200"
                          >
                            <span className="flex items-center space-x-2">
                              <span className="text-lg">{type.icon}</span>
                              <span>{type.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Other Incident */}
                  {formData.incidentType === "other" && (
                    <div className="space-y-3 animate-in slide-in-from-bottom duration-300">
                      <Label
                        htmlFor="otherIncident"
                        className="text-base font-semibold text-gray-800"
                      >
                        {t("lawFirstAid.specifyIncident")}
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
                        placeholder={t("lawFirstAid.describeIncident")}
                        className="border-2 hover:border-yellow-300 focus:border-yellow-400 transition-colors duration-200 bg-gradient-to-r from-white to-yellow-50"
                      />
                    </div>
                  )}

                  {/* Location */}
                  <div className="space-y-3 animate-in slide-in-from-left duration-500 delay-100">
                    <Label
                      htmlFor="location"
                      className="flex items-center space-x-1 text-base font-semibold text-gray-800"
                    >
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{t("lawFirstAid.location")}</span>
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder={t("lawFirstAid.locationPlaceholder")}
                      className="border-2 hover:border-green-300 focus:border-green-400 transition-colors duration-200 bg-gradient-to-r from-white to-green-50"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-3 animate-in slide-in-from-right duration-500 delay-100">
                    <Label
                      htmlFor="time"
                      className="flex items-center space-x-1 text-base font-semibold text-gray-800"
                    >
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{t("lawFirstAid.timeOfIncident")}</span>
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
                      className="border-2 hover:border-blue-300 focus:border-blue-400 transition-colors duration-200 bg-gradient-to-r from-white to-blue-50"
                    />
                  </div>

                  {/* Immediate Danger */}
                  <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-200">
                    <Label className="text-base font-semibold flex items-center space-x-1 text-gray-800">
                      <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                      <span>{t("lawFirstAid.immediateDanger")}</span>
                    </Label>
                    <RadioGroup
                      value={formData.immediateDanger}
                      onValueChange={(value) =>
                        setFormData({ ...formData, immediateDanger: value })
                      }
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2 p-3 border-2 border-red-200 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:border-red-400 transition-all duration-300 hover:scale-105 transform cursor-pointer">
                        <RadioGroupItem
                          value="yes"
                          id="danger-yes"
                          className="text-red-600"
                        />
                        <Label
                          htmlFor="danger-yes"
                          className="cursor-pointer text-red-600 font-medium"
                        >
                          {t("lawFirstAid.yes")}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105 transform cursor-pointer">
                        <RadioGroupItem
                          value="no"
                          id="danger-no"
                          className="text-gray-600"
                        />
                        <Label
                          htmlFor="danger-no"
                          className="cursor-pointer font-medium"
                        >
                          {t("lawFirstAid.no")}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Description */}
                  <div className="space-y-3 animate-in slide-in-from-top duration-500 delay-300">
                    <Label
                      htmlFor="description"
                      className="text-base font-semibold text-gray-800"
                    >
                      {t("lawFirstAid.additionalContext")}
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
                      placeholder={t("lawFirstAid.contextPlaceholder")}
                      rows={4}
                      className="border-2 hover:border-purple-300 focus:border-purple-400 transition-colors duration-200 bg-gradient-to-r from-white to-purple-50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-bottom duration-500 delay-400"
                    disabled={!formData.userRole || !formData.incidentType}
                  >
                    {t("lawFirstAid.getGuide")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Action Guide Display */
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between animate-in slide-in-from-top duration-500">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("lawFirstAid.personalizedGuide")}
              </h2>
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center space-x-1 hover:scale-105 transform transition-all duration-200 border-2 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4" />
                  <span>{t("lawFirstAid.downloadGuide")}</span>
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="hover:scale-105 transform transition-all duration-200 border-2 hover:border-green-400 hover:bg-green-50"
                >
                  {t("lawFirstAid.newSituation")}
                </Button>
              </div>
            </div>

            {formData.immediateDanger === "yes" && (
              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 shadow-lg animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertTriangle className="h-5 w-5 animate-bounce" />
                    <span className="font-bold">
                      {t("lawFirstAid.dangerDetected")}
                    </span>
                  </div>
                  <p className="text-red-700 mt-2 font-medium">
                    {t("lawFirstAid.callNow")}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Immediate Actions */}
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-left duration-500">
                <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <AlertTriangle className="h-5 w-5 animate-pulse" />
                    <span>{t("lawFirstAid.immediateActions")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.immediateActions.map((action, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-right duration-500">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <Phone className="h-5 w-5 animate-bounce" />
                    <span>{t("lawFirstAid.emergencyContacts")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actionGuide?.emergencyContacts.map((contact, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-800">
                          {contact.name}
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {contact.number}
                        </div>
                        <div className="text-sm text-blue-700">
                          {contact.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Where to Go */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-left duration-500 delay-100">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <MapPin className="h-5 w-5 animate-pulse" />
                    <span>{t("lawFirstAid.whereToGo")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.whereToGo.map((place, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{place}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Documents to Collect */}
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-right duration-500 delay-100">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-purple-600">
                    <FileText className="h-5 w-5 animate-bounce" />
                    <span>{t("lawFirstAid.documentsToCollect")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.documentsToCollect.map((doc, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Legal Rights */}
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-left duration-500 delay-200">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-orange-600">
                    <Gavel className="h-5 w-5 animate-pulse" />
                    <span>{t("lawFirstAid.legalRights")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.legalRights.map((right, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{right}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Who to Contact */}
              <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-right duration-500 delay-200">
                <CardHeader className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-teal-600">
                    <Users className="h-5 w-5 animate-bounce" />
                    <span>{t("lawFirstAid.whoToContact")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actionGuide?.whoToContact.map((contact, index) => (
                      <div key={index} className="p-3 bg-teal-50 rounded-lg">
                        <div className="font-semibold text-teal-800">
                          {contact.name}
                        </div>
                        <div className="text-teal-600">{contact.contact}</div>
                        <div className="text-sm text-teal-700">
                          {contact.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-lime-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-left duration-500 delay-300">
                <CardHeader className="bg-gradient-to-r from-green-100 to-lime-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <span className="text-2xl animate-bounce">✅</span>
                    <span>{t("lawFirstAid.dos")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.dos.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-in slide-in-from-right duration-500 delay-300">
                <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <span className="text-2xl animate-bounce">❌</span>
                    <span>{t("lawFirstAid.donts")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actionGuide?.donts.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg animate-in slide-in-from-bottom duration-500 delay-400">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0 animate-pulse" />
                  <div className="text-yellow-800">
                    <p className="font-semibold mb-1">
                      {t("lawFirstAid.disclaimer")}
                    </p>
                    <p className="text-sm">{t("lawFirstAid.disclaimerText")}</p>
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

function LawFirstAid() {
  return (
    <LanguageProvider>
      <LawFirstAidContent />
    </LanguageProvider>
  );
}

export default LawFirstAid;
