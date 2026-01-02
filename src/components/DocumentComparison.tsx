import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Scale,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComparisonItem {
  id: string;
  name: string;
  nameBn: string;
  cost: string;
  validity: string;
  validityBn: string;
  processingTime: string;
  processingTimeBn: string;
  pros: string[];
  prosBn: string[];
  cons: string[];
  consBn: string[];
  bestFor: string;
  bestForBn: string;
}

interface ComparisonCategory {
  id: string;
  title: string;
  titleBn: string;
  items: ComparisonItem[];
}

const comparisons: ComparisonCategory[] = [
  {
    id: "passport",
    title: "Passport Types",
    titleBn: "পাসপোর্টের ধরন",
    items: [
      {
        id: "epassport-5",
        name: "e-Passport (5 Years)",
        nameBn: "ই-পাসপোর্ট (৫ বছর)",
        cost: "৳4,025 - ৳6,325",
        validity: "5 Years",
        validityBn: "৫ বছর",
        processingTime: "15-21 days",
        processingTimeBn: "১৫-২১ দিন",
        pros: ["Lower cost", "Good for occasional travelers", "Faster processing"],
        prosBn: ["কম খরচ", "মাঝে মাঝে ভ্রমণকারীদের জন্য ভালো", "দ্রুত প্রসেসিং"],
        cons: ["Need to renew sooner", "48 pages may fill up"],
        consBn: ["শীঘ্রই নবায়ন করতে হবে", "৪৮ পৃষ্ঠা শেষ হতে পারে"],
        bestFor: "First-time travelers, students",
        bestForBn: "প্রথমবার ভ্রমণকারী, শিক্ষার্থী",
      },
      {
        id: "epassport-10",
        name: "e-Passport (10 Years)",
        nameBn: "ই-পাসপোর্ট (১০ বছর)",
        cost: "৳5,750 - ৳10,350",
        validity: "10 Years",
        validityBn: "১০ বছর",
        processingTime: "15-21 days",
        processingTimeBn: "১৫-২১ দিন",
        pros: ["Long validity", "Better value over time", "64 page option available"],
        prosBn: ["দীর্ঘ মেয়াদ", "সময়ের সাথে ভালো মূল্য", "৬৪ পৃষ্ঠার অপশন আছে"],
        cons: ["Higher upfront cost", "Photo ages over time"],
        consBn: ["প্রাথমিক খরচ বেশি", "সময়ের সাথে ছবি পুরনো হয়"],
        bestFor: "Frequent travelers, professionals",
        bestForBn: "ঘন ঘন ভ্রমণকারী, পেশাদার",
      },
    ],
  },
  {
    id: "nid",
    title: "NID Types",
    titleBn: "NID এর ধরন",
    items: [
      {
        id: "smart-nid",
        name: "Smart NID Card",
        nameBn: "স্মার্ট NID কার্ড",
        cost: "Free (New)",
        validity: "15 Years",
        validityBn: "১৫ বছর",
        processingTime: "3-6 months",
        processingTimeBn: "৩-৬ মাস",
        pros: ["Chip-enabled", "More secure", "Digital verification", "Accepted everywhere"],
        prosBn: ["চিপ যুক্ত", "বেশি নিরাপদ", "ডিজিটাল ভেরিফিকেশন", "সব জায়গায় গ্রহণযোগ্য"],
        cons: ["Longer processing time", "Need biometric enrollment"],
        consBn: ["প্রসেসিং সময় বেশি", "বায়োমেট্রিক এনরোলমেন্ট দরকার"],
        bestFor: "Everyone (recommended)",
        bestForBn: "সবার জন্য (সুপারিশকৃত)",
      },
      {
        id: "old-nid",
        name: "Old Laminated NID",
        nameBn: "পুরনো লেমিনেটেড NID",
        cost: "N/A",
        validity: "N/A",
        validityBn: "প্রযোজ্য নয়",
        processingTime: "N/A",
        processingTimeBn: "প্রযোজ্য নয়",
        pros: ["Still valid for some services"],
        prosBn: ["কিছু সেবায় এখনও গ্রহণযোগ্য"],
        cons: ["Being phased out", "No chip security", "May not be accepted soon"],
        consBn: ["বাতিল হচ্ছে", "চিপ সিকিউরিটি নেই", "শীঘ্রই গ্রহণ নাও হতে পারে"],
        bestFor: "Upgrade to Smart NID recommended",
        bestForBn: "স্মার্ট NID তে আপগ্রেড করুন",
      },
    ],
  },
];

const DocumentComparison = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(comparisons[0].id);

  const category = comparisons.find((c) => c.id === selectedCategory) || comparisons[0];

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <Scale className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "ডকুমেন্ট তুলনা" : "Document Comparison"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">
              {language === "bn" ? "কোনটা আপনার জন্য ভালো?" : "Which one is right for you?"}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {comparisons.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#F5CB5C] text-[#242423]"
                  : "bg-[#242423] text-[#CFDBD5] hover:bg-[#242423]/80"
              }`}
            >
              {language === "bn" ? cat.titleBn : cat.title}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className="space-y-4">
          {category.items.map((item, index) => (
            <div key={item.id} className="bg-[#242423] rounded-xl p-4">
              <h4 className="text-[#E8EDDF] font-semibold mb-3">
                {language === "bn" ? item.nameBn : item.name}
              </h4>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-[#333533] rounded-lg p-2 text-center">
                  <DollarSign className="h-4 w-4 text-[#F5CB5C] mx-auto mb-1" />
                  <p className="text-xs text-[#CFDBD5]/60">
                    {language === "bn" ? "খরচ" : "Cost"}
                  </p>
                  <p className="text-sm text-[#F5CB5C] font-medium">{item.cost}</p>
                </div>
                <div className="bg-[#333533] rounded-lg p-2 text-center">
                  <Calendar className="h-4 w-4 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-[#CFDBD5]/60">
                    {language === "bn" ? "মেয়াদ" : "Validity"}
                  </p>
                  <p className="text-sm text-green-500 font-medium">
                    {language === "bn" ? item.validityBn : item.validity}
                  </p>
                </div>
                <div className="bg-[#333533] rounded-lg p-2 text-center">
                  <Clock className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-[#CFDBD5]/60">
                    {language === "bn" ? "সময়" : "Time"}
                  </p>
                  <p className="text-sm text-blue-400 font-medium">
                    {language === "bn" ? item.processingTimeBn : item.processingTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-green-500 font-medium mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {language === "bn" ? "সুবিধা" : "Pros"}
                  </p>
                  <ul className="space-y-1">
                    {(language === "bn" ? item.prosBn : item.pros).map((pro, i) => (
                      <li key={i} className="text-xs text-[#CFDBD5]/70 flex items-start gap-1">
                        <span className="text-green-500">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-red-500 font-medium mb-1.5 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {language === "bn" ? "অসুবিধা" : "Cons"}
                  </p>
                  <ul className="space-y-1">
                    {(language === "bn" ? item.consBn : item.cons).map((con, i) => (
                      <li key={i} className="text-xs text-[#CFDBD5]/70 flex items-start gap-1">
                        <span className="text-red-500">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#F5CB5C]/10 rounded-lg p-2 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-[#F5CB5C]" />
                <span className="text-xs text-[#F5CB5C]">
                  <span className="font-medium">{language === "bn" ? "সেরা: " : "Best for: "}</span>
                  {language === "bn" ? item.bestForBn : item.bestFor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentComparison;
