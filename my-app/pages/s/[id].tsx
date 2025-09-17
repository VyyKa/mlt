import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { SITUATIONS } from "@/data/situations";
import { useEffect, useMemo, useState } from "react";
import ChoiceCard from "@/components/ChoiceCard";
import { useGame } from "@/state/GameContext";
import Link from "next/link";

export default function SituationPage() {
  const router = useRouter();
  const { id } = router.query;
  const numericId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : NaN;
  }, [id]);

  const situation = useMemo(() => SITUATIONS.find(s => s.id === numericId), [numericId]);
  const { choices, setChoice } = useGame();
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

  const nextHref = situation.id < 3 ? `/s/${situation.id + 1}` : "/result";

  const optionTip = showTip && selected
    ? situation.options.find(o => o.key === selected)?.tip
    : null;

  return (
    <Layout>
      <Head>
        <title>Tình huống {situation.id} · Mác – Lênin</title>
      </Head>
      <section className="grid gap-6" data-aos="fade-up">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5" data-aos="zoom-in">
            <Image src={situation.imageSrc} alt={situation.title} width={1200} height={800} className="w-full h-auto object-cover" />
          </div>
          <div className="grid gap-4">
            <h1 className="text-2xl font-bold">{situation.title}</h1>
            <p className="text-white/80">{situation.description}</p>
            <div className="grid gap-3">
              {situation.options.map(opt => (
                <ChoiceCard key={opt.key} label={opt.label} selected={selected === opt.key} onClick={() => handleSelect(opt.key)} />
              ))}
            </div>
            {optionTip && (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm" data-aos="fade-up">
                <div className="font-medium mb-1">Gợi ý giáo dục</div>
                <div className="text-white/80">{optionTip}</div>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <Link href={nextHref} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                {situation.id < 3 ? "Tiếp theo" : "Xem kết quả"}
              </Link>
              <Link href="/" className="rounded-2xl border border-white/10 px-4 py-2 hover:bg-white/5">Trang chủ</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
