"use client";

import { motion, useInView } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PdfItem = {
  id: string;
  name: string;
  url: string;
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  // Static list of PDFs from public/pdfs. Developers can add/remove entries here.
  const pdfFiles: PdfItem[] = useMemo(
    () => [
      { id: "about-company", name: "About Company.pdf", url: "/pdfs/Brandguideline final a4_newwsuatrangcuoi.pdf" },
      { id: "team-info", name: "Team Info.pdf", url: "/pdfs/Storyboard.pdf" },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>(pdfFiles[0]?.id || "");
  const selectedPdf = pdfFiles.find((it) => it.id === selectedId) || pdfFiles[0];

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative py-20 bg-gradient-to-br from-slate-900 via-black to-slate-800 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 left-1/4 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
        <motion.div
          className="absolute -bottom-8 right-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
            {t("menu.aboutUs")}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {t("about.instructions")}
          </p>
        </div>

        {/* Controls */}
        {pdfFiles.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {pdfFiles.map((pdf) => {
              const isActive = pdf.id === selectedId;
              return (
                <motion.button
                  key={pdf.id}
                  onClick={() => setSelectedId(pdf.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                    isActive
                      ? "bg-lime-400 text-black border-lime-300"
                      : "glass-effect text-white border-white/20"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {pdf.name}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Viewer */}
        {pdfFiles.length === 0 ? (
          <div className="glass-effect border border-white/10 rounded-2xl p-10 text-center text-gray-400">
            {t("about.noPdf")}
          </div>
        ) : (
          <div className="w-full">
            <div className="glass-effect border border-white/10 rounded-2xl overflow-hidden">
              <iframe
                title={selectedPdf.name}
                src={`${selectedPdf.url}#zoom=page-fit`}
                className="w-full h-[65vh] md:h-[80vh]"
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}


