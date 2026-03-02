import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InteractiveQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question:
        "Sự kiện nào mở đầu cuộc kháng chiến toàn quốc chống thực dân Pháp?",
      options: [
        "Tuyên ngôn độc lập (2/9/1945)",
        "Hiệp định Sơ bộ (6/3/1946)",
        "Lời kêu gọi toàn quốc kháng chiến (19/12/1946)",
        "Chiến dịch Việt Bắc (1947)",
      ],
      correctAnswer: 2,
      explanation:
        "Đêm 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, chính thức mở đầu cuộc kháng chiến chống Pháp.",
    },
    {
      id: 2,
      question:
        'Chiến dịch nào làm phá sản hoàn toàn chiến lược "đánh nhanh thắng nhanh" của thực dân Pháp?',
      options: [
        "Chiến dịch Điện Biên Phủ",
        "Chiến dịch Việt Bắc Thu - Đông 1947",
        "Chiến dịch Biên giới Thu - Đông 1950",
        "Chiến cuộc Đông - Xuân 1953-1954",
      ],
      correctAnswer: 1,
      explanation:
        "Chiến dịch Việt Bắc Thu - Đông 1947 đã đập tan cuộc tấn công của Pháp, buộc chúng phải chuyển sang đánh lâu dài.",
    },
    {
      id: 3,
      question:
        "Đại hội đại biểu toàn quốc lần thứ II của Đảng (2/1951) quyết định đổi tên Đảng thành gì?",
      options: [
        "Đảng Cộng sản Đông Dương",
        "Đảng Cộng sản Việt Nam",
        "Đảng Lao động Việt Nam",
        "Hội Việt Nam Cách mạng Thanh niên",
      ],
      correctAnswer: 2,
      explanation:
        "Đại hội II (1951) quyết định đưa Đảng ra hoạt động công khai lấy tên là Đảng Lao động Việt Nam.",
    },
    {
      id: 4,
      question:
        "Đường lối kháng chiến chống Pháp của Đảng gồm những tính chất nào?",
      options: [
        "Toàn dân, toàn diện, lâu dài, dựa vào sức mình là chính",
        "Đánh nhanh, thắng nhanh, dựa vào ngoại viện",
        "Hòa hoãn, thỏa hiệp, từng bước giành thế tiến công",
        "Chỉ tập trung vào đấu tranh quân sự và ngoại giao",
      ],
      correctAnswer: 0,
      explanation:
        "Đường lối kháng chiến của Đảng được xác định là: Toàn dân, toàn diện, trường kỳ (lâu dài) và tự lực cánh sinh.",
    },
    {
      id: 5,
      question:
        "Chiến thắng nào là đòn quyết định buộc Pháp phải ký Hiệp định Giơnevơ?",
      options: [
        "Chiến thắng Ấp Bắc",
        "Chiến dịch Biên giới",
        "Trận Điện Biên Phủ trên không",
        "Chiến thắng Điện Biên Phủ 1954",
      ],
      correctAnswer: 3,
      explanation:
        "Chiến thắng Điện Biên Phủ (7/5/1954) đập tan căn cứ mạnh nhất của Pháp, tạo lợi thế lớn trên bàn đàm phán Giơnevơ.",
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsCorrect(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100)
      return {
        emoji: "🏆",
        message: "Xuất sắc! Bạn là chuyên gia Lịch sử Đảng!",
        color: "from-yellow-400 to-yellow-600",
      };
    if (percentage >= 80)
      return {
        emoji: "⭐",
        message: "Tuyệt vời! Kiến thức của bạn rất tốt!",
        color: "from-green-400 to-green-600",
      };
    if (percentage >= 60)
      return {
        emoji: "👍",
        message: "Khá tốt! Tiếp tục học hỏi nhé!",
        color: "from-blue-400 to-blue-600",
      };
    return {
      emoji: "📚",
      message: "Cần cố gắng thêm! Hãy đọc lại tài liệu.",
      color: "from-red-400 to-red-600",
    };
  };

  if (showResult) {
    const scoreData = getScoreMessage();
    return (
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              className={`bg-gradient-to-br ${scoreData.color} rounded-3xl shadow-2xl p-12 text-white`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                {scoreData.emoji}
              </motion.div>
              <h2 className="text-4xl font-bold mb-4">Kết Quả Quiz</h2>
              <motion.div
                className="text-7xl font-bold mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                {score}/{questions.length}
              </motion.div>
              <p className="text-2xl mb-8">{scoreData.message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                🔄 Làm Lại Quiz
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮 Tương Tác
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kiểm Tra{" "}
            <span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              Kiến Thức
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Hãy thử sức với các câu hỏi về Lịch sử Đảng Cộng sản Việt Nam!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Câu {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              Điểm: {score}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {question.question}
              </motion.h3>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === question.correctAnswer;
                  const showFeedback = selectedAnswer !== null;

                  let buttonClass =
                    "bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 text-gray-800";

                  if (showFeedback) {
                    if (isSelected && isCorrectAnswer) {
                      buttonClass =
                        "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600";
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonClass =
                        "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600";
                    } else if (!isSelected && isCorrectAnswer) {
                      buttonClass =
                        "bg-gradient-to-r from-green-400 to-green-500 text-white border-green-500";
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() =>
                        selectedAnswer === null && handleAnswer(index)
                      }
                      disabled={selectedAnswer !== null}
                      className={`w-full p-6 rounded-xl font-semibold text-left transition-all ${buttonClass} ${
                        selectedAnswer === null
                          ? "hover:shadow-lg hover:scale-102"
                          : ""
                      }`}
                      whileHover={
                        selectedAnswer === null ? { scale: 1.02 } : {}
                      }
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="flex-1 text-lg">{option}</span>
                        {showFeedback && isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-3xl"
                          >
                            {isCorrectAnswer ? "✅" : "❌"}
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-8 p-6 rounded-xl ${
                      isCorrect
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-red-50 border-2 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">
                        {isCorrect ? "🎉" : "💡"}
                      </span>
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          {isCorrect ? "Chính xác!" : "Giải thích:"}
                        </h4>
                        <p className="text-gray-700">{question.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
