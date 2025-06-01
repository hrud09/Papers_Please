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
      estimatedTime: "7-15 days",
      officialFee: "৳50-200",
      popularity: "high",
      documents: ["Birth Certificate", "Passport Photo", "Address Proof"],
      steps: 4,
      color: "bg-blue-500",
    },
    {
      id: "passport",
      title: "Passport",
      titleBengali: "পাসপোর্ট",
      description: "Apply for new passport or renewal",
      icon: <FileText className="h-6 w-6" />,
      estimatedTime: "21-30 days",
      officialFee: "৳3,000-5,000",
      popularity: "high",
      documents: ["NID Card", "Birth Certificate", "Photos"],
      steps: 6,
      color: "bg-green-500",
    },
    {
      id: "birth-certificate",
      title: "Birth Certificate",
      titleBengali: "জন্ম নিবন্ধন",
      description: "Register birth or get certified copy",
      icon: <Users className="h-6 w-6" />,
      estimatedTime: "1-7 days",
      officialFee: "৳50-100",
      popularity: "high",
      documents: ["Hospital Certificate", "Parent's NID", "Affidavit"],
      steps: 3,
      color: "bg-purple-500",
    },
    {
      id: "marriage-certificate",
      title: "Marriage Certificate",
      titleBengali: "বিবাহ নিবন্ধন",
      description: "Register marriage and get certificate",
      icon: <Heart className="h-6 w-6" />,
      estimatedTime: "1-3 days",
      officialFee: "৳50-150",
      popularity: "medium",
      documents: ["Both NID Cards", "Photos", "Witnesses"],
      steps: 4,
      color: "bg-pink-500",
    },
    {
      id: "driving-license",
      title: "Driving License",
      titleBengali: "ড্রাইভিং লাইসেন্স",
      description: "Apply for new or renew driving license",
      icon: <Car className="h-6 w-6" />,
      estimatedTime: "15-30 days",
      officialFee: "৳1,000-2,000",
      popularity: "high",
      documents: ["NID Card", "Medical Certificate", "Photos"],
      steps: 5,
      color: "bg-orange-500",
    },
    {
      id: "education-certificate",
      title: "Education Certificate",
      titleBengali: "শিক্ষাগত সনদ",
      description: "Verify and authenticate educational documents",
      icon: <GraduationCap className="h-6 w-6" />,
      estimatedTime: "7-14 days",
      officialFee: "৳200-500",
      popularity: "medium",
      documents: ["Original Certificate", "NID Card", "Application"],
      steps: 3,
      color: "bg-indigo-500",
    },
    {
      id: "business-license",
      title: "Business License",
      titleBengali: "ব্যবসায়িক লাইসেন্স",
      description: "Register new business or renew license",
      icon: <Briefcase className="h-6 w-6" />,
      estimatedTime: "15-45 days",
      officialFee: "৳500-5,000",
      popularity: "medium",
      documents: ["NID Card", "Business Plan", "NOC"],
      steps: 7,
      color: "bg-teal-500",
    },
    {
      id: "land-records",
      title: "Land Records",
      titleBengali: "ভূমি রেকর্ড",
      description: "Get land ownership documents and records",
      icon: <Home className="h-6 w-6" />,
      estimatedTime: "7-21 days",
      officialFee: "৳100-1,000",
      popularity: "medium",
      documents: ["Previous Deed", "NID Card", "Survey Report"],
      steps: 5,
      color: "bg-yellow-500",
    },
    {
      id: "police-clearance",
      title: "Police Clearance",
      titleBengali: "পুলিশ ক্লিয়ারেন্স",
      description: "Get police verification certificate",
      icon: <Shield className="h-6 w-6" />,
      estimatedTime: "14-30 days",
      officialFee: "৳200-500",
      popularity: "low",
      documents: ["NID Card", "Passport", "Application"],
      steps: 4,
      color: "bg-red-500",
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
    <div className="w-full max-w-7xl mx-auto bg-white p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {t("category.title")}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t("category.description")}
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            {t("category.filter.all")}
          </Button>
          <Button
            variant={filter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("high")}
          >
            {t("category.filter.popular")}
          </Button>
          <Button
            variant={filter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("medium")}
          >
            {t("category.filter.common")}
          </Button>
          <Button
            variant={filter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("low")}
          >
            {t("category.filter.specialized")}
          </Button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              selectedCategory === category.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category.id);
              onCategorySelect(category.id);
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${category.color} text-white`}>
                  {category.icon}
                </div>
                <Badge
                  className={getPopularityBadge(category.popularity).color}
                >
                  {getPopularityBadge(category.popularity).text}
                </Badge>
              </div>
              <CardTitle className="text-lg">
                <div>
                  {category.title}
                  <div className="text-sm font-normal text-muted-foreground mt-1">
                    {category.titleBengali}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {t("category.processingTime")}
                  </span>
                  <span className="font-medium">{category.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {t("category.officialFee")}
                  </span>
                  <span className="font-medium">{category.officialFee}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    {t("category.stepsRequired")}
                  </span>
                  <span className="font-medium">
                    {category.steps} {t("category.steps")}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  {t("category.requiredDocuments")}
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.documents.slice(0, 2).map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                  {category.documents.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.documents.length - 2} {t("category.more")}
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                className="w-full mt-4"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/guide/${category.id}`);
                }}
              >
                {t("category.viewDetails")}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No documents found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filter to see more options.
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentCategoryGrid;
