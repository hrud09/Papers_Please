import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  Users,
  Shield,
  Search,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Languages,
  Briefcase,
  Menu,
  X,
  Home as HomeIcon,
  UserCheck,
} from "lucide-react";
import DocumentCategoryGrid from "./DocumentCategoryGrid";
import QueueStatusTracker from "./QueueStatusTracker";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import SharedNavigation from "./SharedNavigation";

function Home() {
  const [activeTab, setActiveTab] = useState("documents");
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    {
      title: t("stats.documents.title"),
      value: t("stats.documents.value"),
      description: t("stats.documents.description"),
      icon: <FileText className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: t("stats.offices.title"),
      value: t("stats.offices.value"),
      description: t("stats.offices.description"),
      icon: <MapPin className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: t("stats.users.title"),
      value: t("stats.users.value"),
      description: t("stats.users.description"),
      icon: <Users className="h-5 w-5" />,
      color: "text-purple-600",
    },
    {
      title: t("stats.savings.title"),
      value: t("stats.savings.value"),
      description: t("stats.savings.description"),
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      title: "Hire Paper Manager",
      description: "Get professional help with your documents",
      icon: <Briefcase className="h-5 w-5" />,
      action: () => navigate("/hire-paper-manager"),
    },
    {
      title: t("quickAction.browse.title"),
      description: t("quickAction.browse.description"),
      icon: <Search className="h-5 w-5" />,
      action: () => setActiveTab("documents"),
    },
  ];

  const antiScamTips = [
    {
      title: t("antiScam.officialFees.title"),
      description: t("antiScam.officialFees.description"),
      icon: <Shield className="h-4 w-4 text-green-600" />,
    },
    {
      title: t("antiScam.directApplication.title"),
      description: t("antiScam.directApplication.description"),
      icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
    },
    {
      title: t("antiScam.verifyInfo.title"),
      description: t("antiScam.verifyInfo.description"),
      icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SharedNavigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 parallax-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-bounce-in">
            {t("hero.title")}
            <span className="block text-primary">{t("hero.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 card-hover bg-white cursor-react"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mx-auto mb-3 hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white parallax-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center hover:scale-110 transition-transform">
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Documents Only */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 parallax-section">
        <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>{t("tabs.documents")}</span>
            </h3>
          </div>
          <DocumentCategoryGrid
            onCategorySelect={(id) => console.log("Selected:", id)}
          />
        </div>
      </section>

      {/* Anti-Scam Section */}
      <section className="py-12 bg-yellow-50 parallax-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("antiScam.title")}
            </h3>
            <p className="text-muted-foreground">{t("antiScam.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {antiScamTips.map((tip, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all hover:scale-105 card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    {tip.icon}
                    <div>
                      <h4 className="font-semibold mb-2">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-primary text-white p-2 rounded-lg hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">{t("header.title")}</span>
          </div>
          <p className="text-gray-400 mb-4">{t("footer.description")}</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>{t("footer.copyright")}</span>
            <span>•</span>
            <span>{t("footer.madeFor")}</span>
            <span>•</span>
            <span>{t("footer.openSource")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;