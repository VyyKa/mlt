export type RoleKey = "cong-nhan" | "nong-dan" | "sinh-vien" | "tri-thuc";

export interface RoleOption {
  key: "A" | "B";
  label: string;
  outcome: string;
}

export interface RoleSituation {
  id: number; // 1..6 per role
  title: string;
  description: string;
  imageSrc?: string;
  options: RoleOption[]; // always two options A/B
}

export type RoleSituations = Record<RoleKey, RoleSituation[]>;

// 24 tình huống: 6 cho mỗi vai
export const ROLE_SITUATIONS: RoleSituations = {
  "cong-nhan": [
    {
      id: 1,
      title: "Lương thấp, làm việc 12h/ngày",
      description: "Công việc kéo dài, lương không đủ trang trải cuộc sống.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Im lặng chịu đựng", outcome: "Sức khỏe giảm sút, đời sống ngày càng khó khăn." },
        { key: "B", label: "Viết kiến nghị tập thể", outcome: "Ban quản lý phải xem xét và tăng lương." },
      ],
    },
    {
      id: 2,
      title: "Công ty định cắt bảo hiểm",
      description: "Bộ phận nhân sự đề xuất cắt một số khoản bảo hiểm để tiết kiệm chi phí.",
      imageSrc: "/anh2.jpg",
      options: [
        { key: "A", label: "Chấp nhận", outcome: "Sau này khi ốm đau không được hỗ trợ đầy đủ." },
        { key: "B", label: "Đấu tranh cùng công đoàn", outcome: "Quyền lợi bảo hiểm được giữ nguyên." },
      ],
    },
    {
      id: 3,
      title: "Máy móc hỏng, quản lý bắt làm tiếp",
      description: "Dây chuyền có dấu hiệu trục trặc nhưng quản lý yêu cầu chạy cho kịp tiến độ.",
      imageSrc: "/anh3.jpg",
      options: [
        { key: "A", label: "Nghe lời làm tiếp", outcome: "Tai nạn lao động xảy ra, rủi ro cao cho công nhân." },
        { key: "B", label: "Dừng sản xuất và báo cáo", outcome: "An toàn được bảo đảm, máy được sửa đúng quy trình." },
      ],
    },
    {
      id: 4,
      title: "Đồng nghiệp bị đuổi việc vô lý",
      description: "Một đồng nghiệp bị sa thải mà không có lý do chính đáng.",
      imageSrc: "/anh4.png",
      options: [
        { key: "A", label: "Không can thiệp", outcome: "Tạo tiền lệ xấu, sau này có thể xảy ra với bạn." },
        { key: "B", label: "Đứng ra bảo vệ đồng nghiệp", outcome: "Đoàn kết tập thể được nâng cao, công ty phải minh bạch." },
      ],
    },
    {
      id: 5,
      title: "Quản lý hứa tăng lương nhưng không thực hiện",
      description: "Lời hứa đã nhiều lần bị trì hoãn.",
      imageSrc: "/anh5.jpg",
      options: [
        { key: "A", label: "Chấp nhận im lặng", outcome: "Tiếp tục bị lợi dụng, thu nhập không cải thiện." },
        { key: "B", label: "Yêu cầu minh bạch cùng đồng nghiệp", outcome: "Buộc quản lý đưa lộ trình và thực hiện tăng lương." },
      ],
    },
    {
      id: 6,
      title: "Đề nghị làm thêm giờ không công",
      description: "Quản lý muốn mọi người ở lại làm thêm mà không trả lương.",
      imageSrc: "/anh6.jpg",
      options: [
        { key: "A", label: "Đồng ý", outcome: "Bị bóc lột, tạo tiền lệ xấu." },
        { key: "B", label: "Từ chối và yêu cầu trả lương", outcome: "Giữ được quyền lợi, thiết lập ranh giới công bằng." },
      ],
    },
  ],

  "nong-dan": [
    {
      id: 1,
      title: "Thương lái ép giá mùa vụ",
      description: "Giá thu mua thấp hơn nhiều so với chi phí.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Bán rẻ cho xong", outcome: "Thua lỗ, khó tái đầu tư cho vụ sau." },
        { key: "B", label: "Tham gia hợp tác xã", outcome: "Đàm phán được giá tốt, ổn định đầu ra." },
      ],
    },
    {
      id: 2,
      title: "Dịch bệnh trên cây trồng",
      description: "Xuất hiện dấu hiệu lây lan nhanh trong ruộng.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Giấu nhẹm tình hình", outcome: "Mất mùa trên diện rộng." },
        { key: "B", label: "Báo chính quyền/khuyến nông", outcome: "Dịch được khống chế, hỗ trợ kỹ thuật kịp thời." },
      ],
    },
    {
      id: 3,
      title: "Cơ hội tiếp cận công nghệ mới",
      description: "Có đơn vị hỗ trợ chuyển giao hệ thống tưới và giống mới.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Ngại thay đổi", outcome: "Năng suất kém, khó cạnh tranh." },
        { key: "B", label: "Học hỏi và áp dụng", outcome: "Năng suất tăng, tiết kiệm chi phí." },
      ],
    },
    {
      id: 4,
      title: "Góp ý quy hoạch đất",
      description: "Chính quyền địa phương lấy ý kiến quy hoạch vùng sản xuất.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Không tham gia", outcome: "Quyền lợi của hộ nông dân bị bỏ qua." },
        { key: "B", label: "Đóng góp ý kiến", outcome: "Chính sách phù hợp thực tế, bảo vệ lợi ích cộng đồng." },
      ],
    },
    {
      id: 5,
      title: "Doanh nghiệp muốn thuê đất giá rẻ",
      description: "Đề nghị ký hợp đồng lâu dài với mức giá thấp.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Bán/cho thuê ngay", outcome: "Mất đất canh tác, thu nhập không bền vững." },
        { key: "B", label: "Thỏa thuận hợp tác cùng có lợi", outcome: "Vừa giữ đất, vừa có nguồn thu ổn định." },
      ],
    },
    {
      id: 6,
      title: "Thời tiết cực đoan gây mất mùa",
      description: "Lũ lụt/hạn hán làm giảm mạnh sản lượng.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Tự chịu thiệt hại", outcome: "Rơi vào cảnh nợ nần, nghèo hóa." },
        { key: "B", label: "Liên kết lập quỹ hỗ trợ", outcome: "Chia sẻ rủi ro, chủ động phục hồi sản xuất." },
      ],
    },
  ],

  "sinh-vien": [
    {
      id: 1,
      title: "Bị rủ rê bỏ học",
      description: "Bạn bè rủ đi làm sớm, bỏ dở chương trình.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Bỏ học", outcome: "Tương lai nghề nghiệp hạn chế." },
        { key: "B", label: "Tiếp tục học", outcome: "Phát triển kiến thức và kỹ năng lâu dài." },
      ],
    },
    {
      id: 2,
      title: "Bất công trong trường học",
      description: "Một chính sách gây bất công cho sinh viên.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Im lặng", outcome: "Bất công kéo dài." },
        { key: "B", label: "Viết đơn kiến nghị", outcome: "Nhà trường xem xét, điều chỉnh." },
      ],
    },
    {
      id: 3,
      title: "Thấy bạn bè gian lận",
      description: "Trong kỳ kiểm tra có dấu hiệu quay cóp.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Bao che", outcome: "Môi trường học tập suy thoái." },
        { key: "B", label: "Khuyên/báo giảng viên", outcome: "Giữ kỷ luật, nâng chuẩn mực." },
      ],
    },
    {
      id: 4,
      title: "Cơ hội tham gia nghiên cứu khoa học",
      description: "Giảng viên mời vào nhóm đề tài.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Không tham gia", outcome: "Bỏ lỡ trải nghiệm quan trọng." },
        { key: "B", label: "Tham gia", outcome: "Rèn kỹ năng nghiên cứu và làm việc nhóm." },
      ],
    },
    {
      id: 5,
      title: "Ra trường sớm để đi làm",
      description: "Đắn đo giữa tốt nghiệp sớm hay hoàn thành đầy đủ chương trình.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Đi làm sớm", outcome: "Thiếu kiến thức nền, cơ hội bị giới hạn." },
        { key: "B", label: "Học xong đầy đủ", outcome: "Cơ hội nghề nghiệp vững chắc hơn." },
      ],
    },
    {
      id: 6,
      title: "Phong trào xã hội cần tình nguyện viên",
      description: "Trường phát động chương trình phục vụ cộng đồng.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Không tham gia", outcome: "Mất cơ hội rèn luyện và kết nối." },
        { key: "B", label: "Đăng ký tham gia", outcome: "Nâng cao tinh thần trách nhiệm với xã hội." },
      ],
    },
  ],

  "tri-thuc": [
    {
      id: 1,
      title: "Được thuê viết bài xuyên tạc",
      description: "Một tổ chức đề nghị trả tiền để bạn viết sai sự thật.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Nhận tiền và làm", outcome: "Mất uy tín cá nhân, gây hại cộng đồng." },
        { key: "B", label: "Từ chối", outcome: "Giữ danh dự và chuẩn mực nghề nghiệp." },
      ],
    },
    {
      id: 2,
      title: "Phát hiện sai phạm trong nghiên cứu",
      description: "Phát hiện số liệu bị thao túng trong nhóm.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Im lặng", outcome: "Sai phạm tiếp diễn, làm hỏng môi trường học thuật." },
        { key: "B", label: "Báo cáo minh bạch", outcome: "Cải thiện chuẩn mực và chất lượng nghiên cứu." },
      ],
    },
    {
      id: 3,
      title: "Mời hợp tác dự án cộng đồng",
      description: "Một dự án phục vụ lợi ích công cộng cần chuyên gia.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Từ chối", outcome: "Bỏ lỡ cơ hội đóng góp cho xã hội." },
        { key: "B", label: "Nhận lời", outcome: "Tạo tác động tích cực, lan tỏa tri thức." },
      ],
    },
    {
      id: 4,
      title: "Áp lực từ doanh nghiệp",
      description: "Bên tài trợ muốn thay đổi kết quả theo hướng có lợi.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Nhượng bộ", outcome: "Tri thức bị lợi dụng, mất độc lập học thuật." },
        { key: "B", label: "Bảo vệ sự thật", outcome: "Tạo ảnh hưởng tích cực, giữ chuẩn mực khoa học." },
      ],
    },
    {
      id: 5,
      title: "Cơ hội ra nước ngoài làm việc",
      description: "Nhận được lời mời từ một viện nghiên cứu quốc tế.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Ở lại vùng an toàn", outcome: "Hạn chế phát triển chuyên môn và mạng lưới." },
        { key: "B", label: "Đi học hỏi rồi quay về cống hiến", outcome: "Nâng tầm tri thức, đóng góp tốt hơn cho quê hương." },
      ],
    },
    {
      id: 6,
      title: "Phát minh mới có thể giúp xã hội",
      description: "Bạn sở hữu công trình có giá trị ứng dụng cao.",
      imageSrc: "/anh1.jpg",
      options: [
        { key: "A", label: "Giữ cho riêng mình", outcome: "Tri thức bị phí hoài, ít tác động xã hội." },
        { key: "B", label: "Công bố công khai/ứng dụng", outcome: "Xã hội hưởng lợi, cá nhân được ghi nhận." },
      ],
    },
  ],
};

