import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Plane,
  GraduationCap,
  Building2,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentResult {
  id: string;
  title: string;
  titleBengali: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  priority: "high" | "medium" | "low";
}

const SmartDocumentFinderPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<DocumentResult[]>([]);

  const purposes = [
    { id: "job", label: "Job Application", labelBn: "চাকরির আবেদন", icon: <Briefcase className="h-5 w-5" /> },
    { id: "travel", label: "International Travel", labelBn: "বিদেশ ভ্রমণ", icon: <Plane className="h-5 w-5" /> },
    { id: "education", label: "Education / Admission", labelBn: "শিক্ষা / ভর্তি", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "bank", label: "Bank Account", labelBn: "ব্যাংক একাউন্ট", icon: <Building2 className="h-5 w-5" /> },
    { id: "government", label: "Government Service", labelBn: "সরকারি সেবা", icon: <CreditCard className="h-5 w-5" /> },
  ];

  const ageGroups = [
    { id: "under18", label: "Under 18", labelBn: "১৮ এর নিচে" },
    { id: "18-30", label: "18 - 30 years", labelBn: "১৮ - ৩০ বছর" },
    { id: "31-50", label: "31 - 50 years", labelBn: "৩১ - ৫০ বছর" },
    { id: "above50", label: "Above 50", labelBn: "৫০ এর উপরে" },
  ];

  const applicationTypes = [
    { id: "new", label: "First-time Application", labelBn: "নতুন আবেদন" },
    { id: "renewal", label: "Renewal / Update", labelBn: "নবায়ন / আপডেট" },
    { id: "correction", label: "Correction", labelBn: "সংশোধন" },
  ];

  const getRecommendations = (): DocumentResult[] => {
    const recommendations: DocumentResult[] = [];
    const purpose = answers.purpose;
    const age = answers.age;
    const type = answers.type;

    // Core documents everyone needs
    if (age !== "under18" && type === "new") {
      recommendations.push({
        id: "nid",
        title: "National ID Card",
        titleBengali: "জাতীয় পরিচয়পত্র",
        description: "Primary identification for all citizens above 18",
        estimatedTime: "3-6 months",
        estimatedCost: "Free",
        priority: "high",
      });
    }

    if (purpose === "travel") {
      recommendations.push({
        id: "passport",
        title: "e-Passport",
        titleBengali: "ই-পাসপোর্ট",
        description: "Required for international travel",
        estimatedTime: "15-21 days",
        estimatedCost: "৳4,025 - ৳10,350",
        priority: "high",
      });
      recommendations.push({
        id: "police-clearance",
        title: "Police Clearance",
        titleBengali: "পুলিশ ক্লিয়ারেন্স",
        description: "Often required for visa applications",
        estimatedTime: "7-14 days",
        estimatedCost: "৳500",
        priority: "medium",
      });
    }

    if (purpose === "job") {
      recommendations.push({
        id: "education-certificate",
        title: "Education Certificate",
        titleBengali: "শিক্ষাগত সনদ",
        description: "Verified academic credentials",
        estimatedTime: "7-15 days",
        estimatedCost: "৳50 - ৳1,500",
        priority: "high",
      });
      if (age !== "under18") {
        recommendations.push({
          id: "nid",
          title: "National ID Card",
          titleBengali: "জাতীয় পরিচয়পত্র",
          description: "Required for employment verification",
          estimatedTime: "3-6 months",
          estimatedCost: "Free",
          priority: "high",
        });
      }
    }

    if (purpose === "education") {
      recommendations.push({
        id: "birth-certificate",
        title: "Birth Certificate",
        titleBengali: "জন্ম নিবন্ধন",
        description: "Required for school/college admission",
        estimatedTime: "1-7 days",
        estimatedCost: "Free - ৳100",
        priority: "high",
      });
    }

    if (purpose === "bank") {
      recommendations.push({
        id: "nid",
        title: "National ID Card",
        titleBengali: "জাতীয় পরিচয়পত্র",
        description: "Primary KYC document for banks",
        estimatedTime: "3-6 months",
        estimatedCost: "Free",
        priority: "high",
      });
    }

    if (purpose === "government") {
      recommendations.push({
        id: "birth-certificate",
        title: "Birth Certificate",
        titleBengali: "জন্ম নিবন্ধন",
        description: "Base document for all government services",
        estimatedTime: "1-7 days",
        estimatedCost: "Free - ৳100",
        priority: "high",
      });
    }

    // Remove duplicates
    const unique = recommendations.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );

    return unique.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const handleAnswer = (questionKey: string, value: string) => {
    setAnswers({ ...answers, [questionKey]: value });
    if (step < 2) {
      setStep(step + 1);
    } else {
      const recs = getRecommendations();
      setResults(recs);
      setStep(3);
    }
  };

  const resetFinder = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3">
            <h3 className="text-[#E8EDDF] font-semibold text-lg mb-4">
              {language === "bn" ? "আপনার উদ্দেশ্য কী?" : "What's your purpose?"}
            </h3>
            {purposes.map((purpose) => (
              <button
                key={purpose.id}
                onClick={() => handleAnswer("purpose", purpose.id)}
                className="w-full flex items-center gap-3 p-4 bg-[#333533] rounded-xl hover:bg-[#333533]/80 active:scale-[0.98] transition-all"
              >
                <div className="w-12 h-12 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center text-[#F5CB5C]">
                  {purpose.icon}
                </div>
                <span className="text-[#E8EDDF] font-medium flex-1 text-left">
                  {language === "bn" ? purpose.labelBn : purpose.label}
                </span>
                <ArrowRight className="h-5 w-5 text-[#CFDBD5]/50" />
              </button>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="space-y-3">
            <h3 className="text-[#E8EDDF] font-semibold text-lg mb-4">
              {language === "bn" ? "আপনার বয়স কত?" : "What's your age?"}
            </h3>
            {ageGroups.map((age) => (
              <button
                key={age.id}
                onClick={() => handleAnswer("age", age.id)}
                className="w-full flex items-center justify-between p-4 bg-[#333533] rounded-xl hover:bg-[#333533]/80 active:scale-[0.98] transition-all"
              >
                <span className="text-[#E8EDDF] font-medium">
                  {language === "bn" ? age.labelBn : age.label}
                </span>
                <ArrowRight className="h-5 w-5 text-[#CFDBD5]/50" />
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <h3 className="text-[#E8EDDF] font-semibold text-lg mb-4">
              {language === "bn" ? "আবেদনের ধরন কী?" : "Application type?"}
            </h3>
            {applicationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleAnswer("type", type.id)}
                className="w-full flex items-center justify-between p-4 bg-[#333533] rounded-xl hover:bg-[#333533]/80 active:scale-[0.98] transition-all"
              >
                <span className="text-[#E8EDDF] font-medium">
                  {language === "bn" ? type.labelBn : type.label}
                </span>
                <ArrowRight className="h-5 w-5 text-[#CFDBD5]/50" />
              </button>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#E8EDDF] font-semibold text-lg">
                {language === "bn" ? "আপনার জন্য প্রয়োজনীয় ডকুমেন্ট" : "Recommended Documents"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFinder}
                className="text-[#F5CB5C] hover:bg-[#333533] p-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {language === "bn" ? "আবার শুরু" : "Start Over"}
              </Button>
            </div>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-[#CFDBD5]/30 mx-auto mb-3" />
                <p className="text-[#CFDBD5]/60">
                  {language === "bn" ? "কোনো ডকুমেন্ট পাওয়া যায়নি" : "No documents found"}
                </p>
              </div>
            ) : (
              results.map((doc, index) => (
                <Card 
                  key={doc.id} 
                  className="bg-[#333533] border-0 rounded-xl overflow-hidden cursor-pointer hover:bg-[#333533]/80 active:scale-[0.99] transition-all"
                  onClick={() => navigate(`/guide/${doc.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        doc.priority === "high" ? "bg-[#F5CB5C] text-[#242423]" :
                        doc.priority === "medium" ? "bg-blue-500/20 text-blue-400" :
                        "bg-[#242423] text-[#CFDBD5]"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#E8EDDF] font-semibold">{doc.title}</h4>
                        <p className="text-xs text-[#CFDBD5]/60 mb-2">{doc.titleBengali}</p>
                        <p className="text-sm text-[#CFDBD5]/70 mb-3">{doc.description}</p>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-xs text-[#CFDBD5]/70">{doc.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 text-[#F5CB5C]" />
                            <span className="text-xs text-[#CFDBD5]/70">{doc.estimatedCost}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[#F5CB5C]" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );
    }
  };

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
              <Sparkles className="h-5 w-5 text-[#242423]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#E8EDDF]">
                {language === "bn" ? "স্মার্ট ডকুমেন্ট ফাইন্ডার" : "Smart Document Finder"}
              </h1>
              <p className="text-xs text-[#CFDBD5]/60">
                {language === "bn" ? "আপনার কোন ডকুমেন্ট দরকার জানুন" : "Find what documents you need"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress indicator */}
      {step < 3 && (
        <div className="px-4 mb-6">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i <= step ? "bg-[#F5CB5C]" : "bg-[#333533]"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#CFDBD5]/50 mt-2 text-center">
            {language === "bn" ? `ধাপ ${step + 1}/৩` : `Step ${step + 1} of 3`}
          </p>
        </div>
      )}

      {/* Back Button for steps */}
      {step > 0 && step < 3 && (
        <div className="px-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(step - 1)}
            className="text-[#CFDBD5] hover:bg-[#333533] p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {language === "bn" ? "পেছনে" : "Back"}
          </Button>
        </div>
      )}

      {/* Main Content */}
      <section className="px-4">
        {renderStep()}
      </section>
    </div>
  );
};

export default SmartDocumentFinderPage;
