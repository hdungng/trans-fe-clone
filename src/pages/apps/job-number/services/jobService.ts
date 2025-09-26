import { generalCheck, getCOCheckProduct, getCOCheckV2, getCrossCheckProductWithMasterList, getEVFTACheck, getHCCheck, getRexCodeCheck, getSummaryIssues, productCheck } from "api/cross-check";
import { getTimes } from "api/job-number";
import { APIResponse } from "types/response";


export const fetchGeneralCheckData = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await generalCheck(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchCOCheckData = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await getCOCheckV2(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchProductCheckData = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await productCheck(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchSummaryIssues = async (jobNumberId: string, setFn: Function) => {
    const result: APIResponse = await getSummaryIssues(jobNumberId);
    if (result.status === 'success') {
        setFn(result.data.summary_issues);
    }
};
// =========================================================== //

export const fetchCrossCheckProductWithMSL = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await getCrossCheckProductWithMasterList(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchCOCheckProduct = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await getCOCheckProduct(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchHCCheck = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await getHCCheck(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetchVFTACheck = async (jobNumberId: string, setFn: Function) => {
    try {
        const result: APIResponse = await getEVFTACheck(jobNumberId);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const fetRexCodeCheck = async (jobNumberId: string, res_code: string, setFn: Function) => {
    try {
        const result: APIResponse = await getRexCodeCheck(jobNumberId, res_code);
        result.status === 'success' ? setFn(result.data) : setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};

export const getTimesJob = async (jobNumberId: string, setFn: Function, type: string) => {
    try {
        const result: APIResponse = await getTimes(jobNumberId, type);

        if (result.status === 'success')
            switch (type) {
                case 'crosscheck':
                    setFn(result.data.crosschecked_ms);
                    break;
                case 'extract':
                    setFn(result.data.extracted_ms)
                    break;
                case 'upload':
                    setFn(result.data.uploaded_ms)
                    break;
            }
        else
            setFn([]);
    } catch (e) {
        console.error(e);
        setFn([]);
    }
};