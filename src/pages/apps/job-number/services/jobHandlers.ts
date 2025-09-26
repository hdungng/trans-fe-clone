// services/jobHandlers.ts

import { extractCheck, getExtract, getStatus, updateStatus } from "api/job-number";
import { pollUntilStatusChange } from "utils/polling";
import { crossCheck } from "api/cross-check";


interface HandleStep1Params {
    jobNumberId: string;
    status: string;
    activeStep: number;
    hasChanges?: boolean;
    setIsError: (val: boolean) => void;
    setIsLoading: (val: boolean) => void;
    setActiveStep: (val: number) => void;
    setStatus: (val: string) => void;
    mode: string;
}

interface HandleStep2Params {
    jobNumberId: string;
    initFormData: any;
    mode: string;
    activeStep: number;
    hasChanges?: boolean;
    setActiveStep: (val: number) => void;
    setIsLoading: (val: boolean) => void;
    setExtractData: (data: any) => void;
    setIsError: (val: boolean) => void;
    setStatus: (val: string) => void;
    status: string;
}

// ✅ Step 1 logic
export const handleStep1 = async ({
    jobNumberId,
    status,
    activeStep,
    hasChanges,
    setIsError,
    setIsLoading,
    setActiveStep,
    setStatus,
    mode,
}: HandleStep1Params) => {
    setIsError(false);
    setIsLoading(true);
    setActiveStep(activeStep + 1);
    try {
        let currentStatus = await getStatus(jobNumberId);

        if (hasChanges || currentStatus === 'ready') {

            const currentStatus = (status === "crosschecked" || status === "completed") ? status : "new";
            await pollUntilStatusChange(jobNumberId, currentStatus, 1000);
            await crossCheck(jobNumberId);
            const resStatusCrossCheck = await pollUntilStatusChange(jobNumberId, "ready", 7000);

            if (resStatusCrossCheck === "crosschecked") {
                setIsLoading(false);
                setStatus('crosschecked');
            }
        } else {
            setIsLoading(false);
        }

        if (mode === 'edit' && (status === "crosschecked" || status === "completed")) {
            setIsLoading(false);
        }
    } catch {
        // setIsError(true);
        setIsLoading(false);
    }
};


// ✅ Step 1 logic
export const reloadStep1 = async ({
    jobNumberId,
    status,
    hasChanges,
    setIsError,
    setIsLoading,
    setStatus,
    mode,
}: HandleStep1Params) => {
    setIsError(false);
    setIsLoading(true);
    await updateStatus(jobNumberId, { status: "ready" });


    await crossCheck(jobNumberId);

    const resStatusCrossCheck = await pollUntilStatusChange(jobNumberId, "ready", 7000);

    if (resStatusCrossCheck === "crosschecked") {
        setIsLoading(false);
        setStatus('crosschecked');
    }

    if (mode === 'edit' && (status === "crosschecked" || status === "completed")) {
        setIsLoading(false);
        await updateStatus(jobNumberId, { status: "completed" });
    }
};


export const handleStep2 = async ({
    jobNumberId,
    initFormData,
    mode,
    activeStep,
    hasChanges,
    setActiveStep,
    setIsLoading,
    setExtractData,
    setIsError,
    setStatus,
    status
}: HandleStep2Params) => {
    let stepStatus = await getStatus(jobNumberId);

    console.log(activeStep);

    setActiveStep(activeStep + 1);
    setIsLoading(true);

    if (stepStatus === 'crosschecked') {
        await extractCheck(jobNumberId, initFormData.method);
    }


    let resStatusExtract = await pollUntilStatusChange(jobNumberId, "crosschecked", 5000);

    try {

        if (resStatusExtract === 'completed') {
            status = resStatusExtract;
            let extractData = await getExtract(jobNumberId, initFormData.method);
            setIsLoading(false);
            setExtractData(extractData.data);
        } else {
            setIsLoading(false);
        }


        if (mode === 'edit' && (status === "completed")) {
            let extractData = await getExtract(jobNumberId, initFormData.method);
            setIsLoading(false);
            setExtractData(extractData.data);
            setStatus('completed');
        }

    } catch (e) {
        console.error(e);
        setExtractData({} as any);
        setIsLoading(false);
        setIsError(true);
    }
};


// ✅ Step 2 logic
export const reloadStep2 = async ({
    jobNumberId,
    initFormData,
    mode,
    setIsLoading,
    setExtractData,
    setIsError,
    setStatus,
    status
}: HandleStep2Params) => {
    setIsLoading(true);

    await updateStatus(jobNumberId, { status: "crosschecked" });

    await extractCheck(jobNumberId, initFormData.method);

    let resStatusExtract = await pollUntilStatusChange(jobNumberId, "crosschecked", 5000);

    try {

        if (resStatusExtract === 'completed') {
            status = resStatusExtract;
            let extractData = await getExtract(jobNumberId, initFormData.method);
            setIsLoading(false);
            setExtractData(extractData.data);
            setStatus('completed');
        } else {
            setIsLoading(false);
        }


        if (mode === 'edit' && (status === "completed")) {
            let extractData = await getExtract(jobNumberId, initFormData.method);
            setIsLoading(false);
            setExtractData(extractData.data);
        }

    } catch (e) {
        console.error(e);
        setExtractData({} as any);
        setIsLoading(false);
        setIsError(true);
    }
};


// ✅ Jump to Step 2 logic
// export const moveToStep2 = async ({
//     jobNumberId,
//     initFormData,
//     status,
//     activeStep,
//     hasChanges,
//     setIsError,
//     setIsLoading,
//     setActiveStep,
//     setExtractData,
//     mode,
// }: HandleStep2Params) => {
//     setIsError(false);
//     setIsLoading(true);
//     setActiveStep(activeStep + 2);

//     if (hasChanges) {
//         const currentStatus = (status === "crosschecked" || status === "completed") ? status : "new";
//         await pollUntilStatusChange(jobNumberId, currentStatus, 1000);

//         await extractCheck(jobNumberId, initFormData.method);
//         const resStatusExtract = await pollUntilStatusChange(jobNumberId, "ready", 7000);

//         if (resStatusExtract === 'completed') {
//             let extractData = await getExtract(jobNumberId, initFormData.method);
//             setExtractData(extractData.data);
//             setIsLoading(false);
//         } else {
//             setIsLoading(false);
//         }
//     } else {
//         let extractData = await getExtract(jobNumberId, initFormData.method);
//         setExtractData(extractData.data);
//         setIsLoading(false);
//     }
// };