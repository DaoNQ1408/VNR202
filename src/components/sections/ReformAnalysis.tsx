import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabContent {
  id: string;
  title: string;
  icon: string;
  content: string[];
}

const ReformAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("context");

  const tabs: TabContent[] = [
    {
      id: "context",
      title: "Bối Cảnh Trước 1986",
      icon: "📊",
      content: [
        "🔴 Lạm phát tăng cao (453% năm 1986)",
        "🔴 Sản xuất đình trệ, thiếu hụt hàng hóa trầm trọng",
        "🔴 Thâm hụt ngân sách, nợ công gia tăng",
        "🔴 Đời sống nhân dân khó khăn, tiền lương mất giá",
        "🔴 Cải cách giá-lương-tiền 1985 thất bại",
      ],
    },
    {
      id: "reform",
      title: "Đại Hội VI - 1986",
      icon: "🚀",
      content: [
        "✨ Đổi mới tư duy kinh tế: Từ kế hoạch hóa sang thị trường",
        "✨ Công nhận nhiều thành phần kinh tế",
        "✨ Đổi mới cơ chế quản lý kinh tế",
        "✨ Mở cửa, hội nhập kinh tế quốc tế",
        "✨ Đổi mới chính trị, xã hội, văn hóa",
      ],
    },
    {
      id: "impact",
      title: "Thành Tựu 1986-1996",
      icon: "⚡",
      content: [
        "✅ GDP tăng trưởng bình quân 7-8%/năm",
        "✅ Lạm phát giảm xuống dưới 10%",
        "✅ Xuất khẩu tăng nhanh, đặc biệt gạo và dầu khí",
        "✅ Đời sống nhân dân cải thiện rõ rệt",
        "✅ Đất nước thoát khỏi khủng hoảng kinh tế - xã hội",
      ],
    },
    {
      id: "lesson",
      title: "Bài Học Kinh Nghiệm",
      icon: "📚",
      content: [
        "💡 Đổi mới tư duy: Từ kế hoạch hóa sang kinh tế thị trường",
        "💡 Đồng bộ hóa: Cải cách kinh tế - chính trị - xã hội",
        "💡 Kiên trì: Không ngừng đổi mới, hoàn thiện chính sách",
        "💡 Mở cửa: Hội nhập kinh tế quốc tế là tất yếu",
        "💡 Lấy dân làm gốc: Nâng cao đời sống nhân dân",
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
              Đổi Mới Toàn Diện 1986 - 1996
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--ancient-stone)" }}
          >
            Đưa đất nước ra khỏi <strong>khủng hoảng kinh tế - xã hội</strong>,
            đẩy mạnh <strong>công nghiệp hóa, hiện đại hóa</strong> và{" "}
            <strong>hội nhập quốc tế</strong>
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
            className="max-w-4xl mx-auto"
          >
            <div
              className="shadow-xl rounded-2xl p-8 border-4"
              style={{
                backgroundColor: "var(--vietnam-white)",
                borderColor: "var(--vietnam-gold)",
              }}
            >
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
              Giai đoạn 1986-1996 đánh dấu <strong>bước ngoặt lịch sử</strong>{" "}
              của đất nước, khi Đảng dũng cảm đổi mới tư duy, từ bỏ cơ chế kế
              hoạch hóa tập trung sang
              <strong> kinh tế thị trường định hướng xã hội chủ nghĩa</strong>.
              10 năm đổi mới đã đưa Việt Nam thoát khỏi khủng hoảng, mở đường
              cho sự phát triển bền vững và hội nhập quốc tế sau này.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReformAnalysis;
