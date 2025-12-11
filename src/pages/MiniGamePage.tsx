import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Clock,
  Trophy,
  AlertCircle,
  CheckCircle,
  X,
  Play,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

// Instructions Modal Component
const InstructionsModal: React.FC<{
  game: "game1" | "game2";
  onClose: () => void;
  onStart: () => void;
}> = ({ game, onClose, onStart }) => {
  const instructions =
    game === "game1"
      ? {
          title: "🌑 Siêu thị Tem Phiếu",
          subtitle: "Đêm Trước Đổi Mới (1985)",
          objective: "Chọn đúng các món đồ thiết yếu trước khi hết thời gian!",
          rules: [
            {
              icon: "⏰",
              title: "Thời gian",
              desc: "Bạn có 90 giây để chọn món đồ",
            },
            {
              icon: "✅",
              title: "Món thiết yếu",
              desc: "Gạo, Thịt, Cá, Rau củ, Vải, Xà phòng... (+10 điểm)",
            },
            {
              icon: "❌",
              title: "Món không thiết yếu",
              desc: "Bánh kẹo, Đồ chơi, Tivi, Máy ảnh, Trang sức... (-5 điểm)",
            },
            {
              icon: "🎯",
              title: "Mục tiêu",
              desc: "Chọn 15 món từ 50 item, ưu tiên món thiết yếu để đạt điểm cao nhất!",
            },
          ],
          tips: [
            "Trong thời kỳ khủng hoảng, người dân chỉ quan tâm nhu yếu phẩm",
            "Tem phiếu bị giới hạn, hãy chọn thông minh!",
            "Càng chọn đúng món thiết yếu, điểm số càng cao",
          ],
        }
      : {
          title: "⚡ Nhà Hoạch Định Chiến Lược",
          subtitle: "Đại Hội VI (1986)",
          objective: "Phân loại 50 item vào 3 giỏ ưu tiên trong 120 giây!",
          rules: [
            {
              icon: "🗂️",
              title: "3 Giỏ Ưu Tiên",
              desc: "Lương thực, Hàng tiêu dùng, Hàng xuất khẩu",
            },
            {
              icon: "✅",
              title: "Kéo đúng",
              desc: "Item vào giỏ đúng loại (+10 điểm)",
            },
            {
              icon: "⚠️",
              title: "Kéo sai",
              desc: "Item sai loại hoặc Công nghiệp nặng (-5 điểm)",
            },
            {
              icon: "⏱️",
              title: "Thời gian",
              desc: "120 giây để phân loại tất cả các item",
            },
          ],
          tips: [
            "Đại hội VI chuyển hướng từ công nghiệp nặng sang nông nghiệp",
            "Ưu tiên: Lương thực thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu",
            "Tránh kéo Máy móc hạng nặng và Than đá vào giỏ!",
            "Phân loại nhanh để đạt điểm cao trước khi hết giờ!",
          ],
        };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col border-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-4 md:p-5 rounded-t-2xl text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            {instructions.title}
          </h2>
          <p className="text-base md:text-lg opacity-90">
            {instructions.subtitle}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {/* Objective */}
          <div className="bg-gradient-to-r from-yellow-100 to-red-100 p-3 md:p-4 rounded-xl mb-4 border-2 border-yellow-300">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  Mục tiêu
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {instructions.objective}
                </p>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Luật chơi
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {instructions.rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:border-yellow-400 transition-colors"
                >
                  <div className="text-xl md:text-2xl mb-1.5">{rule.icon}</div>
                  <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1">
                    {rule.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-snug">
                    {rule.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Mẹo chơi
            </h3>
            <div className="space-y-2">
              {instructions.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-2 bg-yellow-50 p-2.5 md:p-3 rounded-lg border-l-4 border-yellow-500"
                >
                  <span className="text-lg">💡</span>
                  <p className="text-xs md:text-sm text-gray-700 leading-snug">
                    {tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer with Start Button */}
        <div className="p-4 bg-white border-t-2 border-yellow-300 rounded-b-2xl flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6" />
            Bắt đầu chơi ngay!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Game 1: Survival Game - Siêu thị Tem Phiếu
const SurvivalGame: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(90);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    message: string;
  }>({
    show: false,
    isCorrect: false,
    message: "",
  });

  const items = [
    // Lương thực thiết yếu (25 items essential)
    { name: "Gạo", isEssential: true, image: "🍚" },
    { name: "Nước mắm", isEssential: true, image: "🧂" },
    { name: "Muối", isEssential: true, image: "🧂" },
    { name: "Dầu ăn", isEssential: true, image: "🫗" },
    { name: "Đường", isEssential: true, image: "🍬" },
    { name: "Thịt heo", isEssential: true, image: "🥩" },
    { name: "Thịt gà", isEssential: true, image: "🍗" },
    { name: "Thịt bò", isEssential: true, image: "🥩" },
    { name: "Cá", isEssential: true, image: "🐟" },
    { name: "Tôm", isEssential: true, image: "🦐" },
    { name: "Trứng", isEssential: true, image: "🥚" },
    { name: "Rau củ", isEssential: true, image: "🥬" },
    { name: "Khoai tây", isEssential: true, image: "🥔" },
    { name: "Vải", isEssential: true, image: "🧵" },
    { name: "Xà phòng", isEssential: true, image: "🧼" },
    { name: "Bột giặt", isEssential: true, image: "🧴" },
    { name: "Kem đánh răng", isEssential: true, image: "🪥" },
    { name: "Giấy vệ sinh", isEssential: true, image: "🧻" },
    { name: "Thuốc men cơ bản", isEssential: true, image: "💊" },
    { name: "Băng y tế", isEssential: true, image: "🩹" },
    { name: "Quần áo cơ bản", isEssential: true, image: "👕" },
    { name: "Giày dép", isEssential: true, image: "👟" },
    { name: "Nước sạch", isEssential: true, image: "💧" },
    { name: "Than củi", isEssential: true, image: "🪵" },
    { name: "Dầu hỏa", isEssential: true, image: "🛢️" },

    // Hàng xa xỉ/không thiết yếu (25 items non-essential)
    { name: "Bánh kẹo", isEssential: false, image: "🍭" },
    { name: "Nước ngọt", isEssential: false, image: "🥤" },
    { name: "Bia rượu", isEssential: false, image: "🍺" },
    { name: "Rượu mạnh", isEssential: false, image: "🍷" },
    { name: "Thuốc lá", isEssential: false, image: "🚬" },
    { name: "Đồ chơi", isEssential: false, image: "🧸" },
    { name: "Sách vở", isEssential: false, image: "📚" },
    { name: "Điện thoại", isEssential: false, image: "📞" },
    { name: "Tivi", isEssential: false, image: "📺" },
    { name: "Đài radio", isEssential: false, image: "📻" },
    { name: "Máy ảnh", isEssential: false, image: "📷" },
    { name: "Đồng hồ đeo tay", isEssential: false, image: "⌚" },
    { name: "Trang sức", isEssential: false, image: "💍" },
    { name: "Nước hoa", isEssential: false, image: "🧴" },
    { name: "Son môi", isEssential: false, image: "💄" },
    { name: "Kính mắt thời trang", isEssential: false, image: "🕶️" },
    { name: "Đồ trang trí", isEssential: false, image: "🎨" },
    { name: "Bàn cờ", isEssential: false, image: "♟️" },
    { name: "Nhạc cụ", isEssential: false, image: "🎸" },
    { name: "Tranh ảnh", isEssential: false, image: "🖼️" },
    { name: "Đồ cổ", isEssential: false, image: "🏺" },
    { name: "Đồ sưu tầm", isEssential: false, image: "🎭" },
    { name: "Máy tính", isEssential: false, image: "💻" },
    { name: "Máy quay phim", isEssential: false, image: "🎥" },
    { name: "Xe máy", isEssential: false, image: "🏍️" },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleItemClick = (item: (typeof items)[0]) => {
    if (gameOver) return;
    if (selectedItems.includes(item.name)) return;

    // Giới hạn chỉ chọn tối đa 15 món
    if (selectedItems.length >= 15) {
      setFeedback({
        show: true,
        isCorrect: false,
        message: "Chỉ được chọn 15 món!",
      });
      setTimeout(
        () => setFeedback({ show: false, isCorrect: false, message: "" }),
        1000
      );
      return;
    }

    const newSelectedItems = [...selectedItems, item.name];
    setSelectedItems(newSelectedItems);

    if (item.isEssential) {
      setScore(score + 10);
      setFeedback({ show: true, isCorrect: true, message: "+10 điểm!" });
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback({ show: true, isCorrect: false, message: "-5 điểm!" });
    }

    // Tự động kết thúc game khi đã chọn đủ 15 món
    if (newSelectedItems.length >= 15) {
      setTimeout(() => {
        setGameOver(true);
      }, 1500);
    }

    setTimeout(
      () => setFeedback({ show: false, isCorrect: false, message: "" }),
      1000
    );
  };

  const restartGame = () => {
    setTimeLeft(30);
    setScore(0);
    setGameOver(false);
    setSelectedItems([]);
  };

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 px-4 py-2 rounded-lg border border-red-300">
          <Clock className="w-5 h-5 text-red-600" />
          <span
            className={`text-lg font-bold ${
              timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-gray-900"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <span className="text-lg font-bold text-gray-900">{score} điểm</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-300">
          <span className="text-base font-bold text-gray-700">
            {selectedItems.length}/15 món
          </span>
        </div>
      </div>
      {/* Feedback */}
      <AnimatePresence>
        {feedback.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                feedback.isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="font-bold text-sm">{feedback.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-50 to-red-50 p-6 rounded-xl border-2 border-yellow-400"
        >
          <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-center text-gray-900 mb-2">
            Kết thúc!
          </p>
          <p className="text-center text-gray-700 mb-4">
            Bạn đã chọn{" "}
            <span className="font-bold text-green-600">
              {
                selectedItems.filter(
                  (item) => items.find((i) => i.name === item)?.isEssential
                ).length
              }
              /4
            </span>{" "}
            món thiết yếu
          </p>
          <button
            onClick={restartGame}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Chơi lại
          </button>
        </motion.div>
      )}
      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => {
          const isDisabled =
            selectedItems.length >= 4 && !selectedItems.includes(item.name);

          return (
            <motion.div
              key={item.name}
              className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                selectedItems.includes(item.name)
                  ? "bg-gradient-to-br from-green-100 to-green-200 border-green-500 shadow-lg cursor-default"
                  : isDisabled
                  ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-40"
                  : "bg-white border-gray-300 hover:border-red-400 hover:shadow-xl cursor-pointer"
              } ${gameOver ? "cursor-not-allowed opacity-60" : ""}`}
              onClick={() => handleItemClick(item)}
              whileHover={{
                scale: gameOver || isDisabled ? 1 : 1.05,
              }}
              whileTap={{ scale: gameOver || isDisabled ? 1 : 0.95 }}
            >
              <div className="text-4xl mb-2">{item.image}</div>
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              {selectedItems.includes(item.name) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Game 2: Drag & Drop - Nhà Hoạch Định Chiến Lược
const ItemTypes = {
  ITEM: "item",
};

interface Item {
  id: string;
  name: string;
  category: "luongthuc" | "tieudung" | "xuatkhau" | "congnghiep";
  image: string;
}

const Basket: React.FC<{ category: string; onDrop: (item: Item) => void }> = ({
  category,
  onDrop,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ITEM,
      drop: (item: Item) => {
        onDrop(item);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const getCategoryColor = () => {
    if (category === "Lương thực")
      return "from-green-50 to-green-100 border-green-400";
    if (category === "Hàng tiêu dùng")
      return "from-blue-50 to-blue-100 border-blue-400";
    return "from-purple-50 to-purple-100 border-purple-400";
  };

  const getCategoryIcon = () => {
    if (category === "Lương thực") return "🌾";
    if (category === "Hàng tiêu dùng") return "🛍️";
    return "📦";
  };

  return (
    <div
      ref={drop}
      className={`p-3 md:p-4 border-2 rounded-xl text-center min-h-[120px] md:min-h-[140px] flex flex-col justify-center transition-all duration-300 bg-gradient-to-br ${
        isOver
          ? "border-yellow-500 shadow-xl scale-105"
          : `${getCategoryColor()} shadow-md`
      }`}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
      }}
    >
      <div className="text-2xl md:text-3xl mb-2">{getCategoryIcon()}</div>
      <h4 className="font-bold text-sm md:text-base text-gray-800">
        {category}
      </h4>
      <p className="text-xs text-gray-600 mt-1 hidden md:block">
        {isOver ? "Thả vào đây!" : "Kéo thả"}
      </p>
    </div>
  );
};

const DraggableItem: React.FC<{ item: Item; isPlaced: boolean }> = ({
  item,
  isPlaced,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ITEM,
      item: { ...item },
      canDrag: !isPlaced,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [isPlaced]
  );

  if (isPlaced) {
    return null; // Don't render placed items
  }

  return (
    <div
      ref={drag}
      className={`p-2 border rounded-lg text-center bg-white shadow-sm hover:shadow-md transition-all duration-300 ${
        isDragging
          ? "opacity-50 scale-110"
          : "opacity-100 border-gray-300 cursor-move hover:border-yellow-400"
      }`}
      style={{
        transform: isDragging ? "scale(1.1)" : "none",
        cursor: isPlaced ? "default" : "move",
      }}
    >
      <div className="text-2xl md:text-3xl mb-1">{item.image}</div>
      <p className="text-[10px] md:text-xs font-semibold text-gray-800 leading-tight">
        {item.name}
      </p>
    </div>
  );
};

const StrategyGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameOver, setGameOver] = useState(false);
  const [placedItemIds, setPlacedItemIds] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    message: string;
  }>({ show: false, isCorrect: false, message: "" });

  // Comprehensive item list - 50 items total
  const allItems: Item[] = [
    // Lương thực thực phẩm (17 items)
    { id: "1", name: "Lúa gạo", category: "luongthuc", image: "🌾" },
    { id: "2", name: "Ngô", category: "luongthuc", image: "🌽" },
    { id: "3", name: "Khoai lang", category: "luongthuc", image: "🍠" },
    { id: "4", name: "Khoai tây", category: "luongthuc", image: "🥔" },
    { id: "5", name: "Sắn", category: "luongthuc", image: "🌿" },
    { id: "6", name: "Thịt heo", category: "luongthuc", image: "🥩" },
    { id: "7", name: "Thịt gà", category: "luongthuc", image: "🍗" },
    { id: "8", name: "Thịt bò", category: "luongthuc", image: "🥩" },
    { id: "9", name: "Cá", category: "luongthuc", image: "🐟" },
    { id: "10", name: "Tôm", category: "luongthuc", image: "🦐" },
    { id: "11", name: "Mực", category: "luongthuc", image: "🦑" },
    { id: "12", name: "Trứng", category: "luongthuc", image: "🥚" },
    { id: "13", name: "Rau củ", category: "luongthuc", image: "🥬" },
    { id: "14", name: "Đậu phụ", category: "luongthuc", image: "🧈" },
    { id: "15", name: "Nước mắm", category: "luongthuc", image: "🧂" },
    { id: "16", name: "Dầu ăn", category: "luongthuc", image: "🫗" },
    { id: "17", name: "Sữa", category: "luongthuc", image: "🥛" },

    // Hàng tiêu dùng (17 items)
    { id: "18", name: "Quần áo", category: "tieudung", image: "👕" },
    { id: "19", name: "Giày dép", category: "tieudung", image: "👟" },
    { id: "20", name: "Mũ nón", category: "tieudung", image: "🧢" },
    { id: "21", name: "Xà phòng", category: "tieudung", image: "🧼" },
    { id: "22", name: "Bàn chải", category: "tieudung", image: "🪥" },
    { id: "23", name: "Kem đánh răng", category: "tieudung", image: "🦷" },
    { id: "24", name: "Bột giặt", category: "tieudung", image: "🧴" },
    { id: "25", name: "Xe đạp", category: "tieudung", image: "🚲" },
    { id: "26", name: "Đồ dùng nhà bếp", category: "tieudung", image: "🍳" },
    { id: "27", name: "Vải vóc", category: "tieudung", image: "🧵" },
    { id: "28", name: "Đồ gốm sứ", category: "tieudung", image: "🏺" },
    { id: "29", name: "Giấy viết", category: "tieudung", image: "📄" },
    { id: "30", name: "Bút viết", category: "tieudung", image: "✏️" },
    { id: "31", name: "Đồ nhựa gia dụng", category: "tieudung", image: "🥤" },
    { id: "32", name: "Đồ mây tre", category: "tieudung", image: "🧺" },
    { id: "33", name: "Chiếu", category: "tieudung", image: "🛏️" },
    { id: "34", name: "Màn", category: "tieudung", image: "🪟" },

    // Hàng xuất khẩu (10 items)
    { id: "35", name: "Cà phê", category: "xuatkhau", image: "☕" },
    { id: "36", name: "Tôm đông lạnh", category: "xuatkhau", image: "🦐" },
    { id: "37", name: "Cao su", category: "xuatkhau", image: "🌳" },
    { id: "38", name: "Hạt điều", category: "xuatkhau", image: "🥜" },
    { id: "39", name: "Dệt may", category: "xuatkhau", image: "👔" },
    { id: "40", name: "Hạt tiêu", category: "xuatkhau", image: "🌶️" },
    { id: "41", name: "Dừa khô", category: "xuatkhau", image: "🥥" },
    { id: "42", name: "Chè", category: "xuatkhau", image: "🍵" },
    { id: "43", name: "Gỗ", category: "xuatkhau", image: "🪵" },
    { id: "44", name: "Thủ công mỹ nghệ", category: "xuatkhau", image: "🎨" },

    // Công nghiệp nặng (TRAP - 6 items)
    {
      id: "45",
      name: "Máy móc hạng nặng",
      category: "congnghiep",
      image: "⚙️",
    },
    { id: "46", name: "Than đá", category: "congnghiep", image: "⛏️" },
    { id: "47", name: "Thép", category: "congnghiep", image: "🏗️" },
    { id: "48", name: "Xi măng", category: "congnghiep", image: "🧱" },
    { id: "49", name: "Máy công nghiệp", category: "congnghiep", image: "🔧" },
    { id: "50", name: "Thiết bị nặng", category: "congnghiep", image: "🏭" },
  ];

  const totalCorrectItems = allItems.filter(
    (item) => item.category !== "congnghiep"
  ).length;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  // Check if game completed
  useEffect(() => {
    if (correctAttempts === totalCorrectItems) {
      setGameOver(true);
    }
  }, [correctAttempts, totalCorrectItems]);

  const handleDrop = React.useCallback((basketCategory: string, item: Item) => {
    // Check if item already placed
    setPlacedItemIds((prev) => {
      if (prev.includes(item.id)) {
        return prev;
      }

      // Heavy industry items are WRONG
      if (item.category === "congnghiep") {
        setScore((s) => Math.max(0, s - 5));
        setWrongAttempts((w) => w + 1);
        setShowFeedback({
          show: true,
          isCorrect: false,
          message: "❌ Sai lầm! Đại hội VI không ưu tiên Công nghiệp nặng!",
        });
        setTimeout(
          () => setShowFeedback({ show: false, isCorrect: false, message: "" }),
          2000
        );
        return [...prev, item.id];
      }

      // Check if correct category
      if (item.category === basketCategory) {
        setScore((s) => s + 10);
        setCorrectAttempts((c) => c + 1);
        setShowFeedback({
          show: true,
          isCorrect: true,
          message: "✅ Chính xác! +10 điểm",
        });
        setTimeout(
          () => setShowFeedback({ show: false, isCorrect: false, message: "" }),
          1000
        );
        return [...prev, item.id];
      } else {
        setScore((s) => Math.max(0, s - 5));
        setWrongAttempts((w) => w + 1);
        setShowFeedback({
          show: true,
          isCorrect: false,
          message: "⚠️ Sai giỏ rồi! -5 điểm",
        });
        setTimeout(
          () => setShowFeedback({ show: false, isCorrect: false, message: "" }),
          1500
        );
        return prev;
      }
    });
  }, []);

  const restartGame = () => {
    setScore(0);
    setTimeLeft(120);
    setGameOver(false);
    setPlacedItemIds([]);
    setWrongAttempts(0);
    setCorrectAttempts(0);
    setShowFeedback({ show: false, isCorrect: false, message: "" });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Compact Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border-2 border-yellow-300 sticky top-0 z-10">
          <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-lg font-bold text-gray-900">{score}</span>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                timeLeft <= 20
                  ? "bg-red-100 border-red-400 animate-pulse"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${
                  timeLeft <= 20 ? "text-red-600" : "text-blue-600"
                }`}
              />
              <span
                className={`text-lg font-bold ${
                  timeLeft <= 20 ? "text-red-600" : "text-gray-900"
                }`}
              >
                {timeLeft}s
              </span>
            </div>

            <button
              onClick={restartGame}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-semibold text-sm flex items-center gap-2"
            >
              🔄 Chơi lại
            </button>
          </div>
        </div>

        {/* Feedback Messages - Fixed Position */}
        <AnimatePresence>
          {showFeedback.show && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-bold ${
                  showFeedback.isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {showFeedback.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Tip */}
        {!gameOver && (
          <div className="bg-gradient-to-r from-yellow-50 to-red-50 border-l-4 border-yellow-600 p-3 mx-4 mt-3 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>💡</strong> Phân loại 21 item đúng vào 3 giỏ. Tránh Công
              nghiệp nặng!
            </p>
          </div>
        )}

        {/* Game Over Screen */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl z-50 flex items-center justify-center p-8"
            >
              <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-10 rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-yellow-400">
                <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-6" />
                <h3 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                  {correctAttempts === totalCorrectItems
                    ? "🎉 Hoàn Thành Xuất Sắc!"
                    : "⏰ Hết Giờ!"}
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-gray-600 mb-2">Tổng điểm</p>
                    <p className="text-4xl font-bold text-yellow-600">
                      {score}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-gray-600 mb-2">Độ chính xác</p>
                    <p className="text-4xl font-bold text-green-600">
                      {Math.round(
                        (correctAttempts / (correctAttempts + wrongAttempts)) *
                          100
                      ) || 0}
                      %
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-gray-600 mb-2">Đúng</p>
                    <p className="text-4xl font-bold text-green-600">
                      {correctAttempts}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-gray-600 mb-2">Sai</p>
                    <p className="text-4xl font-bold text-red-600">
                      {wrongAttempts}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-100 border-l-4 border-yellow-600 p-6 rounded-lg mb-8">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    <strong>📚 Bài học lịch sử:</strong> Đại hội VI (1986) đánh
                    dấu bước ngoặt lịch sử, chuyển hướng từ ưu tiên công nghiệp
                    nặng sang 3 chương trình kinh tế: Lương thực thực phẩm, Hàng
                    tiêu dùng, và Hàng xuất khẩu.
                  </p>
                </div>

                <button
                  onClick={restartGame}
                  className="w-full py-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  🔄 Chơi lại để cải thiện
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Baskets - Compact Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4">
          <Basket
            category="Lương thực"
            onDrop={(item) => handleDrop("luongthuc", item)}
          />
          <Basket
            category="Hàng tiêu dùng"
            onDrop={(item) => handleDrop("tieudung", item)}
          />
          <Basket
            category="Hàng xuất khẩu"
            onDrop={(item) => handleDrop("xuatkhau", item)}
          />
        </div>

        {/* Items Grid - Compact */}
        <div className="bg-white/80 p-3 md:p-4 rounded-xl shadow-inner border border-gray-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3 text-center">
            📦 Kéo thả các item vào giỏ phù hợp
          </h4>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {allItems.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                isPlaced={placedItemIds.includes(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const MiniGamePage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<"game1" | "game2" | null>(
    null
  );
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameToStart, setGameToStart] = useState<"game1" | "game2" | null>(
    null
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleGameClick = (gameId: "game1" | "game2") => {
    setGameToStart(gameId);
    setShowInstructions(true);
  };

  const handleStartGame = () => {
    setSelectedGame(gameToStart);
    setShowInstructions(false);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
    setGameToStart(null);
  };

  // Scroll to top when game modal opens
  useEffect(() => {
    if (selectedGame && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedGame]);

  const games = [
    {
      id: "game1" as const,
      title: "Siêu thị Tem Phiếu",
      subtitle: "Đêm Trước Đổi Mới (90s)",
      description:
        "Lạm phát 774%, thiếu lương thực, ngăn sông cấm chợ. Chọn 15 món đồ thiết yếu từ 50 item trong 90 giây. Cảm nhận sự khan hiếm và áp lực của cơ chế tập trung quan liêu bao cấp.",
      icon: "🌑",
      color: "from-red-500 to-orange-600",
      bgColor: "from-red-50 to-orange-50",
    },
    {
      id: "game2" as const,
      title: "Nhà Hoạch Định Chiến Lược",
      subtitle: "Cú Hích Lịch Sử - Đại Hội VI (120s)",
      description:
        "Phân loại 50 item vào 3 chương trình kinh tế ưu tiên của Đại hội VI. Chuyển hướng từ công nghiệp nặng sang lương thực, hàng tiêu dùng, xuất khẩu. Thử thách khả năng hiểu biết lịch sử!",
      icon: "⚡",
      color: "from-yellow-500 to-red-600",
      bgColor: "from-yellow-50 to-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-red-600 to-yellow-600 p-1 rounded-2xl mb-6">
            <div className="bg-white px-8 py-4 rounded-xl">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                🎮 Mini Games: Đổi Mới 1986
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Trải nghiệm lịch sử qua những trò chơi tương tác về thời kỳ khủng
            hoảng và đổi mới.
          </p>
        </motion.div>

        {/* Game Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-gradient-to-br ${game.bgColor} p-8 rounded-3xl shadow-2xl cursor-pointer border-2 border-transparent hover:border-red-300 transition-all flex flex-col`}
              onClick={() => handleGameClick(game.id)}
            >
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">{game.icon}</div>
                <h2
                  className={`text-3xl font-bold mb-2 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}
                >
                  {game.title}
                </h2>
                <p className="text-sm font-semibold text-gray-600 mb-4">
                  {game.subtitle}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                {game.description}
              </p>
              <button
                className={`w-full py-4 px-6 bg-gradient-to-r ${game.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-auto`}
              >
                <Play className="w-6 h-6" />
                Chơi ngay
              </button>
            </motion.div>
          ))}
        </div>

        {/* Instructions Modal */}
        <AnimatePresence>
          {showInstructions && gameToStart && (
            <InstructionsModal
              game={gameToStart}
              onClose={() => setShowInstructions(false)}
              onStart={handleStartGame}
            />
          )}
        </AnimatePresence>

        {/* Game Modal */}
        <AnimatePresence>
          {selectedGame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={handleCloseGame}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="h-full w-full overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Fixed Header with Close Button */}
                <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-yellow-600 p-4 shadow-lg">
                  <div className="container mx-auto flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      {selectedGame === "game1"
                        ? "🌑 Siêu thị Tem Phiếu"
                        : "⚡ Nhà Hoạch Định Chiến Lược"}
                    </h2>
                    <button
                      onClick={handleCloseGame}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto bg-white"
                >
                  <div className="container mx-auto p-4 md:p-6">
                    {selectedGame === "game1" && <SurvivalGame />}
                    {selectedGame === "game2" && <StrategyGame />}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MiniGamePage;
