import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const shine = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export default function ChatbotLoading() {
  const thinkingTexts = [
    "Đang suy nghĩ",
    "Đang phân tích yêu cầu của bạn",
    "Đang tổng hợp dữ liệu liên quan",
    "Đang đánh giá thông tin đầu vào",
    "Đang xử lý dữ liệu để đưa ra câu trả lời",
    "Đang rà soát kiến thức liên quan",
    "Đang kiểm chứng thông tin",
    "Đang xây dựng phản hồi chính xác",
    "Đang phân tích chi tiết vấn đề",
    "Đang sắp xếp thông tin hợp lý",
    "Đang suy luận dựa trên dữ liệu có sẵn",
    "Đang tối ưu hóa kết quả trả về",
    "Đang hoàn thiện câu trả lời",
    "Đang đánh giá tính chính xác của thông tin",
    "Đang truy xuất dữ liệu cần thiết",
    "Đang chuẩn bị phản hồi một cách cẩn thận",
    "Đang cân nhắc phản hồi tốt nhất",
    "Đang tập trung để đưa ra kết quả chính xác",
    "Đang kết nối các nguồn thông tin",
    "Đang hoàn tất quá trình phân tích",
    "Đang xác thực dữ kiện quan trọng",
    "Đang hệ thống hóa dữ liệu",
    "Đang cân nhắc nhiều góc nhìn khác nhau",
    "Đang đối chiếu thông tin với kiến thức đã học",
    "Đang rà soát từng chi tiết một",
    "Đang chuẩn bị giải thích một cách rõ ràng",
    "Đang tổng hợp từ nhiều nguồn dữ liệu",
    "Đang kiểm tra sự nhất quán của dữ liệu",
    "Đang thu thập ngữ cảnh liên quan",
    "Đang hoàn thiện phản hồi cuối cùng",
    "Đang đảm bảo câu trả lời chính xác và đầy đủ"
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const len = thinkingTexts.length;
    const timer = setInterval(() => {
      setIdx(prev => {
        let next = prev;
        while (next === prev || next === 0) {
          next = Math.floor(Math.random() * len);
        }
        return next;
      });
    }, 4200); 

    return () => clearInterval(timer);
  }, [thinkingTexts.length]);

  const text = thinkingTexts[idx];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.08) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 100%",
          animation: `${shine} 2.5s linear infinite`,
        }}
      >
        {text}...
      </Typography>
    </Box>
  );
}
