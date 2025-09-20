import Head from "next/head";
import Layout from "@/components/Layout";
import { useGame, Role } from "@/state/GameContext";
import { motion } from "motion/react";
import Link from "next/link";
import { BadgeCheck, BookOpenText, Factory, GraduationCap, Sprout } from "lucide-react";

const ROLES: Exclude<Role, null>[] = ["cong-nhan", "sinh-vien", "nong-dan", "tri-thuc"];

const ROLE_DATA = {
  "cong-nhan": {
    title: "Công nhân",
    icon: "🏭",
    description: "Đại diện cho tầng lớp lao động, những người tạo ra của cải xã hội qua lao động chân tay.",
    characteristics: ["Gắn bó với lao động sản xuất", "Tinh thần đoàn kết cao", "Ý thức giai cấp mạnh mẽ"],
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-600/20 to-indigo-600/20",
    borderColor: "border-blue-500/30 hover:border-blue-400/50"
  },
  "sinh-vien": {
    title: "Sinh viên", 
    icon: "🎓",
    description: "Thế hệ trẻ đang học tập, khát khao tri thức và có tầm nhìn tương lai tiến bộ.",
    characteristics: ["Ham học hỏi", "Tư duy phản biện", "Nhiệt huyết cách mạng"],
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-600/20 to-emerald-600/20", 
    borderColor: "border-green-500/30 hover:border-green-400/50"
  },
  "nong-dan": {
    title: "Nông dân",
    icon: "🌾", 
    description: "Người lao động nông nghiệp, gắn bó với đất đai và có truyền thống yêu nước lâu đời.",
    characteristics: ["Gần gũi với thiên nhiên", "Cần cù, chịu thương chịu khó", "Tinh thần cộng đồng"],
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-600/20 to-orange-600/20",
    borderColor: "border-yellow-500/30 hover:border-yellow-400/50"
  },
  "tri-thuc": {
    title: "Trí thức",
    icon: "📚",
    description: "Người có học thức, am hiểu lý thuyết và có khả năng phân tích, tổng hợp kiến thức.",
    characteristics: ["Hiểu biết sâu rộng", "Tư duy logic", "Khả năng phân tích cao"],
    gradient: "from-purple-500 to-pink-600", 
    bgGradient: "from-purple-600/20 to-pink-600/20",
    borderColor: "border-purple-500/30 hover:border-purple-400/50"
  }
};

export default function RolePage() {
  const { role, setRole } = useGame();

  return (
    <Layout>
      <Head>
        <title>Chọn vai · Mác – Lênin</title>
      </Head>

      {/* Hero Section */}
      <motion.section 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
          <span className="text-sm font-medium text-purple-700">👤 Lựa chọn nhân vật</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Chọn vai trò của bạn
        </h1>
        
        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Mỗi vai trò mang đến góc nhìn và trải nghiệm khác nhau trong việc tiếp cận triết học Mác-Lênin. 
          Hãy chọn nhân vật phù hợp với bạn!
        </p>
      </motion.section>

      {/* Current Selection */}
      {role && (
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 font-medium">
                Đã chọn: <span className="text-slate-900">{ROLE_DATA[role].title}</span> {ROLE_DATA[role].icon}
              </span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Role Selection Grid */}
      <motion.section 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((r, index) => {
            const roleData = ROLE_DATA[r];
            const isSelected = role === r;
            
            return (
              <motion.button
                key={r}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRole(r)}
                className={`group relative p-6 bg-gradient-to-br ${roleData.bgGradient} rounded-2xl border ${
                  isSelected 
                    ? "border-emerald-400/50 ring-2 ring-emerald-400/30" 
                    : `${roleData.borderColor} hover:shadow-xl`
                } transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${roleData.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${roleData.gradient} rounded-2xl flex items-center justify-center shadow-lg mr-4 text-white`}>
                      {r === "cong-nhan" && <Factory className="w-8 h-8" />}
                      {r === "sinh-vien" && <GraduationCap className="w-8 h-8" />}
                      {r === "nong-dan" && <Sprout className="w-8 h-8" />}
                      {r === "tri-thuc" && <BookOpenText className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1">{roleData.title}</h3>
                      <span className="text-sm text-slate-600 italic">Nhấn để chọn vai trò này</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {roleData.description}
                  </p>

                  {/* Characteristics */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Đặc điểm nổi bật:</h4>
                    <ul className="space-y-1">
                      {roleData.characteristics.map((char, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center">
                          <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Selection pulse effect */}
                {isSelected && (
                  <motion.div 
                    className="absolute inset-0 border-2 border-emerald-400/50 rounded-2xl"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0.4)",
                        "0 0 0 10px rgba(16, 185, 129, 0)",
                        "0 0 0 0 rgba(16, 185, 129, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Action Buttons */}
      <motion.section 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link href="/">
          <motion.button 
            className="px-6 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Về trang chủ
          </motion.button>
        </Link>
        
        <Link href="/s/1">
          <motion.button 
            className={`px-8 py-3 rounded-2xl font-medium transition-all duration-300 ${
              role 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg hover:shadow-xl" 
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={role ? { scale: 1.05 } : {}}
            whileTap={role ? { scale: 0.95 } : {}}
            disabled={!role}
          >
            {role ? "Bắt đầu tình huống →" : "Hãy chọn vai trò trước"}
          </motion.button>
        </Link>
      </motion.section>

      {/* Instructions */}
      <motion.section 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <p className="text-sm text-slate-700">
            💡 <strong>Mẹo:</strong> Vai trò bạn chọn sẽ ảnh hưởng đến cách tiếp cận và phản hồi trong các tình huống học tập. Hãy chọn vai trò phù hợp để có trải nghiệm tốt nhất!
          </p>
        </div>
      </motion.section>
    </Layout>
  );
}