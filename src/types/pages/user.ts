export interface UserType {
    id: string;
    email: string;
    full_name: string;
    role: string;
    ip: string;
    created_at: string;
}

export interface UserFormData {
    email: string;
    full_name: string;
    role: string;
    password?: string;
    confirmPassword?: string;
}