import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, CheckCircle, XCircle, Clock, Target } from 'lucide-react';
import type { QuizAnswer } from '../../types/quiz';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  timeSpent: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  answers,
  timeSpent,
  onRetry,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreData = () => {
    if (percentage === 100) {
      return {
        emoji: '🏆',
        message: 'Xuất sắc!',
        description: 'Bạn là chuyên gia Lịch sử Đảng!',
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'from-yellow-50 to-yellow-100',
      };
    }
    if (percentage >= 80) {
      return {
        emoji: '⭐',
        message: 'Tuyệt vời!',
        description: 'Kiến thức của bạn rất tốt!',
        color: 'from-green-400 to-green-600',
        bgColor: 'from-green-50 to-green-100',
      };
    }
    if (percentage >= 60) {
      return {
        emoji: '👍',
        message: 'Khá tốt!',
        description: 'Tiếp tục học hỏi nhé!',
        color: 'from-blue-400 to-blue-600',
        bgColor: 'from-blue-50 to-blue-100',
      };
    }
    return {
      emoji: '📚',
      message: 'Cần cố gắng thêm!',
      description: 'Hãy đọc lại tài liệu và thử lại.',
      color: 'from-red-400 to-red-600',
      bgColor: 'from-red-50 to-red-100',
    };
  };

  const scoreData = getScoreData();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs} giây`;
  };

  const stats = [
    {
      icon: Target,
      label: 'Điểm số',
      value: `${score}/${totalQuestions}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: CheckCircle,
      label: 'Tỷ lệ đúng',
      value: `${percentage}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Clock,
      label: 'Thời gian',
      value: formatTime(timeSpent),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-br ${scoreData.bgColor} rounded-2xl shadow-xl overflow-hidden mb-8`}
      >
        <div className={`bg-gradient-to-r ${scoreData.color} p-8 text-white text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl mb-4"
          >
            {scoreData.emoji}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            {scoreData.message}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90"
          >
            {scoreData.description}
          </motion.p>
        </div>

        {/* Stats */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={onRetry}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Làm lại bài kiểm tra
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Answer Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Trophy className="w-7 h-7 mr-3 text-yellow-600" />
          Xem lại đáp án chi tiết
        </h3>

        <div className="space-y-6">
          {answers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className={`
                p-6 rounded-xl border-2 transition-all
                ${answer.isCorrect
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
                }
              `}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start flex-1">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                    ${answer.isCorrect ? 'bg-green-500' : 'bg-red-500'}
                  `}
                  >
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Câu {index + 1}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {answer.questionText}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 ml-13">
                {answer.options.map((option, optIndex) => {
                  const isSelected = optIndex === answer.selectedIndex;
                  const isCorrect = optIndex === answer.correctIndex;

                  return (
                    <div
                      key={optIndex}
                      className={`
                        p-3 rounded-lg flex items-center
                        ${isCorrect
                          ? 'bg-green-100 border border-green-300'
                          : isSelected
                            ? 'bg-red-100 border border-red-300'
                            : 'bg-gray-50'
                        }
                      `}
                    >
                      <div
                        className={`
                        w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold
                        ${isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-300 text-gray-700'
                          }
                      `}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </div>
                      <span
                        className={`
                        flex-1 ${isCorrect || isSelected ? 'font-medium' : ''}
                      `}
                      >
                        {option}
                      </span>
                      {isCorrect && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                      {isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 ml-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {!answer.isCorrect && (
                <div className="mt-4 ml-13 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>Đáp án đúng:</strong>{' '}
                    {String.fromCharCode(65 + answer.correctIndex)}.{' '}
                    {answer.options[answer.correctIndex]}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;
