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
  const [showColoredImage, setShowColoredImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPeriods, setShowPeriods] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const periods: Period[] = [
    {
      id: 1,
      year: "Kì 1 - 1991",
      title: "Bước Khởi Đầu: Mở Cửa Nền Kinh Tế",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/Ki1.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/Ki1_color.png",
      content:
        "Sau Đại hội VI (1986), Việt Nam bước vào giai đoạn đổi mới toàn diện. Năm 1991 đánh dấu bước ngoặt quan trọng khi Đảng Cộng sản Việt Nam khẳng định tiếp tục con đường đổi mới, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa. Đây là thời kỳ chuyển đổi từ nền kinh tế kế hoạch hóa tập trung sang cơ chế thị trường, mở ra nhiều cơ hội mới cho đất nước.",
      highlights: [
        "Chính sách mở cửa và hội nhập kinh tế quốc tế",
        "Chuyển đổi từ kinh tế kế hoạch hóa sang thị trường",
        "Khuyến khích phát triển kinh tế tư nhân",
      ],
    },
    {
      id: 2,
      year: "Kì 2 - 1991",
      title: "Cải Cách Nông Nghiệp",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki2.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki2_color.jpg",
      content:
        "Cải cách nông nghiệp là một trong những trọng tâm của giai đoạn đầu đổi mới. Chính sách khoán 10 và sau đó là giao đất cho nông dân đã tạo ra bước đột phá trong sản xuất nông nghiệp. Người nông dân được quyền chủ động trong sản xuất, được hưởng phần lớn thành quả lao động, tạo động lực mạnh mẽ cho phát triển.",
      highlights: [
        "Thực hiện chính sách khoán 10 hiệu quả",
        "Giao quyền sử dụng đất lâu dài cho nông dân",
        "Tăng năng suất và sản lượng lương thực",
      ],
    },
    {
      id: 3,
      year: "Kì 3 - 1992",
      title: "Hiến Pháp 1992: Nền Tảng Pháp Lý",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki3.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki3_color.png",
      content:
        "Hiến pháp năm 1992 ra đời đánh dấu bước phát triển quan trọng trong việc xây dựng nhà nước pháp quyền. Hiến pháp này khẳng định vai trò lãnh đạo của Đảng, đồng thời công nhận và bảo vệ các thành phần kinh tế khác nhau, tạo hành lang pháp lý vững chắc cho sự nghiệp đổi mới.",
      highlights: [
        "Xây dựng nhà nước pháp quyền xã hội chủ nghĩa",
        "Công nhận đa dạng các thành phần kinh tế",
        "Bảo vệ quyền con người và quyền công dân",
      ],
    },
    {
      id: 4,
      year: "Kì 4 - 1992",
      title: "Phát Triển Công Nghiệp",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki4.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki4_color.png",
      content:
        "Giai đoạn này chứng kiến sự chuyển dịch cơ cấu kinh tế từ nông nghiệp sang công nghiệp và dịch vụ. Các khu công nghiệp được xây dựng, thu hút đầu tư nước ngoài. Việt Nam bắt đầu hình thành các ngành công nghiệp chế biến, xuất khẩu, tạo tiền đề cho công nghiệp hóa, hiện đại hóa.",
      highlights: [
        "Xây dựng các khu công nghiệp tập trung",
        "Thu hút đầu tư trực tiếp nước ngoài (FDI)",
        "Phát triển công nghiệp chế biến xuất khẩu",
      ],
    },
    {
      id: 5,
      year: "Kì 5 - 1993",
      title: "Quan Hệ Quốc Tế Mở Rộng",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki5.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki5_color.jpg",
      content:
        "Việt Nam tích cực mở rộng quan hệ đối ngoại, bình thường hóa quan hệ với nhiều nước. Chính sách đối ngoại 'Việt Nam muốn làm bạn với tất cả các nước' được triển khai mạnh mẽ. Việc gia nhập ASEAN (1995) và cải thiện quan hệ với các nước lớn mở ra cơ hội hội nhập kinh tế quốc tế.",
      highlights: [
        "Chuẩn bị gia nhập ASEAN",
        "Cải thiện quan hệ với các nước láng giềng",
        "Mở rộng hợp tác kinh tế quốc tế",
      ],
    },
    {
      id: 6,
      year: "Kì 6 - 1993",
      title: "Cải Cách Ngân Hàng và Tài Chính",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki6.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki6_color.jpg",
      content:
        "Hệ thống ngân hàng được tái cơ cấu với mô hình hai cấp: Ngân hàng Nhà nước và các ngân hàng thương mại. Thị trường chứng khoán được thai nghén. Các chính sách tài chính - tiền tệ được hoàn thiện để phục vụ nền kinh tế thị trường, kiểm soát lạm phát và ổn định kinh tế vĩ mô.",
      highlights: [
        "Xây dựng hệ thống ngân hàng hai cấp",
        "Cải cách chính sách tài chính - tiền tệ",
        "Kiểm soát lạm phát hiệu quả",
      ],
    },
    {
      id: 7,
      year: "Kì 7 - 1994",
      title: "Giáo Dục và Đào Tạo",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki7.jpg",
      content:
        "Đầu tư cho giáo dục được đặc biệt chú trọng nhằm nâng cao chất lượng nguồn nhân lực. Chương trình giáo dục được đổi mới, chuyển từ 'truyền thụ' sang 'phát triển năng lực'. Các trường đại học mở rộng, chất lượng đào tạo được cải thiện để đáp ứng yêu cầu phát triển kinh tế - xã hội.",
      highlights: [
        "Đổi mới chương trình và phương pháp giáo dục",
        "Mở rộng quy mô và nâng cao chất lượng đào tạo",
        "Phát triển nguồn nhân lực chất lượng cao",
      ],
    },
    {
      id: 8,
      year: "Kì 8 - 1994",
      title: "Xóa Đói Giảm Nghèo",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki8.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki8_color.png",
      content:
        "Chương trình xóa đói giảm nghèo được triển khai đồng bộ trên cả nước. Nhờ tăng trưởng kinh tế và các chính sách xã hội phù hợp, tỷ lệ hộ nghèo giảm mạnh. Đời sống nhân dân được cải thiện đáng kể, an sinh xã hội được chú trọng, thể hiện bản chất nhân văn của chế độ.",
      highlights: [
        "Triển khai chương trình xóa đói giảm nghèo",
        "Tỷ lệ hộ nghèo giảm mạnh",
        "Cải thiện đời sống nhân dân",
      ],
    },
    {
      id: 9,
      year: "Kì 9 - 1995",
      title: "Gia Nhập ASEAN",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki9.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki9_color.png",
      content:
        "Ngày 28/7/1995, Việt Nam chính thức trở thành thành viên thứ 7 của ASEAN, đánh dấu bước ngoặt lịch sử trong chính sách đối ngoại. Việc gia nhập ASEAN mở ra cơ hội hội nhập kinh tế khu vực, tăng cường hợp tác chính trị, an ninh và văn hóa, nâng cao vị thế Việt Nam trên trường quốc tế.",
      highlights: [
        "Chính thức gia nhập ASEAN (28/7/1995)",
        "Hội nhập kinh tế khu vực",
        "Nâng cao vị thế quốc tế của Việt Nam",
      ],
    },
    {
      id: 10,
      year: "Kì 10 - 1995",
      title: "Bình Thường Hóa Quan Hệ Việt - Mỹ",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki10.jpg",
      content:
        "Việc bình thường hóa quan hệ Việt Nam - Hoa Kỳ mở ra trang mới trong quan hệ đối ngoại. Dù còn nhiều khác biệt, hai nước cam kết phát triển quan hệ trên cơ sở tôn trọng độc lập, chủ quyền và lợi ích của nhau. Điều này tạo môi trường thuận lợi cho hợp tác kinh tế, thương mại.",
      highlights: [
        "Bình thường hóa quan hệ ngoại giao Việt - Mỹ",
        "Mở rộng hợp tác kinh tế, thương mại",
        "Tạo môi trường quốc tế thuận lợi",
      ],
    },
    {
      id: 11,
      year: "Kì 11 - 1995",
      title: "Phát Triển Hạ Tầng",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki11.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki11_color.png",
      content:
        "Đầu tư phát triển hạ tầng kinh tế - xã hội được đẩy mạnh. Các tuyến đường giao thông, cầu cống, hệ thống điện, nước được nâng cấp và xây dựng mới. Hạ tầng viễn thông bắt đầu hiện đại hóa. Việc cải thiện hạ tầng tạo điều kiện thuận lợi cho phát triển kinh tế và nâng cao đời sống người dân.",
      highlights: [
        "Đầu tư xây dựng hạ tầng giao thông",
        "Nâng cấp hệ thống điện, nước",
        "Hiện đại hóa hạ tầng viễn thông",
      ],
    },
    {
      id: 12,
      year: "Kì 12 - 1996",
      title: "Xuất Khẩu Gạo",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki12.jpg",
      content:
        "Từ một nước nhập khẩu lương thực, Việt Nam trở thành nước xuất khẩu gạo lớn thứ 2 thế giới. Thành công này là kết quả của cải cách nông nghiệp, chính sách khuyến khích sản xuất và cải thiện kỹ thuật canh tác. Đây là minh chứng sinh động cho sự thành công của chính sách đổi mới.",
      highlights: [
        "Trở thành nước xuất khẩu gạo lớn thứ 2 thế giới",
        "Đảm bảo an ninh lương thực quốc gia",
        "Tăng thu nhập cho nông dân",
      ],
    },
    {
      id: 13,
      year: "Kì 13 - 1996",
      title: "Công Nghệ Thông Tin Khởi Đầu",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki13.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki13_color.png",
      content:
        "Internet bắt đầu du nhập vào Việt Nam, mở ra kỷ nguyên số. Các doanh nghiệp công nghệ thông tin đầu tiên được thành lập. Chính phủ nhận thức được tầm quan trọng của công nghệ thông tin trong phát triển kinh tế - xã hội và bắt đầu xây dựng chiến lược phát triển ngành này.",
      highlights: [
        "Internet du nhập vào Việt Nam",
        "Thành lập các doanh nghiệp CNTT đầu tiên",
        "Xây dựng chiến lược phát triển CNTT",
      ],
    },
    {
      id: 14,
      year: "Kì 14 - 1996",
      title: "Du Lịch Phát Triển",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki14.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki14_color.png",
      content:
        "Ngành du lịch được xác định là ngành kinh tế mũi nhọn. Các di sản văn hóa, thiên nhiên được bảo tồn và khai thác. Hạ tầng du lịch được đầu tư, dịch vụ du lịch được nâng cao. Việt Nam bắt đầu thu hút du khách quốc tế, mở ra nguồn thu ngoại tệ quan trọng và giới thiệu đất nước với bạn bè thế giới.",
      highlights: [
        "Phát triển du lịch thành ngành kinh tế mũi nhọn",
        "Bảo tồn và khai thác di sản văn hóa",
        "Thu hút du khách quốc tế",
      ],
    },
    {
      id: 15,
      year: "Kì 15 - 1996",
      title: "Y Tế và Chăm Sóc Sức Khỏe",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki15.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki15_color.png",
      content:
        "Hệ thống y tế được củng cố và mở rộng, đặc biệt ở vùng nông thôn, miền núi. Chương trình y tế cơ sở được tăng cường. Các chỉ số sức khỏe cộng đồng được cải thiện: tuổi thọ trung bình tăng, tỷ lệ tử vong trẻ em giảm. Đây là thành tựu quan trọng về bảo vệ và chăm sóc sức khỏe nhân dân.",
      highlights: [
        "Củng cố hệ thống y tế cơ sở",
        "Cải thiện các chỉ số sức khỏe cộng đồng",
        "Mở rộng phủ sóng y tế đến vùng sâu, vùng xa",
      ],
    },
    {
      id: 16,
      year: "Kì 16 - 1996",
      title: "Văn Hóa và Thể Thao",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki16.jpg",
      content:
        "Hoạt động văn hóa, văn nghệ được đổi mới, phong phú hơn. Các giá trị văn hóa truyền thống được bảo tồn và phát huy. Thể thao quần chúng và thể thao thành tích đều được chú trọng. Việt Nam đạt nhiều thành tích cao tại các giải thể thao khu vực và quốc tế, nâng cao tinh thần dân tộc.",
      highlights: [
        "Đổi mới và phát triển văn hóa, văn nghệ",
        "Bảo tồn giá trị văn hóa truyền thống",
        "Phát triển thể thao quần chúng và thành tích",
      ],
    },
    {
      id: 17,
      year: "Kì 17 - 1996",
      title: "Môi Trường và Phát Triển Bền Vững",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki17.jpg",
      content:
        "Ý thức bảo vệ môi trường bắt đầu được nâng cao. Các chính sách về môi trường được ban hành. Mô hình phát triển bền vững được quan tâm, cân bằng giữa phát triển kinh tế và bảo vệ môi trường. Các khu bảo tồn thiên nhiên được thành lập, tài nguyên rừng được quản lý tốt hơn.",
      highlights: [
        "Nâng cao ý thức bảo vệ môi trường",
        "Ban hành chính sách về môi trường",
        "Phát triển theo hướng bền vững",
      ],
    },
    {
      id: 18,
      year: "Kì 18 - 1996",
      title: "Chính Sách Dân Số",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki18.jpg",
      content:
        "Chính sách dân số - kế hoạch hóa gia đình được triển khai mạnh mẽ nhằm kiểm soát tốc độ tăng dân số, nâng cao chất lượng cuộc sống. Chương trình 'Một hoặc hai con là đủ' được tuyên truyền sâu rộng. Việc kiểm soát dân số góp phần quan trọng vào phát triển kinh tế - xã hội bền vững.",
      highlights: [
        "Triển khai chính sách dân số hiệu quả",
        "Kiểm soát tốc độ tăng dân số",
        "Nâng cao chất lượng cuộc sống",
      ],
    },
    {
      id: 19,
      year: "Kì 19 - 1996",
      title: "Tổng Kết và Triển Vọng",
      originalImage: "/img/tieptucthuchiendoimoi_1991-1996/ki19.jpg",
      coloredImage: "/img/tieptucthuchiendoimoi_1991-1996/ki19_color.png",
      content:
        "Giai đoạn 1991-1996 đánh dấu thành công ban đầu của sự nghiệp đổi mới. Kinh tế tăng trưởng ổn định, đời sống nhân dân được cải thiện. Việt Nam hội nhập sâu rộng vào khu vực và thế giới. Những thành tựu này là nền tảng vững chắc cho sự phát triển trong những giai đoạn tiếp theo, khẳng định đường lối đổi mới là đúng đắn.",
      highlights: [
        "Kinh tế tăng trưởng ổn định và bền vững",
        "Hội nhập quốc tế thành công",
        "Tạo nền tảng cho phát triển lâu dài",
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
    setShowColoredImage(false);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };
  const handleNextPeriod = () => {
    if (currentPeriod < periods.length - 1) {
      setCurrentPeriod(currentPeriod + 1);
      setShowColoredImage(false);
    }
  };

  const handlePrevPeriod = () => {
    if (currentPeriod > 0) {
      setCurrentPeriod(currentPeriod - 1);
      setShowColoredImage(false);
    }
  };

  const toggleImage = () => {
    if (periods[currentPeriod].coloredImage) {
      setShowColoredImage(!showColoredImage);
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
              Tiếp Tục Thực Hiện Đổi Mới Toàn Diện
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-4">
              Kinh Tế - Xã Hội (1991-1996)
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá 19 giai đoạn lịch sử quan trọng của Việt Nam trong thời
              kỳ đổi mới. Nhấp vào nút Play để bắt đầu hành trình khám phá!
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
                    19 giai đoạn lịch sử đang chờ bạn
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

                      {/* Colored indicator */}
                      {period.coloredImage && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Sparkles size={14} />
                          <span>Có màu</span>
                        </div>
                      )}
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
                  <div className="relative w-full max-h-[70vh]">
                    <motion.img
                      key={showColoredImage ? "colored" : "original"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={
                        showColoredImage && periods[currentPeriod].coloredImage
                          ? periods[currentPeriod].coloredImage
                          : periods[currentPeriod].originalImage
                      }
                      alt={periods[currentPeriod].title}
                      className="w-full h-full object-contain rounded-lg shadow-xl"
                    />

                    {/* Toggle button */}
                    {periods[currentPeriod].coloredImage && (
                      <button
                        onClick={toggleImage}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2"
                      >
                        <Sparkles size={20} />
                        {showColoredImage ? "Xem ảnh gốc" : "Xem ảnh màu"}
                      </button>
                    )}
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
                        )
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
                          width: `${((currentPeriod + 1) / periods.length) * 100
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
