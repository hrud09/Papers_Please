import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VerifiedLink {
  id: string;
  name: string;
  nameBn: string;
  url: string;
  description: string;
  descriptionBn: string;
  lastVerified: string;
  isOfficial: boolean;
}

const verifiedLinks: VerifiedLink[] = [
  {
    id: "1",
    name: "e-Passport Portal",
    nameBn: "ই-পাসপোর্ট পোর্টাল",
    url: "https://epassport.gov.bd",
    description: "Official passport application portal",
    descriptionBn: "অফিসিয়াল পাসপোর্ট আবেদন পোর্টাল",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
  {
    id: "2",
    name: "Birth Registration (BDRIS)",
    nameBn: "জন্ম নিবন্ধন (BDRIS)",
    url: "https://bdris.gov.bd",
    description: "Online birth certificate registration",
    descriptionBn: "অনলাইন জন্ম সনদ নিবন্ধন",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
  {
    id: "3",
    name: "NID Services",
    nameBn: "NID সেবা",
    url: "https://services.nidw.gov.bd",
    description: "National ID card services portal",
    descriptionBn: "জাতীয় পরিচয়পত্র সেবা পোর্টাল",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
  {
    id: "4",
    name: "BRTA Portal",
    nameBn: "BRTA পোর্টাল",
    url: "https://brta.gov.bd",
    description: "Driving license and vehicle registration",
    descriptionBn: "ড্রাইভিং লাইসেন্স ও গাড়ি নিবন্ধন",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
  {
    id: "5",
    name: "Land Records (e-Porcha)",
    nameBn: "ভূমি রেকর্ড (ই-পর্চা)",
    url: "https://eporcha.gov.bd",
    description: "Digital land records system",
    descriptionBn: "ডিজিটাল ভূমি রেকর্ড সিস্টেম",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
  {
    id: "6",
    name: "Police Clearance",
    nameBn: "পুলিশ ক্লিয়ারেন্স",
    url: "https://pcc.police.gov.bd",
    description: "Police clearance certificate application",
    descriptionBn: "পুলিশ ক্লিয়ারেন্স সার্টিফিকেট আবেদন",
    lastVerified: "2024-01-15",
    isOfficial: true,
  },
];

const VerifiedLinks = () => {
  const { language } = useLanguage();

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "যাচাইকৃত লিংক" : "Verified Official Links"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">
              {language === "bn" ? "শুধুমাত্র সরকারি সাইট" : "Government websites only"}
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-orange-500/10 rounded-xl p-3 mb-4 border border-orange-500/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-400">
              {language === "bn"
                ? "সতর্কতা: শুধুমাত্র .gov.bd ডোমেইনে আবেদন করুন। অন্য কোনো সাইটে ব্যক্তিগত তথ্য দেবেন না।"
                : "Warning: Only apply on .gov.bd domains. Never share personal info on other sites."}
            </p>
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-2">
          {verifiedLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#242423] rounded-xl hover:bg-[#242423]/80 transition-all group"
            >
              <div className="w-10 h-10 bg-[#333533] rounded-xl flex items-center justify-center">
                <Globe className="h-5 w-5 text-[#F5CB5C]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#E8EDDF] font-medium text-sm truncate">
                    {language === "bn" ? link.nameBn : link.name}
                  </h4>
                  {link.isOfficial && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-[#CFDBD5]/50 truncate">
                  {language === "bn" ? link.descriptionBn : link.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-[#CFDBD5]/30 group-hover:text-[#F5CB5C] transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>

        <p className="text-[10px] text-[#CFDBD5]/40 text-center mt-4">
          {language === "bn"
            ? "সর্বশেষ যাচাই: জানুয়ারি ২০২৪"
            : "Last verified: January 2024"}
        </p>
      </CardContent>
    </Card>
  );
};

export default VerifiedLinks;
