import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Calendar,
  Fingerprint,
  Package,
  Clock,
  MapPin,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineStep {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  duration: string;
  durationBn: string;
  location?: string;
  locationBn?: string;
  commonMistakes?: string[];
  commonMistakesBn?: string[];
  icon: React.ReactNode;
}

interface TimelineViewProps {
  documentId: string;
  documentTitle: string;
}

const timelineData: Record<string, TimelineStep[]> = {
  passport: [
    {
      id: "1",
      title: "Online Application",
      titleBn: "অনলাইন আবেদন",
      description: "Fill out the form at epassport.gov.bd with accurate information",
      descriptionBn: "সঠিক তথ্য দিয়ে epassport.gov.bd এ ফর্ম পূরণ করুন",
      duration: "20-30 minutes",
      durationBn: "২০-৩০ মিনিট",
      location: "Online",
      locationBn: "অনলাইন",
      commonMistakes: ["Wrong spelling of name", "Incorrect birth date", "Photo not meeting requirements"],
      commonMistakesBn: ["নামের বানান ভুল", "জন্ম তারিখ ভুল", "ছবি প্রয়োজনীয়তা পূরণ করছে না"],
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Fee Payment",
      titleBn: "ফি পরিশোধ",
      description: "Pay via bank or online payment gateway",
      descriptionBn: "ব্যাংক বা অনলাইন পেমেন্ট গেটওয়ে দিয়ে পরিশোধ করুন",
      duration: "10-15 minutes",
      durationBn: "১০-১৫ মিনিট",
      location: "Bank / Online",
      locationBn: "ব্যাংক / অনলাইন",
      commonMistakes: ["Wrong payment code", "Not keeping receipt"],
      commonMistakesBn: ["ভুল পেমেন্ট কোড", "রসিদ না রাখা"],
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Appointment Booking",
      titleBn: "অ্যাপয়েন্টমেন্ট বুকিং",
      description: "Book your slot at preferred passport office",
      descriptionBn: "পছন্দের পাসপোর্ট অফিসে আপনার স্লট বুক করুন",
      duration: "5 minutes",
      durationBn: "৫ মিনিট",
      location: "Online",
      locationBn: "অনলাইন",
      commonMistakes: ["Selecting wrong date", "Not noting appointment ID"],
      commonMistakesBn: ["ভুল তারিখ নির্বাচন", "অ্যাপয়েন্টমেন্ট আইডি নোট না করা"],
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "4",
      title: "Biometric Enrollment",
      titleBn: "বায়োমেট্রিক এনরোলমেন্ট",
      description: "Visit passport office for fingerprint and photo capture",
      descriptionBn: "আঙুলের ছাপ ও ছবি তোলার জন্য পাসপোর্ট অফিসে যান",
      duration: "1-3 hours",
      durationBn: "১-৩ ঘন্টা",
      location: "Passport Office",
      locationBn: "পাসপোর্ট অফিস",
      commonMistakes: ["Arriving late", "Forgetting original documents", "Not dressing formally"],
      commonMistakesBn: ["দেরিতে পৌঁছানো", "মূল ডকুমেন্ট ভুলে যাওয়া", "ফর্মাল পোশাক না পরা"],
      icon: <Fingerprint className="h-5 w-5" />,
    },
    {
      id: "5",
      title: "Passport Collection",
      titleBn: "পাসপোর্ট সংগ্রহ",
      description: "Collect your passport after processing",
      descriptionBn: "প্রক্রিয়াকরণের পর আপনার পাসপোর্ট সংগ্রহ করুন",
      duration: "15-21 days (Regular)",
      durationBn: "১৫-২১ দিন (সাধারণ)",
      location: "Passport Office / Delivery",
      locationBn: "পাসপোর্ট অফিস / ডেলিভারি",
      commonMistakes: ["Not tracking application status", "Missing collection window"],
      commonMistakesBn: ["আবেদনের অবস্থা ট্র্যাক না করা", "সংগ্রহের সময় মিস করা"],
      icon: <Package className="h-5 w-5" />,
    },
  ],
  nid: [
    {
      id: "1",
      title: "Document Preparation",
      titleBn: "ডকুমেন্ট প্রস্তুতি",
      description: "Gather all required documents",
      descriptionBn: "সব প্রয়োজনীয় ডকুমেন্ট জোগাড় করুন",
      duration: "1-2 days",
      durationBn: "১-২ দিন",
      location: "Home",
      locationBn: "বাড়ি",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Visit Registration Office",
      titleBn: "রেজিস্ট্রেশন অফিসে যান",
      description: "Go to your local NID registration center",
      descriptionBn: "আপনার স্থানীয় NID রেজিস্ট্রেশন কেন্দ্রে যান",
      duration: "2-4 hours",
      durationBn: "২-৪ ঘন্টা",
      location: "NID Center",
      locationBn: "NID কেন্দ্র",
      commonMistakes: ["Going without appointment", "Missing documents"],
      commonMistakesBn: ["অ্যাপয়েন্টমেন্ট ছাড়া যাওয়া", "ডকুমেন্ট মিসিং"],
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Biometric Data Collection",
      titleBn: "বায়োমেট্রিক তথ্য সংগ্রহ",
      description: "Fingerprint and iris scan at the center",
      descriptionBn: "কেন্দ্রে আঙুলের ছাপ ও আইরিস স্ক্যান",
      duration: "30-60 minutes",
      durationBn: "৩০-৬০ মিনিট",
      location: "NID Center",
      locationBn: "NID কেন্দ্র",
      icon: <Fingerprint className="h-5 w-5" />,
    },
    {
      id: "4",
      title: "NID Card Delivery",
      titleBn: "NID কার্ড ডেলিভারি",
      description: "Receive your NID card",
      descriptionBn: "আপনার NID কার্ড গ্রহণ করুন",
      duration: "3-6 months",
      durationBn: "৩-৬ মাস",
      location: "Post/Center",
      locationBn: "পোস্ট/কেন্দ্র",
      icon: <Package className="h-5 w-5" />,
    },
  ],
};

