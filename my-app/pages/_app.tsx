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
