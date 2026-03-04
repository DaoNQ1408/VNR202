import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: number;
  title: string;
  period: string;
  challenge: string;
  solution: string;
  result: string;
  lessons: string[];
  icon: string;
  color: string;
}

const CaseStudyPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Toàn Quốc Kháng Chiến",
      period: "12/1946",
      challenge:
        "Thực dân Pháp bội ước, liên tiếp khiêu khích và gửi tối hậu thư đòi tước vũ khí lực lượng tự vệ của ta. Lực lượng ta khi đó còn non trẻ, vũ khí thô sơ.",
      solution:
        'Đảng phát động Toàn quốc kháng chiến với đường lối: "Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh". Áp dụng chiến thuật tiêu hao sinh lực địch, kìm chân địch.',
      result:
        "Kìm chân địch thành công ở các đô thị lớn, bảo toàn lực lượng, di chuyển an toàn cơ quan đầu não yếu nhân lên chiến khu Việt Bắc.",
      lessons: [
        "Chủ động nắm bắt thời cơ, không để bị động",
        "Xây dựng thế trận lòng dân, phát huy sức mạnh toàn dân",
        "Tự lực tự cường là nền tảng",
        "Phát huy nghệ thuật chiến tranh du kích",
      ],
      icon: "⚔️",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 2,
      title: "Chiến Dịch Việt Bắc Thu - Đông",
      period: "1947",
      challenge:
        'Pháp mở cuộc tấn công quy mô lớn lên căn cứ địa Việt Bắc nhằm tiêu diệt cơ quan đầu não kháng chiến và bộ đội chủ lực của ta, hòng tóm gọn quân ta "đánh nhanh thắng nhanh".',
      solution:
        'Ban Thường vụ Trung ương Đảng ra chỉ thị "Phải phá tan cuộc tấn công mùa đông của giặc Pháp". Ta dùng chiến thuật du kích, phục kích, đánh vận động, chia cắt lực lượng địch.',
      result:
        'Ta bẻ gãy gọng kìm của Pháp, bảo vệ an toàn tuyệt đối căn cứ địa Việt Bắc. Làm phá sản hoàn toàn chiến lược "đánh nhanh thắng nhanh".',
      lessons: [
        "Đánh giá đúng âm mưu của kẻ thù",
        "Tận dụng triệt để địa hình hiểm trở để tác chiến",
        "Phòng ngự kết hợp phản công linh hoạt",
        "Bảo toàn và phát triển vững chắc lực lượng",
      ],
      icon: "⛰️",
      color: "from-green-600 to-emerald-800",
    },
    {
      id: 3,
      title: "Chiến Dịch Biên Giới Thu - Đông",
      period: "1950",
      challenge:
        "Pháp thực hiện Kế hoạch Rơ-ve, tăng cường hệ thống phòng ngự đường số 4, bao vây và cô lập hoàn toàn căn cứ địa Việt Bắc với quốc tế.",
      solution:
        'Mở chiến dịch Biên giới, chọn điểm đột phá là cụm cứ điểm Đông Khê (yếu huyệt của địch), áp dụng sáng tạo chiến thuật "đánh điểm diệt viện".',
      result:
        "Giải phóng dải biên giới Việt - Trung (750km). Đánh bại Kế hoạch Rơ-ve. Quân ta giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ.",
      lessons: [
        "Chọn đúng điểm đột phá quyết định",
        "Sáng tạo trong nghệ thuật tác chiến (đánh điểm diệt viện)",
        "Chủ động tấn công, làm chủ chiến trường",
        "Tranh thủ sự ủng hộ, viện trợ của quốc tế",
      ],
      icon: "🗺️",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 4,
      title: "Chiến Dịch Điện Biên Phủ",
      period: "1954",
      challenge:
        'Pháp tập trung quân lực, được Mỹ hậu thuẫn xây dựng Điện Biên Phủ thành "pháo đài bất khả xâm phạm" - tập đoàn cứ điểm mạnh nhất Đông Dương với hỏa lực áp đảo.',
      solution:
        'Đại tướng Võ Nguyên Giáp chuyển phương châm tác chiến từ "đánh nhanh, thắng nhanh" sang "đánh chắc, tiến chắc", kiên trì xây dựng hệ thống giao thông hào.',
      result:
        "Tiêu diệt hoàn toàn tập đoàn cứ điểm Điện Biên Phủ sau 56 ngày đêm chiến đấu. Buộc Pháp ký hiệp định Giơ-ne-vơ, chấm dứt hoàn toàn chiến tranh Đông Dương.",
      lessons: [
        "Linh hoạt thay đổi chiến thuật sát với thực tiễn",
        "Phát huy tối đa sức mạnh hậu cần nhân dân (xe đạp thồ)",
        "Quyết tâm sắt đá, hy sinh quên mình vì độc lập",
        "Kết hợp tài tình giữa tác chiến quân sự và đấu tranh ngoại giao",
      ],
      icon: "�",
      color: "from-red-600 to-yellow-500",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-header", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".case-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="case-header text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Case Study{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Lịch Sử
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phân tích chuyên sâu các chiến dịch và sự kiện then chốt trong cuộc
            Kháng chiến chống Pháp (1945 - 1954)
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="case-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left - Icon & Info */}
                <div
                  className={`bg-gradient-to-br ${study.color} p-8 text-white`}
                >
                  <div className="text-6xl mb-4">{study.icon}</div>
                  <h2 className="text-3xl font-bold mb-2">{study.title}</h2>
                  <div className="text-lg opacity-90">{study.period}</div>
                </div>

                {/* Right - Details */}
                <div className="md:col-span-2 p-8">
                  {/* Challenge */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-red-600 mb-2">
                      ⚠️ Thách Thức
                    </h3>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-yellow-600 mb-2">
                      💡 Giải Pháp
                    </h3>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>

                  {/* Result */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-green-600 mb-2">
                      ✅ Kết Quả
                    </h3>
                    <p className="text-gray-700">{study.result}</p>
                  </div>

                  {/* Lessons */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3">
                      📚 Bài Học Rút Ra
                    </h3>
                    <ul className="space-y-2">
                      {study.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tổng Kết{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Kinh Nghiệm Kháng Chiến
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-red-600">
                🎯 Điểm Chung
              </h3>
              <ul className="space-y-2">
                <li>• Đường lối kháng chiến đúng đắn, sáng tạo</li>
                <li>• Thế trận "chiến tranh nhân dân" vững chắc</li>
                <li>• Trí tuệ và bản lĩnh của Đảng, Bác Hồ</li>
                <li>• Tinh thần "Quyết tử để Tổ quốc quyết sinh"</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-3 text-yellow-600">
                💪 Yếu Tố Thành Công
              </h3>
              <ul className="space-y-2">
                <li>• Xây dựng lực lượng vũ trang 3 thứ quân</li>
                <li>• Phát huy sức mạnh vĩ đại của hậu phương</li>
                <li>• Kết hợp chặt chẽ quân sự với ngoại giao</li>
                <li>• Nghệ thuật quân sự độc đáo, linh hoạt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
