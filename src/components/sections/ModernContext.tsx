import React from "react";
import { motion } from "framer-motion";

interface ModernChallenge {
  id: number;
  icon: string;
  title: string;
  description: string;
  examples: string[];
}

const ModernContext: React.FC = () => {
  const challenges: ModernChallenge[] = [
    {
      id: 1,
      icon: "🤝",
      title: "Khối Đại Đoàn Kết",
      description:
        "Phát huy tinh thần toàn dân tộc trong các bài toán an ninh phi truyền thống",
      examples: [
        "Phòng chống đại dịch COVID-19",
        "Khắc phục hậu quả thiên tai, bão lũ",
        "Xây dựng đời sống văn hóa khu dân cư",
      ],
    },
    {
      id: 2,
      icon: "🎋",
      title: "Ngoại Giao Cây Tre",
      description:
        'Vận dụng chiến lược "Dĩ bất biến, ứng vạn biến" của Hồ Chí Minh vào thời đại mới',
      examples: [
        "Làm bạn, đối tác tin cậy với mọi quốc gia",
        "Hội nhập kinh tế toàn cầu sâu rộng",
        "Bảo vệ chủ quyền bằng biện pháp hòa bình",
      ],
    },
    {
      id: 3,
      icon: "🚀",
      title: "Tự Lực Tự Cường",
      description:
        'Tinh thần "Dựa vào sức mình là chính" trong cuộc cách mạng công nghiệp 4.0',
      examples: [
        "Make in Vietnam - Sản xuất sản phẩm số",
        "Start-up và đổi mới sáng tạo",
        "Tự chủ an ninh năng lượng, lương thực",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 Tính Cập Nhật
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Việt Nam{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Hiện Đại
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gắn kết bài học Kháng chiến chống Pháp với bối cảnh kinh tế - xã hội
            - quốc phòng hiện nay
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                {challenge.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {challenge.title}
              </h3>
              <p className="text-gray-600 mb-6">{challenge.description}</p>

              <div className="space-y-3">
                {challenge.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-teal-600 font-bold">✓</span>
                    <span className="text-sm text-gray-700">{example}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <div className="flex items-start gap-6 mb-8">
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📖
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Case Study: Đại Dịch COVID-19
                </h3>
                <p className="text-xl leading-relaxed mb-6">
                  Việt Nam đã vận dụng tinh thần đổi mới và sáng tạo để ứng phó
                  linh hoạt với đại dịch:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Chiến Tranh Nhân Dân",
                  items: [
                    "Huy động toàn dân chống dịch",
                    "Mỗi cơ quan là một pháo đài",
                    "Mỗi người dân là một chiến sĩ",
                  ],
                },
                {
                  title: "Tự Lực Tự Cường",
                  items: [
                    "Tự nghiên cứu vaccine (Nanocovax, Covivac)",
                    "Sản xuất kit test nội địa",
                    "Đảm bảo tự chủ lương thực",
                  ],
                },
                {
                  title: "Ngoại Giao Linh Hoạt",
                  items: [
                    "Ngoại giao vaccine",
                    "Hỗ trợ y tế quốc tế",
                    "Tranh thủ sự ủng hộ của bạn bè TG",
                  ],
                },
                {
                  title: "An Sinh Xã Hội",
                  items: [
                    "Đóng góp quỹ vaccine",
                    "Cây ATM Gạo, siêu thị 0 đồng",
                    "Đoàn kết đùm bọc lẫn nhau",
                  ],
                },
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h4 className="text-xl font-bold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-yellow-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg font-semibold">
                💡 <strong>Bài học:</strong> Tinh thần kiên cường, đoàn kết và
                sáng tạo của quân dân ta trong Kháng chiến chống Pháp vẫn là kim
                chỉ nam cho Việt Nam vượt qua mọi thử thách của thời đại!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernContext;
