import axios from 'utils/axios';


export const crossCheck = async (jobNumberId: string) => {
    const response = await axios.post(`/api/llm/crosscheck/${jobNumberId}`);
    return response.data;
};

export const generalCheck = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/crosscheck`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getSummaryIssues = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/summary-issues`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const productCheck = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/product-check`);
        return response.data;
    } catch (error) {
        return error;
    }
};


export const getCOCheck = async (jobNumberId: string, type: string) => {
    try {
        const response = await axios.get(`/api/COcheck/${jobNumberId}?type=${type}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getCOCheckV2 = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/co_crosscheck`);
        return response.data;
    } catch (error) {
        return error;
    }
};




export const getHCCheck = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/hc_crosscheck`);
        return response.data;
    } catch (error) {
        return error;
    }
};


export const getCrossCheckProductWithMasterList = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/crosscheck-msl-product`);
        return response.data;
    } catch (error) {
        return error;
    }
};


export const getCOCheckProduct = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/co_check_products`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getEVFTACheck = async (jobNumberId: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/evfta_check`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getRexCodeCheck = async (jobNumberId: string, res_code: string) => {
    try {
        const response = await axios.get(`/api/projects/${jobNumberId}/rex_code_check?rex_code=${res_code}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
