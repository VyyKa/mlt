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
        "w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm hover:shadow-md " +
        (selected
          ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-lg"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50")
      }
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">{label}</span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected 
            ? "border-emerald-500 bg-emerald-500" 
            : "border-slate-300"
        }`}>
          {selected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
}
