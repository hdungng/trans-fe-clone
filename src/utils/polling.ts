import { getStatus } from "api/job-number";


export interface PollHandle {
    promise: Promise<string>;
    abort: () => void;
}

export const pollUntilStatusChange = async (
    jobNumberId: string,
    currentStatus: string,
    interval = 2_000
): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const poll = async () => {
            try {
                const newStatus = await getStatus(jobNumberId);

                if (newStatus === currentStatus) {
                    // Chưa thay đổi → hẹn lần sau
                    setTimeout(poll, interval);
                } else {
                    // Đã thay đổi → trả về
                    resolve(newStatus);
                }
            } catch (err) {
                // Xảy ra lỗi → dừng hẳn
                reject(err);
            }
        };

        poll();
    });
};

