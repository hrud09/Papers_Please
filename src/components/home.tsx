import React from "react";
import { FileText, Shield } from "lucide-react";
import DocumentCategoryGrid from "./DocumentCategoryGrid";
import SmartDocumentFinder from "./SmartDocumentFinder";
import RenewalReminder from "./RenewalReminder";
import OfficeFinder from "./OfficeFinder";
import DocumentComparison from "./DocumentComparison";
import VerifiedLinks from "./VerifiedLinks";
import EmergencyGuide from "./EmergencyGuide";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { t, language } = useLanguage();
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
            <p className="text-sm text-[#CFDBD5]/70">
              {language === "bn" ? "বাংলাদেশ ডকুমেন্ট গাইড" : "Bangladesh Document Guide"}
            </p>
          </div>
        </div>
        {/* Tagline */}
        <div className="flex items-center gap-2 mt-3 bg-[#333533] px-3 py-2 rounded-xl">
          <Shield className="h-4 w-4 text-[#F5CB5C]" />
          <p className="text-xs text-[#CFDBD5]/70">
            {language === "bn" 
              ? "দালাল-মুক্ত, ভুল-প্রুফ সরকারি ডকুমেন্ট সঙ্গী" 
              : "Broker-free, mistake-proof government document companion"}
          </p>
        </div>
      </div>

      {/* Smart Document Finder */}
      <section className="px-4 mb-6">
        <SmartDocumentFinder />
      </section>

      {/* Emergency Guide */}
      <section className="px-4 mb-6">
        <EmergencyGuide />
      </section>

      {/* Document Guides Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#E8EDDF]">{t("tabs.documents")}</h2>
        </div>
        
        <DocumentCategoryGrid
          onCategorySelect={(id) => navigate(`/guide/${id}`)}
        />
      </section>

      {/* Two Column Layout for Desktop */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Renewal Reminders */}
        <RenewalReminder />
        
        {/* Office Finder */}
        <OfficeFinder />
      </div>

      {/* Document Comparison */}
      <section className="px-4 mb-6">
        <DocumentComparison />
      </section>

      {/* Verified Links */}
      <section className="px-4 mb-6">
        <VerifiedLinks />
      </section>
    </div>
  );
}

export default Home;