import { Choice } from "@/state/GameContext";

export interface SituationOption {
  key: Exclude<Choice, null>;
  label: string;
  tip: string;
}

export interface Situation {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  options: SituationOption[];
}

export const SITUATIONS: Situation[] = [
  {
    id: 1,
    title: "Bóc lột lao động",
    description: "Bạn và đồng nghiệp phải làm 12 giờ mỗi ngày với mức lương thấp, không có phụ cấp xứng đáng.",
    imageSrc: "/images/s1_factory.jpg",
    options: [
      {
        key: "dau-tranh",
        label: "Đấu tranh tập thể đòi cải thiện",
        tip: "Theo quan điểm Mác – Lênin, đoàn kết giai cấp và đấu tranh tập thể là động lực biến đổi xã hội."
      },
      {
        key: "im-lang",
        label: "Im lặng, chấp nhận hiện trạng",
        tip: "Im lặng giúp tránh rủi ro ngắn hạn nhưng duy trì bất công cấu trúc lâu dài."
      }
    ]
  },
  {
    id: 2,
    title: "Biểu tình tập thể",
    description: "Công nhân đang tổ chức biểu tình đòi giảm giờ làm mà vẫn giữ nguyên lương.",
    imageSrc: "/images/s2_protest.jpg",
    options: [
      {
        key: "dau-tranh",
        label: "Tham gia, lan toả thông điệp",
        tip: "Sức mạnh của tập thể xuất phát từ ý thức giai cấp và hành động thống nhất."
      },
      {
        key: "im-lang",
        label: "Đứng ngoài quan sát",
        tip: "Không tham gia làm suy yếu lực lượng, khó đạt chuyển biến chính sách."
      }
    ]
  },
  {
    id: 3,
    title: "Cắt giảm lương vô lý",
    description: "Ban lãnh đạo ra thông báo cắt giảm lương mà không nêu lý do rõ ràng.",
    imageSrc: "/images/s3_paycut.jpg",
    options: [
      {
        key: "dau-tranh",
        label: "Yêu cầu thương lượng và minh bạch",
        tip: "Đấu tranh có tổ chức hướng tới công bằng phân phối và dân chủ trong doanh nghiệp."
      },
      {
        key: "im-lang",
        label: "Nhẫn nhịn để ‘giữ việc’",
        tip: "Chấp nhận vô điều kiện có thể thành tiền lệ bất lợi cho tập thể."
      }
    ]
  }
];
