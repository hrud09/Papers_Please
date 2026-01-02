import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Zap,
  FileText,
  Search,
  Edit3,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmergencyItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  steps: string[];
  stepsBn: string[];
  requiredDocs: string[];
  requiredDocsBn: string[];
  processingTime: string;
  processingTimeBn: string;
  icon: React.ReactNode;
}

const emergencyItems: EmergencyItem[] = [
  {
    id: "emergency-passport",
    title: "Emergency Passport",
    titleBn: "জরুরি পাসপোর্ট",
    description: "For urgent medical treatment abroad or death of family member",
    descriptionBn: "বিদেশে জরুরি চিকিৎসা বা পরিবারের সদস্যের মৃত্যুর জন্য",
    steps: [
      "Get proof of emergency (medical report/death certificate)",
      "Apply online with emergency option selected",
      "Pay super express fee (৳7,500+)",
      "Visit passport office with all documents",
    ],
    stepsBn: [
      "জরুরি অবস্থার প্রমাণ নিন (মেডিকেল রিপোর্ট/মৃত্যু সনদ)",
      "জরুরি অপশন সিলেক্ট করে অনলাইনে আবেদন করুন",
      "সুপার এক্সপ্রেস ফি দিন (৳৭,৫০০+)",
      "সব ডকুমেন্ট নিয়ে পাসপোর্ট অফিসে যান",
    ],
    requiredDocs: ["Medical report/Invitation letter", "Previous passport (if any)", "NID/Birth Certificate", "Payment receipt"],
    requiredDocsBn: ["মেডিকেল রিপোর্ট/আমন্ত্রণ পত্র", "আগের পাসপোর্ট (যদি থাকে)", "NID/জন্ম সনদ", "পেমেন্ট রসিদ"],
    processingTime: "24-48 hours",
    processingTimeBn: "২৪-৪৮ ঘন্টা",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "lost-document",
    title: "Lost Document Recovery",
    titleBn: "হারানো ডকুমেন্ট পুনরুদ্ধার",
    description: "Steps to recover lost NID, Passport, or Birth Certificate",
    descriptionBn: "হারানো NID, পাসপোর্ট, বা জন্ম সনদ পুনরুদ্ধারের ধাপ",
    steps: [
      "File a General Diary (GD) at nearest police station",
      "Get GD copy with reference number",
      "Apply for duplicate document with GD copy",
      "Pay duplicate issuance fee",
    ],
    stepsBn: [
      "নিকটস্থ থানায় জিডি করুন",
      "রেফারেন্স নম্বরসহ জিডি কপি নিন",
      "জিডি কপিসহ ডুপ্লিকেট ডকুমেন্টের জন্য আবেদন করুন",
      "ডুপ্লিকেট ইস্যু ফি দিন",
    ],
    requiredDocs: ["GD copy from police station", "Any ID proof available", "Passport photos", "Application form"],
    requiredDocsBn: ["থানা থেকে জিডি কপি", "যেকোনো আইডি প্রমাণ", "পাসপোর্ট সাইজ ছবি", "আবেদন ফর্ম"],
    processingTime: "7-30 days",
    processingTimeBn: "৭-৩০ দিন",
    icon: <Search className="h-5 w-5" />,
  },
  {
    id: "name-correction",
    title: "Urgent Name Correction",
    titleBn: "জরুরি নাম সংশোধন",
    description: "Fast-track name correction for visa or admission deadlines",
    descriptionBn: "ভিসা বা ভর্তির সময়সীমার জন্য দ্রুত নাম সংশোধন",
    steps: [
      "Identify the primary document to correct first (usually Birth Certificate)",
      "Apply for urgent correction with proof of deadline",
      "Pay urgent processing fee",
      "After primary document, correct dependent documents",
    ],
    stepsBn: [
      "প্রথমে কোন ডকুমেন্ট সংশোধন করতে হবে চিহ্নিত করুন (সাধারণত জন্ম সনদ)",
      "সময়সীমার প্রমাণসহ জরুরি সংশোধনের জন্য আবেদন করুন",
      "জরুরি প্রসেসিং ফি দিন",
      "প্রাথমিক ডকুমেন্টের পর নির্ভরশীল ডকুমেন্ট সংশোধন করুন",
    ],
    requiredDocs: ["Original document", "Proof of correct name (School cert, etc.)", "Affidavit", "Deadline proof"],
    requiredDocsBn: ["মূল ডকুমেন্ট", "সঠিক নামের প্রমাণ (স্কুল সার্টিফিকেট ইত্যাদি)", "হলফনামা", "সময়সীমার প্রমাণ"],
    processingTime: "3-7 days (urgent)",
    processingTimeBn: "৩-৭ দিন (জরুরি)",
    icon: <Edit3 className="h-5 w-5" />,
  },
];

const EmergencyGuide = () => {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-500" />
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "জরুরি গাইড" : "Emergency Guide"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">
              {language === "bn" ? "দ্রুত সমাধান প্রয়োজন?" : "Need urgent solutions?"}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {emergencyItems.map((item) => (
            <div key={item.id} className="bg-[#242423] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#E8EDDF] font-medium text-sm">
                    {language === "bn" ? item.titleBn : item.title}
                  </h4>
                  <p className="text-xs text-[#CFDBD5]/50 truncate">
                    {language === "bn" ? item.descriptionBn : item.description}
                  </p>
                </div>
                {expandedId === item.id ? (
                  <ChevronUp className="h-5 w-5 text-[#CFDBD5]/50 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#CFDBD5]/50 flex-shrink-0" />
                )}
              </button>

              {expandedId === item.id && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Processing Time */}
                  <div className="flex items-center gap-2 bg-[#333533] p-2 rounded-lg">
                    <Clock className="h-4 w-4 text-[#F5CB5C]" />
                    <span className="text-xs text-[#CFDBD5]">
                      <span className="text-[#F5CB5C] font-medium">
                        {language === "bn" ? "সময়: " : "Time: "}
                      </span>
                      {language === "bn" ? item.processingTimeBn : item.processingTime}
                    </span>
                  </div>

                  {/* Steps */}
                  <div>
                    <p className="text-xs text-[#F5CB5C] font-medium mb-2">
                      {language === "bn" ? "ধাপসমূহ:" : "Steps:"}
                    </p>
                    <ol className="space-y-2">
                      {(language === "bn" ? item.stepsBn : item.steps).map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#CFDBD5]/80">
                          <span className="w-5 h-5 bg-[#F5CB5C] text-[#242423] rounded-full flex items-center justify-center font-medium flex-shrink-0 text-[10px]">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <p className="text-xs text-green-500 font-medium mb-2">
                      {language === "bn" ? "প্রয়োজনীয় ডকুমেন্ট:" : "Required Documents:"}
                    </p>
                    <ul className="space-y-1">
                      {(language === "bn" ? item.requiredDocsBn : item.requiredDocs).map((doc, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#CFDBD5]/70">
                          <ArrowRight className="h-3 w-3 text-green-500" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyGuide;
