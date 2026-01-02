import React from "react";
import { FileText, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DocumentCategoryGrid from "./DocumentCategoryGrid";
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

      {/* Smart Document Finder Card - Links to page */}
      <section className="px-4 mb-6">
        <Card 
          className="bg-[#333533] border-0 rounded-2xl overflow-hidden cursor-pointer hover:bg-[#333533]/80 active:scale-[0.99] transition-all"
          onClick={() => navigate("/finder")}
        >
          <div className="h-1.5 bg-gradient-to-r from-[#F5CB5C] to-[#F5CB5C]/50" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5CB5C] rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#242423]" />
                </div>
                <div>
                  <h2 className="text-[#E8EDDF] font-bold">
                    {language === "bn" ? "স্মার্ট ডকুমেন্ট ফাইন্ডার" : "Smart Document Finder"}
                  </h2>
                  <p className="text-xs text-[#CFDBD5]/60">
                    {language === "bn" ? "আপনার কোন ডকুমেন্ট দরকার জানুন" : "Find what documents you need"}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#F5CB5C]" />
            </div>
          </CardContent>
        </Card>
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

      {/* Community Q&A Card - Links to page */}
      <section className="px-4 mb-6">
        <Card 
          className="bg-[#333533] border-0 rounded-2xl overflow-hidden cursor-pointer hover:bg-[#333533]/80 active:scale-[0.99] transition-all"
          onClick={() => navigate("/community")}
        >
          <div className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-500/50" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-[#E8EDDF] font-bold">
                    {language === "bn" ? "কমিউনিটি প্রশ্নোত্তর" : "Community Q&A"}
                  </h2>
                  <p className="text-xs text-[#CFDBD5]/60">
                    {language === "bn" ? "বাস্তব অভিজ্ঞতা থেকে শিখুন" : "Learn from real experiences"}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Home;