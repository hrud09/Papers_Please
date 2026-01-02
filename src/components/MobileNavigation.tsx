import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, User, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  path: string;
  icon: React.ReactNode;
  labelKey: string;
}

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    {
      path: "/",
      icon: <Home className="h-5 w-5" />,
      labelKey: "nav.home",
    },
    {
      path: "/guide/nid",
      icon: <FileText className="h-5 w-5" />,
      labelKey: "nav.guides",
    },
    {
      path: "/community",
      icon: <MessageCircle className="h-5 w-5" />,
      labelKey: "nav.community",
    },
    {
      path: "/profile",
      icon: <User className="h-5 w-5" />,
      labelKey: "nav.profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#242423] border-t border-[#333533] px-6 py-2 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.labelKey === "nav.guides" && location.pathname.startsWith("/guide"));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#F5CB5C] text-[#242423] scale-110"
                    : "text-[#CFDBD5]/60 hover:text-[#F5CB5C]"
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
