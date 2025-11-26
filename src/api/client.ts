import { ClientFormData } from 'types/pages/client';
import axios from 'utils/axios';
import { ImportDefaultResponse, ExportDefaultResponse } from 'types/pages/form-field';
import { mockFormImportDefault } from 'pages/apps/job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from 'pages/apps/job-number/form/formik/ExportDefaultFormik';
import { APIResponse } from 'types/response';
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

type DefaultSettingDocumentRecord = DefaultSettingDocumentPayload & { id: number };

const mockDefaultSettingDocuments: DefaultSettingDocumentRecord[] = [
    {
        id: 1,
        name: 'Import default sample',
        method: 'import',
        tax_code: '0102030405',
        customs_procedure_type: 0,
        customer: null,
        user_id: null,
        import_type_code: 'A11',
        data: mockFormImportDefault,
    },
    {
        id: 2,
        name: 'Export default sample',
        method: 'export',
        tax_code: '9988776655',
        customs_procedure_type: 0,
        customer: null,
        user_id: null,
        data: mockFormExportDefault,
    },
];

export async function getDefaultSettingDocuments(params?: { tax_code?: string; method?: string; customs_procedure_type?: number; customer?: string | null; user_id?: number | null; }) {
    let data = [...mockDefaultSettingDocuments];

    if (params) {
        data = data.filter((doc) => {
            const taxCodeMatch = params.tax_code ? doc.tax_code === params.tax_code : true;
            const methodMatch = params.method ? doc.method === params.method : true;
            const customsProcedureMatch =
                typeof params.customs_procedure_type === 'number'
                    ? doc.customs_procedure_type === params.customs_procedure_type
                    : true;
            const customerMatch = params.customer ? doc.customer === params.customer : true;
            const userMatch = typeof params.user_id === 'number' ? doc.user_id === params.user_id : true;

            return taxCodeMatch && methodMatch && customsProcedureMatch && customerMatch && userMatch;
        });
    }

    const response: APIResponse = {
        status: 'success',
        message: 'Mocked default setting documents',
        data,
    };

    return Promise.resolve(response);
}

export async function createDefaultSettingDocument(payload: DefaultSettingDocumentPayload) {
    const newDocument: DefaultSettingDocumentRecord = {
        ...payload,
        id: mockDefaultSettingDocuments[mockDefaultSettingDocuments.length - 1]?.id + 1 || 1,
    };

    mockDefaultSettingDocuments.push(newDocument);

    const response: APIResponse = {
        status: 'success',
        message: 'Mocked document created',
        data: newDocument,
    };

    return Promise.resolve(response);
}

export async function updateDefaultSettingDocument(id: number, payload: DefaultSettingDocumentPayload) {
    const index = mockDefaultSettingDocuments.findIndex((doc) => doc.id === id);

    if (index === -1) {
        const errorResponse: APIResponse = {
            status: 'error',
            message: 'Document not found',
            data: null,
        };

        return Promise.resolve(errorResponse);
    }

    const updatedDocument: DefaultSettingDocumentRecord = { ...mockDefaultSettingDocuments[index], ...payload, id };
    mockDefaultSettingDocuments[index] = updatedDocument;

    const response: APIResponse = {
        status: 'success',
        message: 'Mocked document updated',
        data: updatedDocument,
    };

    return Promise.resolve(response);
}

export async function deleteDefaultSettingDocument(id: number) {
    const index = mockDefaultSettingDocuments.findIndex((doc) => doc.id === id);

    if (index === -1) {
        const errorResponse: APIResponse = {
            status: 'error',
            message: 'Document not found',
            data: null,
        };

        return Promise.resolve(errorResponse);
    }

    const [deletedDocument] = mockDefaultSettingDocuments.splice(index, 1);

    const response: APIResponse = {
        status: 'success',
        message: 'Mocked document deleted',
        data: deletedDocument,
    };

    return Promise.resolve(response);
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
