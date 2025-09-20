import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useGame } from "@/state/GameContext";
import { motion } from "motion/react";
import Link from "next/link";
import { PartyPopper, Zap, Brain, Shield, BookOpenText, Target, Cog, UsersRound, RotateCcw, Home } from "lucide-react";
import { ROLE_ENDINGS } from "@/data/roleSituations";

export default function ResultPage() {
  const { choices, reset, role } = useGame();
  const vals = Object.values(choices).filter(Boolean) as ("dau-tranh" | "im-lang")[];
  const countDau = vals.filter(v => v === "dau-tranh").length;
  const countIm = vals.filter(v => v === "im-lang").length;

  let verdict = "Bạn do dự…";
  let verdictColor = "from-gray-500 to-gray-600";
  let verdictDescription = "Bạn chưa có lập trường rõ ràng trong các tình huống.";
  let VerdictIcon: any = Brain;

  if (countDau === 3) {
    verdict = "Bạn kiên định, dám hành động!";
    verdictColor = "from-red-500 to-orange-500";
    verdictDescription = "Bạn luôn chọn đấu tranh và hành động tích cực trong mọi tình huống.";
    VerdictIcon = Zap;
  } else if (countIm === 3) {
    verdict = "Bạn chọn nằm yên…";
    verdictColor = "from-blue-500 to-indigo-500";
    verdictDescription = "Bạn có xu hướng thận trọng và chọn giữ im lặng.";
    VerdictIcon = Shield;
  } else if (countDau === 2) {
    verdict = "Bạn nghiêng về hành động!";
    verdictColor = "from-green-500 to-teal-500";
    verdictDescription = "Bạn có xu hướng chọn đấu tranh trong hầu hết các tình huống.";
    VerdictIcon = Zap;
  } else if (countIm === 2) {
    verdict = "Bạn khá thận trọng!";
    verdictColor = "from-purple-500 to-pink-500";
    verdictDescription = "Bạn thường chọn cách tiếp cận thận trọng và quan sát.";
    VerdictIcon = Brain;
  }

  const percentage = vals.length > 0 ? Math.round((countDau / vals.length) * 100) : 0;

  const endingByRole = role ? ROLE_ENDINGS[role] : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Custom Layout without the dark background */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-green-200 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-purple-200 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-200 rounded-full animate-bounce"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="group flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Image src="/anh1.jpg" alt="Triết học Mác – Lênin" fill className="object-cover" />
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                    Triết học Mác – Lênin
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
          <Head>
            <title>Kết quả · Mác – Lênin</title>
          </Head>

          {/* Hero Section */}
          <motion.section 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-lg font-medium text-green-700">🎉 Hoàn thành xuất sắc!</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Kết quả học tập
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dựa trên những lựa chọn của bạn, chúng ta có thể phân tích xu hướng tư duy và hành động
            </p>
          </motion.section>

          {/* Results Card */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header with icon */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
                <div className="flex items-center justify-center">
                  <motion.div 
                    className="text-white"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <VerdictIcon className="w-12 h-12"/>
                  </motion.div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <motion.h2 
                  className={`text-3xl font-bold text-center mb-4 bg-gradient-to-r ${verdictColor} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {verdict}
                </motion.h2>
                
                <p className="text-center text-gray-600 text-lg mb-6">
                  {verdictDescription}
                </p>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100">
                    <motion.div 
                      className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      {countDau}
                    </motion.div>
                    <div className="text-red-600 font-medium">Đấu tranh</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <motion.div 
                      className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      {countIm}
                    </motion.div>
                    <div className="text-blue-600 font-medium">Im lặng</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <motion.div 
                      className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    >
                      {percentage}%
                    </motion.div>
                    <div className="text-purple-600 font-medium">Hành động</div>
                  </div>
                </div>

                {/* Role info */}
                {role && (
                  <motion.div 
                    className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-emerald-700 font-medium">
                      👤 Vai trò: <span className="font-bold capitalize bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {role.replace("-", " ")}
                      </span>
                    </span>
                    {endingByRole && (
                      <div className="text-left mt-4 text-slate-700">
                        <div className="font-semibold mb-1">Gợi ý kết thúc theo vai:</div>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li><span className="font-medium text-emerald-700">Tốt:</span> {endingByRole.good}</li>
                          <li><span className="font-medium text-amber-700">Trung tính:</span> {endingByRole.mixed}</li>
                          <li><span className="font-medium text-rose-700">Xấu:</span> {endingByRole.bad}</li>
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Knowledge Cards */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-3">
                Kiến thức cốt lõi
              </h2>
              <p className="text-gray-600">Những nguyên lý cơ bản của triết học Mác-Lênin</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Thực tiễn và ý thức",
                  content: "Thực tiễn là tiêu chuẩn của chân lý. Hành động tập thể nâng cao ý thức xã hội.",
                  Icon: Target,
                  gradient: "from-red-500 to-pink-500",
                  bgGradient: "from-red-50 to-pink-50",
                  borderColor: "border-red-200"
                },
                {
                  title: "Quan hệ sản xuất",
                  content: "Quan hệ sản xuất định hình điều kiện lao động. Đấu tranh nhằm cải biến cho phù hợp lực lượng sản xuất.",
                  Icon: Cog,
                  gradient: "from-blue-500 to-cyan-500",
                  bgGradient: "from-blue-50 to-cyan-50",
                  borderColor: "border-blue-200"
                },
                {
                  title: "Đấu tranh giai cấp",
                  content: "Mâu thuẫn lợi ích dẫn đến đấu tranh. Tổ chức và đoàn kết là chìa khóa chuyển hoá.",
                  Icon: UsersRound,
                  gradient: "from-green-500 to-emerald-500",
                  bgGradient: "from-green-50 to-emerald-50",
                  borderColor: "border-green-200"
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 border ${card.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="mr-3 text-slate-700"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {card.Icon ? <card.Icon className="w-7 h-7"/> : null}
                    </motion.div>
                    <h3 className={`font-bold text-lg bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {card.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.section 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={reset}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5"/> Chơi lại
              </motion.button>
              
              <Link href="/">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5"/> Trang chủ
                </motion.button>
              </Link>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}