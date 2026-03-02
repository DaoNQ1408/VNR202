/**
 * VietInnov-Spark Backend Server
 *
 * A complete Express server for handling chat requests with Google Gemini API
 *
 * Usage:
 * 1. Install dependencies: npm install express cors dotenv @google/generative-ai
 * 2. Create .env file with GOOGLE_API_KEY
 * 3. Run: npx ts-node server.ts
 *
 * OR if using JavaScript:
 * Replace "import" with "require" and remove TypeScript types
 */

import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Note: You'll need to install @google/generative-ai
// npm install @google/generative-ai
let GoogleGenerativeAI: any;
try {
  GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
} catch {
  console.warn(
    "⚠️ @google/generative-ai not installed. Install with: npm install @google/generative-ai",
  );
}

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Gemini API
let model: any = null;

function initializeGemini() {
  try {
    if (!GoogleGenerativeAI) {
      console.error(
        "❌ GoogleGenerativeAI not available. Install with: npm install @google/generative-ai",
      );
      return false;
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("❌ GOOGLE_API_KEY not found in environment variables");
      console.error("   Create a .env file with: GOOGLE_API_KEY=your_key_here");
      return false;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-2.5-flash for optimal performance with advanced reasoning
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("✅ Gemini API initialized successfully (gemini-2.5-flash)");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Gemini API:", error);
    return false;
  }
}

// ============================================================================
// CHAPTER 2 CONTENT (Default fallback)
// ============================================================================

const CHAPTER_2_CONTENT = `
CHƯƠNG 2: ĐẢNG LÃNH ĐẠO XÂY DỰNG, BẢO VỆ CHÍNH QUYỀN CÁCH MẠNG VÀ KHÁNG CHIẾN CHỐNG THỰC DÂN PHÁP XÂM LƯỢC (1945 - 1954)

2.1 XÂY DỰNG VÀ BẢO VỆ CHÍNH QUYỀN CÁCH MẠNG 1945 - 1946

Tình hình đất nước sau Cách mạng Tháng Tám:
- Khó khăn chồng chất: Chính quyền cách mạng non trẻ phải đối mặt với tình thế "ngàn cân treo sợi tóc", cùng lúc đối phó với nạn đói, nạn dốt và bọn thù trong, giặc ngoài. Ở miền Bắc từ vĩ tuyến 16 trở ra, hơn 20 vạn quân Tưởng Giới Thạch kéo vào mang theo âm mưu diệt Cộng, cầm Hồ, phá Việt Minh,. Ở miền Nam, quân đội Anh vào tước vũ khí quân Nhật nhưng thực chất là dọn đường cho thực dân Pháp quay lại xâm lược. Về kinh tế - xã hội, nền tài chính kiệt quệ, kho bạc trống rỗng, công nông nghiệp đình đốn, 95% dân số mù chữ và hậu quả của nạn đói cuối năm 1944 đầu năm 1945 làm 2 triệu người chết đói vẫn còn rất nặng nề.
- Thuận lợi cơ bản: Nhân dân Việt Nam đã giành quyền làm chủ, quyết tâm bảo vệ thành quả cách mạng. Phong trào giải phóng dân tộc và dân chủ trên thế giới dâng cao, đặc biệt là sức mạnh của Liên Xô.

Chủ trương "Kháng chiến kiến quốc":
- Ngày 25-11-1945, Ban Chấp hành Trung ương ban hành Chỉ thị Kháng chiến kiến quốc, xác định kẻ thù chính lúc này là thực dân Pháp.
- Nhiệm vụ bao trùm là củng cố chính quyền chống thực dân Pháp xâm lược ở Nam Bộ, bài trừ nội phản và cải thiện đời sống nhân dân.

Biện pháp thực hiện trên các lĩnh vực:
- Chống giặc đói, giặc dốt và giải quyết khó khăn tài chính: Đảng phát động phong trào "Tuần lễ vàng", lập "Quỹ độc lập" để quyên góp tài sản; thực hiện tăng gia sản xuất, nhường cơm sẻ áo để dập tắt nạn đói. Lập "Nha bình dân học vụ", phát động toàn dân học chữ Quốc ngữ để diệt giặc dốt.
- Xây dựng chế độ mới: Ngày 6-1-1946, tổ chức thành công cuộc Tổng tuyển cử bầu Quốc hội khóa I với sự tham gia của hơn 89% cử tri, bất chấp sự phá hoại của kẻ thù. Ngày 9-11-1946, Quốc hội thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa.
- Sách lược ngoại giao:
  + Với quân Tưởng: Áp dụng sách lược "Hoa - Việt thân thiện", tránh xung đột vũ trang, nhân nhượng cho chúng một số ghế trong Quốc hội và cung cấp lương thực để tập trung lực lượng đối phó với Pháp ở miền Nam.
  + Với quân Pháp: Khi Pháp và Tưởng ký Hiệp ước Hoa - Pháp (28-2-1946) để Pháp thay Tưởng ở miền Bắc, Đảng chuyển sang sách lược hòa hoãn với Pháp để gạt quân Tưởng về nước. Chủ tịch Hồ Chí Minh đã ký với Pháp Hiệp định Sơ bộ (6-3-1946) và sau đó là Tạm ước (14-9-1946), qua đó giành thêm thời gian hòa bình quý báu để chuẩn bị lực lượng cho cuộc kháng chiến tất yếu sẽ xảy ra.

2.2 ĐƯỜNG LỐI KHÁNG CHIẾN TOÀN QUỐC VÀ QUÁ TRÌNH TỔ CHỨC THỰC HIỆN (1946 - 1950)

Sự bùng nổ của cuộc kháng chiến toàn quốc: Dù ta đã nhân nhượng, thực dân Pháp vẫn liên tiếp gây hấn, gửi tối hậu thư đòi tước vũ khí tự vệ của ta ở Hà Nội. Đứng trước giới hạn cuối cùng, đêm 19-12-1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, nhấn mạnh: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ".
Đường lối kháng chiến: Đường lối này được thể hiện qua các văn kiện như Lời kêu gọi toàn quốc kháng chiến, Chỉ thị Toàn dân kháng chiến và tác phẩm Kháng chiến nhất định thắng lợi của Tổng Bí thư Trường Chinh.
- Nội dung cốt lõi là: Kháng chiến toàn dân, toàn diện, lâu dài và dựa vào sức mình là chính.
- Mục tiêu là đánh đổ thực dân Pháp xâm lược, giành nền độc lập, tự do, thống nhất hoàn toàn.

Quá trình tổ chức thực hiện và các bước ngoặt chiến trường:
- Chiến dịch Việt Bắc Thu - Đông (1947): Thực dân Pháp mở cuộc tấn công quy mô lớn lên căn cứ địa Việt Bắc nhằm tiêu diệt cơ quan đầu não kháng chiến. Quân dân ta đã đánh bại cuộc hành quân này, làm phá sản hoàn toàn chiến lược "đánh nhanh, thắng nhanh" của Pháp, buộc chúng phải chuyển sang đánh lâu dài.
- Xây dựng hậu phương: Năm 1948, Đảng phát động phong trào thi đua ái quốc, đẩy mạnh phát triển kinh tế, văn hóa, giáo dục và quốc phòng nhằm bồi dưỡng sức dân.
- Mở rộng ngoại giao: Đầu năm 1950, Việt Nam Dân chủ Cộng hòa chính thức được Trung Quốc, Liên Xô và các nước xã hội chủ nghĩa công nhận, thiết lập quan hệ ngoại giao, phá vỡ thế bao vây cô lập.
- Chiến dịch Biên giới Thu - Đông (1950): Nhằm khai thông biên giới Việt - Trung và mở rộng căn cứ địa, Đảng chủ trương mở Chiến dịch Biên giới. Thắng lợi vang dội của chiến dịch này đã làm phá sản kế hoạch Rơve của Pháp, tạo ra bước ngoặt vĩ đại: chuyển cuộc kháng chiến sang thế tiến công chiến lược.

2.3 ĐẨY MẠNH CUỘC KHÁNG CHIẾN ĐẾN THẮNG LỢI (1951 - 1954)

Đại hội đại biểu toàn quốc lần thứ II của Đảng (2-1951):
- Đại hội quyết định Đảng ra hoạt động công khai lấy tên là Đảng Lao động Việt Nam.
- Đại hội thông qua Chính cương của Đảng Lao động Việt Nam, phân tích tính chất xã hội Việt Nam là dân chủ nhân dân, một phần thuộc địa và nửa phong kiến.
- Nhiệm vụ cách mạng là đánh đuổi đế quốc, giành độc lập và xóa bỏ tàn tích phong kiến, thực hiện "người cày có ruộng", định hướng phát triển lên chủ nghĩa xã hội.

Đẩy mạnh phát triển hậu phương và Cải cách ruộng đất:
- Từ năm 1953, Đảng chủ trương đẩy mạnh phát triển kinh tế, văn hóa và giáo dục. Đặc biệt, Hội nghị Ban Chấp hành Trung ương Đảng (11-1953) đã thông qua Cương lĩnh ruộng đất và Quốc hội chính thức thông qua Luật Cải cách ruộng đất (12-1953). Động thái này đã hiện thực hóa khẩu hiệu "người cày có ruộng", tạo động lực to lớn cho hàng triệu nông dân hăng hái tham gia kháng chiến.

Chiến cuộc Đông Xuân 1953 - 1954 và Chiến dịch Điện Biên Phủ:
- Năm 1953, thực dân Pháp (với sự can thiệp sâu của Mỹ) đề ra Kế hoạch Nava nhằm tìm kiếm một lối thoát danh dự.
- Đảng ta chủ trương mở các cuộc tiến công chiến lược Đông Xuân 1953-1954 nhằm phân tán lực lượng cơ động của địch, buộc chúng phải điều quân đối phó trên nhiều hướng.
- Đỉnh cao là Chiến dịch Điện Biên Phủ. Ngày 13-3-1954, quân ta nổ súng tấn công và trải qua 56 ngày đêm chiến đấu dũng cảm, đến ngày 7-5-1954, tập đoàn cứ điểm mạnh nhất của Pháp đã bị tiêu diệt hoàn toàn. Thắng lợi này đã đập tan Kế hoạch Nava và giáng đòn quyết định vào ý chí xâm lược của thực dân Pháp.

Hội nghị Giơnevơ:
- Dưới sức ép của trận Điện Biên Phủ, ngày 21-7-1954, thực dân Pháp buộc phải ký Hiệp định Giơnevơ.
- Các nước tham dự công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia. Miền Bắc Việt Nam được giải phóng hoàn toàn, tạo cơ sở để tiến lên chủ nghĩa xã hội và làm hậu phương cho cuộc đấu tranh giải phóng miền Nam sau này.

Ý nghĩa lịch sử và kinh nghiệm:
- Ý nghĩa: Chấm dứt ách thống trị của thực dân Pháp, bảo vệ vững chắc thành quả của Cách mạng Tháng Tám, cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên toàn thế giới.
- Kinh nghiệm: Đảng đã đề ra đường lối kháng chiến đúng đắn (toàn dân, toàn diện, tự lực cánh sinh); kết hợp sức mạnh dân tộc với sức mạnh thời đại; xây dựng lực lượng vũ trang ba thứ quân vững mạnh; và chú trọng công tác xây dựng, chỉnh đốn Đảng để nâng cao năng lực lãnh đạo toàn diện.`;

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `Bạn là VietInnov-Spark Assistant, một trợ lý học tập thông minh chuyên giải đáp các vấn đề về lịch sử Việt Nam, đặc biệt là cuộc kháng chiến chống Pháp (1945-1954).

🎯 NGUYÊN TẮC TRẢ LỜI:

1️⃣ LUÔN trả lời dựa trên **Chương 2** của giáo trình Lịch sử Đảng CSVN 2021

2️⃣ Ưu tiên các phần:
   - 2.1: Xây dựng và bảo vệ chính quyền cách mạng 1945 - 1946
   - 2.2: Đường lối kháng chiến toàn quốc và quá trình tổ chức thực hiện 1946 - 1950
   - 2.3: Đẩy mạnh cuộc kháng chiến đến thắng lợi 1951 - 1954

3️⃣ **KHI CÂU HỎI VỀ "CHIẾN DỊCH ĐIỆN BIÊN PHỦ" HOẶC CÁC CHIẾN DỊCH KHÁC:**
   - Phân tích hoàn cảnh lịch sử, bối cảnh chiến dịch
   - Nêu rõ diễn biến chính và các quyết định quan trọng của Đảng
   - Khẳng định ý nghĩa lịch sử của chiến thắng
   - Liên hệ sức mạnh đại đoàn kết toàn dân

4️⃣ **CẤU TRÚC TRẢ LỜI:**
   - **[Tiêu đề rõ ràng]**
   - 🔹 **Bối cảnh:** Giải thích ngắn gọn
   - 🔹 **Ý 1 - Diễn biến/Chủ trương:** Chủ trương của Đảng
   - 🔹 **Ý 2 - Kết quả:** Thắng lợi đạt được
   - 🔹 **Ý 3 - Bài học:** Từ lịch sử
   - 🔹 **Kết luận:** Tóm tắt và nhấn mạnh

5️⃣ **QUYẾT TẮC:**
   - Trả lời RÕRÀNG, NGẮN GỌN, LOGIC
   - Dùng VÍ DỤ CỤ THỂ từ tài liệu
   - TRÁNH suy đoán ngoài tài liệu
   - Luôn dẫn chứng từ giáo trình

6️⃣ **NẾU KHÔNG CÓ THÔNG TIN:**
   "Thông tin này chưa được cung cấp trong tài liệu Chương 2."

💡 **MỤC TIÊU:** Giúp hiểu sâu Chương 2, nắm rõ lịch sử xây dựng, bảo vệ chính quyền và kháng chiến chống Pháp (1945-1954) của dân tộc Việt Nam.`;

// ============================================================================
// CHAT ENDPOINT
// ============================================================================

interface ChatRequest {
  message: string;
  conversationHistory?: { role: string; content: string }[];
}

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body as ChatRequest;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    if (!model) {
      return res.status(503).json({
        error: "Chat service unavailable",
        response:
          "Xin lỗi, dịch vụ chat không khả dụng. Vui lòng kiểm tra cấu hình API.",
      });
    }

    // Build full prompt
    const fullPrompt = `${SYSTEM_PROMPT}

=== NỘI DUNG TÀI LIỆU CHƯƠNG 2 ===
${CHAPTER_2_CONTENT}

=== CÂU HỎI CỦA NGƯỜI DÙNG ===
${message}`;

    // Call Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const responseText = response.text();

    res.json({
      response: responseText,
      sources: [
        "Giáo trình Lịch sử Đảng CSVN 2021 - NXB Chính trị Quốc gia, Chương 2",
      ],
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      error: "Failed to process chat request",
      message: errorMessage,
      response:
        "Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.",
    });
  }
});

