import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { useGame } from "@/state/GameContext";
import { motion } from "motion/react";

export default function GameHub() {
  const { choices } = useGame();
  const answered = Object.values(choices).filter(Boolean).length;
  const percent = (answered / 3) * 100;

  return (
    <Layout>
      <Head>
        <title>Khu vực trò chơi · Mác – Lênin</title>
      </Head>

      <section className="grid gap-6" data-aos="fade-up">
        <h1 className="text-3xl font-bold">Khu vực trò chơi</h1>
        <p className="text-slate-700 max-w-2xl">
          Chọn vai, tham gia các tình huống (1 → 3), và xem kết quả tổng kết cuối cùng.
        </p>
        <div className="max-w-xl">
          <ProgressBar percent={percent} />
          <div className="mt-2 text-xs text-slate-600">Tiến độ: {answered}/3 tình huống</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-50 text-slate-900" href="/role">Chọn vai</Link>
          <Link className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-50 text-slate-900" href="/s/1">Bắt đầu Tình huống 1</Link>
          <Link className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-50 text-slate-900" href="/result">Xem kết quả</Link>
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-3 gap-4" data-aos="fade-up">
        {[{
          title: "1. Chọn vai",
          desc: "cong-nhan, sinh-vien, nong-dan, tri-thuc – được lưu để cá nhân hoá."
        }, {
          title: "2. Ra quyết định",
          desc: "Ở mỗi tình huống, chọn ‘đấu tranh’ hoặc ‘im lặng’ – nhận phản hồi giáo dục ngay."
        }, {
          title: "3. Tổng kết",
          desc: "Kết quả phản ánh xu hướng lựa chọn của bạn và cung cấp khối kiến thức then chốt."
        }].map((card) => (
          <motion.div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-4" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="font-semibold mb-1">{card.title}</div>
            <div className="text-sm text-slate-700">{card.desc}</div>
          </motion.div>
        ))}
      </section>
    </Layout>
  );
}
