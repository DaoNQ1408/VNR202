import React, { useState, useEffect } from "react";
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
              desc: "Bạn có 30 giây để chọn món đồ",
            },
            {
              icon: "✅",
              title: "Món thiết yếu",
              desc: "Gạo, Nước mắm, Vải, Xà phòng (+10 điểm)",
            },
            {
              icon: "❌",
              title: "Món không thiết yếu",
              desc: "Bánh kẹo, Đồ chơi, Sách vở, Điện thoại (-5 điểm)",
            },
            {
              icon: "🎯",
              title: "Mục tiêu",
              desc: "Chọn đủ 4 món thiết yếu để đạt điểm cao nhất!",
            },
          ],
          tips: [
            "Trong thời kỳ khủng hoảng, người dân chỉ quan tâm nhu yếu phẩm",
            "Tem phiếu bị giới hạn, hãy chọn thông minh!",
            "Càng chọn đúng, điểm số càng cao",
          ],
        }
      : {
          title: "⚡ Nhà Hoạch Định Chiến Lược",
          subtitle: "Đại Hội VI (1986)",
          objective: "Kéo thả item vào 3 giỏ ưu tiên của Đại hội VI!",
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
              icon: "🎯",
              title: "Chiến lược",
              desc: "Hiểu rõ 3 chương trình kinh tế của Đại hội VI",
            },
          ],
          tips: [
            "Đại hội VI chuyển hướng từ công nghiệp nặng sang nông nghiệp",
            "Ưu tiên: Lương thực thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu",
            "Tránh kéo Máy móc hạng nặng và Than đá vào giỏ!",
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
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-8 rounded-t-3xl text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-4xl font-bold mb-2">{instructions.title}</h2>
          <p className="text-xl opacity-90">{instructions.subtitle}</p>
        </div>

        <div className="p-8">
          {/* Objective */}
          <div className="bg-gradient-to-r from-yellow-100 to-red-100 p-6 rounded-2xl mb-8 border-2 border-yellow-300">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mục tiêu
                </h3>
                <p className="text-lg text-gray-700">
                  {instructions.objective}
                </p>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-7 h-7 text-yellow-600" />
              Luật chơi
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {instructions.rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 rounded-xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 transition-colors"
                >
                  <div className="text-3xl mb-3">{rule.icon}</div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    {rule.title}
                  </h4>
                  <p className="text-gray-600">{rule.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-7 h-7 text-yellow-500" />
              Mẹo chơi
            </h3>
            <div className="space-y-3">
              {instructions.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500"
                >
                  <span className="text-yellow-600 font-bold">💡</span>
                  <p className="text-gray-700">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full py-5 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-7 h-7" />
            Bắt đầu chơi ngay!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Game 1: Survival Game - Siêu thị Tem Phiếu
const SurvivalGame: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30);
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
    { name: "Gạo", isEssential: true, image: "🍚" },
    { name: "Nước mắm", isEssential: true, image: "🧂" },
    { name: "Vải", isEssential: true, image: "🧵" },
    { name: "Xà phòng", isEssential: true, image: "🧼" },
    { name: "Bánh kẹo", isEssential: false, image: "🍬" },
    { name: "Đồ chơi", isEssential: false, image: "🧸" },
    { name: "Sách vở", isEssential: false, image: "📚" },
    { name: "Điện thoại", isEssential: false, image: "📞" },
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

    setSelectedItems([...selectedItems, item.name]);
    if (item.isEssential) {
      setScore(score + 10);
      setFeedback({ show: true, isCorrect: true, message: "+10 điểm!" });
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback({ show: true, isCorrect: false, message: "-5 điểm!" });
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
    <div className="bg-gradient-to-br from-white via-red-50 to-yellow-50 p-8 rounded-2xl shadow-2xl relative border border-red-200">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-t-2xl"></div>
      <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
        🎮 Siêu thị Tem Phiếu
      </h3>
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-8 mb-6">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-200">
            <Clock className="w-6 h-6 text-red-600" />
            <span
              className={`text-2xl font-bold ${
                timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-gray-900"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-900">
              {score} điểm
            </span>
          </div>
        </div>
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                feedback.isCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-6 bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg"
          >
            <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900 mb-2">Kết thúc!</p>
            <p className="text-lg text-gray-700 mb-4">
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
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Chơi lại
            </button>
          </motion.div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.name}
            className={`p-6 border-3 rounded-xl cursor-pointer text-center transition-all duration-300 ${
              selectedItems.includes(item.name)
                ? "bg-gradient-to-br from-green-100 to-green-200 border-green-500 shadow-lg shadow-green-200"
                : "bg-white border-gray-300 hover:border-red-400 hover:shadow-xl"
            } ${gameOver ? "cursor-not-allowed opacity-60" : ""}`}
            onClick={() => handleItemClick(item)}
            whileHover={{
              scale: gameOver ? 1 : 1.08,
              rotate: gameOver ? 0 : [0, -2, 2, 0],
            }}
            whileTap={{ scale: gameOver ? 1 : 0.95 }}
          >
            <div className="text-5xl mb-3 filter drop-shadow-lg">
              {item.image}
            </div>
            <p className="text-base font-semibold text-gray-800">{item.name}</p>
            {selectedItems.includes(item.name) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2"
              >
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
              </motion.div>
            )}
          </motion.div>
        ))}
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item: Item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
      className={`p-6 border-3 rounded-2xl text-center min-h-[220px] flex flex-col justify-center transition-all duration-300 bg-gradient-to-br ${
        isOver
          ? "border-yellow-500 shadow-2xl shadow-yellow-200 scale-105"
          : `${getCategoryColor()} shadow-lg`
      }`}
    >
      <div className="text-4xl mb-3">{getCategoryIcon()}</div>
      <h4 className="font-bold text-xl text-gray-800">{category}</h4>
      <p className="text-sm text-gray-600 mt-2">Kéo thả item vào đây</p>
    </div>
  );
};

const DraggableItem: React.FC<{ item: Item }> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`p-4 border-2 rounded-xl cursor-move text-center bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isDragging
          ? "opacity-50 scale-110 rotate-6"
          : "opacity-100 border-gray-300"
      }`}
      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl mb-2 filter drop-shadow-lg">{item.image}</div>
      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
    </motion.div>
  );
};

const StrategyGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Lúa gạo", category: "luongthuc", image: "🌾" },
    { id: "2", name: "Tôm đông lạnh", category: "xuatkhau", image: "🦐" },
    { id: "3", name: "Quần áo", category: "tieudung", image: "👕" },
    { id: "4", name: "Máy móc hạng nặng", category: "congnghiep", image: "⚙️" },
    { id: "5", name: "Than đá", category: "congnghiep", image: "⛏️" },
    { id: "6", name: "Cà phê", category: "xuatkhau", image: "☕" },
  ]);
  const [placedItems, setPlacedItems] = useState<{ [key: string]: Item[] }>({
    luongthuc: [],
    tieudung: [],
    xuatkhau: [],
  });

  const handleDrop = (basketCategory: string, item: Item) => {
    if (item.category === basketCategory) {
      setScore(score + 10);
      setPlacedItems({
        ...placedItems,
        [basketCategory]: [...placedItems[basketCategory], item],
      });
      setItems(items.filter((i) => i.id !== item.id));
    } else {
      setScore(Math.max(0, score - 5));
      // Báo động đỏ
      alert("Sai rồi! Đây không phải ưu tiên của Đại hội VI.");
    }
  };

  const restartGame = () => {
    setScore(0);
    setItems([
      { id: "1", name: "Lúa gạo", category: "luongthuc", image: "🌾" },
      { id: "2", name: "Tôm đông lạnh", category: "xuatkhau", image: "🦐" },
      { id: "3", name: "Quần áo", category: "tieudung", image: "👕" },
      {
        id: "4",
        name: "Máy móc hạng nặng",
        category: "congnghiep",
        image: "⚙️",
      },
      { id: "5", name: "Than đá", category: "congnghiep", image: "⛏️" },
      { id: "6", name: "Cà phê", category: "xuatkhau", image: "☕" },
    ]);
    setPlacedItems({
      luongthuc: [],
      tieudung: [],
      xuatkhau: [],
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gradient-to-br from-white via-yellow-50 to-red-50 p-8 rounded-2xl shadow-2xl border border-yellow-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-red-500 to-yellow-600 rounded-t-2xl"></div>
        <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          🎮 Nhà Hoạch Định Chiến Lược
        </h3>
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-yellow-200">
              <Trophy className="w-7 h-7 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900">
                {score} điểm
              </span>
            </div>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              🔄 Chơi lại
            </button>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 Mẹo:</strong> Kéo thả item vào giỏ đúng để ghi điểm.
              Tránh Công nghiệp nặng!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <div className="bg-white p-6 rounded-xl shadow-inner">
          <h4 className="text-lg font-bold text-center mb-4 text-gray-700">
            📦 Kéo các item vào giỏ phù hợp
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <DraggableItem key={item.id} item={item} />
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

  const games = [
    {
      id: "game1" as const,
      title: "Siêu thị Tem Phiếu",
      subtitle: "Đêm Trước Đổi Mới",
      description:
        "Lạm phát 774%, thiếu lương thực, ngăn sông cấm chợ. Cảm nhận sự khan hiếm và áp lực của cơ chế tập trung quan liêu bao cấp.",
      icon: "🌑",
      color: "from-red-500 to-orange-600",
      bgColor: "from-red-50 to-orange-50",
    },
    {
      id: "game2" as const,
      title: "Nhà Hoạch Định Chiến Lược",
      subtitle: "Cú Hích Lịch Sử - Đại Hội VI",
      description:
        "Nhìn thẳng vào sự thật, 3 chương trình kinh tế lớn. Chuyển hướng từ công nghiệp nặng sang nông nghiệp và hàng tiêu dùng.",
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseGame}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseGame}
                  className="sticky top-4 right-4 ml-auto mb-4 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg z-10 flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="p-8">
                  {selectedGame === "game1" && <SurvivalGame />}
                  {selectedGame === "game2" && <StrategyGame />}
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
