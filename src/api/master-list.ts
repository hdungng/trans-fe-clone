import axios from 'utils/axios';
const TRASAS_TAX_CODE = '0304184415';

export async function getMasterListByTaxCode(taxCode: string, method: string, pageIndex: number, pageSize: number, searchTerm: string, customer?: number) {
    try {
        const params: Record<string, string | number> = {
            taxCode,
            pageIndex,
            pageSize
        };
        if (searchTerm.trim() !== "") {
            params.search = searchTerm;
        }

        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.get(
            `/api/master-list/${method}/upload`,
            { params }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getColumns(taxCode: string, method: string, customer?: number) {
    try {
        const params: Record<string, string | number> = {
            taxCode
        };

        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.get(`/api/master-list/${method}/columns`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// uploadMasterList
export const uploadMasterList = async (method: string, taxCode: string, file: File, customer?: number, startLine: number = 0) => {
    try {

        const formData = new FormData();
        formData.append('file', file);

        const params: Record<string, string | number> = { taxCode, startLine };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.post(`/api/master-list/${method}/upload`, formData, {
            params,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        return error;
    }
};

// updateMasterList
export const updateMasterList = async (method: string, taxCode: string, file: File, customer?: number, startLine: number = 0) => {
    try {

        const formData = new FormData();
        formData.append('file', file);

        const params: Record<string, string | number> = { taxCode, startLine };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.put(`/api/master-list/${method}/upload`, formData, {
            params,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        return error;
    }
};

// delete Master List
export async function deleteMasterList(taxCode: string, method: string, customer?: number) {
    try {
        const params: Record<string, string | number> = {
            taxCode
        };

        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.delete(`/api/master-list/${method}`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// getRow
export async function getRow(taxCode: string, method: string, id: number, customer?: number) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.get(`/api/master-list/${method}/rows/${id}`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// addRow
export async function addRow(taxCode: string, method: string, data: any, customer?: number) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.post(`/api/master-list/${method}/rows`, data, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// updateRow
export async function updateRow(taxCode: string, method: string, id: number, data: any, customer?: number) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.put(`/api/master-list/${method}/rows/${id}`, data, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// deleteRow
export async function deleteRow(taxCode: string, method: string, id: number, customer?: number) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.delete(`/api/master-list/${method}/rows/${id}`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// downloadExcel
export async function downloadExcel(taxCode: string, method: string, customer?: number) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.get(`/api/master-list/${method}/excel`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

// addRow by Excel
export const addRowByExcel = async (method: string, taxCode: string, file: File, startLine: number = 0, customer?: number) => {
    try {

        const formData = new FormData();
        formData.append('file', file);

        const params: Record<string, string | number> = { taxCode, startLine };

        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer_id = customer;
        }

        const response = await axios.post(`/api/master-list/${method}/rows-by-excel`, formData, {
            params,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        return error;
    }
};