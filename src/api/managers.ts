import axios from 'utils/axios';


export async function getManagers() {
    try {
        const response = await axios.get('/api/managers');
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function getManagerDetail(id: number) {
    try {
        const response = await axios.get(`/api/managers/${id}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}

export async function assignUser(manager_id: number, user: any) {
    const response = await axios.put(`api/managers/${manager_id}`, user);
    return response.data;
}