const TimelineView: React.FC<TimelineViewProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const steps = timelineData[documentId] || timelineData["passport"];
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "ধাপে ধাপে টাইমলাইন" : "Step-by-Step Timeline"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">{documentTitle}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4 px-2">
          {steps.map((s, index) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  index === currentStep
                    ? "bg-[#F5CB5C] text-[#242423]"
                    : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-[#242423] text-[#CFDBD5]/50"
                }`}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${
                  index < currentStep ? "bg-green-500" : "bg-[#242423]"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current Step Card */}
        <div className="bg-[#242423] rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center text-[#F5CB5C]">
              {step.icon}
            </div>
            <div>
              <h4 className="text-[#E8EDDF] font-semibold">
                {language === "bn" ? step.titleBn : step.title}
              </h4>
              <p className="text-xs text-[#CFDBD5]/60">
                {language === "bn" ? `ধাপ ${currentStep + 1}/${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
              </p>
            </div>
          </div>

          <p className="text-sm text-[#CFDBD5]/80 mb-4">
            {language === "bn" ? step.descriptionBn : step.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2 bg-[#333533] px-3 py-1.5 rounded-lg">
              <Clock className="h-3.5 w-3.5 text-[#F5CB5C]" />
              <span className="text-xs text-[#CFDBD5]">
                {language === "bn" ? step.durationBn : step.duration}
              </span>
            </div>
            {step.location && (
              <div className="flex items-center gap-2 bg-[#333533] px-3 py-1.5 rounded-lg">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs text-[#CFDBD5]">
                  {language === "bn" ? step.locationBn : step.location}
                </span>
              </div>
            )}
          </div>

          {step.commonMistakes && step.commonMistakes.length > 0 && (
            <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-xs text-red-500 font-medium">
                  {language === "bn" ? "সাধারণ ভুল এড়িয়ে চলুন" : "Common Mistakes to Avoid"}
                </span>
              </div>
              <ul className="space-y-1">
                {(language === "bn" ? step.commonMistakesBn : step.commonMistakes)?.map((mistake, i) => (
                  <li key={i} className="text-xs text-red-400 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              currentStep === 0
                ? "bg-[#242423] text-[#CFDBD5]/30 cursor-not-allowed"
                : "bg-[#242423] text-[#CFDBD5] hover:bg-[#242423]/80 active:scale-95"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            {language === "bn" ? "আগের" : "Previous"}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              currentStep === steps.length - 1
                ? "bg-[#F5CB5C]/30 text-[#242423]/50 cursor-not-allowed"
                : "bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 active:scale-95"
            }`}
          >
            {language === "bn" ? "পরের" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineView;
