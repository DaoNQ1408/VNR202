import React from "react";
import { motion } from "framer-motion";

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-yellow-600 to-red-700 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Học Tập & Phát Huy Tinh Thần Đổi Mới!
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Từ bài học lịch sử 1986-1996 đến hành động ngày nay - Dám nghĩ, dám
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
              className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              📚 Xem Tài Liệu Đầy Đủ
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              🎯 Làm Quiz Lại
            </motion.button>
          </motion.div>

          <motion.p
            className="text-yellow-200 text-sm"
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
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
