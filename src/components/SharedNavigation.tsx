import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, UserCheck, Languages, Menu, X, Home as HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SharedNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = [
    { name: "Home", icon: <HomeIcon className="h-4 w-4" />, path: "/" },
    { name: "Hire Manager", icon: <Briefcase className="h-4 w-4" />, path: "/hire-paper-manager" },
    { name: "Browse Managers", icon: <UserCheck className="h-4 w-4" />, path: "/paper-managers" },
  ];

  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-primary text-white p-2 rounded-lg hover:scale-110 transition-transform animate-pulse-glow">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                {t("header.title")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("header.subtitle")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => navigate(link.path)}
                className={`nav-button flex items-center space-x-1 hover:bg-green-50 transition-all ${
                  location.pathname === link.path ? "bg-green-50" : ""
                }`}
              >
                {link.icon}
                <span className="nav-text">{link.name}</span>
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="nav-button flex items-center space-x-1 transition-transform"
            >
              <Languages className="h-4 w-4" />
              <span className="nav-text">{t("header.language")}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-bounce-in">
            {navigationLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full justify-start hover:bg-green-50"
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default SharedNavigation;
