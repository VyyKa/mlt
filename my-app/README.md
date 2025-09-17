# Web Game Triết học Mác – Lênin

## Cách chạy

```bash
npm i
npm i aos motion
npm run dev
```

- Ảnh: thêm các ảnh vào `public/images/` với tên sau:
  - `s1_factory.jpg`, `s2_protest.jpg`, `s3_paycut.jpg`
- Dự án dùng Next.js (pages router), TailwindCSS, AOS, Motion One

## Tuỳ biến nội dung
- Sửa dữ liệu tình huống tại `data/situations.ts`
- Sửa layout/chrome tại `components/Layout.tsx`
- Sửa logic lưu trạng thái tại `state/GameContext.tsx`

## Thêm tình huống mới
- Thêm một phần tử mới vào `SITUATIONS` trong `data/situations.ts`
- Cập nhật logic tiến độ/điều hướng nếu số lượng khác 3
