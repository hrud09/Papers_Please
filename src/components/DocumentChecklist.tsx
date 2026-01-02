import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ClipboardList,
  Download,
  Save,
  Printer,
  CheckCircle2,
  Camera,
  FileText,
  Stamp,
  Copy,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChecklistItem {
  id: string;
  label: string;
  labelBn: string;
  details?: string;
  detailsBn?: string;
  icon: React.ReactNode;
}

interface DocumentChecklistProps {
  documentId: string;
  documentTitle: string;
}

const checklistData: Record<string, ChecklistItem[]> = {
  nid: [
    { id: "ssc", label: "SSC/JSC Certificate", labelBn: "SSC/JSC সার্টিফিকেট", details: "Original + 1 photocopy", detailsBn: "মূল + ১টি ফটোকপি", icon: <FileText className="h-4 w-4" /> },
    { id: "birth", label: "Online Birth Certificate", labelBn: "অনলাইন জন্ম সনদ", details: "17-digit number required", detailsBn: "১৭ সংখ্যার নম্বর প্রয়োজন", icon: <FileText className="h-4 w-4" /> },
    { id: "parents", label: "Parents' NID Photocopy", labelBn: "বাবা-মায়ের NID ফটোকপি", details: "Both sides", detailsBn: "দুই পাশ", icon: <Copy className="h-4 w-4" /> },
    { id: "utility", label: "Utility Bill", labelBn: "ইউটিলিটি বিল", details: "Gas/Electricity/Water - Recent", detailsBn: "গ্যাস/বিদ্যুৎ/পানি - সাম্প্রতিক", icon: <FileText className="h-4 w-4" /> },
    { id: "citizenship", label: "Citizenship Certificate", labelBn: "নাগরিকত্ব সনদ", details: "From Chairman/Councilor", detailsBn: "চেয়ারম্যান/কাউন্সিলর থেকে", icon: <Stamp className="h-4 w-4" /> },
  ],
  passport: [
    { id: "nid", label: "NID Card / Birth Certificate", labelBn: "NID কার্ড / জন্ম সনদ", details: "Original + 2 photocopies", detailsBn: "মূল + ২টি ফটোকপি", icon: <FileText className="h-4 w-4" /> },
    { id: "prev-passport", label: "Previous Passport (if any)", labelBn: "আগের পাসপোর্ট (যদি থাকে)", details: "Original required for renewal", detailsBn: "নবায়নের জন্য মূল প্রয়োজন", icon: <FileText className="h-4 w-4" /> },
    { id: "photo", label: "Passport Photos", labelBn: "পাসপোর্ট সাইজ ছবি", details: "White background, 35x45mm, recent", detailsBn: "সাদা ব্যাকগ্রাউন্ড, ৩৫x৪৫মিমি, সাম্প্রতিক", icon: <Camera className="h-4 w-4" /> },
    { id: "go-noc", label: "GO/NOC (Govt. Employees)", labelBn: "GO/NOC (সরকারি কর্মচারী)", details: "From your department", detailsBn: "আপনার বিভাগ থেকে", icon: <Stamp className="h-4 w-4" /> },
    { id: "profession", label: "Profession Proof", labelBn: "পেশার প্রমাণ", details: "Student ID / Job ID / Trade License", detailsBn: "ছাত্র আইডি / চাকরি আইডি / ট্রেড লাইসেন্স", icon: <FileText className="h-4 w-4" /> },
    { id: "online-form", label: "Online Application Print", labelBn: "অনলাইন আবেদন প্রিন্ট", details: "From epassport.gov.bd", detailsBn: "epassport.gov.bd থেকে", icon: <Printer className="h-4 w-4" /> },
  ],
  "birth-certificate": [
    { id: "epi", label: "EPI/Vaccine Card", labelBn: "EPI/টিকা কার্ড", details: "Or Hospital Birth Certificate", detailsBn: "অথবা হাসপাতালের জন্ম সনদ", icon: <FileText className="h-4 w-4" /> },
    { id: "parents-nid", label: "Parents' NID", labelBn: "বাবা-মায়ের NID", details: "Both parents required", detailsBn: "দুই জনেরই প্রয়োজন", icon: <FileText className="h-4 w-4" /> },
    { id: "parents-birth", label: "Parents' Birth Certificates", labelBn: "বাবা-মায়ের জন্ম সনদ", details: "Online version preferred", detailsBn: "অনলাইন ভার্সন ভালো", icon: <FileText className="h-4 w-4" /> },
    { id: "holding", label: "Holding Tax Receipt", labelBn: "হোল্ডিং ট্যাক্স রসিদ", details: "Address proof", detailsBn: "ঠিকানার প্রমাণ", icon: <FileText className="h-4 w-4" /> },
  ],
  "driving-license": [
    { id: "learner", label: "Learner License Number", labelBn: "লার্নার লাইসেন্স নম্বর", details: "From BRTA online", detailsBn: "BRTA অনলাইন থেকে", icon: <FileText className="h-4 w-4" /> },
    { id: "medical", label: "Medical Certificate", labelBn: "মেডিকেল সার্টিফিকেট", details: "From registered doctor", detailsBn: "রেজিস্টার্ড ডাক্তার থেকে", icon: <FileText className="h-4 w-4" /> },
    { id: "nid", label: "NID / Birth Certificate", labelBn: "NID / জন্ম সনদ", details: "Original + photocopy", detailsBn: "মূল + ফটোকপি", icon: <FileText className="h-4 w-4" /> },
    { id: "utility", label: "Utility Bill", labelBn: "ইউটিলিটি বিল", details: "Address proof", detailsBn: "ঠিকানার প্রমাণ", icon: <FileText className="h-4 w-4" /> },
    { id: "education", label: "Education Certificate", labelBn: "শিক্ষাগত সনদ", details: "Minimum Class 8", detailsBn: "সর্বনিম্ন ৮ম শ্রেণী", icon: <FileText className="h-4 w-4" /> },
    { id: "photo", label: "Passport Photos", labelBn: "পাসপোর্ট সাইজ ছবি", details: "4 copies, recent", detailsBn: "৪ কপি, সাম্প্রতিক", icon: <Camera className="h-4 w-4" /> },
  ],
};

