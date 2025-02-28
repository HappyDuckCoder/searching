# Searching Web

## Giới thiệu

Searching Web là một dự án cá nhân được phát triển bởi **duckilot**. Ứng dụng này sử dụng các API phổ biến để cung cấp thông tin tìm kiếm một cách hiệu quả và nhanh chóng:

- **DuckDuckGo API**: Tìm kiếm nguồn thông tin tổng hợp.
- **YouTube Google API**: Tìm kiếm video liên quan.
- **Groq API**: Tìm kiếm câu hỏi tương tự và sinh tài liệu hỗ trợ.

## Chức năng chính

- Tìm kiếm thông tin từ nhiều nguồn khác nhau.
- Hiển thị kết quả tìm kiếm từ DuckDuckGo.
- Hiển thị video liên quan từ YouTube.
- Gợi ý các câu hỏi tương tự thông qua AI của Groq.
- Sinh tài liệu hỗ trợ dựa trên kết quả tìm kiếm.

## Hình ảnh minh họa

![Image](/public/rm1.png)
![Image](/public//rm2.png)

## Công nghệ sử dụng

- **Next.js**: Framework chính cho giao diện và logic backend.
- **TypeScript**: Cải thiện tính an toàn của mã nguồn.
- **Tailwind CSS**: Thiết kế giao diện nhanh chóng và tiện lợi.
- **DuckDuckGo API**: Tìm kiếm nguồn thông tin.
- **YouTube Google API**: Lấy danh sách video liên quan.
- **Groq API**: Sinh nội dung và gợi ý câu hỏi tương tự.

## Cách cài đặt và chạy dự án

### Yêu cầu hệ thống

- **Node.js** >= 16
- **Yarn** hoặc **npm**

### Cài đặt

```sh
# Clone repository
git clone https://github.com/duckilot/searching-web.git
cd searching-web

# Cài đặt dependencies
yarn install
# Hoặc sử dụng npm
npm install
```

### Cấu hình môi trường

Tạo file `.env.local` trong thư mục gốc và thêm các thông tin API key cần thiết:

```
NEXT_PUBLIC_DUCKDUCKGO_API_KEY=your_duckduckgo_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
```

### Chạy ứng dụng

```sh
# Chạy server ở môi trường phát triển
yarn dev
# Hoặc sử dụng npm
npm run dev
```

## Đóng góp

Mọi đóng góp để cải thiện dự án đều được hoan nghênh! Nếu bạn muốn đóng góp, vui lòng tạo một pull request hoặc mở issue trên GitHub.
