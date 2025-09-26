import axios from 'utils/axios';


// ⬇️ this is the loader for the detail route
export async function getExtractProducts(jobNumberId: string, method: string) {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/${method}_product`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getExtractProductDetail(jobNumberId: string, method: string, id: string) {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/${method}_product/${id}`);
        return response.data as any;
    } catch (error) {
        return error;
    }
}

export const createExtractProduct = async (jobNumberId: string, method: string, data: any) => {
    const response = await axios.post(`/api/projects/${jobNumberId}/${method}_product`, data);
    return response.data;
};

export const updateExtractProduct = async (jobNumberId: string, productId: string, method: string, data: any) => {
    const response = await axios.put(`/api/projects/${jobNumberId}/${method}_product/${productId}`, data);
    return response.data
};

export const deleteExtractProduct = async (jobNumberId: string, method: string, id: string) => {
    const response = await axios.delete(`/api/projects/${jobNumberId}/${method}_product/${id}`);
    return response.data
};