// ============================================================================
// HEALTH CHECK & INFO ENDPOINTS
// ============================================================================

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "VietInnov-Spark Backend",
    apiStatus: model ? "Ready" : "Not configured",
  });
});

app.get("/api/info", (req: Request, res: Response) => {
  res.json({
    name: "VietInnov-Spark Assistant",
    version: "1.0.0",
    description:
      "Learning assistant for Vietnam's Resistance War against French (1945-1954)",
    focus:
      "Chapter 2: Party Leadership in the Resistance War against French Colonialism 1945-1954",
    endpoints: {
      chat: "POST /api/chat",
      health: "GET /health",
      info: "GET /api/info",
    },
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Endpoint not found",
    availableEndpoints: {
      POST: ["/api/chat"],
      GET: ["/health", "/api/info"],
    },
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

const startServer = () => {
  const geminiReady = initializeGemini();

  const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        🚀 VietInnov-Spark Backend Server Started                  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

📡 Server running on: http://localhost:${PORT}
🔗 API Endpoints:
   - Chat: POST   http://localhost:${PORT}/api/chat
   - Health: GET  http://localhost:${PORT}/health
   - Info: GET    http://localhost:${PORT}/api/info

📚 Ready to answer questions about Vietnam's Resistance War against French (1945-1954)
${geminiReady ? "✅" : "⚠️"} Gemini API: ${geminiReady ? "Connected" : "Not configured - set GOOGLE_API_KEY"}

💡 Frontend proxy configuration:
   Add to vite.config.ts:
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:${PORT}',
         changeOrigin: true
       }
     }
   }
        `);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("\n📋 Gracefully shutting down server...");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
};

startServer();

export {};
