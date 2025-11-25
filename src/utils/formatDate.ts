// utils/formatDate.ts
import { format, parseISO, isValid } from 'date-fns';

/**
 * Format một chuỗi ngày ISO hoặc đối tượng Date thành chuỗi theo định dạng đã cho.
 * @param date - Chuỗi ngày (ISO) hoặc đối tượng Date
 * @param dateFormat - Chuỗi định dạng theo date-fns (vd: 'dd/MM/yyyy')
 * @returns Chuỗi ngày đã format hoặc dấu gạch ngang nếu lỗi
 */
export function formatDate(
    date: string | Date | undefined | null,
    dateFormat: string = 'dd/MM/yyyy'
): string {
    try {
        if (!date) return '-';

        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(dateObj)) return '-';

        return format(dateObj, dateFormat);
    } catch {
        return '-';
    }
}

export function convertDateString(input: string) {
    const date = new Date(input); // parse chuỗi

    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0–11

    return `${year}-${month}-${day}`;
}


export function formatDateTimeStamp(timestamp: number) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // Định dạng "dd/mm/yyyy hh:mm:ss"
}

export function getWeekOfMonth(date: Date): number {
    const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // Thứ của ngày đầu tháng
    const offsetDate = date.getDate() + startWeekDay - 1;
    return Math.floor(offsetDate / 7) + 1;
}

// Convert seconds to mm:ss
export const formatTime = (totalMilliseconds: number | null | undefined | string) => {
    if (totalMilliseconds === null || totalMilliseconds === undefined) {
        return '-';
    }

    const totalSeconds = Math.floor(Number(totalMilliseconds) / 1000); // chuyển ms → s
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}s`;
};

function parseDateStringForMessage(datetimeStr: string): Date {
    const [datePart, timePart] = datetimeStr.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    
    return new Date(year, month - 1, day, hour, minute, second);
}

export function formatTimeMessage(datetimeStr: string): string {
    const dt = parseDateStringForMessage(datetimeStr);
    const now: Date = new Date();
    const diffMs: number = now.getTime() - dt.getTime();
    const diffSec: number = diffMs / 1000;

    if (diffSec < 60) {
        return "Vừa xong";
    } else if (diffSec < 3600) {
        const minutes: number = Math.floor(diffSec / 60);
        return `${minutes} phút trước`;
    } else if (diffSec < 86400) {
        const hours: number = Math.floor(diffSec / 3600);
        return `${hours} giờ trước`;
    } else {
        // Nếu > 24h, hiển thị giờ AM/PM
        return dt.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
}
