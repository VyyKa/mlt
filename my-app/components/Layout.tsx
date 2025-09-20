import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatBox from "../components/ChatBox";
import { Menu, Home, Gamepad2, UserRound, BookOpenText, Mail, Info, Heart } from "lucide-react";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden">
      
      {/* Mouse follower light effect */}
      <div 
        className="fixed pointer-events-none z-30 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-radial from-white/30 to-transparent transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      
      
      {children}
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  type NavItem = { href: string; label: string; icon?: any; primary?: boolean };
  const navLinks: NavItem[] = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/game", label: "Trò chơi & Vai trò", icon: Gamepad2 },
  ];

  const isActive = (path: string) => router.pathname === path;

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wrapper>
      {/* Header with enhanced glassmorphism */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'backdrop-blur-2xl bg-slate-900/80 shadow-2xl border-b border-white/20' 
          : 'backdrop-blur-xl bg-slate-900/60 border-b border-white/10'
      }`}>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo/Brand */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/anh1.jpg" alt="Triết học Mác – Lênin" fill className="object-cover" />
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="font-bold text-xl text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Triết học Mác – Lênin
                </h1>
                <p className="text-xs text-gray-300 animate-fade-in-up">Hệ thống học tập tương tác</p>
              </div>
            </Link>
            
            {/* Enhanced Navigation */}
            <nav className={`hidden md:flex items-center space-x-2 transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {navLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative px-5 py-3 text-sm font-medium rounded-xl transition-all duration-500 transform hover:scale-105 group overflow-hidden",
                    item.primary
                      ? "bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 shadow-xl hover:shadow-2xl text-white animate-gradient-x"
                      : "text-gray-200 hover:text-white hover:bg-white/10",
                    !item.primary && isActive(item.href)
                      ? "bg-white/15 ring-2 ring-white/30 shadow-lg"
                      : "",
                  ].join(" ")}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {!item.primary && item.icon ? React.createElement(item.icon, { className: "w-4 h-4" }) : null}
                    <span>{item.label}</span>
                  </span>
                  {!item.primary && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </>
                  )}
                  {item.primary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Enhanced Mobile menu button */}
            <button
              aria-label="Mở menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-red-500/50 animate-gradient-x"></div>
        
        {/* Enhanced Mobile navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 border-t border-white/10 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/60 backdrop-blur-2xl">
            <div className="mx-auto max-w-6xl px-6 py-4 space-y-3">
              {navLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={[
                    "flex items-center space-x-3 w-full px-5 py-4 rounded-xl text-sm transition-all duration-500 transform hover:scale-105 group",
                    item.primary
                      ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-xl"
                      : "text-gray-200 bg-white/5 hover:bg-white/15 backdrop-blur-sm",
                    !item.primary && isActive(item.href)
                      ? "ring-2 ring-white/30 shadow-lg"
                      : "",
                  ].join(" ")}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
                  }}
                >
                  <span className="text-lg group-hover:animate-bounce">
                    {!item.primary && item.icon ? React.createElement(item.icon, { className: "w-5 h-5" }) : null}
                  </span>
                  <span>{item.label}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Enhanced Main content area */}
      <main className={`relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-12 transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl min-h-96 p-8 transition-all duration-500 hover:shadow-3xl hover:border-gray-300/50 group overflow-hidden">
          {/* Content area decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100/50 to-transparent rounded-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100/50 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 group-hover:to-blue-50/40 transition-all duration-1000"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/30 bg-gradient-to-br from-black/40 to-slate-900/60 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-yellow-500/5"></div>
        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Academic Project Information */}
            <div className="group">
              <h3 className="font-bold text-xl mb-4 text-white inline-flex items-center gap-2"><BookOpenText className="w-5 h-5"/>Dự án học thuật</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium text-gray-200">Môn:</span> Triết học Mác-Lênin (MLN111)</p>
                <p><span className="font-medium text-gray-200">Trường:</span> Đại học FPT</p>
                <p><span className="font-medium text-gray-200">Học kỳ:</span> Fall 2025</p>
              </div>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
            
            {/* Group Information */}
            <div className="group">
              <h3 className="font-bold text-xl mb-4 text-white inline-flex items-center gap-2"><UserRound className="w-5 h-5"/>Thông tin nhóm</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium text-gray-200">Nhóm:</span> Group 4</p>
                <div className="space-y-1">
                  <p className="font-medium text-gray-200">Thành viên:</p>
                  <ul className="ml-2 space-y-1 text-xs">
                    <li>• Hồ Tài Liên Vy Kha</li>
                    <li>• Cung Nguyễn Bích Trâm</li>
                    <li>• Bùi Ngô Ngọc Bảo</li>
                    <li>• Phạm Thành Trung</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
            
            {/* Instructor Information */}
            <div className="group">
              <h3 className="font-bold text-xl mb-4 text-white inline-flex items-center gap-2"><Mail className="w-5 h-5"/>Giảng viên</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium text-gray-200">Hướng dẫn:</span> PhuongNT316</p>
                <p className="text-xs text-gray-400 mt-3">
                  Cảm ơn thầy đã hướng dẫn và hỗ trợ nhóm trong quá trình thực hiện dự án.
                </p>
              </div>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
          </div>
          
          {/* Enhanced Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-xs text-gray-400">
              © 2025 - Sản phẩm sáng tạo MLN111 - Nhóm 4 - FPT University
            </p>
            <div className="flex items-center space-x-3 group">
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors inline-flex items-center gap-1">Made with <Heart className="w-4 h-4 text-red-400"/> in Vietnam</span>
              <div className="ml-4 flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ChatBox />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </Wrapper>
  );
}