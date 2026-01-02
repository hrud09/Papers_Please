import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Download,
  Printer,
  Trash2,
  Edit,
  Plus,
  CreditCard,
  Car,
  Plane,
  GraduationCap,
  Briefcase,
  File,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SavedDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  category: "personal" | "education" | "work" | "government";
}

interface GovernmentDoc {
  id: string;
  type: string;
  number: string;
  issueDate: string;
  expiryDate?: string;
  status: "active" | "expired" | "pending";
  icon: React.ReactNode;
}

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([
    {
      id: "1",
      name: "Resume_2024.pdf",
      type: "PDF",
      uploadDate: "2024-01-15",
      size: "245 KB",
      category: "work",
    },
    {
      id: "2",
      name: "NID_Scan.pdf",
      type: "PDF",
      uploadDate: "2024-01-10",
      size: "1.2 MB",
      category: "government",
    },
    {
      id: "3",
      name: "BSc_Certificate.pdf",
      type: "PDF",
      uploadDate: "2024-01-08",
      size: "890 KB",
      category: "education",
    },
    {
      id: "4",
      name: "Offer_Letter_ABC.pdf",
      type: "PDF",
      uploadDate: "2024-01-05",
      size: "320 KB",
      category: "work",
    },
  ]);

  const [governmentDocs] = useState<GovernmentDoc[]>([
    {
      id: "1",
      type: "National ID",
      number: "1234 5678 9012",
      issueDate: "2020-03-15",
      status: "active",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "2",
      type: "Passport",
      number: "AB1234567",
      issueDate: "2022-06-20",
      expiryDate: "2032-06-19",
      status: "active",
      icon: <Plane className="h-5 w-5" />,
    },
    {
      id: "3",
      type: "Driving License",
      number: "DL-2023-45678",
      issueDate: "2023-01-10",
      expiryDate: "2028-01-09",
      status: "active",
      icon: <Car className="h-5 w-5" />,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { t } = useLanguage();

  const categories = [
    { id: "all", labelKey: "profile.filterAll", color: "bg-[#F5CB5C]" },
    { id: "government", labelKey: "profile.filterGovernment", color: "bg-green-500" },
    { id: "education", labelKey: "profile.filterEducation", color: "bg-blue-500" },
    { id: "work", labelKey: "profile.filterWork", color: "bg-purple-500" },
    { id: "personal", labelKey: "profile.filterPersonal", color: "bg-orange-500" },
  ];

  const filteredDocuments =
    selectedCategory === "all"
      ? savedDocuments
      : savedDocuments.filter((doc) => doc.category === selectedCategory);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDoc: SavedDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.includes("pdf") ? "PDF" : "Document",
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(file.size / 1024).toFixed(0)} KB`,
        category: "personal",
      };
      setSavedDocuments([newDoc, ...savedDocuments]);
    }
  };

  const handleDelete = (id: string) => {
    setSavedDocuments(savedDocuments.filter((doc) => doc.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "pending":
        return "bg-[#F5CB5C]";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      case "work":
        return <Briefcase className="h-4 w-4" />;
      case "government":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#242423] pb-24">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="hidden"
      />

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#E8EDDF]">{t("profile.title")}</h1>
        <p className="text-sm text-[#CFDBD5]/70">{t("profile.subtitle")}</p>
      </div>

      {/* Government Documents */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#E8EDDF]">{t("profile.governmentIds")}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#F5CB5C] hover:bg-[#333533] p-0"
          >
            {t("profile.viewAll")} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {governmentDocs.map((doc) => (
            <Card
              key={doc.id}
              className="min-w-[280px] bg-[#333533] border-0 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#242423] rounded-xl text-[#F5CB5C]">
                      {doc.icon}
                    </div>
                    <div>
                      <p className="text-[#E8EDDF] font-medium">{doc.type}</p>
                      <p className="text-xs text-[#CFDBD5]/60">{doc.number}</p>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#CFDBD5]/60">
                  <span>Issued: {doc.issueDate}</span>
                  {doc.expiryDate && <span>Expires: {doc.expiryDate}</span>}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <Card
            onClick={handleUpload}
            className="min-w-[140px] bg-[#333533]/50 border-2 border-dashed border-[#CFDBD5]/30 rounded-2xl cursor-pointer hover:border-[#F5CB5C] transition-colors"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <Plus className="h-6 w-6 text-[#CFDBD5]/60 mb-2" />
              <p className="text-xs text-[#CFDBD5]/60">{t("profile.addNew")}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved Documents */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#E8EDDF]">{t("profile.savedDocuments")}</h2>
          <Button
            onClick={handleUpload}
            size="sm"
            className="bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl"
          >
            <Upload className="h-4 w-4 mr-1" /> {t("profile.upload")}
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#F5CB5C] text-[#242423]"
                  : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
              }`}
            >
              {t(cat.labelKey)}
            </Button>
          ))}
        </div>

        {/* Document List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <Card
              key={doc.id}
              className="bg-[#333533] border-0 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#242423] rounded-xl text-[#F5CB5C]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E8EDDF] font-medium truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#CFDBD5]/60">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                      <Badge
                        variant="outline"
                        className="border-0 bg-[#242423] text-[#CFDBD5]/80 text-xs px-2"
                      >
                        {getCategoryIcon(doc.category)}
                        <span className="ml-1 capitalize">{doc.category}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#CFDBD5]/60 hover:text-[#F5CB5C] hover:bg-[#242423]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#CFDBD5]/60 hover:text-[#F5CB5C] hover:bg-[#242423]"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#CFDBD5]/60 hover:text-[#F5CB5C] hover:bg-[#242423]"
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                      className="h-8 w-8 text-[#CFDBD5]/60 hover:text-red-500 hover:bg-[#242423]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-[#CFDBD5]/30 mx-auto mb-4" />
            <p className="text-[#CFDBD5]/60">{t("profile.noDocuments")}</p>
            <Button
              onClick={handleUpload}
              className="mt-4 bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl"
            >
              {t("profile.uploadDocument")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
