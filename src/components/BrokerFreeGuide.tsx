import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BrokerFreeGuideProps {
  documentId: string;
  documentTitle: string;
}

interface GuideData {
  difficulty: "easy" | "medium" | "hard";
  canDoYourself: string[];
  canDoYourselfBn: string[];
  needsHelp?: string[];
  needsHelpBn?: string[];
  tips: string[];
  tipsBn: string[];
  commonScams: string[];
  commonScamsBn: string[];
}

const guideData: Record<string, GuideData> = {
  nid: {
    difficulty: "easy",
    canDoYourself: [
      "You have all required documents",
      "You can visit the NID center during office hours",
      "You are applying for the first time (it's FREE!)",
    ],
    canDoYourselfBn: [
      "আপনার কাছে সব প্রয়োজনীয় ডকুমেন্ট আছে",
      "আপনি অফিস সময়ে NID কেন্দ্রে যেতে পারেন",
      "আপনি প্রথমবার আবেদন করছেন (এটা বিনামূল্যে!)",
    ],
    tips: [
      "New NID is completely FREE - don't pay anyone",
      "Go early morning to avoid long queues",
      "Bring original documents + photocopies",
      "Keep a photo of your token/slip",
    ],
    tipsBn: [
      "নতুন NID সম্পূর্ণ বিনামূল্যে - কাউকে টাকা দেবেন না",
      "লম্বা লাইন এড়াতে সকাল সকাল যান",
      "মূল ডকুমেন্ট + ফটোকপি নিয়ে যান",
      "টোকেন/স্লিপের ছবি রাখুন",
    ],
    commonScams: [
      "Charging ৳500-2000 for 'processing'",
      "Claiming they can speed up the process",
      "Demanding money for form filling",
    ],
    commonScamsBn: [
      "'প্রসেসিং' এর জন্য ৳৫০০-২০০০ নেওয়া",
      "প্রক্রিয়া দ্রুত করতে পারে বলে দাবি করা",
      "ফর্ম পূরণের জন্য টাকা চাওয়া",
    ],
  },
  passport: {
    difficulty: "medium",
    canDoYourself: [
      "You can fill online forms in English",
      "You have a bank account for payment",
      "You can attend the appointment personally",
    ],
    canDoYourselfBn: [
      "আপনি ইংরেজিতে অনলাইন ফর্ম পূরণ করতে পারেন",
      "পেমেন্টের জন্য আপনার ব্যাংক একাউন্ট আছে",
      "আপনি ব্যক্তিগতভাবে অ্যাপয়েন্টমেন্টে যেতে পারেন",
    ],
    tips: [
      "Apply online at epassport.gov.bd - it's simple",
      "Book appointment as early as possible",
      "Arrive 30 mins before your slot",
      "Track status using your application ID",
    ],
    tipsBn: [
      "epassport.gov.bd এ অনলাইনে আবেদন করুন - সহজ",
      "যত তাড়াতাড়ি সম্ভব অ্যাপয়েন্টমেন্ট বুক করুন",
      "আপনার স্লটের ৩০ মিনিট আগে পৌঁছান",
      "আবেদন আইডি দিয়ে স্ট্যাটাস ট্র্যাক করুন",
    ],
    commonScams: [
      "Charging ৳3000-10000 for 'fast processing'",
      "Fake websites claiming to be official",
      "Taking money to 'book appointments'",
    ],
    commonScamsBn: [
      "'দ্রুত প্রসেসিং' এর জন্য ৳৩০০০-১০০০০ নেওয়া",
      "অফিসিয়াল দাবি করা ভুয়া ওয়েবসাইট",
      "'অ্যাপয়েন্টমেন্ট বুক' করতে টাকা নেওয়া",
    ],
  },
  "birth-certificate": {
    difficulty: "easy",
    canDoYourself: [
      "You have internet access",
      "You have parents' NID numbers",
      "You can visit Union Parishad/City Corporation",
    ],
    canDoYourselfBn: [
      "আপনার ইন্টারনেট অ্যাক্সেস আছে",
      "আপনার কাছে বাবা-মায়ের NID নম্বর আছে",
      "আপনি ইউনিয়ন পরিষদ/সিটি কর্পোরেশনে যেতে পারেন",
    ],
    tips: [
      "Apply online at bdris.gov.bd",
      "Registration within 45 days is FREE",
      "Download certificate directly from website",
      "Keep the registration number safe",
    ],
    tipsBn: [
      "bdris.gov.bd এ অনলাইনে আবেদন করুন",
      "৪৫ দিনের মধ্যে রেজিস্ট্রেশন বিনামূল্যে",
      "সরাসরি ওয়েবসাইট থেকে সার্টিফিকেট ডাউনলোড করুন",
      "রেজিস্ট্রেশন নম্বর নিরাপদে রাখুন",
    ],
    commonScams: [
      "Charging for free registration",
      "Offering to 'speed up' the process",
      "Demanding money for online application",
    ],
    commonScamsBn: [
      "বিনামূল্যে রেজিস্ট্রেশনের জন্য টাকা নেওয়া",
      "প্রক্রিয়া 'দ্রুত' করার প্রস্তাব দেওয়া",
      "অনলাইন আবেদনের জন্য টাকা চাওয়া",
    ],
  },
  "driving-license": {
    difficulty: "medium",
    canDoYourself: [
      "You can drive confidently",
      "You have time to practice for tests",
      "You can visit BRTA office",
    ],
    canDoYourselfBn: [
      "আপনি আত্মবিশ্বাসের সাথে গাড়ি চালাতে পারেন",
      "পরীক্ষার জন্য অনুশীলনের সময় আছে",
      "আপনি BRTA অফিসে যেতে পারেন",
    ],
    needsHelp: [
      "You're a beginner driver",
      "You need driving lessons",
    ],
    needsHelpBn: [
      "আপনি একজন নতুন ড্রাইভার",
      "আপনার ড্রাইভিং লেসন দরকার",
    ],
    tips: [
      "Get learner license first - it's online",
      "Practice for at least 30 days",
      "Learn parallel parking well",
      "Medical certificate must be from registered doctor",
    ],
    tipsBn: [
      "প্রথমে লার্নার লাইসেন্স নিন - অনলাইনে হয়",
      "কমপক্ষে ৩০ দিন অনুশীলন করুন",
      "প্যারালাল পার্কিং ভালোভাবে শিখুন",
      "মেডিকেল সার্টিফিকেট রেজিস্টার্ড ডাক্তার থেকে হতে হবে",
    ],
    commonScams: [
      "Guaranteeing pass in driving test",
      "Charging extra at BRTA office",
      "Fake driving schools",
    ],
    commonScamsBn: [
      "ড্রাইভিং টেস্টে পাস নিশ্চিত করার প্রতিশ্রুতি",
      "BRTA অফিসে অতিরিক্ত টাকা নেওয়া",
      "ভুয়া ড্রাইভিং স্কুল",
    ],
  },
};