export default ROLE_SITUATIONS;

// Gợi ý ending theo vai để hiển thị ở trang kết quả
export const ROLE_ENDINGS: Record<RoleKey, { good: string; mixed: string; bad: string }> = {
  "cong-nhan": {
    good: "Tập thể công nhân đoàn kết, công đoàn/báo chí hỗ trợ; điều kiện lao động cải thiện rõ rệt.",
    mixed: "Một vài cải thiện nhỏ nhờ nỗ lực cục bộ, nhưng sự thiếu nhất quán làm cơ hội lớn bị bỏ lỡ.",
    bad: "Bóc lột gia tăng, tai nạn và bất công tiếp diễn do im lặng kéo dài.",
  },
  "nong-dan": {
    good: "Hợp tác xã bền vững, ứng dụng kỹ thuật; đầu ra ổn định, thu nhập nâng lên.",
    mixed: "Một số vụ mùa tốt, số khác bấp bênh vì thiếu tổ chức liên kết đồng bộ.",
    bad: "Mất mùa, nợ nần; phụ thuộc thương lái do thiếu liên kết và chủ động.",
  },
  "sinh-vien": {
    good: "Kiến thức – kỹ năng vững, tham gia nghiên cứu và hoạt động cộng đồng, triển vọng nghề nghiệp rộng mở.",
    mixed: "Có thành tựu rải rác nhưng thiếu kế hoạch nên phát triển chậm.",
    bad: "Bỏ lỡ cơ hội học tập, đạo đức học thuật suy giảm, đường hướng nghề nghiệp hạn chế.",
  },
  "tri-thuc": {
    good: "Giữ vững chuẩn mực khoa học, công bố tri thức phục vụ xã hội, uy tín tăng cao.",
    mixed: "Có đóng góp nhất định nhưng đôi lúc thoả hiệp khiến tác động bị giảm.",
    bad: "Thoả hiệp với sai trái, uy tín mất, tri thức không phục vụ cộng đồng.",
  },
};



