import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>Không tìm thấy trang · Mác – Lênin</title>
      </Head>
      <section className="grid gap-4 place-items-start" data-aos="fade-up">
        <h1 className="text-2xl font-bold">404 · Không tìm thấy trang</h1>
        <p className="text-white/80">Đường dẫn có thể không đúng hoặc nội dung đã được di chuyển.</p>
        <Link href="/" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/15">Về trang chủ</Link>
      </section>
    </Layout>
  );
}
