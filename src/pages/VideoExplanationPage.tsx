import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlayCircle, BookOpen, Lightbulb, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VideoExplanationPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".video-header", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate question box
      gsap.from(".question-box", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
      });

      // Animate video container
      gsap.from(".video-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });

      // Animate lessons
      gsap.from(".lesson-card", {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".lessons-section",
          start: "top 80%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const keyLessons = [
    {
      icon: "🎯",
      title: "Phản ứng kịp thời",
      description:
        "Đảng nhận thức được tính cấp thiết của việc đổi mới khi nền kinh tế rơi vào khủng hoảng nghiêm trọng.",
    },
    {
      icon: "⚠️",
      title: "Không thể cải cách từng phần",
      description:
        "Cải cách giá-lương-tiền không đạt hiệu quả do thiếu đồng bộ, chứng tỏ cần phải đổi mới toàn diện.",
    },
    {
      icon: "🔄",
      title: "Học hỏi từ thất bại",
      description:
        "Thất bại của cải cách 1985 đã trở thành bài học quý giá cho Đại hội VI năm 1986.",
    },
    {
      icon: "💪",
      title: "Dũng cảm thay đổi",
      description:
        "Đảng đã có quyết tâm chính trị mạnh mẽ để thay đổi toàn diện cơ chế kinh tế.",
    },
    {
      icon: "🌟",
      title: "Từ khủng hoảng đến cơ hội",
      description:
        "Khủng hoảng năm 1985 đã trở thành động lực cho sự đổi mới lịch sử tại Đại hội VI.",
    },
    {
      icon: "📈",
      title: "Tầm nhìn dài hạn",
      description:
        "Đại hội VI đã vạch ra con đường phát triển bền vững cho Việt Nam trong nhiều thập kỷ.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen pt-20 pb-16"
      style={{ backgroundColor: "var(--off-white)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="video-header text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200">
            <PlayCircle
              className="w-5 h-5"
              style={{ color: "var(--vietnam-red)" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--vietnam-red)" }}
            >
              Video Giải Thích
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--vietnam-red)" }}
          >
            Cải Cách Giá-Lương-Tiền 1985
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--ancient-stone)" }}
          >
            Nguyên nhân trực tiếp dẫn đến quyết định đổi mới toàn diện tại Đại
            hội VI
          </p>
        </div>

        {/* Question Box */}
        <div className="question-box max-w-4xl mx-auto mb-12">
          <div
            className="rounded-2xl p-8 shadow-xl border-2"
            style={{
              backgroundColor: "#FFFDF8",
              borderColor: "var(--vietnam-gold)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <BookOpen
                  className="w-8 h-8"
                  style={{ color: "var(--vietnam-red)" }}
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ color: "var(--vietnam-red)" }}
                >
                  Câu Hỏi Nghiên Cứu
                </h2>
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{ color: "var(--timeless-navy)" }}
                >
                  <strong>
                    Vì sao công cuộc cải cách về giá-lương-tiền lại là nguyên
                    nhân trực tiếp dẫn tới quyết định đổi mới toàn diện nền
                    kinh tế Việt Nam tại Đại hội Đảng VI?
                  </strong>
                </p>
                <p
                  className="text-base"
                  style={{ color: "var(--ancient-stone)" }}
                >
                  Bài học gì rút ra từ cuộc cải cách xương máu này?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="video-container max-w-5xl mx-auto mb-16">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border-4"
            style={{ borderColor: "var(--vietnam-gold)" }}
          >
            <div className="relative bg-black">
              <video
                ref={videoRef}
                controls
                className="w-full aspect-video"
                poster="/img/tieptucthuchiendoimoi_1991-1996/poster.jpg"
              >
                <source src="/vid/last_vid.mov" type="video/mp4" />
                <source src="/vid/last_vid.mov" type="video/quicktime" />
                Trình duyệt của bạn không hỗ trợ video HTML5.
              </video>
            </div>
            <div
              className="p-6"
              style={{ backgroundColor: "var(--vietnam-red)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: "var(--vietnam-gold)" }}
                ></div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--vietnam-gold)" }}
                  >
                    Video Giải Thích Chi Tiết
                  </h3>
                  <p className="text-white/90 text-sm">
                    Phân tích nguyên nhân và bài học từ cải cách 1985
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Lessons Section */}
        <div className="lessons-section max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-50 to-red-50 border border-yellow-200">
              <Lightbulb
                className="w-5 h-5"
                style={{ color: "var(--vietnam-gold)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--vietnam-red)" }}
              >
                Bài Học Lịch Sử
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--vietnam-red)" }}
            >
              Những Bài Học Rút Ra
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyLessons.map((lesson, index) => (
              <div
                key={index}
                className="lesson-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-current"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "var(--vietnam-red)",
                }}
              >
                <div className="text-4xl mb-4">{lesson.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--vietnam-red)" }}
                >
                  {lesson.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ancient-stone)" }}
                >
                  {lesson.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                  <span style={{ color: "var(--vietnam-gold)" }}>
                    Tìm hiểu thêm
                  </span>
                  <ChevronRight
                    className="w-4 h-4"
                    style={{ color: "var(--vietnam-gold)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <div className="max-w-4xl mx-auto mt-16">
          <div
            className="rounded-2xl p-8 shadow-xl border-l-8"
            style={{
              backgroundColor: "#FFF9F0",
              borderColor: "var(--vietnam-red)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--vietnam-red)" }}
            >
              Kết Luận
            </h3>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "var(--timeless-navy)" }}
            >
              Cuộc cải cách giá-lương-tiền năm 1985 tuy không thành công nhưng
              đã trở thành <strong>bài học xương máu</strong> quan trọng. Sự
              thất bại này đã chỉ ra rằng không thể cải cách từng phần mà cần
              phải có <strong>sự đổi mới toàn diện</strong> cả về tư duy, cơ
              chế và chính sách.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--timeless-navy)" }}
            >
              Chính khủng hoảng này đã thúc đẩy Đảng ta đưa ra quyết định lịch
              sử tại <strong>Đại hội VI năm 1986</strong>, mở ra thời kỳ Đổi
              Mới - một bước ngoặt quan trọng trong lịch sử phát triển của đất
              nước.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoExplanationPage;
