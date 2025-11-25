export interface ClientType {
    id: number;
    company_name: string;
    tax_code: string;
    address: string;
    sap_code: string,
    international_name: string,
    short_name: string,
}

export interface ClientFormData {
    company_name: string;
    tax_code: string;
    address: string;
    sap_code: string,
    international_name: string,
    customer?: string,
    short_name: string,
}