const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const items = checklistData[documentId] || checklistData["nid"];
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress = Math.round((checkedItems.size / items.length) * 100);

  const handleDownload = () => {
    const content = items.map((item, index) => {
      const checked = checkedItems.has(item.id) ? "✓" : "☐";
      return `${checked} ${index + 1}. ${item.label}\n   ${item.details || ""}`;
    }).join("\n\n");

    const blob = new Blob([`${documentTitle} - Checklist\n\n${content}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentId}-checklist.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-[#E8EDDF] font-semibold">
                {language === "bn" ? "ডকুমেন্ট চেকলিস্ট" : "Document Checklist"}
              </h3>
              <p className="text-xs text-[#CFDBD5]/60">{documentTitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-[#F5CB5C] hover:bg-[#242423] p-2"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#CFDBD5]/60">
              {language === "bn" ? "অগ্রগতি" : "Progress"}
            </span>
            <span className="text-[#F5CB5C] font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-[#242423] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F5CB5C] to-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                checkedItems.has(item.id)
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-[#242423] hover:bg-[#242423]/80"
              }`}
            >
              <Checkbox
                checked={checkedItems.has(item.id)}
                className="mt-0.5 border-[#CFDBD5]/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    checkedItems.has(item.id) ? "text-green-500 line-through" : "text-[#E8EDDF]"
                  }`}>
                    {language === "bn" ? item.labelBn : item.label}
                  </span>
                </div>
                {item.details && (
                  <p className={`text-xs mt-0.5 ${
                    checkedItems.has(item.id) ? "text-green-500/60" : "text-[#CFDBD5]/50"
                  }`}>
                    {language === "bn" ? item.detailsBn : item.details}
                  </p>
                )}
              </div>
              {checkedItems.has(item.id) && (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {progress === 100 && (
          <div className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
            <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-1" />
            <p className="text-sm text-green-500 font-medium">
              {language === "bn" ? "আপনি প্রস্তুত!" : "You're all set!"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentChecklist;
