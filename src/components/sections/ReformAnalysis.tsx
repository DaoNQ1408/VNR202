import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabContent {
  id: string;
  title: string;
  icon: string;
  image: string | null;
  content: string[];
}

const ReformAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("context");

  const tabs: TabContent[] = [
    {
      id: "context",
      title: "Bối Cảnh Sau 1945",
      icon: "📊",
      image: null,
      content: [
        "🔴 Chính quyền non trẻ đối mặt 'ngàn cân treo sợi tóc'",
        "🔴 Giặc đói, giặc dốt đe dọa sinh mệnh dân tộc",
        "🔴 Hơn 20 vạn quân Tưởng kéo vào miền Bắc",
        "🔴 Thực dân Pháp âm mưu quay lại xâm lược",
        "🔴 Ngân khố trống rỗng, nền kinh tế kiệt quệ",
      ],
    },
    {
      id: "reform",
      title: "Toàn Quốc Kháng Chiến",
      icon: "🚀",
      image: "/img/daihoiVI_color.jpg", // Tạm dùng ảnh cũ, có thể thay đổi sau
      content: [
        "✨ Quyết định: Lời kêu gọi toàn quốc kháng chiến (12/1946)",
        "✨ Đường lối: Kháng chiến toàn dân, toàn diện",
        "✨ Phương châm: Lâu dài, tự lực cánh sinh",
        "✨ Xây dựng lực lượng vũ trang 3 thứ quân",
        "✨ Kết hợp đấu tranh quân sự, chính trị, ngoại giao",
      ],
    },
    {
      id: "impact",
      title: "Đại Thắng 1954",
      icon: "⚡",
      image: "/img/chutruongdoimoi.png", // Tạm dùng ảnh cũ
      content: [
        "✅ Đập tan âm mưu 'đánh nhanh thắng nhanh' của Pháp",
        "✅ Chiến thắng Việt Bắc 1947, Biên giới 1950",
        "✅ Đại thắng Điện Biên Phủ 'lừng lẫy năm châu'",
        "✅ Ký Hiệp định Giơnevơ (1954)",
        "✅ Bảo vệ thành công quyền độc lập thiêng liêng",
      ],
    },
    {
      id: "lesson",
      title: "Bài Học Lịch Sử",
      icon: "📚",
      image: null,
      content: [
        "💡 Đường lối kháng chiến đúng đắn, sáng tạo",
        "💡 Phát huy sức mạnh khối đại đoàn kết toàn dân tộc",
        "💡 Xây dựng lực lượng vũ trang nhân dân vững mạnh",
        "💡 Kết hợp sức mạnh dân tộc với sức mạnh thời đại",
        "💡 Ngoại giao mềm dẻo, có cương có nhu",
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section
      id="reform-analysis"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--off-white)" }}
    >
      {/* Vintage Border Decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--vietnam-red)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--vietnam-red)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 text-sm font-semibold mb-4 border-2"
            style={{
              backgroundColor: "var(--parchment-dark)",
              color: "var(--vietnam-red)",
              borderColor: "var(--vietnam-red)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Phần 3.2.1 - Thuyết Trình
          </motion.span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--ink-black)" }}
          >
            <span style={{ color: "var(--vietnam-red)" }}>
              Kháng Chiến Chống Pháp 1945 - 1954
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Bảo vệ quyền <strong>độc lập</strong> tự do thiêng liêng, đập tan âm
            mưu <strong>xâm lược</strong> của thực dân Pháp và kết thúc bằng
            chiến thắng <strong>Điện Biên Phủ</strong>
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all border-2 ${
                activeTab === tab.id ? "shadow-xl" : "shadow-md"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? "var(--vietnam-red)"
                    : "var(--vietnam-white)",
                color:
                  activeTab === tab.id
                    ? "var(--vietnam-white)"
                    : "var(--ancient-stone)",
                borderColor:
                  activeTab === tab.id
                    ? "var(--vietnam-gold)"
                    : "var(--ancient-stone)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div
              className="shadow-xl rounded-2xl p-8 border-4"
              style={{
                backgroundColor: "var(--vietnam-white)",
                borderColor: "var(--vietnam-gold)",
              }}
            >
              {/* Image Display - Show when tab has image */}
              {currentTab.image && (
                <motion.div
                  className="mb-8 relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Vietnamese pattern background */}
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd700' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Double gold frame */}
                  <div
                    className="relative rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      border: "4px solid var(--vietnam-gold)",
                      boxShadow:
                        "0 0 0 2px var(--vietnam-red), 0 0 0 6px var(--vietnam-gold), 0 20px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <motion.img
                      src={currentTab.image}
                      alt={currentTab.title}
                      className="w-full h-72 md:h-96 object-cover object-center"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                    />

                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Image caption with gold accent */}
                  <div
                    className="mt-3 py-3 px-6 text-center font-semibold rounded-lg shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--vietnam-red) 0%, #8b1a1a 100%)",
                      color: "var(--vietnam-white)",
                      borderLeft: "4px solid var(--vietnam-gold)",
                      borderRight: "4px solid var(--vietnam-gold)",
                    }}
                  >
                    {currentTab.id === "reform"
                      ? "Phát động toàn quốc kháng chiến - Tháng 12/1946"
                      : "Chủ trương đường lối Kháng chiến toàn quốc"}
                  </div>
                </motion.div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="text-5xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentTab.icon}
                </motion.div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: "var(--ink-black)" }}
                >
                  {currentTab.title}
                </h3>
              </div>

              <div className="space-y-4">
                {currentTab.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:shadow-md transition-all border-2"
                    style={{
                      backgroundColor: "var(--vietnam-white)",
                      borderColor: "var(--parchment-dark)",
                    }}
                  >
                    <motion.div
                      className="text-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {item.split(" ")[0]}
                    </motion.div>
                    <p
                      className="text-lg flex-1"
                      style={{ color: "var(--ancient-stone)" }}
                    >
                      {item.split(" ").slice(1).join(" ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary Box */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="rounded-2xl shadow-2xl p-8 border-4"
            style={{
              backgroundColor: "var(--vietnam-red)",
              color: "var(--vietnam-white)",
              borderColor: "var(--vietnam-gold)",
            }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span>Ý Nghĩa Lịch Sử
            </h3>
            <p className="text-lg leading-relaxed">
              Giai đoạn 1945-1954 đánh dấu <strong>bản lĩnh kiên cường</strong>{" "}
              của dân tộc, khi Đảng lãnh đạo nhân dân từ thế bị bao vây cô lập
              đến
              <strong> chiến thắng Điện Biên Phủ chấn động địa cầu</strong>. 9
              năm kháng chiến trường kỳ đã bảo vệ vững chắc thành quả của Cách
              mạng Tháng Tám, mang lại hòa bình và làm sụp đổ chủ nghĩa thực dân
              cũ trên toàn thế giới.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReformAnalysis;
