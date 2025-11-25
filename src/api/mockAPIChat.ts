// lib/api.ts
import axios from "axios";
import { Message } from 'types/pages/hscode';
import { formatDateTimeStamp } from "utils/formatDate";
import { getRandomInt } from "utils/number";

export const api = axios.create({
    baseURL: "/api",
    timeout: 30000,
});


export async function fetchMessages(): Promise<Message[]> {
    // const { data } = await api.get("/messages");
    return [
        {
            "id": 1,
            "role": "user",
            "time": "25/09/2025 10:15:30",
            "content":
            {
                type: "text",
                text: "Chào bạn, mình cần tư vấn gửi hàng từ HCM đi Los Angeles (Mỹ). Hàng là đồ gia dụng, khoảng 2.3 CBM, nặng 480 kg."
            }
        },
        {
            "id": 2,
            "role": "user",
            "time": "25/09/2025 10:16:45",
            "content":
            {
                type: "text",
                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem voluptatem dicta exercitationem voluptates quos eos. Quos voluptatum minus, totam natus eius excepturi repellat repellendus quod. Facere tenetur maxime solutaNisi, perferendis! Perspiciatis esse inventore animi enim commodi in cum labore! Inventore praesentium, odio sed "
            }

        },
        {
            "id": 5,
            "role": "assistant",
            "time": "25/09/2025 10:16:05",
            "content":
            {
                type: "text",
                text: "| Hạng mục | Diễn giải | ĐVT | Số lượng/RT | Đơn giá (USD) | Thành tiền (USD) | Ghi chú |\n|---|---|---|---:|---:|---:|---|\n| Cước biển LCL | HCM (CFS) → Los Angeles (CFS) | RT | 2.3 | 82 | 188.6 | Rate tham khảo, có thể biến động |\n| Phí CFS VN | Nhận hàng, xử lý tại kho CFS HCM | Lô | 1 | 55 | 55 | Bao gồm cut-off handling |\n\n*Tổng ước tính (không bao gồm thuế US): ~USD 757.5…*"
            }

        },
        {
            "id": 10,
            "role": "assistant",
            "time": "25/09/2025 10:15:30",
            "content":
            {
                type: "file",
                name: "Checklist_ChungTu_LCL_DAP.pdf",
                url: "http://localhost:8001/static/logistics/8f2c/checklist_chungtu_lcl_dap.pdf"
            },
        }
    ];

}

export async function sendChat(text: string): Promise<Message> {
    // const { data } = await api.post("/chat", text);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: getRandomInt(1_000_000_000_000_000),
                role: "assistant",
                time: formatDateTimeStamp(new Date().getTime()),
                content: {
                    type: "text",
                    text: text + " Lorem ipsum dolor sit, cepturi repellat repellendus quod. Facere tenetur maxime solutaNisi, perferendis! Perspiciatis esse inventore animi enim commodi in cum labore! Inventore praesentium, odio sed ab modi laboriosapiciatis sit voluptas suscipit corporis. Voluptatibus, voluptas ut dicta.",
                },
            });
        }, 10_000);
    });
}
