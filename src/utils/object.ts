export function isEmptyObject(obj: unknown): obj is Record<string, never> {
    return (
        typeof obj === "object" &&
        obj !== null &&
        obj.constructor === Object &&
        Object.keys(obj).length === 0
    );
}