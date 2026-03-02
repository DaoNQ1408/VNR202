import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const HistoryTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false });

  const events: TimelineEvent[] = [
    {
      year: "1945",
      title: "Kháng Chiến Kiến Quốc",
      description:
        "Ban Chấp hành Trung ương ban hành Chỉ thị Kháng chiến kiến quốc, củng cố chính quyền chống Pháp và khắc phục khó khăn.",
      icon: "🇻🇳",
      color: "from-red-500 to-red-700",
    },
    {
      year: "1946",
      title: "Toàn Quốc Kháng Chiến",
      description:
        "Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, mở đầu cuộc kháng chiến toàn dân, toàn diện, lâu dài.",
      icon: "📜",
      color: "from-yellow-500 to-yellow-700",
    },
    {
      year: "1947",
      title: "Việt Bắc Thu - Đông",
      description:
        "Đánh bại cuộc tấn công quy mô lớn của Pháp lên căn cứ địa Việt Bắc, làm phá sản chiến lược đánh nhanh thắng nhanh.",
      icon: "⚔️",
      color: "from-orange-500 to-orange-700",
    },
    {
      year: "1950",
      title: "Chiến Dịch Biên Giới",
      description:
        "Khai thông biên giới Việt - Trung, phá sản kế hoạch Rơve, chuyển cục diện chiến trường sang thế tiến công chiến lược.",
      icon: "🚀",
      color: "from-purple-500 to-purple-700",
    },
    {
      year: "1951",
      title: "Đại Hội Đảng Lần II",
      description:
        "Đảng ra hoạt động công khai với tên ban đầu là Đảng Lao động Việt Nam, thông qua Chính cương mới.",
      icon: "⭐",
      color: "from-red-600 to-yellow-600",
    },
    {
      year: "1953",
      title: "Cải Cách Ruộng Đất",
      description:
        'Quốc hội thông qua Luật Cải cách ruộng đất, hiện thực hóa khẩu hiệu "người cày có ruộng", tạo động lực lớn cho nhân dân.',
      icon: "🌾",
      color: "from-green-500 to-green-700",
    },
    {
      year: "1954",
      title: "Điện Biên Phủ",
      description:
        "Đại thắng Điện Biên Phủ sau 56 ngày đêm chiến đấu, đập tan Kế hoạch Nava và ý chí xâm lược của thực dân Pháp.",
      icon: "🔥",
      color: "from-red-500 to-orange-600",
    },
    {
      year: "1954",
      title: "Hiệp Định Giơnevơ",
      description:
        "Pháp buộc phải ký Hiệp định Giơnevơ, công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam.",
      icon: "🤝",
      color: "from-blue-500 to-blue-700",
    },
  ];

  useEffect(() => {
    // Timeline line animation is handled by CSS and Framer Motion
    // No need for GSAP here as we're using Framer Motion for animations
    return () => {};
  }, []);

  return (
    <section
      ref={timelineRef}
      className="py-20 bg-gradient-to-b from-white to-red-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hành Trình Lịch Sử
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Timeline{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              Kháng Chiến
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Từ bảo vệ chính quyền non trẻ đến đại thắng Điện Biên Phủ chấn động
            địa cầu
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 via-yellow-500 to-green-500 timeline-line origin-top" />

          {/* Events */}
          <div className="space-y-16">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={event.year}
                  className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Content Card */}
                  <motion.div
                    className={`w-5/12 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all">
                      <motion.div
                        className={`inline-block px-4 py-2 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-bold mb-3`}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {event.year}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </motion.div>

                  {/* Icon Circle */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-3xl shadow-lg border-4 border-white`}
                    >
                      {event.icon}
                    </div>
                  </motion.div>

                  {/* Empty space for layout */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Tìm Hiểu Chi Tiết →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
