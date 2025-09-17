import Head from "next/head";
import Layout from "@/components/Layout";
import { useGame, Role } from "@/state/GameContext";
import { motion } from "motion/react";
import Link from "next/link";

const ROLES: Exclude<Role, null>[] = ["cong-nhan", "sinh-vien", "nong-dan", "tri-thuc"];

export default function RolePage() {
  const { role, setRole } = useGame();

  return (
    <Layout>
      <Head>
        <title>Chọn vai · Mác – Lênin</title>
      </Head>
      <section className="grid gap-6" data-aos="fade-up">
        <h1 className="text-2xl font-bold">Chọn vai của bạn</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map(r => (
            <motion.button
              key={r}
              type="button"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole(r)}
              className={`rounded-2xl border p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                role === r ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="font-medium capitalize">{r.replace("-", " ")}</div>
              <div className="text-xs text-white/70 mt-1">Nhấn để chọn</div>
            </motion.button>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="/" className="rounded-2xl border border-white/10 px-4 py-2 hover:bg-white/5">Trang chủ</Link>
          <Link href="/s/1" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/15">Bắt đầu tình huống</Link>
        </div>
      </section>
    </Layout>
  );
}
