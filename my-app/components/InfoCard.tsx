import React from "react";
import { motion } from "motion/react";

export default function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <div className="text-sm text-white/80 leading-relaxed">{children}</div>
    </motion.div>
  );
}
