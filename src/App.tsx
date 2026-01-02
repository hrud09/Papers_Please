import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DocumentGuidePage from "./components/DocumentGuidePage";
import Profile from "./components/Profile";
import MobileNavigation from "./components/MobileNavigation";
import DesktopNavigation from "./components/DesktopNavigation";
import { LanguageProvider } from "./contexts/LanguageContext";
import routes from "tempo-routes";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <LanguageProvider>
      {/* Desktop Navigation */}
      {!isMobile && <DesktopNavigation />}
      
      <Suspense fallback={
        <div className="min-h-screen bg-[#242423] flex items-center justify-center">
          <div className="text-[#F5CB5C]">Loading...</div>
        </div>
      }>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<Home />} />
            <Route path="/guide/:id" element={<DocumentGuidePage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
    </LanguageProvider>
  );
}

export default App;