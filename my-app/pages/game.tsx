import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { useGame } from "@/state/GameContext";
import { motion } from "motion/react";
import React from "react";
import { UserRound, Rocket, ChartNoAxesColumnIncreasing, GraduationCap, Factory, Sprout, BookOpenText, Scale, UsersRound } from "lucide-react";
import ROLE_SITUATIONS from "@/data/roleSituations";

export default function GameHub() {
  const { choices, role, reset } = useGame();
  const answered = Object.values(choices).filter(Boolean).length;
  const percent = (answered / 6) * 100;
  const totalForRole = 6; // dùng cho thanh tiến độ khi mở rộng

  const ROLE_STORY: Record<string, { badge: string; title: string; desc: string; Icon: any } > = {
    "cong-nhan": {
      badge: "Game Vận Dụng",
      title: "Nhập Vai và Lựa Chọn",
      desc: "Bạn sẽ chọn một vai trò và bạn sẽ phải đưa ra lựa chọn của mình vào các tình huống.\nMỗi vai trò mang đến góc nhìn và cách tiếp cận khác nhau trong việc vận dụng triết học Mác-Lênin vào thực tế.",
      Icon: Factory,
    },
    "sinh-vien": {
      badge: "Chuyện của người sinh viên",
      title: "Tri thức – Hoài nghi – Dấn thân",
      desc: "Bạn đứng giữa áp lực học phí, thực tập và tiếng nói phản biện trong khuôn viên trường.",
      Icon: GraduationCap,
    },
    "nong-dan": {
      badge: "Chuyện của người nông dân",
      title: "Mùa vụ – Giá cả – Hợp tác",
      desc: "Biến động thị trường và chi phí vật tư đẩy bạn vào thế khó. Liệu hợp tác xã có là lối thoát?",
      Icon: Sprout,
    },
    "tri-thuc": {
      badge: "Chuyện của người trí thức",
      title: "Sự thật – Trách nhiệm – Công luận",
      desc: "Bạn nắm trong tay dữ liệu quan trọng về một bất công xã hội. Công bố hay giữ im lặng?",
      Icon: BookOpenText,
    },
  };
  const story = role ? ROLE_STORY[role] : null;

  return (
    <Layout>
      <Head>
        <title>Khu vực trò chơi · Mác – Lênin</title>
      </Head>

      {/* Decorative Background with parallax via data-speed */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div data-speed="0.3" className="will-change-transform absolute -top-24 -left-24 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"/>
        <div data-speed="0.2" className="will-change-transform absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700"/>
        <div data-speed="0.4" className="will-change-transform absolute bottom-0 left-1/4 w-[22rem] h-[22rem] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"/>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="text-center mb-12 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 shadow-sm">
          {story ? (
            <span className="inline-flex items-center gap-2">
              {story.Icon ? React.createElement(story.Icon, { className: "w-4 h-4 text-blue-700" }) : null}
              <span className="text-sm font-medium text-blue-700">{story.badge}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <UsersRound className="w-4 h-4 text-blue-700"/>
              <span className="text-sm font-medium text-blue-700">Khu vực học tập tương tác</span>
            </span>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-40 h-40 bg-white/5 rounded-full blur-2xl"/>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          {story ? story.title : "Khu vực trò chơi"}
        </h1>
        
        <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
          {story ? story.desc : (
            "Hành trình khám phá triết học Mác-Lênin qua các tình huống thực tế. Chọn vai, đưa ra quyết định và học hỏi từ trải nghiệm tương tác."
          )}
        </p>
      </motion.section>

      {/* Progress Section */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Tiến độ học tập</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">{answered}/6 hoàn thành</span>
            </div>
          </div>
          
          <div className="max-w-full mb-3">
            <ProgressBar percent={percent} />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              {percent === 0 && "Bắt đầu hành trình học tập"}
              {percent > 0 && percent < 100 && "Đang tiến bộ tốt!"}
              {percent === 100 && "Hoàn thành xuất sắc! 🎉"}
            </span>
            <span className="text-yellow-600 font-medium">{Math.round(percent)}%</span>
          </div>
        </div>
      </motion.section>

      {/* Continue or Restart Options */}
      {answered > 0 && (
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
              Bạn đã có tiến trình học tập
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/s/${answered + 1}`}>
                <motion.button 
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 Tiếp tục học tập
                </motion.button>
              </Link>
              <motion.button 
                onClick={reset}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🆕 Làm lại từ đầu
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Action Buttons */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/role">
            <motion.div 
              className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg text-white">
                  <UserRound className="w-6 h-6"/>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Chọn vai trò</h3>
                <p className="text-sm text-slate-600">Công nhân, sinh viên, nông dân, hay trí thức?</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/role">
            <motion.div 
              className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg text-white">
                  <Rocket className="w-6 h-6"/>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Bắt đầu học</h3>
                <p className="text-sm text-slate-600">Chọn vai trò để bắt đầu hành trình học tập</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/role">
            <motion.div 
              className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg text-white">
                  <ChartNoAxesColumnIncreasing className="w-6 h-6"/>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Xem kết quả</h3>
                <p className="text-sm text-slate-600">Chọn vai trò để xem kết quả học tập</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* How it Works */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Cách thức hoạt động</h2>
          <p className="text-slate-600">Ba bước đơn giản để bắt đầu hành trình học tập</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Chọn vai trò",
              desc: "Lựa chọn nhân vật phù hợp: công nhân, sinh viên, nông dân, hay trí thức. Vai trò này sẽ ảnh hưởng đến cách tiếp cận các tình huống.",
              icon: "🎭",
              color: "from-red-500 to-pink-500"
            },
            {
              step: "02", 
              title: "Ra quyết định",
              desc: "Đối mặt với các tình huống thực tế, lựa chọn giữa 'đấu tranh' hoặc 'im lặng'. Mỗi quyết định đều có ý nghĩa giáo dục sâu sắc.",
              icon: "⚖️",
              color: "from-blue-500 to-cyan-500"
            },
            {
              step: "03",
              title: "Học hỏi & Tổng kết", 
              desc: "Nhận phản hồi tức thời và khám phá kiến thức triết học Mác-Lênin qua phân tích kết quả tổng hợp.",
              icon: "📚",
              color: "from-green-500 to-emerald-500"
            }
          ].map((item, index) => (
            <motion.div 
              key={item.step}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              {/* Connection line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-white/30 to-transparent z-10"></div>
              )}
              
              <div className="relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 group-hover:shadow-sm">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-xs font-bold mr-3`}>
                    {item.step}
                  </div>
                  <span className="text-2xl">
                    {index === 0 && <UsersRound className="w-6 h-6"/>}
                    {index === 1 && <Scale className="w-6 h-6"/>}
                    {index === 2 && <BookOpenText className="w-6 h-6"/>}
                  </span>
                </div>
                
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </Layout>
  );
}