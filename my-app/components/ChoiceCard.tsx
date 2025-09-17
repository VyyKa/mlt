import React from "react";
import { motion } from "motion/react";

export default function ChoiceCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={
        "w-full text-left rounded-2xl border p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 " +
        (selected
          ? "border-emerald-400/40 bg-emerald-500/10"
          : "border-white/10 hover:bg-white/5")
      }
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}
