import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Home as HomeIcon, User, Languages } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const DesktopNavigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = [
    { name: "Home", icon: <HomeIcon className="h-4 w-4" />, path: "/" },
    { name: "Guides", icon: <FileText className="h-4 w-4" />, path: "/guide/nid" },
    { name: "Profile", icon: <User className="h-4 w-4" />, path: "/profile" },
  ];

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#242423]/95 backdrop-blur-lg border-b border-[#333533]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="p-2 bg-[#F5CB5C] rounded-xl">
              <FileText className="h-5 w-5 text-[#242423]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#E8EDDF]">
                {t("header.title")}
              </h1>
              <p className="text-xs text-[#CFDBD5]/60">
                {t("header.subtitle")}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-2">
            {navigationLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-2 rounded-xl transition-all ${
                  location.pathname === link.path || (link.name === "Guides" && location.pathname.startsWith("/guide"))
                    ? "bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90" 
                    : "text-[#CFDBD5] hover:bg-[#333533]"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center gap-2 text-[#CFDBD5] hover:bg-[#333533] rounded-xl"
            >
              <Languages className="h-4 w-4" />
              <span>{t("header.language")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopNavigation;
