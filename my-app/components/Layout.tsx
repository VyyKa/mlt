import Link from "next/link";
import React from "react";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-white text-slate-900">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(0,0,0,0.04),_transparent_40%),_radial-gradient(circle_at_80%_20%,_rgba(0,0,0,0.03),_transparent_35%)]" aria-hidden />
    <div className="pointer-events-none fixed inset-0 bg-[url('/grid.svg')] opacity-[0.03]" aria-hidden />
    {children}
  </div>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            Web Game Triết học Mác – Lênin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link className="hover:underline" href="/">Trang chủ</Link>
            <Link className="hover:underline" href="/game">Khu vực trò chơi</Link>
            <Link className="hover:underline" href="/role">Chọn vai</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="mt-12 border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-600">
          © {new Date().getFullYear()} Triết học Mác – Lênin · Xây dựng với Next.js, Tailwind, AOS, Motion
        </div>
      </footer>
    </Wrapper>
  );
}
