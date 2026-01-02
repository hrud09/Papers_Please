import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CreditCard,
  Users,
  GraduationCap,
  Building,
  Car,
  Heart,
  Briefcase,
  Home,
  Shield,
  Clock,
  DollarSign,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentCategory {
  id: string;
  title: string;
  titleBengali: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  officialFee: string;
  popularity: "high" | "medium" | "low";
  documents: string[];
  steps: number;
  color: string;
  comingSoon?: boolean;
}

interface DocumentCategoryGridProps {
  onCategorySelect?: (categoryId: string) => void;
  categories?: DocumentCategory[];
}

const DocumentCategoryGrid = ({
  onCategorySelect = () => {},
  categories = [
    {
      id: "nid",
      title: "National ID Card",
      titleBengali: "জাতীয় পরিচয়পত্র",
      description: "Apply for new NID or update existing information",
      icon: <CreditCard className="h-6 w-6" />,
      estimatedTime: "3-6 months (New)",
      officialFee: "Free (New)",
      popularity: "high",
      documents: ["SSC/JSC Certificate", "Birth Certificate", "Parents' NID", "Utility Bill"],
      steps: 4,
      color: "bg-blue-500",
      comingSoon: false,
    },
    {
      id: "passport",
      title: "e-Passport",
      titleBengali: "ই-পাসপোর্ট",
      description: "Apply for new passport or renewal",
      icon: <FileText className="h-6 w-6" />,
      estimatedTime: "15-21 days",
      officialFee: "৳4,025+",
      popularity: "high",
      documents: ["NID/Birth Cert", "Previous Passport", "GO/NOC", "Proof of Profession"],
      steps: 6,
      color: "bg-green-500",
      comingSoon: false,
    },
    {
      id: "birth-certificate",
      title: "Birth Certificate",
      titleBengali: "জন্ম নিবন্ধন",
      description: "Register birth or get certified copy",
      icon: <Users className="h-6 w-6" />,
      estimatedTime: "1-7 days",
      officialFee: "Free-৳50",
      popularity: "high",
      documents: ["EPI/Vaccine Card", "Parents' NID", "Holding Tax Receipt"],
      steps: 3,
      color: "bg-purple-500",
      comingSoon: false,
    },
    {
      id: "marriage-certificate",
      title: "Marriage Certificate",
      titleBengali: "বিবাহ নিবন্ধন",
      description: "Register marriage and get certificate",
      icon: <Heart className="h-6 w-6" />,
      estimatedTime: "1-3 days",
      officialFee: "৳1,250+",
      popularity: "medium",
      documents: ["NID/Birth Cert (Both)", "2 Photos (Each)", "NID of Witnesses"],
      steps: 4,
      color: "bg-pink-500",
      comingSoon: false,
    },
    {
      id: "driving-license",
      title: "Driving License",
      titleBengali: "ড্রাইভিং লাইসেন্স",
      description: "Apply for new or renew driving license",
      icon: <Car className="h-6 w-6" />,
      estimatedTime: "30 days-6 months",
      officialFee: "৳518-৳4,500",
      popularity: "high",
      documents: ["Learner License", "Medical Certificate", "NID", "Education Cert"],
      steps: 5,
      color: "bg-orange-500",
      comingSoon: false,
    },
    {
      id: "education-certificate",
      title: "Education Certificate",
      titleBengali: "শিক্ষাগত সনদ",
      description: "Verify and authenticate educational documents",
      icon: <GraduationCap className="h-6 w-6" />,
      estimatedTime: "7-15 days",
      officialFee: "৳50-৳1,500",
      popularity: "medium",
      documents: ["Registration Card", "Admit Card", "Certificate Copy"],
      steps: 3,
      color: "bg-indigo-500",
      comingSoon: false,
    },
    {
      id: "business-license",
      title: "Business License",
      titleBengali: "ব্যবসায়িক লাইসেন্স",
      description: "Register new business or renew license",
      icon: <Briefcase className="h-6 w-6" />,
      estimatedTime: "3-7 days",
      officialFee: "৳500-৳50,000",
      popularity: "medium",
      documents: ["Shop Rent Agreement", "Holding Tax Receipt", "Owner's NID"],
      steps: 5,
      color: "bg-teal-500",
      comingSoon: false,
    },
    {
      id: "land-records",
      title: "Land Records",
      titleBengali: "ভূমি রেকর্ড",
      description: "Get land ownership documents and records",
      icon: <Home className="h-6 w-6" />,
      estimatedTime: "28-45 days",
      officialFee: "৳100-৳1,170",
      popularity: "medium",
      documents: ["Main Deed (Dalil)", "Warish Certificate", "Land Tax Receipt"],
      steps: 5,
      color: "bg-yellow-500",
      comingSoon: false,
    },
    {
      id: "police-clearance",
      title: "Police Clearance",
      titleBengali: "পুলিশ ক্লিয়ারেন্স",
      description: "Get police verification certificate",
      icon: <Shield className="h-6 w-6" />,
      estimatedTime: "7-14 days",
      officialFee: "৳500",
      popularity: "low",
      documents: ["Valid Passport", "Treasury Challan", "NID", "Chairman Cert"],
      steps: 4,
      color: "bg-red-500",
      comingSoon: false,
    },
  ],
}: DocumentCategoryGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all",
  );
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredCategories =
    filter === "all"
      ? categories
      : categories.filter((cat) => cat.popularity === filter);

  const getPopularityBadge = (popularity: string) => {
    switch (popularity) {
      case "high":
        return {
          variant: "default" as const,
          text: "Popular",
          color: "bg-green-100 text-green-800",
        };
      case "medium":
        return {
          variant: "secondary" as const,
          text: "Common",
          color: "bg-blue-100 text-blue-800",
        };
      case "low":
        return {
          variant: "outline" as const,
          text: "Specialized",
          color: "bg-gray-100 text-gray-800",
        };
      default:
        return {
          variant: "outline" as const,
          text: "Unknown",
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 whitespace-nowrap transition-all ${
            filter === "all"
              ? "bg-[#F5CB5C] text-[#242423]"
              : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
          }`}
        >
          {t("category.filter.all")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilter("high")}
          className={`rounded-full px-4 whitespace-nowrap transition-all ${
            filter === "high"
              ? "bg-[#F5CB5C] text-[#242423]"
              : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
          }`}
        >
          {t("category.filter.popular")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilter("medium")}
          className={`rounded-full px-4 whitespace-nowrap transition-all ${
            filter === "medium"
              ? "bg-[#F5CB5C] text-[#242423]"
              : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
          }`}
        >
          {t("category.filter.common")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilter("low")}
          className={`rounded-full px-4 whitespace-nowrap transition-all ${
            filter === "low"
              ? "bg-[#F5CB5C] text-[#242423]"
              : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
          }`}
        >
          {t("category.filter.specialized")}
        </Button>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className={`bg-[#333533] border-0 rounded-2xl transition-all duration-300 ${
              category.comingSoon 
                ? "opacity-60 cursor-not-allowed" 
                : "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            } ${selectedCategory === category.id ? "ring-2 ring-[#F5CB5C]" : ""}`}
            onClick={() => {
              if (!category.comingSoon) {
                setSelectedCategory(category.id);
                onCategorySelect(category.id);
              }
            }}
          >
            <CardContent className="p-4 relative">
              {category.comingSoon && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#242423] px-2 py-1 rounded-lg">
                  <Lock className="h-3 w-3 text-[#F5CB5C]" />
                  <span className="text-[10px] text-[#F5CB5C] font-medium">{t("common.comingSoon")}</span>
                </div>
              )}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-3 rounded-xl ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#E8EDDF] font-semibold truncate">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#CFDBD5]/60">
                    {category.titleBengali}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#F5CB5C]" />
                  <span className="text-sm text-[#CFDBD5]">{category.estimatedTime}</span>
                </div>
                <span className="text-[#F5CB5C] font-bold">{category.officialFee}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {category.documents.slice(0, 2).map((doc, index) => (
                    <span
                      key={index}
                      className="text-xs bg-[#242423] text-[#CFDBD5]/80 px-2 py-1 rounded-lg"
                    >
                      {doc.length > 10 ? doc.substring(0, 10) + "..." : doc}
                    </span>
                  ))}
                </div>
                {category.comingSoon ? (
                  <Lock className="h-5 w-5 text-[#CFDBD5]/40" />
                ) : (
                  <ArrowRight className="h-5 w-5 text-[#F5CB5C]" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-[#CFDBD5]/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#CFDBD5]/60 mb-2">
            No documents found
          </h3>
          <p className="text-sm text-[#CFDBD5]/40">
            Try adjusting your filter to see more options.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentCategoryGrid;
