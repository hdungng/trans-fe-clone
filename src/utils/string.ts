// Hàm normalize Unicode và chuyển lowercase
export function normalizeString(str: string): string {
  return str.trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // Tách dấu
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();                  // Chuyển lowercase
}

export function normalizeStringArray(arr: string[]): string[] {
  return arr.map(item => normalizeString(item));
}


export function areObjectsEqual(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}