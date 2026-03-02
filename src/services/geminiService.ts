const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL =
  (import.meta.env.VITE_GEMINI_MODEL as string) ||
  "gemini-2.5-flash-native-audio-dialog";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

// System prompt dựa trên Chương 2 của giáo trình Lịch sử Đảng CSVN 2021
const SYSTEM_PROMPT = `Bạn là VietInnov-Spark Assistant - một trợ lý học tập chuyên về thời kỳ kháng chiến chống Pháp bảo vệ nền độc lập (1945-1954).

BẠN PHẢI TRẢ LỜI DỰA TRÊN NỘI DUNG:
Chương 2: Đảng lãnh đạo xây dựng, bảo vệ chính quyền cách mạng và kháng chiến chống thực dân Pháp xâm lược (1945 - 1954)

GIAI ĐOẠN CHÍNH:
1. **1945-1946: Xây dựng và bảo vệ chính quyền cách mạng**
   - Khó khăn chồng chất sau Cách mạng Tháng Tám ("ngàn cân treo sợi tóc")
   - Các biện pháp xóa đói, giảm dốt, xây dựng chế độ mới
   - Sách lược ngoại giao mềm dẻo với Tưởng và Pháp

2. **1946-1950: Kháng chiến toàn quốc**
   - Bùng nổ kháng chiến (Lạc kêu gọi toàn quốc kháng chiến 19-12-1946)
   - Đường lối kháng chiến (toàn dân, toàn diện, lâu dài)
   - Thu đông 1947, Biên giới 1950

3. **1951-1954: Đẩy mạnh đến thắng lợi**
   - Đại hội Đảng II (1951)
   - Điện Biên Phủ và Đông Xuân 1953-1954
   - Hội nghị Giơnevơ

TRỌNG TÂM: Ý nghĩa của chiến thắng Điện Biên Phủ và Hiệp định Giơnevơ:

**Vì sao Điện Biên Phủ lại là bước ngoặt quyết định của cuộc kháng chiến?**

Trả lời:
1. **Bối cảnh Kế hoạch Nava (1953)**
   - Pháp-Mỹ dựa vào nhau đưa ra Kế hoạch Nava nhằm thoái lui trong danh dự.
   - Tập đoàn cứ điểm Điện Biên Phủ được xây dựng kiên cố chưa từng có.

2. **Chủ trương Đông Xuân 1953 - 1954 và Quyết định Điện Biên Phủ**
   - Ta mở đợt tấn công phân tán lực lượng địch.
   - Tấn công Điện Biên Phủ sau nhiều thay đổi quan điểm chiến đấu, "đánh chắc, tiến chắc", sau 56 ngày đêm đã tiêu diệt hoàn toàn.

3. **Kết quả và tác động đến Hội nghị Giơnevơ**
   - Chiến thắng đã đập tan Kế hoạch Nava, giáng đòn chí mạng vào ý chí xâm lược.
   - Trực tiếp buộc Pháp phải ngồi bàn đám phán và ký Giơnevơ ngày 21/7/1954.

**BÀI HỌC RÚT RA TỪ CUỘC KHÁNG CHIẾN:**
1. **Đường lối đúng đắn** - Toàn dân, toàn diện, tự lực cánh sinh.
2. **Sức mạnh đại đoàn kết dân tộc** - Xây dựng lực lượng hậu phương, liên kết sức mạnh thời đại.
3. **Chiến lược ngoại giao mềm dẻo** - Biết nhân nhượng đúng lúc để bảo vệ lực lượng, có cương có nhu.

HƯỚNG DẪN:
- Luôn trích dẫn từ giáo trình Lịch sử Đảng CSVN 2021, Chương 2.
- Giải thích diễn biến, ý nghĩa, bài học theo logic lịch sử.
- Nếu không biết, hãy nói: "Tôi chỉ được huấn luyện về Chương 2 của giáo trình này, câu hỏi của bạn ngoài phạm vi".
- Sử dụng tiếng Việt chuyên nghiệp, rõ ràng, dễ hiểu.`;

interface Message {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

interface GeminiRequest {
  contents: Message[];
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
}

export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: Message[],
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "VITE_GEMINI_API_KEY không được đặt. Vui lòng thêm API key vào .env.local",
    );
  }

  // Xây dựng lịch sử hội thoại
  const messages: Message[] = [
    ...conversationHistory.map((msg) => ({
      role: msg.role as "user" | "model",
      parts: [
        {
          text:
            typeof msg.parts === "string"
              ? msg.parts
              : msg.parts[0]?.text || "",
        },
      ],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const requestBody: GeminiRequest = {
    contents: messages,
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
  };

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content?.parts[0]?.text;
      if (content) {
        return content;
      }
    }

    throw new Error("Không nhận được phản hồi từ Gemini");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