const BrokerFreeGuide: React.FC<BrokerFreeGuideProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const guide = guideData[documentId] || guideData["nid"];

  const getDifficultyBadge = () => {
    switch (guide.difficulty) {
      case "easy":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-0">
            <Zap className="h-3 w-3 mr-1" />
            {language === "bn" ? "সহজ" : "Easy"}
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-0">
            <Zap className="h-3 w-3 mr-1" />
            {language === "bn" ? "মাঝারি" : "Medium"}
          </Badge>
        );
      case "hard":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-0">
            <Zap className="h-3 w-3 mr-1" />
            {language === "bn" ? "কঠিন" : "Hard"}
          </Badge>
        );
    }
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-[#F5CB5C]" />
            </div>
            <div>
              <h3 className="text-[#E8EDDF] font-semibold">
                {language === "bn" ? "দালাল ছাড়া করুন" : "Do It Without Broker"}
              </h3>
              <p className="text-xs text-[#CFDBD5]/60">{documentTitle}</p>
            </div>
          </div>
          {getDifficultyBadge()}
        </div>

        {/* You CAN do it yourself if... */}
        <div className="bg-green-500/10 rounded-xl p-4 mb-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500 font-medium">
              {language === "bn" ? "নিজে করতে পারবেন যদি..." : "You CAN do it yourself if..."}
            </span>
          </div>
          <ul className="space-y-2">
            {(language === "bn" ? guide.canDoYourselfBn : guide.canDoYourself).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-400">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-[#242423] rounded-xl p-4 mb-4">
          <h4 className="text-sm text-[#E8EDDF] font-medium mb-3">
            {language === "bn" ? "💡 সফলতার টিপস" : "💡 Tips for Success"}
          </h4>
          <ul className="space-y-2">
            {(language === "bn" ? guide.tipsBn : guide.tips).map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#CFDBD5]/80">
                <span className="text-[#F5CB5C]">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Scam Warning */}
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-500 font-semibold">
              {language === "bn" ? "⚠️ এই প্রতারণা এড়িয়ে চলুন" : "⚠️ Avoid These Scams"}
            </span>
          </div>
          <ul className="space-y-2">
            {(language === "bn" ? guide.commonScamsBn : guide.commonScams).map((scam, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-400">
                <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {scam}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerFreeGuide;
