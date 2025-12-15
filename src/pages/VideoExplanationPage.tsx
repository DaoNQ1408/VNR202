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

  const coreReasons = [
    {
      number: "1",
      title: "Cơ chế bao cấp không thể điều hành giá-lương-tiền bằng mệnh lệnh",
      description:
        "Khi thả giá – tăng lương – đổi tiền nhưng vẫn giữ tư duy bao cấp, nền kinh tế vỡ trận.",
    },
    {
      number: "2",
      title: "Khủng hoảng lạm phát trở thành cú sốc lịch sử",
      description:
        "774% lạm phát → tiền mất giá → thị trường hỗn loạn → niềm tin sụp đổ.",
    },
    {
      number: "3",
      title: "Đời sống nhân dân kiệt quệ",
      description:
        "Thu nhập thực tế giảm 30–50%, người lao động không sống nổi bằng lương.",
    },
    {
      number: "4",
      title: "Buộc Đảng phải thay đổi mô hình kinh tế",
      description:
        "Cải cách G–L–T là giọt nước tràn ly, chứng minh mô hình cũ không thể tồn tại. → Đổi mới là tất yếu lịch sử, không thể trì hoãn.",
    },
  ];

  const keyLessons = [
    {
      icon: "📏",
      title: "Tôn trọng quy luật khách quan",
      description:
        "Không áp đặt ý chí chủ quan lên các quy luật kinh tế thị trường.",
    },
    {
      icon: "🔄",
      title: "Đổi mới phải đồng bộ, toàn diện nhưng có lộ trình",
      description:
        "Không thể cải cách một vài khâu tách rời (giá – lương – tiền) khi các yếu tố khác còn bao cấp.",
    },
    {
      icon: "📊",
      title: "Lấy hiệu quả kinh tế – xã hội làm tiêu chí đánh giá",
      description:
        "Thay thế tư duy 'kế hoạch hóa chỉ tiêu' bằng 'hiệu quả thực tế'.",
    },
    {
      icon: "🚩",
      title: "Kiên định định hướng XHCN và vai trò lãnh đạo của Đảng",
      description: "Đổi mới nhưng không đổi màu; hội nhập nhưng không hòa tan.",
    },
    {
      icon: "👥",
      title: "Phát huy vai trò con người và động lực cá nhân",
      description:
        "Khoán 10 thành công vì người nông dân được trao quyền lợi và trách nhiệm.",
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
                    nhân trực tiếp dẫn tới quyết định đổi mới toàn diện nền kinh
                    tế Việt Nam tại Đại hội Đảng VI?
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

        {/* Core Answer Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
              style={{ backgroundColor: "var(--vietnam-red)" }}
            >
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">
                Trả Lời Câu Hỏi Cốt Lõi
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--vietnam-red)" }}
            >
              Vì Sao Cải Cách G–L–T Là Nguyên Nhân Trực Tiếp Dẫn Đến Đổi Mới?
            </h2>
            <p className="text-lg" style={{ color: "var(--ancient-stone)" }}>
              Vì nó chứng minh rằng:
            </p>
          </div>

          <div className="grid gap-6">
            {coreReasons.map((reason, index) => (
              <div
                key={index}
                className="rounded-xl p-6 shadow-lg border-l-8"
                style={{
                  backgroundColor: "#FFFDF8",
                  borderColor: "var(--vietnam-red)",
                }}
              >
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: "var(--vietnam-red)" }}
                  >
                    {reason.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--vietnam-red)" }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-medium"
                      style={{ color: "#2d3748" }}
                    >
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <div className="max-w-4xl mx-auto mt-12">
          <div
            className="rounded-2xl p-8 shadow-xl border-l-8"
            style={{
              backgroundColor: "#FFF9F0",
              borderColor: "var(--vietnam-red)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4 flex items-center gap-2"
              style={{ color: "var(--vietnam-red)" }}
            >
              <span className="text-3xl">💡</span> Kết Luận
            </h3>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "var(--timeless-navy)" }}
            >
              Cuộc cải cách giá-lương-tiền năm 1985 tuy không thành công nhưng
              đã trở thành <strong>bài học xương máu</strong> quan trọng. Nó
              chứng minh rằng:
            </p>
            <ul
              className="list-disc list-inside space-y-2 mb-4 ml-4"
              style={{ color: "var(--timeless-navy)" }}
            >
              <li>
                <strong>Cơ chế bao cấp</strong> không thể điều hành được nền
                kinh tế hiện đại
              </li>
              <li>
                <strong>Khủng hoảng 774% lạm phát</strong> là hậu quả trực tiếp
                của cải cách thiếu đồng bộ
              </li>
              <li>
                <strong>Không thể cải cách từng phần</strong> - phải đổi mới
                toàn diện
              </li>
            </ul>
            <p
              className="text-lg leading-relaxed font-semibold"
              style={{ color: "var(--vietnam-red)" }}
            >
              → Chính khủng hoảng này đã thúc đẩy Đảng ta đưa ra quyết định lịch
              sử tại <strong>Đại hội VI năm 1986</strong>, mở ra thời kỳ Đổi Mới
              - một bước ngoặt quan trọng trong lịch sử phát triển của đất nước.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoExplanationPage;
