import React from "react";
import { motion } from "framer-motion";

const CTA: React.FC = () => {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--vietnam-red)" }}
    >
      {/* Vintage Border Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-4 left-4 right-4 bottom-4 border-2"
          style={{ borderColor: "var(--vietnam-gold)" }}
        />
        <div
          className="absolute top-8 left-8 right-8 bottom-8 border"
          style={{ borderColor: "var(--vietnam-gold)", opacity: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🇻🇳
          </motion.div>

          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--vietnam-white)" }}
          >
            Học Tập & Phát Huy Tinh Thần Đổi Mới!
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--vietnam-white)" }}
          >
            Từ bài học lịch sử 1945-1954 đến hành động ngày nay - Dám nghĩ, dám
            làm để xây dựng Việt Nam giàu mạnh, văn minh, hạnh phúc!
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-2"
              style={{
                backgroundColor: "var(--vietnam-white)",
                color: "var(--vietnam-red)",
                borderColor: "var(--vietnam-gold)",
              }}
            >
              📚 Xem Tài Liệu Đầy Đủ
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 font-bold text-lg transition-all"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--vietnam-white)",
                color: "var(--vietnam-white)",
              }}
            >
              🎯 Làm Quiz Lại
            </motion.button>
          </motion.div>

          <motion.p
            className="text-sm"
            style={{ color: "var(--vietnam-white)" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ Sản phẩm được tạo với tinh thần học tập nghiêm túc và sử dụng AI
            có trách nhiệm
          </motion.p>
        </motion.div>

        {/* Floating Icons */}
        <div className="mt-16 relative h-32">
          {["🏆", "📚", "🎓", "⭐", "🚀", "💡", "✨", "🇻🇳"].map(
            (icon, index) => (
              <motion.div
                key={index}
                className="absolute text-5xl"
                style={{
                  left: `${index * 12.5}%`,
                  top: "50%",
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {icon}
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
