import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DocumentGuidePage from "./components/DocumentGuidePage";
import HirePaperManager from "./components/HirePaperManager";
import PaperManagersList from "./components/PaperManagersList";
import { LanguageProvider } from "./contexts/LanguageContext";
import routes from "tempo-routes";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [innerFollowerPosition, setInnerFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let animationFrameId: number;

    const animate = () => {
      setFollowerPosition((prev) => ({
        x: lerp(prev.x, cursorPosition.x, 0.15),
        y: lerp(prev.y, cursorPosition.y, 0.15),
      }));

      setInnerFollowerPosition((prev) => ({
        x: lerp(prev.x, cursorPosition.x, 0.25),
        y: lerp(prev.y, cursorPosition.y, 0.25),
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPosition]);

  return (
    <LanguageProvider>
      {/* Custom Cursors */}
      <div
        className={`custom-cursor ${isClicked ? "cursor-clicked" : ""}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`custom-cursor-follower ${isClicked ? "cursor-clicked" : ""}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`custom-cursor-inner ${isClicked ? "cursor-clicked" : ""}`}
        style={{
          left: `${innerFollowerPosition.x}px`,
          top: `${innerFollowerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        <div className="bg-shape bg-shape-5"></div>
        <div className="bg-shape bg-shape-6"></div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide/:id" element={<DocumentGuidePage />} />
            <Route path="/hire-paper-manager" element={<HirePaperManager />} />
            <Route path="/paper-managers" element={<PaperManagersList />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;