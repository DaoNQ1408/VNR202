import { useState, useEffect } from "react";
import CircularGallery from "../components/CircularGallery/CircularGallery";
import DomeGallery from "../components/DomeGallery/DomeGallery";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaImages, FaCube } from "react-icons/fa";

export default function LibraryPage() {
  const [mode, setMode] = useState<"dome" | "circular">("dome");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ethnicImages = [
    {
      image: "/img/b1.jpg",
      text: "Tương lai thành phố bay",
    },
    {
      image: "/img/b2.jpg",
      text: "Tàu cao tốc trên mây",
    },
    {
      image: "/img/b3.jpg",
      text: "Cầu nối tương lai",
    },
    {
      image: "/img/b4.jpg",
      text: "Cổng thời gian",
    },
    {
      image: "/img/b5.jpg",
      text: "Thành phố xanh",
    },
    {
      image: "/img/b6.jpg",
      text: "Công nghệ bền vững",
    },
    {
      image: "/img/b7.jpg",
      text: "Thành phố mơ ước",
    },
    {
      image: "/img/b8.jpg",
      text: "Cộng đồng hiện đại",
    },
  ];

  // Transform ethnicImages to DomeGallery format
  const domeImages = ethnicImages.map((img) => ({
    src: img.image,
    alt: img.text,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white">
      {/* Header */}
      <Header />

      {/* Mode Toggle Bar - Right aligned */}
      <div className="fixed top-20 right-6 z-[60] flex items-center gap-3">
        <span className="text-[#FFD700] text-sm font-semibold hidden md:inline">
          Chế độ xem:
        </span>
        <div className="flex gap-2 bg-[rgba(139,26,26,0.9)] p-1 rounded-full border-2 border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.2)] backdrop-blur-md">
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "dome"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
            }`}
            onClick={() => setMode("dome")}
          >
            <FaCube className="text-sm" />
            <span>Tròn</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "circular"
                ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] shadow-[0_4px_12px_rgba(255,215,0,0.5)]"
                : "bg-transparent text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]"
            }`}
            onClick={() => setMode("circular")}
          >
            <FaImages className="text-sm" />
            <span>Ngang</span>
          </button>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="relative w-full" style={{ height: "calc(100vh - 73px)" }}>
        {mode === "dome" ? (
          <div className="w-full h-full">
            <DomeGallery
              images={domeImages}
              fit={0.65}
              fitBasis="auto"
              minRadius={400}
              maxRadius={900}
              dragSensitivity={20}
              enlargeTransitionMs={300}
              segments={20}
              dragDampening={1.5}
              openedImageWidth="500px"
              openedImageHeight="500px"
              imageBorderRadius="15px"
              openedImageBorderRadius="25px"
              grayscale={false}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <CircularGallery
              items={ethnicImages}
              bend={3}
              textColor="#d4af37"
              borderRadius={0.08}
              font="bold 28px 'Playfair Display', serif"
              scrollSpeed={1}
              scrollEase={0.08}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
