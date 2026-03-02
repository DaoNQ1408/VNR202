import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Period {
  id: number;
  year: string;
  title: string;
  originalImage: string;
  coloredImage?: string;
  content: string;
  highlights: string[];
}

const HistoricalStoryTimeline: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPeriods, setShowPeriods] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const periods: Period[] = [
    {
      id: 1,
      year: "Kì 1 - 1945",
      title: "Cách Mạng Tháng Tám & Lễ Độc Lập",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/Ki1.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/Ki1_color.png",
      content:
        "Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa, đưa dân tộc ta bước vào kỷ nguyên mới: Kỷ nguyên độc lập tự do và chủ nghĩa xã hội.",
      highlights: [
        "Lật đổ chế độ quân chủ và thực dân",
        "Thành lập nước Việt Nam Dân chủ Cộng hòa",
        "Mở ra kỷ nguyên độc lập tự do",
      ],
    },
    {
      id: 2,
      year: "Kì 2 - 1945",
      title: "Kháng Chiến Kiến Quốc",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki2.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki2_color.jpg",
      content:
        "Đối mặt với muôn vàn khó khăn: giặc đói, giặc dốt và giặc ngoại xâm. Chính phủ đã phát động Tuần lễ Vàng, Quỹ Độc lập, phong trào Bình dân học vụ để giải quyết nạn mù chữ và tăng gia sản xuất giải quyết nạn đói.",
      highlights: [
        "Diệt giặc đói, giặc dốt",
        "Tổ chức Tuần lễ Vàng",
        "Phát động Bình dân học vụ",
      ],
    },
    {
      id: 3,
      year: "Kì 3 - 1946",
      title: "Tổng Tuyển Cử Đầu Tiên",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki3.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki3_color.png",
      content:
        "Ngày 6/1/1946, bất chấp sự phá hoại của kẻ thù, cuộc Tổng tuyển cử bầu Quốc hội khóa I đã thành công tốt đẹp. Sự kiện này mang ý nghĩa chính trị to lớn, khẳng định tính hợp pháp của chính phủ mới.",
      highlights: [
        "Lần đầu tiên nhân dân được bỏ phiếu",
        "Bầu ra Quốc hội khóa I",
        "Hiến pháp đầu tiên được thông qua",
      ],
    },
    {
      id: 4,
      year: "Kì 4 - 1946",
      title: "Ngoại Giao Cương Nhu Kết Hợp",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki4.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki4_color.png",
      content:
        "Ký Hiệp định Sơ bộ (6/3) và Tạm ước (14/9), thực hiện sách lược 'Hòa để tiến'. Đây là nước cờ thiên tài giúp loại bỏ quân Tưởng, tranh thủ thời gian xây dựng lực lượng vũ trang.",
      highlights: [
        "Ký Hiệp định Sơ bộ 6/3/1946",
        "Đuổi 20 vạn quân Tưởng về nước",
        "Tranh thủ thời gian chuẩn bị lực lượng",
      ],
    },
    {
      id: 5,
      year: "Kì 5 - 1946",
      title: "Toàn Quốc Kháng Chiến Bùng Nổ",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki5.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki5_color.jpg",
      content:
        "Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến. Cuộc kháng chiến chính nghĩa của dân tộc Việt Nam chính thức bắt đầu với tinh thần 'Quyết tử để Tổ quốc quyết sinh'.",
      highlights: [
        "Lời kêu gọi toàn quốc kháng chiến (19/12/1946)",
        "Đường lối kháng chiến: toàn dân, toàn diện",
        "Chiến đấu giam chân địch trong thành phố",
      ],
    },
    {
      id: 6,
      year: "Kì 6 - 1947",
      title: "Chiến Dịch Việt Bắc Thu-Đông",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki6.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki6_color.jpg",
      content:
        "Quân và dân ta đánh bại cuộc tấn công quy mô lớn của thực dân Pháp lên căn cứ địa Việt Bắc, bảo vệ an toàn cơ quan đầu não kháng chiến, làm phá sản hoàn toàn chiến lược 'đánh nhanh thắng nhanh'.",
      highlights: [
        "Bảo vệ an toàn cơ quan Trung ương Đảng",
        "Phá sản chiến lược đánh nhanh thắng nhanh",
        "Buộc Pháp chuyển sang đánh lâu dài",
      ],
    },
    {
      id: 7,
      year: "Kì 7 - 1950",
      title: "Chiến Dịch Biên Giới Thu-Đông",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki7.jpg",
      content:
        "Mở chiến dịch Biên giới nhằm khai thông biên giới Việt-Trung, mở rộng căn cứ địa. Đây là chiến dịch tiến công lớn đầu tiên của ta, giành được quyền chủ động về chiến lược trên chiến trường chính Bắc Bộ.",
      highlights: [
        "Khai thông biên giới Việt-Trung",
        "Tiêu diệt một bộ phận quan trọng sinh lực địch",
        "Giành quyền chủ động chiến lược",
      ],
    },
    {
      id: 8,
      year: "Kì 8 - 1951",
      title: "Đại Hội Đảng Lần II",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki8.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki8_color.png",
      content:
        "Đại hội ĐBTQ lần II (2/1951) tại Tuyên Quang. Đảng ra hoạt động công khai lấy tên là Đảng Lao động Việt Nam, vạch ra cương lĩnh mới để đưa cuộc kháng chiến đến thắng lợi hoàn toàn.",
      highlights: [
        "Đảng ra hoạt động công khai",
        "Đổi tên thành Đảng Lao động Việt Nam",
        "Hoàn thiện đường lối kháng chiến",
      ],
    },
    {
      id: 9,
      year: "Kì 9 - 1953",
      title: "Cải Cách Ruộng Đất",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki9.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki9_color.png",
      content:
        "Năm 1953, Đảng và Nhà nước quyết định phát động quần chúng triệt để giảm tô và tiến hành cải cách ruộng đất, hiện thực hóa khẩu hiệu 'Người cày có ruộng', bồi dưỡng sức dân phục vụ kháng chiến.",
      highlights: [
        "Hiện thực hóa khẩu hiệu 'Người cày có ruộng'",
        "Động viên sức người sức của cho tiền tuyến",
        "Giải phóng sức sản xuất nông nghiệp",
      ],
    },
    {
      id: 10,
      year: "Kì 10 - 1953",
      title: "Cuộc Trấn Áp Kế Hoạch Nava",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki10.jpg",
      content:
        "Pháp Mỹ đề ra kế hoạch Nava nhằm tìm kiếm 'lối thoát danh dự'. Đảng ta mở cuộc tiến công chiến lược Đông-Xuân 1953-1954, phân tán lực lượng địch thành 5 hướng khác nhau, phá sản bước đầu kế hoạch Nava.",
      highlights: [
        "Mở cuộc tiến công Đông-Xuân 1953-1954",
        "Phân tán lực lượng cơ động của địch",
        "Chuẩn bị mọi mặt cho trận quyết chiến chiến lược",
      ],
    },
    {
      id: 11,
      year: "Kì 11 - 1954",
      title: "Đại Thắng Điện Biên Phủ",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki11.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki11_color.png",
      content:
        "Sau 56 ngày đêm khoét núi ngủ hầm, mưa dầm cơm vắt, chiến dịch Điện Biên Phủ toàn thắng (7/5/1954). Đây là đòn quyết định đập tan ý chí xâm lược của thực dân Pháp.",
      highlights: [
        "Chiến thắng lẫy lừng năm châu, chấn động địa cầu",
        "Tiêu diệt tập đoàn cứ điểm mạnh nhất Đông Dương",
        "Đánh đổ chủ nghĩa thực dân cũ",
      ],
    },
    {
      id: 12,
      year: "Kì 12 - 1954",
      title: "Hiệp Định Giơnevơ & Hòa Bình",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki12.jpg",
      content:
        "Ngày 21/7/1954, Hiệp định Giơnevơ được ký kết, Pháp và các nước phải công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, miền Bắc được hoàn toàn giải phóng.",
      highlights: [
        "Pháp công nhận độc lập, chủ quyền Việt Nam",
        "Giải phóng hoàn toàn miền Bắc",
        "Kết thúc 9 năm kháng chiến trường kỳ",
      ],
    },
  ];

  useEffect(() => {
    if (timelineRef.current) {
      const ctx = gsap.context(() => {
        // Only animate if elements exist
        const storyTitle = document.querySelector(".story-title");
        if (storyTitle) {
          gsap.from(".story-title", {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power3.out",
          });
        }

        const periodCards = document.querySelectorAll(".period-card");
        const periodGrid = document.querySelector(".period-grid");

        if (periodCards && periodCards.length > 0 && periodGrid) {
          gsap.from(".period-card", {
            scrollTrigger: {
              trigger: ".period-grid",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
          });
        }
      }, timelineRef);

      return () => ctx.revert();
    }
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentPeriod(index);
    setIsModalOpen(true);
    setIsImageHovered(false);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleNextPeriod = () => {
    if (currentPeriod < periods.length - 1) {
      setCurrentPeriod(currentPeriod + 1);
      setIsImageHovered(false);
    }
  };

  const handlePrevPeriod = () => {
    if (currentPeriod > 0) {
      setCurrentPeriod(currentPeriod - 1);
      setIsImageHovered(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset";
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <section
        ref={timelineRef}
        className="py-20 bg-gradient-to-br from-red-50 via-yellow-50 to-white"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-full text-sm font-semibold">
                🇻🇳 Hành Trình Lịch Sử
              </span>
            </motion.div>

            <h1 className="story-title text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent">
              9 Năm Kháng Chiến Chống Pháp
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-4">
              Từ Cách Mạng Tháng Tám đến Chiến Thắng Điện Biên Phủ (1945-1954)
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá 12 sự kiện lịch sử quan trọng của quy trình đấu tranh và
              xây dựng chủ nghĩa xã hội. Nhấp vào nút Play để bắt đầu hành trình
              khám phá!
            </p>
          </div>

          {/* Play Button */}
          {!showPeriods && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <button
                onClick={() => setShowPeriods(true)}
                className="group relative"
              >
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>

                {/* Main button */}
                <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-yellow-600 rounded-full p-8 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl">
                  <div className="relative flex items-center justify-center w-32 h-32">
                    {/* Play icon */}
                    <svg
                      className="w-20 h-20 text-white transform translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                  </div>
                </div>

                {/* Text below button */}
                <div className="mt-6 text-center">
                  <p className="text-2xl font-bold bg-gradient-to-r from-red-700 to-yellow-600 bg-clip-text text-transparent">
                    Bắt Đầu Khám Phá
                  </p>
                  <p className="text-gray-600 mt-2">
                    12 sự kiện lịch sử đang chờ bạn
                  </p>
                </div>
              </button>
            </motion.div>
          )}

          {/* Period Grid */}
          {showPeriods && (
            <div className="period-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {periods.map((period, index) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.02,
                    ease: "easeOut",
                  }}
                  className="period-card group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={period.originalImage}
                        alt={period.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="text-sm font-semibold text-red-600 mb-1">
                        {period.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                        {period.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {period.content}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
                        <span className="text-red-600 font-bold">
                          Xem chi tiết →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal - Outside section for fullscreen */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70"
            style={{ margin: 0, overflow: "hidden" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              {currentPeriod > 0 && (
                <button
                  onClick={handlePrevPeriod}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-red-600 p-3 rounded-full transition-all shadow-lg"
                >
                  <ChevronLeft size={28} />
                </button>
              )}
              {currentPeriod < periods.length - 1 && (
                <button
                  onClick={handleNextPeriod}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-red-600 p-3 rounded-full transition-all shadow-lg"
                >
                  <ChevronRight size={28} />
                </button>
              )}

              <div className="grid md:grid-cols-2 h-full overflow-y-auto">
                {/* Image Section */}
                <div className="relative bg-gray-100 flex items-center justify-center p-6">
                  <div
                    className="relative w-full max-h-[70vh]"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    {/* Original image - always rendered */}
                    <img
                      src={periods[currentPeriod].originalImage}
                      alt={periods[currentPeriod].title}
                      className="w-full h-full object-contain rounded-lg shadow-xl"
                    />

                    {/* Colored image overlay - shows on hover if available */}
                    {periods[currentPeriod].coloredImage && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isImageHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        src={periods[currentPeriod].coloredImage}
                        alt={`${periods[currentPeriod].title} - Phần màu`}
                        className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-xl pointer-events-none"
                      />
                    )}

                    {/* Hover hint - only show if colored image exists */}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 overflow-y-auto">
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {periods[currentPeriod].year}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {periods[currentPeriod].title}
                  </h2>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {periods[currentPeriod].content}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-red-600 rounded"></span>
                      Điểm Nổi Bật
                    </h3>
                    <ul className="space-y-3">
                      {periods[currentPeriod].highlights.map(
                        (highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-red-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 flex-1">
                              {highlight}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Tiến độ</span>
                      <span className="font-semibold">
                        {currentPeriod + 1} / {periods.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-600 to-yellow-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((currentPeriod + 1) / periods.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HistoricalStoryTimeline;
