import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { motion } from "motion/react";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Web Game Triết học Mác – Lênin</title>
      </Head>

      {/* Hero */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center" data-aos="fade-up">
        <div className="grid gap-5">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Khám phá Triết học
            <span className="ml-2 bg-clip-text text-transparent bg-[linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#06b6d4,#8b5cf6)]">Mác – Lênin</span>
          </h1>
          <p className="text-slate-700 text-lg max-w-2xl">
            Từ thực tiễn lao động đến ý thức giai cấp, trải nghiệm các tình huống và
            ra quyết định để hiểu sâu hơn về tinh thần đấu tranh, đoàn kết và biến đổi xã hội.
          </p>
          <div className="flex flex-wrap gap-3" data-aos="zoom-in">
            <Link
              className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 text-slate-900"
              href="/game"
            >
              Vào khu vực trò chơi
            </Link>
            <a
              className="rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-2.5 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-emerald-700"
              href="https://drive.google.com/file/d/1XXoB6uXxSgL_diEXqH6Z7o8VoEZTtvJB/view?usp=sharing"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tải giáo trình
            </a>
          </div>
        </div>
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <Image src="/images/s2_protest.jpg" alt="Biểu tình tập thể" width={1200} height={900} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* About Marxism–Leninism */}
      <section className="mt-12 grid md:grid-cols-3 gap-6" data-aos="fade-up">
        <motion.div className="rounded-2xl border border-slate-200 bg-white p-5" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <h3 className="text-lg font-semibold mb-2 text-slate-900">Thế giới quan khoa học</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Triết học Mác – Lênin cung cấp thế giới quan duy vật biện chứng, coi thực tiễn là nền tảng và tiêu chuẩn của chân lý.
          </p>
        </motion.div>
        <motion.div className="rounded-2xl border border-slate-200 bg-white p-5" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <h3 className="text-lg font-semibold mb-2 text-slate-900">Quan hệ sản xuất</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Mối quan hệ giữa lực lượng sản xuất và quan hệ sản xuất quyết định cấu trúc xã hội; đấu tranh nhằm phù hợp quy luật phát triển.
          </p>
        </motion.div>
        <motion.div className="rounded-2xl border border-slate-200 bg-white p-5" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <h3 className="text-lg font-semibold mb-2 text-slate-900">Đấu tranh giai cấp</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Ý thức và tổ chức giai cấp là động lực chuyển hoá; đoàn kết tập thể tạo sức mạnh thay đổi hiện thực.
          </p>
        </motion.div>
      </section>

      {/* YouTube Lecture */}
      <section className="mt-12 grid gap-4" data-aos="fade-up">
        <h2 className="text-xl font-bold text-slate-900">Video bài giảng tham khảo</h2>
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/hGdlvORHKGg"
            title="Video bài giảng"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* Image Gallery */}
      <section className="mt-12 grid gap-6" data-aos="fade-up">
        <h2 className="text-xl font-bold text-slate-900">Thư viện hình ảnh</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["/images/s1_factory.jpg", "/images/s2_protest.jpg", "/images/s3_paycut.jpg", "/images/s2_protest.jpg", "/images/s1_factory.jpg", "/images/s3_paycut.jpg"].map((src, i) => (
            <motion.div
              key={src + i}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image src={src} alt="Thư viện hình ảnh" width={900} height={700} className="w-full h-48 object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Row */}
      <section className="mt-12 flex flex-wrap gap-3" data-aos="zoom-in">
        <Link className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-50 text-slate-900" href="/game">Vào khu vực trò chơi</Link>
        <a className="rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-2.5 hover:bg-emerald-100 text-emerald-700" href="https://drive.google.com/file/d/1XXoB6uXxSgL_diEXqH6Z7o8VoEZTtvJB/view?usp=sharing" target="_blank" rel="noreferrer noopener">Giáo trình (Google Drive)</a>
      </section>
    </Layout>
  );
}
