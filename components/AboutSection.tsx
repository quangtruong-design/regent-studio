"use client";

import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PdfItem = {
  id: string;
  name: string;
  url: string;
};

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutSection({ isOpen, onClose }: AboutOverlayProps) {
  const { t } = useLanguage();

  const pdfFiles: PdfItem[] = useMemo(
    () => [
      { id: "about-company", name: "About Company.pdf", url: "/pdfs/Brandguideline final a4_newwsuatrangcuoi.pdf" },
      { id: "team-info", name: "Team Info.pdf", url: "/pdfs/Storyboard.pdf" },
    ],
    []
  );
  

  const [selectedId, setSelectedId] = useState<string>(pdfFiles[0]?.id || "");
  const selectedPdf = pdfFiles.find((it) => it.id === selectedId) || pdfFiles[0];
  const [isSlideshowOpen, setIsSlideshowOpen] = useState<boolean>(false);

  const iframeSrc = React.useMemo(
    () => encodeURI((selectedPdf?.url || "") + "#toolbar=0&navpanes=0&scrollbar=0"),
    [selectedPdf]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSlideshowOpen) {
          setIsSlideshowOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isOpen || isSlideshowOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSlideshowOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t("menu.aboutUs") || "About Us PDFs"}
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClose()}
    >
      <div
        className="relative bg-white w-[90vw] h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
      <div 
  className="p-3 flex flex-wrap gap-3 items-center justify-between border-b border-black/10"
  style={{ backgroundColor: "#000035" }}
>
  <div className="flex flex-wrap gap-2">
    {pdfFiles.map((item) => (
      <button
        key={item.id}
        onClick={() => setSelectedId(item.id)}
        style={{ backgroundColor: "#a2ff00", color: "#000035" }}
        className={`px-4 py-2 rounded-lg text-sm font-semibold ${
          selectedId === item.id ? "opacity-100" : "opacity-80 hover:opacity-100"
        }`}
      >
        {item.name}
      </button>
    ))}
  </div>
  <div className="flex gap-2">
    <button
      onClick={() => setIsSlideshowOpen(true)}
      title="Open slideshow"
      aria-label="Open slideshow"
      style={{ backgroundColor: "#a2ff00", color: "#000035" }}
      className="px-4 py-2 rounded-lg text-sm font-semibold"
    >
      Slideshow
    </button>
    <button
      onClick={() => onClose()}
      style={{ backgroundColor: "#a2ff00", color: "#000035" }}
      className="px-4 py-2 rounded-lg text-sm font-semibold"
    >
      {t("about.exit")}
    </button>
  </div>
</div>

        <div className="flex-1">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title={selectedPdf?.name}
            className="w-full h-full"
          />
        </div>
      </div>
    </motion.div>

    <PdfSlideshow
      isOpen={isSlideshowOpen}
      onClose={() => setIsSlideshowOpen(false)}
      src={iframeSrc}
      title={selectedPdf?.name}
    />
    </>
  );
}

// Fullscreen slideshow overlay
export function PdfSlideshow({
  isOpen,
  onClose,
  src,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title || "PDF Slideshow"}
      className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="relative w-screen h-screen" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "#a2ff00", color: "#000035" }}
          >
            Close
          </button>
        </div>
        <iframe key={src} src={src} title={title} className="w-full h-full pointer-events-auto" />
      </div>
    </motion.div>
  );
}
