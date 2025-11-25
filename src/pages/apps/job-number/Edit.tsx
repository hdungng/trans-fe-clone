import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';
import InitialForm from './steps/InitialForm';
import CertificateUploadForm from './steps/CertificateUploadForm';
import CertificateProcess from './steps/CertificateProcess';
import { InitForm, JobNumberEditProps, UploadFileForm } from 'types/pages/job-number';
import CertificateExtract from './steps/CertificateExtract';
import { getExtract } from 'api/job-number';
import { mockFormImport } from './form/formik/ImportExtractFormik';
import { ExtractResponse } from 'types/pages/form-field';
import { 
    // FormControlLabel, 
    useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { handleStep1, handleStep2, reloadStep1, reloadStep2 } from './services/jobHandlers';
import { useIntl } from 'react-intl';
// import { Checkbox } from '@mui/material';

let initialValue: InitForm = {
    jobNumber: '',
    taxCode: '',
    method: '',
    note: '',
    customs_procedure_type: '0',
    ignore_masterlist: false,
    declarations_count: 1,
    declaration_settings: [{ default_setting_document_id: '' }],
};

let initialUploadFileValue: UploadFileForm = { files: null, };


let initialExtractValue: ExtractResponse = mockFormImport;


export default function JobNumberEdit({
    jobNumberIdProp = "",
    initialData,
    initialFileData,
    initialExtractData,
    mode = 'add',
    status = 'new',
}: JobNumberEditProps) {
    const intl = useIntl();
    const [activeStep, setActiveStep] = useState(0);
    const [initFormData, setInitFormData] = useState<InitForm>(initialValue);
    const [initFormMode, setInitFormMode] = useState<'add' | 'edit'>(mode);
    const [fileUploadMode, setFileUploadMode] = useState<'add' | 'edit'>(mode);
    const [fileUploadData, setFileUploadData] = useState<UploadFileForm>(initialUploadFileValue);
    const [extractData, setExtractData] = useState<ExtractResponse>(initialExtractValue);
    const [jobNumberId, setJobNumberId] = useState<string>(jobNumberIdProp);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusState, setStatusState] = useState<string>(status);
    const [isECUSLoading, setIsECUSLoading] = useState<boolean>(false);

    const steps = useMemo(
        () => [
            intl.formatMessage({ id: 'job-number.edit.step.job-info', defaultMessage: 'Job number information' }),
            intl.formatMessage({ id: 'job-number.edit.step.upload', defaultMessage: 'Upload documents' }),
            intl.formatMessage({ id: 'job-number.edit.step.crosscheck', defaultMessage: 'Crosscheck documents' }),
            intl.formatMessage({ id: 'job-number.edit.step.extract', defaultMessage: 'Extract & input data' }),
        ],
        [intl]
    );

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mobile: xs & sm
    const formInitRef = useRef<any>(null);
    const formFileUploadRef = useRef<any>(null);
    const extractRef = useRef<any>(null);
    // const [checked, setChecked] = useState<boolean>(false);


    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     setChecked(event.target.checked);
    // };

    const reloadStep1Fn = useCallback(async () => {
        await reloadStep1({
            jobNumberId,
            activeStep,
            setIsError,
            setIsLoading,
            setActiveStep,
            setStatus: setStatusState,
            status: statusState,
            mode,
        });
    }, [
        jobNumberId,
        statusState,
        activeStep,
        setIsError,
        setIsLoading,
        setActiveStep,
        mode,
    ]);


    const reloadStep2Fn = useCallback(async () => {
        await reloadStep2({
            jobNumberId,
            initFormData,
            mode,
            activeStep,
            setActiveStep,
            setIsLoading,
            setExtractData,
            setIsError,
            setStatus: setStatusState,
            status: statusState
        });
    }, [
        jobNumberId,
        initFormData,
        statusState,
        activeStep,
        setIsError,
        setIsLoading,
        setActiveStep,
        mode
    ]);

    useEffect(() => {
        if (mode === 'edit') {
            switch (statusState) {
                case 'new':
                case 'ready':
                    setActiveStep(1);
                    break;
                case 'crosschecked':
                    setActiveStep(2);
                    break;
                case 'completed':
                    setActiveStep(3);
                    break;
            }

            if (initialData) {
                setInitFormData(initialData);
            }
            if (initialFileData) {
                setFileUploadData(initialFileData);
            }

            if (initialExtractData) {
                setExtractData(initialExtractData);
            }


        } else {
            setInitFormData(initialValue);
            setFileUploadData(initialUploadFileValue);
            setExtractData(initialExtractValue);
        }

    }, [initialData, initialFileData, mode]);

    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };
        if (isLoading) {
            window.addEventListener('beforeunload', handler);
        } else {
            window.removeEventListener('beforeunload', handler);
        }
        return () => window.removeEventListener('beforeunload', handler);
    }, [isLoading]);


    const handleNext = async () => {
        await formInitRef.current?.submitForm();

        const { isValidFormUpload = false, isChanged = false } =
            (await formFileUploadRef.current?.submitForm?.()) || {};

        await extractRef.current?.submitForm();


        let isFormValid = await formInitRef.current?.isValid();

        if (activeStep === 0 && isFormValid) {
            setActiveStep(activeStep + 1);
        }
        else if (activeStep === 1 && isValidFormUpload !== false) {

            await handleStep1({
                jobNumberId,
                activeStep,
                hasChanges: isChanged,
                setIsError,
                setIsLoading,
                setActiveStep,
                setStatus: setStatusState,
                status: statusState,
                mode,
            });

            // if (checked) {
            //     setActiveStep(3);
            //     await handleStep2({
            //         jobNumberId,
            //         initFormData,
            //         mode,
            //         activeStep,
            //         hasChanges: isChanged,
            //         setActiveStep,
            //         setIsLoading,
            //         setExtractData,
            //         setIsError,
            //         setStatus: setStatusState,
            //         status: statusState
            //     });
            // }

        } else if (activeStep === 2) {

            await handleStep2({
                jobNumberId,
                initFormData,
                mode,
                activeStep,
                hasChanges: isChanged,
                setActiveStep,
                setIsLoading,
                setExtractData,
                setIsError,
                setStatus: setStatusState,
                status: statusState
            });
        }
        else if (activeStep === 3) {
            console.log('step 3');
        }
    }

    const handleBack = async () => {
        if (activeStep >= 1)
            setInitFormMode('edit')

        if (activeStep >= 2)
            setFileUploadMode('edit')

        try {
            if (statusState === "completed") {
                let extractData = await getExtract(jobNumberId, initFormData.method);
                setExtractData(extractData.data);
            }

            if (statusState === "completed" || statusState === "crosschecked") {
                setIsLoading(false);
            }
        }

        catch (e) {
            console.error(e);
            setIsLoading(false);
            setIsError(true);
        }
        setActiveStep((prev) => prev - 1);


        setIsLoading(false);
    };

    const handleStep = (step: number) => async () => {
        if (statusState === 'new') return;

        setActiveStep(step);

        if (activeStep >= 1)
            setInitFormMode('edit')

        if (activeStep >= 2)
            setFileUploadMode('edit')

        if (statusState === "completed") {
            let extractData = await getExtract(jobNumberId, initFormData.method);
            setExtractData(extractData.data);
        }


        if (statusState === "completed" || statusState === "crosschecked") {
            setIsLoading(false);
        }

        setIsLoading(false);
    }


    // Return the appropriate step content component
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <InitialForm
                    initialFormValues={initFormData}
                    jobNumberId={jobNumberId}
                    setJobNumberId={setJobNumberId}
                    ref={formInitRef}
                    setInitialFormData={setInitFormData}
                    mode={initFormMode} />;
            case 1:
                return <CertificateUploadForm
                    jobNumberId={jobNumberId}
                    initialValues={fileUploadData}
                    ref={formFileUploadRef}
                    setFileUploadData={setFileUploadData}
                    mode={fileUploadMode} />;
            case 2:
                return <CertificateProcess
                    isError={isError}
                    jobNumberId={jobNumberId}
                    isLoading={isLoading}
                    initialValues={initFormData}
                    onReload={reloadStep1Fn} />;
            case 3:
                return <CertificateExtract
                    initialFormValues={extractData}
                    jobNumberId={jobNumberId}
                    ref={extractRef}
                    setInitialFormData={setExtractData}
                    mode={mode}
                    isLoading={isLoading}
                    initStepData={initFormData}
                    onReload={reloadStep2Fn}
                    setIsECUSLoading={setIsECUSLoading} />;
            default:
                throw new Error('Unknown step');
        }
    };

    return (
        <MainCard title="" sx={{ width: '100%' }} style={{ fontSize: '20px' }}>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 3 }} orientation={isMobile ? 'vertical' : 'horizontal'}>
                {steps.map((label, index) => (
                    <Step style={{ cursor: 'pointer' }} key={label} onClick={handleStep(index)}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                <>
                    {getStepContent(activeStep)}
                    <Stack direction="row" sx={{ justifyContent: activeStep !== 0 ? 'space-between' : "end", alignItems: 'center' }}>
                        {activeStep !== 0 && (
                            <AnimateButton>
                                <Button onClick={handleBack} sx={{ my: 1, ml: 1 }} disabled={isLoading}>
                                    {intl.formatMessage({ id: 'job-number.edit.button.back', defaultMessage: 'Back' })}
                                </Button>
                            </AnimateButton>
                        )}
                        <Stack direction="row" sx={{ justifyContent: activeStep !== 0 ? 'space-between' : "end", alignItems: 'center' }}>
                            {/* {activeStep === 1 && <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleChange} />}
                                label="Bỏ qua bước Kiểm tra chứng từ"
                                labelPlacement="end"
                                sx={{ marginRight: 8 }}
                            />} */}
                            <AnimateButton>
                                <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }} disabled={isLoading || isECUSLoading}>
                                    {activeStep === steps.length - 1
                                        ? intl.formatMessage({ id: 'job-number.edit.button.submit-server', defaultMessage: 'Send to data entry server' })
                                        : intl.formatMessage({ id: 'job-number.edit.button.next', defaultMessage: 'Next' })}
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Stack>
                </>
            </>
        </MainCard>
    );
};