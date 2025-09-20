import React, { useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "model"; content: string };

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });
      const data = await resp.json();
      const reply: Message = { id: crypto.randomUUID(), role: "model", content: data?.reply ?? "" };
      setMessages((m) => [...m, reply]);
    } catch (e: any) {
      const errMsg: Message = { id: crypto.randomUUID(), role: "model", content: "Xin lỗi, có lỗi xảy ra." };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 z-[60]">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-2 shadow-lg hover:shadow-xl ring-1 ring-white/20 backdrop-blur-sm transition transform hover:-translate-y-0.5"
        aria-expanded={open}
        aria-controls="chatbox"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
        <span className="font-semibold">Trợ lý Triết học Mác–Lênin ✨</span>
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white/80 rounded-full blur-[1px] animate-ping" />
        <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/70 rounded-full blur-[1px] animate-pulse" />
      </button>

      {/* Panel */}
      {open && (
        <div id="chatbox" className="w-[320px] h-[420px] bg-white rounded-3xl border border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-indigo-50 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Xin chào 👋
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center mt-12">Bắt đầu trò chuyện…</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    "inline-block px-3 py-2 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-sm " +
                    (m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800")
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Nhập câu hỏi…"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm disabled:opacity-50 hover:bg-blue-700"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


