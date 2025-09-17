import React from "react";
import { motion } from "motion/react";

export default function ProgressBar({ percent }: { percent: number }) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden border border-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
        initial={{ width: 0 }}
        animate={{ width: safe + "%" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />
    </div>
  );
}
