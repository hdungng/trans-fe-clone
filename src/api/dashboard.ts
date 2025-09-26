import axios from 'utils/axios';


export async function getTotalJobNumber() {
    try {
        const response = await axios.get('/api/dashboard/total-project');
        return response.data;
    } catch (error) {
        return error;
    }
}



export async function getCurrentJobNumberByStatus(selectedUser?: any, selectedDate?: Date, filterClient?: any) {
    try {
        const params: Record<string, string | number> = {};

        if (selectedUser && selectedUser != "all") {
            params.user_id = selectedUser;
        }

        if (selectedDate) {
            params.date = selectedDate.toISOString().split('T')[0]; // Chuyển đổi sang chuỗi ngày theo định dạng 'YYYY-MM-DD'
        }

        if (filterClient) {
            params.client_id = filterClient.id;
        }

        const response = await axios.get(`/api/dashboard/current-project-by-status`, { params });


        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getJobNumberByDate() {
    try {
        const response = await axios.get('/api/dashboard/project-by-date');
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getJobNumberRecent() {
    try {
        const response = await axios.get('/api/projects');
        return response.data;
    } catch (error) {
        return error;
    }
}