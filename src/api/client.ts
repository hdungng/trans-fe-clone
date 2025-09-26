import { ClientFormData } from 'types/pages/client';
import axios from 'utils/axios';
const TRASAS_TAX_CODE = '0304184415';


// ⬇️ this is the loader for the detail route
export async function getClients() {
    try {
        const response = await axios.get('/api/clients');
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getClientDetail(taxCode: string) {
    try {
        const response = await axios.get(`/api/clients/search?taxCode=${taxCode}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getClientsByTaxCode = async (taxCode: string) => {
    try {
        const response = await axios.get(`/api/clients/suggest-tax-code?prefix=${taxCode}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getClientsTRASAS = async () => {
    try {
        const response = await axios.get(`api/clients/trasas-customer`);
        return response.data;
    } catch (error) {
        return error;
    }
};


export async function createClient(user: ClientFormData) {
    const response = await axios.post(`api/clients`, user);
    return response.data;
}

export async function updateClient(user: ClientFormData, id: number) {
    const response = await axios.put(`api/clients/${id}`, user);
    return response.data;
}

export async function deleteClient(id: number) {
    const response = await axios.delete(`api/clients/${id}`);
    return response.data;
}



export async function getClientDefaultValues(taxCode: string, method: string, customer?: number, customs_procedure_type: number = 0) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer = customer;
        }

        params.customs_procedure_type = customs_procedure_type;

        const response = await axios.get(`/api/clients/${method}/default-values`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateClientDefaultValue(data: any, taxCode: string, method: string, customer?: number, customs_procedure_type: number = 0) {
    const params: Record<string, string | number> = { taxCode };
    if (taxCode === TRASAS_TAX_CODE && customer) {
        params.customer = customer;
    }

    params.customs_procedure_type = customs_procedure_type;

    const response = await axios.put(`api/clients/${method}/default-values`, data, { params });
    return response.data;
}



export async function getClientGuidingAI(customer_id: number, field: string, method: string, customs_procedure_type: number = 0) {
    try {
        const response = await axios.get(`/api/clients/${customer_id}/${method}/guiding-ai?field=${field}&customs_procedure_type=${customs_procedure_type}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateClientGuidingAI(customer_id: number, data: any, method: string) {
    try {
        const response = await axios.put(`api/clients/${customer_id}/${method}/guiding-ai`, data);
        return response.data;
    } catch (error) {
        return error;
    }
}
