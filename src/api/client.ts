import { ClientFormData } from 'types/pages/client';
import axios from 'utils/axios';
import { ImportDefaultResponse, ExportDefaultResponse } from 'types/pages/form-field';
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



export async function getClientDefaultValues(taxCode: string, method: string, customer?: string, user_id?: number, customs_procedure_type: number = 0) {
    try {
        const params: Record<string, string | number> = { taxCode };
        if (taxCode === TRASAS_TAX_CODE && customer) {
            params.customer = customer;
        }

        if (user_id) {
            params.user_id = user_id;
        }

        params.customs_procedure_type = customs_procedure_type;

        const response = await axios.get(`/api/clients/${method}/default-values`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateClientDefaultValue(data: any, taxCode: string, method: string, customer?: string, user_id?: number, customs_procedure_type: number = 0) {
    const params: Record<string, string | number> = { taxCode };
    if (taxCode === TRASAS_TAX_CODE && customer) {
        params.customer = customer;
    }

    if (user_id) {
        params.user_id = user_id;
    }

    params.customs_procedure_type = customs_procedure_type;

    const response = await axios.put(`api/clients/${method}/default-values`, data, { params });
    return response.data;
}

// Default setting document APIs
export interface DefaultSettingDocumentPayload {
    name: string;
    tax_code: string;
    method: string;
    customs_procedure_type: number;
    customer?: string | null;
    user_id?: number | null;
    import_type_code?: string;
    data: ImportDefaultResponse | ExportDefaultResponse | any;
}

export async function getDefaultSettingDocuments(params?: { tax_code?: string; method?: string; customs_procedure_type?: number; customer?: string | null; user_id?: number | null; }) {
    try {
        const response = await axios.get('/api/default-setting-document', { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function createDefaultSettingDocument(payload: DefaultSettingDocumentPayload) {
    const response = await axios.post('/api/default-setting-document', payload);
    return response.data;
}

export async function updateDefaultSettingDocument(id: number, payload: DefaultSettingDocumentPayload) {
    const response = await axios.put(`/api/default-setting-document/${id}`, payload);
    return response.data;
}

export async function deleteDefaultSettingDocument(id: number) {
    const response = await axios.delete(`/api/default-setting-document/${id}`);
    return response.data;
}



export async function getClientGuidingAI(customer_id: number, field: string, method: string, customs_procedure_type: number = 0, customer?: string | null, user_id?: number | null) {
    try {
        const params: Record<string, string | number> = { field, customs_procedure_type };

        if (customer) {
            params.customer = customer;
        }
        if (user_id) {
            params.user_id = user_id;
        }

        const response = await axios.get(`/api/clients/${customer_id}/${method}/guiding-ai`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateClientGuidingAI(customer_id: number, data: any, method: string, customer?: string | null, user_id?: number | null) {
    try {
        const params: Record<string, string | number> = {};
        if (customer) {
            params.customer = customer;
        }
        if (user_id) {
            params.user_id = user_id;
        }

        const response = await axios.put(`api/clients/${customer_id}/${method}/guiding-ai`, data, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getClientCrossCheckGuidingAI(customer_id: number, method: string, customer?: string | null, user_id?: number | null) {
    try {
        const params: Record<string, string | number> = {};

        if (customer) {
            params.customer = customer;
        }
        if (user_id) {
            params.user_id = user_id;
        }

        const response = await axios.get(`/api/clients/${customer_id}/${method}/crosscheck-instruction`, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateClientCrossCheckGuidingAI(customer_id: number, data: any, method: string, customer?: string | null, user_id?: number | null) {
    try {
        const params: Record<string, string | number> = {};

        if (customer) {
            params.customer = customer;
        }
        if (user_id) {
            params.user_id = user_id;
        }

        const response = await axios.put(`api/clients/${customer_id}/${method}/crosscheck-instruction`, data, { params });
        return response.data;
    } catch (error) {
        return error;
    }
}
