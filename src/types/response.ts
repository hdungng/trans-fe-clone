export interface APIResponse {
    status: string;
    message: any;
    data: any;
}

export interface APIResponsePagination extends APIResponse {
    meta: Meta;
}

export interface Meta {
    total: number;
    pageIndex: number;
    pageSize: number;
}