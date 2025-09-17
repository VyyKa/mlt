import Head from "next/head";
import Layout from "@/components/Layout";
import { useGame } from "@/state/GameContext";
import InfoCard from "@/components/InfoCard";
import Link from "next/link";

export default function ResultPage() {
  const { choices, reset } = useGame();
  const vals = Object.values(choices).filter(Boolean) as ("dau-tranh" | "im-lang")[];
  const countDau = vals.filter(v => v === "dau-tranh").length;
  const countIm = vals.filter(v => v === "im-lang").length;

  let verdict = "Bạn do dự…";
  if (countDau === 3) verdict = "Bạn kiên định, dám hành động.";
  else if (countIm === 3) verdict = "Bạn chọn nằm yên…";

  return (
    <Layout>
      <Head>
        <title>Kết quả · Mác – Lênin</title>
      </Head>
      <section className="grid gap-6" data-aos="fade-up">
        <h1 className="text-2xl font-bold">Kết quả</h1>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold">Nhận định</div>
          <div className="text-white/80">{verdict}</div>
          <div className="text-xs text-white/60 mt-2">Đấu tranh: {countDau} · Im lặng: {countIm}</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard title="Thực tiễn và ý thức">
            Thực tiễn là tiêu chuẩn của chân lý. Hành động tập thể nâng cao ý thức xã hội.
          </InfoCard>
          <InfoCard title="Quan hệ sản xuất">
            Quan hệ sản xuất định hình điều kiện lao động. Đấu tranh nhằm cải biến cho phù hợp lực lượng sản xuất.
          </InfoCard>
          <InfoCard title="Đấu tranh giai cấp">
            Mâu thuẫn lợi ích dẫn đến đấu tranh. Tổ chức và đoàn kết là chìa khóa chuyển hoá.
          </InfoCard>
        </div>
        <div className="flex gap-3">
          <button onClick={reset} className="rounded-2xl border border-white/10 px-4 py-2 hover:bg-white/5">Chơi lại</button>
          <Link href="/" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/15">Trang chủ</Link>
        </div>
      </section>
    </Layout>
  );
}
