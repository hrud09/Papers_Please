import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Building,
  Phone,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentGuideData {
  id: string;
  title: string;
  titleBengali: string;
  description: string;
  importance: string;
  officialFee: string;
  processingTime: string;
  requiredDocuments: string[];
  procedure: {
    step: number;
    title: string;
    description: string;
    tips?: string;
  }[];
  offices: {
    name: string;
    address: string;
    phone?: string;
    hours: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  tips: string[];
  relatedDocuments: string[];
}

const documentGuides: Record<string, DocumentGuideData> = {
  nid: {
    id: "nid",
    title: "National ID Card",
    titleBengali: "জাতীয় পরিচয়পত্র",
    description:
      "The National ID Card is the primary identification document for Bangladeshi citizens.",
    importance:
      "Essential for voting, opening bank accounts, getting passport, and accessing government services.",
    officialFee: "৳50-200",
    processingTime: "7-15 days",
    requiredDocuments: [
      "Birth Certificate",
      "Passport Size Photos (2 copies)",
      "Address Proof",
      "Parent's NID (if applicable)",
    ],
    procedure: [
      {
        step: 1,
        title: "Collect Application Form",
        description:
          "Get the NID application form from your local registration office or download online.",
        tips: "Forms are available free of charge at all registration offices.",
      },
      {
        step: 2,
        title: "Fill Out the Form",
        description:
          "Complete all sections of the form with accurate information.",
        tips: "Use black ink and write clearly. Any mistakes may delay processing.",
      },
      {
        step: 3,
        title: "Gather Required Documents",
        description:
          "Collect all necessary documents including birth certificate and photos.",
        tips: "Make photocopies of all documents and keep originals for verification.",
      },
      {
        step: 4,
        title: "Submit Application",
        description:
          "Submit your completed application with documents at the registration office.",
        tips: "Visit during office hours and expect to wait in queue during peak times.",
      },
    ],
    offices: [
      {
        name: "Dhaka District Registrar Office",
        address: "Segunbagicha, Dhaka-1000",
        phone: "02-9558916",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "Chittagong District Registrar Office",
        address: "Court Building, Chittagong",
        phone: "031-2523456",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "Sylhet District Registrar Office",
        address: "Zindabazar, Sylhet",
        phone: "0821-725896",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "How long does it take to get a new NID?",
        answer:
          "Typically 7-15 working days from the date of application submission.",
      },
      {
        question: "Can I apply for NID online?",
        answer:
          "Currently, you must visit the registration office in person for biometric data collection.",
      },
      {
        question: "What if I lose my NID card?",
        answer:
          "You can apply for a duplicate card by filing a General Diary (GD) at the nearest police station first.",
      },
    ],
    tips: [
      "Keep photocopies of your NID in multiple places",
      "Update your address if you move to a new location",
      "Check your information carefully before submitting",
      "Avoid paying extra fees to middlemen",
    ],
    relatedDocuments: ["Birth Certificate", "Passport", "Voter ID"],
  },
  passport: {
    id: "passport",
    title: "Passport",
    titleBengali: "পাসপোর্ট",
    description:
      "Official travel document issued by the Government of Bangladesh for international travel.",
    importance:
      "Required for international travel, visa applications, and as primary ID for many services.",
    officialFee: "৳3,000-5,000",
    processingTime: "21-30 days",
    requiredDocuments: [
      "National ID Card",
      "Birth Certificate",
      "Passport Photos (4 copies)",
      "Online Application Printout",
    ],
    procedure: [
      {
        step: 1,
        title: "Online Application",
        description:
          "Fill out the online application form at the official passport website.",
        tips: "Complete the form in one sitting as it cannot be saved partially.",
      },
      {
        step: 2,
        title: "Pay Application Fee",
        description:
          "Pay the required fee through designated banks or online payment.",
        tips: "Keep the payment receipt safe as you'll need it for the appointment.",
      },
      {
        step: 3,
        title: "Book Appointment",
        description: "Schedule an appointment at your nearest passport office.",
        tips: "Book as early as possible as slots fill up quickly.",
      },
      {
        step: 4,
        title: "Visit Passport Office",
        description: "Attend your appointment with all required documents.",
        tips: "Arrive 30 minutes early and dress formally for the photo.",
      },
      {
        step: 5,
        title: "Biometric Data Collection",
        description: "Provide fingerprints and have your photo taken.",
        tips: "Ensure your hands are clean and dry for clear fingerprints.",
      },
      {
        step: 6,
        title: "Collect Passport",
        description: "Collect your passport after the processing period.",
        tips: "You can track your application status online using your reference number.",
      },
    ],
    offices: [
      {
        name: "Dhaka Passport Office",
        address: "Agargaon, Dhaka-1207",
        phone: "02-8181818",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "Chittagong Passport Office",
        address: "Dampara, Chittagong",
        phone: "031-2503456",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "How much does a passport cost?",
        answer:
          "Regular processing: ৳3,000, Express: ৳5,000, Super Express: ৳7,500",
      },
      {
        question: "Can I renew my passport online?",
        answer:
          "You must apply online but visit the office in person for biometric data.",
      },
    ],
    tips: [
      "Apply well in advance of your travel date",
      "Check passport validity requirements for your destination",
      "Keep digital copies of your passport",
      "Register with the embassy when traveling abroad",
    ],
    relatedDocuments: ["National ID Card", "Birth Certificate", "Visa"],
  },
  // Add more document guides here...
};

const DocumentGuidePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const guide = id ? documentGuides[id] : null;

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Document Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested document guide could not be found.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("guide.backToHome")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("guide.backToHome")}
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  {guide.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {guide.titleBengali}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {guide.title} Guide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {guide.description}
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">{t("guide.officialFee")}</h3>
                <p className="text-lg font-bold text-green-600">
                  {guide.officialFee}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {t("guide.processingTime")}
                </h3>
                <p className="text-lg font-bold text-blue-600">
                  {guide.processingTime}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {t("guide.requiredDocuments")}
                </h3>
                <p className="text-lg font-bold text-purple-600">
                  {guide.requiredDocuments.length} items
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">{t("guide.overview")}</TabsTrigger>
              <TabsTrigger value="procedure">
                {t("guide.procedure")}
              </TabsTrigger>
              <TabsTrigger value="offices">{t("guide.offices")}</TabsTrigger>
              <TabsTrigger value="fees">{t("guide.fees")}</TabsTrigger>
              <TabsTrigger value="faqs">{t("guide.faqs")}</TabsTrigger>
              <TabsTrigger value="tips">{t("guide.tips")}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                      {t("guide.importance")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guide.importance}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-green-600" />
                      {t("guide.requiredDocuments")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guide.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="procedure">
              <div className="space-y-6">
                {guide.procedure.map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          {step.step}
                        </div>
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      {step.tips && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                            <p className="text-sm text-yellow-800">
                              {step.tips}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="offices">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.offices.map((office, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Building className="h-5 w-5 mr-2 text-blue-600" />
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                        <p className="text-sm text-muted-foreground">
                          {office.address}
                        </p>
                      </div>
                      {office.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-sm text-muted-foreground">
                            {office.phone}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <p className="text-sm text-muted-foreground">
                          {office.hours}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fees">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Structure & Processing Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        {t("guide.officialFee")}
                      </h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-2xl font-bold text-green-700">
                          {guide.officialFee}
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Official government fee only
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        {t("guide.processingTime")}
                      </h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-2xl font-bold text-blue-700">
                          {guide.processingTime}
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          Standard processing time
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faqs">
              <div className="space-y-4">
                {guide.faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-start text-lg">
                        <HelpCircle className="h-5 w-5 mr-2 text-blue-600 mt-1" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tips">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                      Helpful Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {guide.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      Related Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {guide.relatedDocuments.map((doc, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-sm"
                        >
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default DocumentGuidePage;
