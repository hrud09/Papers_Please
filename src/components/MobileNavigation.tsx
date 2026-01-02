import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, User } from "lucide-react";

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: "/",
      icon: <Home className="h-6 w-6" />,
      label: "Home",
    },
    {
      path: "/guide/nid",
      icon: <FileText className="h-6 w-6" />,
      label: "Guides",
    },
    {
      path: "/profile",
      icon: <User className="h-6 w-6" />,
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#242423] border-t border-[#333533] px-6 py-2 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.label === "Guides" && location.pathname.startsWith("/guide"));
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
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
