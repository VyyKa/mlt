import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { SITUATIONS, Situation } from "@/data/situations";
import ROLE_SITUATIONS, { RoleKey, RoleSituation } from "@/data/roleSituations";
import { useEffect, useMemo, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import { useGame } from "@/state/GameContext";
import { motion } from "motion/react";
import Link from "next/link";

export default function SituationPage() {
  const router = useRouter();
  const { id } = router.query;
  const numericId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : NaN;
  }, [id]);

  const { choices, setChoice, role } = useGame();

  const situationsForRole: Situation[] = useMemo(() => {
    if (role) {
      const key = role as RoleKey;
      const list = ROLE_SITUATIONS[key] as RoleSituation[];
      // Map về dạng Situation quen thuộc (key: 'dau-tranh' | 'im-lang', tip = outcome)
      return list.map((rs, idx) => ({
        id: idx + 1,
        title: rs.title,
        description: rs.description,
        imageSrc: rs.imageSrc ?? "/anh1.jpg",
        options: [
          { key: "dau-tranh", label: rs.options.find(o => o.key === "B")?.label || "Đấu tranh", tip: rs.options.find(o => o.key === "B")?.outcome || "" },
          { key: "im-lang", label: rs.options.find(o => o.key === "A")?.label || "Im lặng", tip: rs.options.find(o => o.key === "A")?.outcome || "" },
        ],
      }));
    }
    return SITUATIONS;
  }, [role]);

  const total = situationsForRole.length;
  const situation = useMemo(() => situationsForRole.find(s => s.id === numericId), [numericId, situationsForRole]);
  const selected = choices[numericId] ?? null;
  const [showTip, setShowTip] = useState<boolean>(false);

  useEffect(() => {
    if (Number.isNaN(numericId)) return;
    if (!situation && numericId) {
      router.replace("/404");
    }
  }, [numericId, situation, router]);

  if (!situation) return null;

  const handleSelect = (key: "dau-tranh" | "im-lang") => {
    setChoice(situation.id, key);
    setShowTip(true);
  };

  const nextHref = situation.id < total ? `/s/${situation.id + 1}` : "/result";

  const optionTip = showTip && selected
    ? situation.options.find(o => o.key === selected)?.tip
    : null;

  const progress = ((situation.id - 1) / Math.max(total - 1, 1)) * 100;

  return (
    <Layout>
      <Head>
        <title>Tình huống {situation.id} · Mác – Lênin</title>
      </Head>

      {/* Progress Header */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <span className="text-sm font-medium text-blue-700">📖 Tình huống {situation.id}/{total}</span>
            </div>
            {role && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="text-sm font-medium text-emerald-700">👤 {role.replace("-", " ")}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
          <motion.div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-slate-600">Tiến độ: {Math.round(progress)}% hoàn thành</p>
      </motion.section>

      {/* Main Content */}
      <motion.section 
        className="grid lg:grid-cols-2 gap-8 items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Image Section */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow">
            <div className="relative overflow-hidden">
              <Image 
                src={situation.imageSrc} 
                alt={situation.title} 
                width={1200} 
                height={800} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Image caption */}
          <motion.div 
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-slate-600 italic">Hình minh họa tình huống {situation.id}</p>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Title & Description */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-900">
              {situation.title}
            </h1>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-700 leading-relaxed">{situation.description}</p>
            </div>
          </div>

          {/* Choice Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
              Bạn sẽ lựa chọn như thế nào?
            </h2>
            
            <div className="space-y-4">
              {situation.options.map((opt, index) => (
                <motion.div
                  key={opt.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <ChoiceCard 
                    label={opt.label} 
                    selected={selected === opt.key} 
                    onClick={() => handleSelect(opt.key)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Educational Tip */}
          {optionTip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative"
            >
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mr-3 text-white">
                    <span className="text-sm">💡</span>
                  </div>
                  <h3 className="font-semibold text-emerald-700">Gợi ý giáo dục</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{optionTip}</p>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-200 rounded-tr-lg"></div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href={nextHref}>
              <motion.button 
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selected 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                whileHover={selected ? { scale: 1.05, y: -2 } : {}}
                whileTap={selected ? { scale: 0.95 } : {}}
                disabled={!selected}
              >
                {situation.id < total ? "Tiếp theo →" : "Xem kết quả 📊"}
                {!selected && " (Hãy chọn trước)"}
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button 
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Trang chủ
              </motion.button>
            </Link>
          </motion.div>

          {/* Navigation Hints */}
          <motion.div 
            className="flex justify-between items-center pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div>
              {situation.id > 1 && (
                <Link href={`/s/${situation.id - 1}`}>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center">
                    ← Tình huống trước
                  </button>
                </Link>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Tình huống {situation.id} / {total}
            </div>
            <div>
              {situation.id < total && (
                <span className="text-sm text-gray-400">
                  Tình huống tiếp theo →
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </Layout>
  );
}