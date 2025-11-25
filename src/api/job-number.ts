import axios from 'utils/axios';


// ⬇️ this is the loader for the detail route
export async function getJobNumbers() {
    try {
        const response = await axios.get('/api/projects');
        return response.data as any[];
    } catch (error) {
        return error;
    }
}

export async function getJobNumberDetail(taxCode: string) {
    try {
        const response = await axios.get(`/api/clients/search?taxCode=${taxCode}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}

export const createJobNumber = async (data: any) => {
    const response = await axios.post(`/api/projects`, data);
    return response.data;
};

export const getJobNumberById = async (jobNumberId: string) => {
    const response = await axios.get(`/api/projects/${jobNumberId}`);
    return response.data
};

export const updateJobNumber = async (jobNumberId: string, data: any) => {
    const response = await axios.put(`/api/projects/${jobNumberId}`, data);
    return response.data
};

export const deleteJobNumber = async (jobNumberId: string) => {
    const response = await axios.delete(`/api/projects/${jobNumberId}`);
    return response.data
};

export const deleteMultipleJobNumber = async (jobNumberName: string) => {
    const response = await axios.delete(`/api/projects/job-number/${jobNumberName}`);
    return response.data
};

export const uploadFilesToJobNumber = async (jobNumberId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file)); // assuming backend expects 'files'

    const response = await axios.post(`/api/projects/${jobNumberId}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const getProjectFiles = async (jobNumberId: string) => {
    const response = await axios.get(`/api/projects/${jobNumberId}/files`);

    return response.data;
};

export const getStatus = async (jobNumberId: string) => {
    const response = await axios.get(`/api/projects/${jobNumberId}/status`);
    return response.data;
};

export const updateStatus = async (jobNumberId: string, data: any) => {
    const response = await axios.put(`/api/projects/${jobNumberId}/status`, data);
    return response.data;
};

export const extractCheck = async (jobNumberId: string, method: string) => {
    const response = await axios.post(`/api/llm/${method}/${jobNumberId}`);
    return response.data;
};

export const getExtract = async (jobNumberId: string, method: string) => {
    const response = await axios.get(`/api/projects/${jobNumberId}/${method}-data`);
    return response.data;
};

export const updateExtract = async (jobNumberId: string, method: string, data: any) => {
    const response = await axios.put(`/api/projects/${jobNumberId}/${method}-data-general`, data);
    return response.data;
};

export const uploadEcus = async (jobNumberId: string) => {
    const response = await axios.post(`/api/ecus/trigger/${jobNumberId}`);
    return response.data;
};

export const checkDefaultValuesAndMST = async (taxCode: string, method: string) => {
    const response = await axios.get(`/api/check-default-value-msl?taxCode=${taxCode}&method=${method}`);
    return response.data;
};

export const getTimes = async (jobNumberId: string, type: string) => {
    const response = await axios.get(`/api/projects/${jobNumberId}/${type}_time`);
    return response.data;
};

export const exportTotalInvoice = async (jobNumberId: string, method: string) => {
    // Download Excel invoice total file as blob
    return axios.get(`/api/${method}/invoice-total-export/${jobNumberId}`, {
        responseType: 'blob',
    });
};
