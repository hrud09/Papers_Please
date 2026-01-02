import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  MessageCircle,
  Send,
  User,
  Mail,
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
      <div className="min-h-screen bg-[#242423] flex items-center justify-center pb-24">
        <Card className="max-w-md mx-auto bg-[#333533] border-0 rounded-2xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-[#E8EDDF]">Document Not Found</h2>
            <p className="text-[#CFDBD5]/70 mb-4">
              The requested document guide could not be found.
            </p>
            <Button onClick={() => navigate("/")} className="bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("guide.backToHome")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#242423] pb-24 md:pb-8">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 md:pt-20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="p-2.5 bg-[#333533] rounded-xl text-[#CFDBD5] hover:bg-[#333533]/80 active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5CB5C] rounded-xl">
              <FileText className="h-5 w-5 text-[#242423]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#E8EDDF]">
                {guide.title}
              </h1>
              <p className="text-xs text-[#CFDBD5]/60">
                {guide.titleBengali}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Info Cards */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 sm:flex sm:overflow-x-auto pb-2 scrollbar-hide">
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-[#F5CB5C]" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.officialFee")}</p>
              <p className="text-sm sm:text-lg font-bold text-[#F5CB5C]">
                {guide.officialFee}
              </p>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.processingTime")}</p>
              <p className="text-sm sm:text-lg font-bold text-green-500">
                {guide.processingTime}
              </p>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.requiredDocuments")}</p>
              <p className="text-sm sm:text-lg font-bold text-blue-500">
                {guide.requiredDocuments.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-transparent mb-4">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.overview")}</TabsTrigger>
            <TabsTrigger value="procedure" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.procedure")}</TabsTrigger>
            <TabsTrigger value="offices" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.offices")}</TabsTrigger>
            <TabsTrigger value="faqs" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.faqs")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4">
              <Card className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-[#F5CB5C]" />
                    </div>
                    <div>
                      <h3 className="text-[#E8EDDF] font-semibold mb-1">{t("guide.importance")}</h3>
                      <p className="text-[#CFDBD5]/70 text-sm leading-relaxed">{guide.importance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#333533] border-0 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-[#E8EDDF] font-semibold">{t("guide.requiredDocuments")}</h3>
                  </div>
                  <div className="space-y-2 pl-1">
                    {guide.requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-[#242423] rounded-xl">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-[#CFDBD5]/80 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="procedure">
            <div className="space-y-3">
              {guide.procedure.map((step, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#F5CB5C] text-[#242423] rounded-xl w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] mb-1.5">{step.title}</h3>
                        <p className="text-[#CFDBD5]/70 text-sm leading-relaxed mb-2">
                          {step.description}
                        </p>
                        {step.tips && (
                          <div className="bg-[#242423] rounded-xl p-3 mt-3 border border-[#F5CB5C]/20">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-[#F5CB5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="h-3.5 w-3.5 text-[#F5CB5C]" />
                              </div>
                              <p className="text-xs text-[#CFDBD5]/70 leading-relaxed">
                                {step.tips}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offices">
            <div className="space-y-3">
              {guide.offices.map((office, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="h-5 w-5 text-[#F5CB5C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] mb-2">{office.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 p-2 bg-[#242423] rounded-xl">
                            <MapPin className="h-4 w-4 text-[#CFDBD5]/50 mt-0.5 flex-shrink-0" />
                            <p className="text-[#CFDBD5]/70 text-sm">{office.address}</p>
                          </div>
                          {office.phone && (
                            <div className="flex items-center gap-2 p-2 bg-[#242423] rounded-xl">
                              <Phone className="h-4 w-4 text-[#CFDBD5]/50" />
                              <p className="text-[#CFDBD5]/70 text-sm">{office.phone}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2 p-2 bg-[#242423] rounded-xl">
                            <Clock className="h-4 w-4 text-[#CFDBD5]/50" />
                            <p className="text-[#CFDBD5]/70 text-sm">{office.hours}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <div className="space-y-3">
              {guide.faqs.map((faq, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#F5CB5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-4 w-4 text-[#F5CB5C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] text-sm mb-1.5">{faq.question}</h3>
                        <p className="text-[#CFDBD5]/70 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Consultancy Form Section */}
      <section className="px-4 mt-6 mb-8">
        <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#F5CB5C] to-[#F5CB5C]/50" />
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#F5CB5C] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-[#242423]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#E8EDDF]">Need Help?</h3>
                <p className="text-xs text-[#CFDBD5]/60">Get 1-on-1 expert consultancy</p>
              </div>
            </div>

            <ConsultancyForm documentTitle={guide.title} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const ConsultancyForm = ({ documentTitle }: { documentTitle: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", issue: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-slide-up">
        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h4 className="text-[#E8EDDF] font-semibold text-lg mb-2">Request Submitted!</h4>
        <p className="text-[#CFDBD5]/60 text-sm">
          We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-[#F5CB5C]" />
          Your Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[#F5CB5C]" />
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[#F5CB5C]" />
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+880 1XXX XXXXXX"
            className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="issue" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
          <MessageCircle className="h-3.5 w-3.5 text-[#F5CB5C]" />
          Describe Your Issue
        </Label>
        <Textarea
          id="issue"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          required
          placeholder={`Tell us about your ${documentTitle} related issue...`}
          rows={3}
          className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl focus:ring-2 focus:ring-[#F5CB5C]/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 active:scale-[0.98] rounded-xl h-12 font-semibold text-sm transition-transform"
      >
        <Send className="h-4 w-4 mr-2" />
        Request Consultation
      </Button>

      <p className="text-[10px] text-[#CFDBD5]/50 text-center pt-1">
        ✨ Free consultation • Response within 24 hours
      </p>
    </form>
  );
};

export default DocumentGuidePage;
