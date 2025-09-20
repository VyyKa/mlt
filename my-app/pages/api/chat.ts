import type { NextApiRequest, NextApiResponse } from "next";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

const MODEL = "gemini-1.5-flash"; // fast and affordable

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server missing GOOGLE_API_KEY" });
  }

  try {
    const { messages } = req.body as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages[] required" });
    }

    // System-style guardrails: restrict scope to philosophy + game guide
    const systemInstruction =
      [
        "Bạn là Trợ lý Triết học của website này.",
        "Phạm vi: (1) Triết học (ưu tiên Mác–Lênin) và các khái niệm nền tảng; (2) Hướng dẫn cách chơi/luật chơi/chiến lược trong web game này.",
        "Nếu câu hỏi nằm ngoài phạm vi: từ chối lịch sự (1 câu) và gợi ý người dùng hỏi về triết học hoặc cách chơi.",
        "Phong cách: ngắn gọn, rõ ràng, tiếng Việt; khi có thể đưa ví dụ gắn với các lựa chọn 'Đấu tranh/Im lặng'.",
        "Định dạng: dùng bullet khi liệt kê; tránh ký hiệu markdown phức tạp.",
        "Khi người dùng hỏi 'bạn là ai' → nêu vai trò Trợ lý Triết học và phạm vi hỗ trợ.",
      ].join(" ");

    // Compact in-context guide so the assistant luôn có tài liệu ngắn
    const gameGuide =
      "Hướng dẫn nhanh: Vào 'Trò chơi & Vai trò' → chọn vai (công nhân/sinh viên/nông dân/trí thức). Mỗi tình huống chọn 'Đấu tranh' hoặc 'Im lặng'. 'Đấu tranh' +1 Tinh thần; 'Im lặng' +1 Sợ hãi. Kết thúc: Tinh thần>Sợ hãi = ending tốt; ngược lại = ending xấu; hoà = trung tính. Sau mỗi lựa chọn, giải thích khái niệm triết học liên quan (đấu tranh giai cấp, thực tiễn–nhận thức, tất nhiên–ngẫu nhiên, v.v.).";

    // Convert to Gemini content parts
    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      { role: "user", parts: [{ text: gameGuide }] },
      ...messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content.substring(0, 8000) }],
      })),
    ];

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(500).json({ error: "Gemini error", detail: text });
    }

    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return res.status(200).json({ reply: text });
  } catch (err: any) {
    return res.status(500).json({ error: "Unexpected error", detail: String(err?.message ?? err) });
  }
}


