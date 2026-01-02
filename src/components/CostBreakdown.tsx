import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  DollarSign,
  Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CostItem {
  label: string;
  labelBn: string;
  amount: string;
  type: "official" | "optional" | "illegal";
  description?: string;
}

interface CostBreakdownProps {
  documentId: string;
  documentTitle: string;
}

const costData: Record<string, CostItem[]> = {
  nid: [
    { label: "New Issue Fee", labelBn: "নতুন ইস্যু ফি", amount: "Free", type: "official", description: "First-time NID is completely free" },
    { label: "Correction Fee (Regular)", labelBn: "সংশোধন ফি (সাধারণ)", amount: "৳230", type: "official" },
    { label: "Correction Fee (Urgent)", labelBn: "সংশোধন ফি (জরুরি)", amount: "৳345", type: "official" },
    { label: "Renewal Fee (Regular)", labelBn: "নবায়ন ফি (সাধারণ)", amount: "৳345", type: "official" },
    { label: "Photocopy & Form Fill", labelBn: "ফটোকপি ও ফর্ম পূরণ", amount: "৳20-50", type: "optional" },
    { label: "Broker/Dalal Fee", labelBn: "দালাল ফি", amount: "৳500-2,000", type: "illegal", description: "You do NOT need to pay this!" },
  ],
  passport: [
    { label: "48 Pages, 5 Years (Regular)", labelBn: "৪৮ পৃষ্ঠা, ৫ বছর (সাধারণ)", amount: "৳4,025", type: "official" },
    { label: "48 Pages, 5 Years (Express)", labelBn: "৪৮ পৃষ্ঠা, ৫ বছর (এক্সপ্রেস)", amount: "৳6,325", type: "official" },
    { label: "48 Pages, 10 Years (Regular)", labelBn: "৪৮ পৃষ্ঠা, ১০ বছর (সাধারণ)", amount: "৳5,750", type: "official" },
    { label: "48 Pages, 10 Years (Express)", labelBn: "৪৮ পৃষ্ঠা, ১০ বছর (এক্সপ্রেস)", amount: "৳8,050", type: "official" },
    { label: "Photo Service", labelBn: "ছবি তোলা", amount: "৳100-200", type: "optional" },
    { label: "Agent/Broker Fee", labelBn: "এজেন্ট/দালাল ফি", amount: "৳3,000-10,000", type: "illegal", description: "Apply yourself online - it's easy!" },
  ],
  "birth-certificate": [
    { label: "Within 45 Days", labelBn: "৪৫ দিনের মধ্যে", amount: "Free", type: "official" },
    { label: "45 Days - 5 Years", labelBn: "৪৫ দিন - ৫ বছর", amount: "৳25", type: "official" },
    { label: "Above 5 Years", labelBn: "৫ বছরের উপরে", amount: "৳50", type: "official" },
    { label: "Correction Fee", labelBn: "সংশোধন ফি", amount: "৳100", type: "official" },
    { label: "Middleman Fee", labelBn: "মধ্যস্থতাকারী ফি", amount: "৳200-500", type: "illegal", description: "Online application is simple - do it yourself!" },
  ],
  "driving-license": [
    { label: "Learner License (1 Category)", labelBn: "লার্নার লাইসেন্স (১ ক্যাটাগরি)", amount: "৳518", type: "official" },
    { label: "Smart Card License", labelBn: "স্মার্ট কার্ড লাইসেন্স", amount: "~৳2,542", type: "official" },
    { label: "Renewal Fee", labelBn: "নবায়ন ফি", amount: "৳2,500-4,500", type: "official" },
    { label: "Medical Certificate", labelBn: "মেডিকেল সার্টিফিকেট", amount: "৳200-500", type: "optional" },
    { label: "Driving School (Optional)", labelBn: "ড্রাইভিং স্কুল", amount: "৳3,000-8,000", type: "optional" },
    { label: "Agent Fee at BRTA", labelBn: "BRTA তে এজেন্ট ফি", amount: "৳2,000-5,000", type: "illegal", description: "You can apply online and visit BRTA yourself" },
  ],
};

const CostBreakdown: React.FC<CostBreakdownProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const costs = costData[documentId] || costData["nid"];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "official":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "optional":
        return <Info className="h-4 w-4 text-blue-400" />;
      case "illegal":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "official":
        return (
          <Badge className="bg-green-500/10 text-green-500 text-[10px] border-0">
            {language === "bn" ? "অফিসিয়াল" : "Official"}
          </Badge>
        );
      case "optional":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 text-[10px] border-0">
            {language === "bn" ? "ঐচ্ছিক" : "Optional"}
          </Badge>
        );
      case "illegal":
        return (
          <Badge className="bg-red-500/10 text-red-500 text-[10px] border-0">
            {language === "bn" ? "দেবেন না!" : "Don't Pay!"}
          </Badge>
        );
      default:
        return null;
    }
  };

  const officialCosts = costs.filter((c) => c.type === "official");
  const optionalCosts = costs.filter((c) => c.type === "optional");
  const illegalCosts = costs.filter((c) => c.type === "illegal");

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-[#F5CB5C]" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "খরচ বিশ্লেষণ" : "Cost Breakdown"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">{documentTitle}</p>
          </div>
        </div>

        {/* Official Costs */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500 font-medium">
              {language === "bn" ? "সরকারি ফি" : "Official Fees"}
            </span>
          </div>
          <div className="space-y-2">
            {officialCosts.map((cost, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#242423] rounded-xl">
                <span className="text-sm text-[#CFDBD5]">
                  {language === "bn" ? cost.labelBn : cost.label}
                </span>
                <span className="text-sm font-semibold text-[#F5CB5C]">{cost.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Costs */}
        {optionalCosts.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">
                {language === "bn" ? "ঐচ্ছিক খরচ" : "Optional Costs"}
              </span>
            </div>
            <div className="space-y-2">
              {optionalCosts.map((cost, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#242423] rounded-xl">
                  <span className="text-sm text-[#CFDBD5]">
                    {language === "bn" ? cost.labelBn : cost.label}
                  </span>
                  <span className="text-sm text-[#CFDBD5]/70">{cost.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Illegal/Hidden Costs Warning */}
        {illegalCosts.length > 0 && (
          <div className="mt-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500 font-semibold">
                {language === "bn" ? "এই টাকা দেবেন না!" : "Don't Pay These!"}
              </span>
            </div>
            <div className="space-y-2">
              {illegalCosts.map((cost, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-[#CFDBD5] line-through">
                      {language === "bn" ? cost.labelBn : cost.label}
                    </span>
                    {cost.description && (
                      <p className="text-xs text-red-400 mt-0.5">{cost.description}</p>
                    )}
                  </div>
                  <span className="text-sm text-red-500 line-through">{cost.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
