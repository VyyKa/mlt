import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { GameProvider } from "@/state/GameContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 24, easing: "ease-out" });
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    let lenis: any;
    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenis = new Lenis({
          duration: 1.1,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        } as any);
        function raf(time: number) {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch {}
    })();
    return () => {
      try { lenis?.destroy?.(); } catch {}
    };
  }, []);

  useEffect(() => {
    const onRoute = () => {
      try {
        AOS.refreshHard();
      } catch {
        try {
          AOS.refresh();
        } catch {}
      }
    };
    router.events.on("routeChangeComplete", onRoute);
    return () => router.events.off("routeChangeComplete", onRoute);
  }, [router.events]);

  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
