/**
 * @file job-number.interface.ts
 * @description
 * This file defines TypeScript interfaces used in the form-related components
 * of the application, particularly for client selection, file upload,
 * and form step management.
 *
 * Interfaces:
 * - `InitForm`: Represents the initial structure for job setup forms, including job number, tax code, and method.
 * - `ClientData`: Represents client information returned from an API or selected by the user.
 * - `InitialFormProps`: Defines the props for a component that manages initial form data and flow control (e.g., moving between steps).
 * - `UploadFileForm`: Structure for holding uploaded file data.
 * - `UploadFilesFormProps`: Props for components dealing with file upload forms, includes initial file values.
 */

import { ExtractResponse } from "./form-field";

export interface JobNumber {
    id: string,
    full_name: string,
    name: string,
    job_number?: string,
    created_at: string,
    company_name: string,
    customer?: number,
    method: string,
    note: string | null,
    vector_store_id: string | null,
    status: string,
    customs_procedure_type: number,
    projects?: any,
    ignore_masterlist: boolean,
    crosschecked_ms: number,
    extracted_ms: number,
}

export interface DeclarationSetting {
    default_setting_document_id: number | '';
}

export interface InitForm {
    jobNumber: string;
    taxCode: string;
    method: string;
    customer?: number;
    note: string;
    customs_procedure_type: string;
    ignore_masterlist  : boolean;
    declarations_count: number;
    declaration_settings: DeclarationSetting[];
}


export interface JobNumberEditProps {
    jobNumberIdProp?: string;
    initialData?: InitForm;
    initialFileData?: UploadFileForm;
    initialExtractData?: ExtractResponse;
    status: string;
    mode: 'add' | 'edit';
};

export interface InitialFormProps {
    initialFormValues?: InitForm;
    setJobNumberId: (d: any) => void;
    jobNumberId: string;
    setInitialFormData: (d: any) => void;
    handleNext?: () => void;
    setErrorIndex?: (i: number | null) => void;
    mode: 'add' | 'edit';
}

export interface ExtractFormProps {
    initialFormValues?: ExtractResponse;
    setIsECUSLoading: (d: any) => void;
    jobNumberId: string;
    initStepData: InitForm;
    isLoading: boolean;
    setInitialFormData: (d: any) => void;
    handleNext?: () => void;
    setErrorIndex?: (i: number | null) => void;
    onReload: () => void;
    mode: 'add' | 'edit';
}

export interface UploadFileForm {
    files: File[] | null,
}

// Props interface
export interface UploadFilesFormProps {
    initialValues: UploadFileForm;
    jobNumberId: string;
    setFileUploadData: (d: any) => void;
    mode: 'add' | 'edit';
}

export interface ExtractProps {
    initialValues: any;
    jobNumberId: string;
    generalCheckData: any;
    productCheckData: any;
}

export interface CrossCheckRecord {
    id: number,
    contract: string,
    invoice: string,
    packingList: string,
    bookingNotice: string,
    billOfLading: string,
    status: string,
}

export interface ClassifyRecord {
    id: number,
    name: string,
    type: string,
}

export interface CrossCheckRecord {
    id: number;
    contract: string;
    invoice: string;
    packingList: string;
    bookingNotice: string;
    billOfLading: string;
    status: string;
};

export enum Method {
    import = 'Nhập khẩu',
    export = 'Xuất khẩu'
}

export enum CustomsProcedureType {
    "Kinh doanh, đầu tư",
    "Sản xuất xuất khẩu",
    "Gia công",
    "Chế xuất",
}

export enum Status {
    new = 'Mới',
    ready = 'Sẵn sàng',
    crosschecked = 'Đã Crosscheck',
    completed = 'Đã Extract'
}

export enum CustomerTRASAS {
    'Starbuck',
    'Mcdonalds',
    'DIY',
    'ECO',
    'Baker Hughes'
}
