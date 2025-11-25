import { UserFormData, UserType } from 'types/pages/user';
import axios from 'utils/axios';


export async function getUsers() {
    try {
        const response = await axios.get('/api/users/all');
        return response.data as UserType[];
    } catch (error) {
        return error;
    }
}

export async function getUsersWithJobNumber() {
    try {
        const response = await axios.get('/api/users/with-projects');
        return response.data as UserType[];
    } catch (error) {
        return error;
    }
}

export const getUsersFilter = async (queryString: string) => {
    try {
        const response = await axios.get(`/api/users/suggest-user?prefix=${queryString}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export async function getMe() {
    try {
        const response = await axios.get('/api/account/me');
        return response.data as UserType[];
    } catch (error) {
        return error;
    }
}

export async function getUserDetail(id: number) {
    try {
        const response = await axios.get(`/api/users/${id}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}


export async function createUser(user: UserFormData) {
    try {
        const response = await axios.post(`api/users`, user);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateUser(user: UserFormData, user_id: number) {
    const response = await axios.put(`api/users/${user_id}`, user);
    return response.data;
}

export async function updateUserProfile(user: UserFormData, user_id: number) {
    const response = await axios.put(`api/users/update-profile/${user_id}`, user);
    return response.data;
}

export async function deleteUser(user_id: number) {
    const response = await axios.delete(`api/users/${user_id}`);
    return response.data;
}