import React from "react";
import { FileText } from "lucide-react";
import DocumentCategoryGrid from "./DocumentCategoryGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#242423] pb-24 md:pb-8">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 md:pt-20">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-[#F5CB5C] rounded-xl">
            <FileText className="h-6 w-6 text-[#242423]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#E8EDDF]">Papers Please</h1>
            <p className="text-sm text-[#CFDBD5]/70">Bangladesh Document Guide</p>
          </div>
        </div>
      </div>

      {/* Document Guides Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#E8EDDF]">{t("tabs.documents")}</h2>
        </div>
        
        <DocumentCategoryGrid
          onCategorySelect={(id) => navigate(`/guide/${id}`)}
        />
      </section>
    </div>
  );
}

export default Home;