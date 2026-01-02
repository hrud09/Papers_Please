import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  XCircle,
  Camera,
  FileText,
  MapPin,
  Fingerprint,
  PenLine,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RejectionReason {
  id: string;
  reason: string;
  reasonBn: string;
  solution: string;
  solutionBn: string;
  icon: React.ReactNode;
  frequency: "very-common" | "common" | "occasional";
}

interface RejectionReasonsProps {
  documentId: string;
  documentTitle: string;
}

const rejectionData: Record<string, RejectionReason[]> = {
  passport: [
    {
      id: "1",
      reason: "Photo doesn't meet requirements",
      reasonBn: "ছবি প্রয়োজনীয়তা পূরণ করছে না",
      solution: "Use white background, proper size (35x45mm), recent photo with proper lighting",
      solutionBn: "সাদা ব্যাকগ্রাউন্ড, সঠিক সাইজ (৩৫x৪৫মিমি), সাম্প্রতিক ছবি সঠিক আলোতে",
      icon: <Camera className="h-4 w-4" />,
      frequency: "very-common",
    },
    {
      id: "2",
      reason: "Name spelling mismatch with NID",
      reasonBn: "NID এর সাথে নামের বানান মিলছে না",
      solution: "Ensure exact same spelling as NID. If different, correct NID first",
      solutionBn: "NID এর মতো একই বানান নিশ্চিত করুন। ভিন্ন হলে আগে NID সংশোধন করুন",
      icon: <PenLine className="h-4 w-4" />,
      frequency: "very-common",
    },
    {
      id: "3",
      reason: "Incomplete online form",
      reasonBn: "অসম্পূর্ণ অনলাইন ফর্ম",
      solution: "Fill all mandatory fields correctly, review before submission",
      solutionBn: "সব বাধ্যতামূলক ফিল্ড সঠিকভাবে পূরণ করুন, জমা দেওয়ার আগে রিভিউ করুন",
      icon: <FileText className="h-4 w-4" />,
      frequency: "common",
    },
    {
      id: "4",
      reason: "Wrong address format",
      reasonBn: "ভুল ঠিকানা ফরম্যাট",
      solution: "Use format: House, Road, Area, Thana, District with utility bill proof",
      solutionBn: "ফরম্যাট ব্যবহার করুন: বাড়ি, রাস্তা, এলাকা, থানা, জেলা ইউটিলিটি বিলের প্রমাণসহ",
      icon: <MapPin className="h-4 w-4" />,
      frequency: "common",
    },
  ],
  nid: [
    {
      id: "1",
      reason: "Birth certificate information mismatch",
      reasonBn: "জন্ম সনদের তথ্যের অমিল",
      solution: "Ensure all information matches exactly with online birth certificate",
      solutionBn: "অনলাইন জন্ম সনদের সাথে সব তথ্য হুবহু মিলছে কিনা নিশ্চিত করুন",
      icon: <FileText className="h-4 w-4" />,
      frequency: "very-common",
    },
    {
      id: "2",
      reason: "Unclear fingerprints",
      reasonBn: "অস্পষ্ট আঙুলের ছাপ",
      solution: "Keep hands clean and dry, avoid cuts or injuries before enrollment",
      solutionBn: "হাত পরিষ্কার ও শুকনো রাখুন, এনরোলমেন্টের আগে কাটা বা আঘাত এড়িয়ে চলুন",
      icon: <Fingerprint className="h-4 w-4" />,
      frequency: "common",
    },
    {
      id: "3",
      reason: "Missing parents' NID",
      reasonBn: "বাবা-মায়ের NID নেই",
      solution: "Both parents' NID photocopies required. If deceased, provide death certificate",
      solutionBn: "দুই জনের NID ফটোকপি প্রয়োজন। মৃত হলে মৃত্যু সনদ দিন",
      icon: <FileText className="h-4 w-4" />,
      frequency: "common",
    },
  ],
  "driving-license": [
    {
      id: "1",
      reason: "Failed driving test",
      reasonBn: "ড্রাইভিং টেস্টে ব্যর্থ",
      solution: "Practice more, especially parallel parking and lane discipline",
      solutionBn: "আরো অনুশীলন করুন, বিশেষ করে প্যারালাল পার্কিং ও লেন শৃঙ্খলা",
      icon: <XCircle className="h-4 w-4" />,
      frequency: "very-common",
    },
    {
      id: "2",
      reason: "Medical certificate issues",
      reasonBn: "মেডিকেল সার্টিফিকেটে সমস্যা",
      solution: "Get certificate from registered doctor with proper eye test results",
      solutionBn: "রেজিস্টার্ড ডাক্তার থেকে সঠিক চোখের পরীক্ষার ফলাফলসহ সার্টিফিকেট নিন",
      icon: <FileText className="h-4 w-4" />,
      frequency: "common",
    },
    {
      id: "3",
      reason: "Education certificate below Class 8",
      reasonBn: "শিক্ষাগত সনদ ৮ম শ্রেণীর নিচে",
      solution: "Minimum Class 8 certificate required for all license categories",
      solutionBn: "সব লাইসেন্স ক্যাটাগরির জন্য সর্বনিম্ন ৮ম শ্রেণীর সার্টিফিকেট প্রয়োজন",
      icon: <FileText className="h-4 w-4" />,
      frequency: "occasional",
    },
  ],
};

const RejectionReasons: React.FC<RejectionReasonsProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const reasons = rejectionData[documentId] || rejectionData["passport"];

  const getFrequencyBadge = (frequency: string) => {
    switch (frequency) {
      case "very-common":
        return (
          <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full">
            {language === "bn" ? "খুব সাধারণ" : "Very Common"}
          </span>
        );
      case "common":
        return (
          <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded-full">
            {language === "bn" ? "সাধারণ" : "Common"}
          </span>
        );
      case "occasional":
        return (
          <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
            {language === "bn" ? "মাঝে মাঝে" : "Occasional"}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "প্রত্যাখ্যানের কারণ" : "Common Rejection Reasons"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">{documentTitle}</p>
          </div>
        </div>

        <div className="space-y-3">
          {reasons.map((reason) => (
            <div key={reason.id} className="bg-[#242423] rounded-xl p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                  {reason.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-[#E8EDDF] font-medium text-sm">
                      {language === "bn" ? reason.reasonBn : reason.reason}
                    </h4>
                    {getFrequencyBadge(reason.frequency)}
                  </div>
                </div>
              </div>
              <div className="ml-11 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs text-green-400">
                  <span className="font-medium">
                    {language === "bn" ? "সমাধান: " : "Solution: "}
                  </span>
                  {language === "bn" ? reason.solutionBn : reason.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RejectionReasons;
