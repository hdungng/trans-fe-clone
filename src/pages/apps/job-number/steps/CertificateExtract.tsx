import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ExtractFormProps } from 'types/pages/job-number';
import { Alert, CircularProgress, Skeleton, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import JobFormImport from '../form/import/JobFormImport';
import JobFormExport from '../form/export/JobFormExport';
import { FileOutlined, InfoCircleTwoTone, RedoOutlined } from '@ant-design/icons';
import { mockFormImport } from '../form/formik/ImportExtractFormik';
import { mockFormExport } from '../form/formik/ExportExtractFormik';
import { areObjectsEqual } from 'utils/string';
import { EmptyTable } from 'components/third-party/react-table';
import { formatTime } from 'utils/formatDate';
import { downloadContainerFile, getTimesJob } from '../services/jobService';
import { useIntl } from 'react-intl';

const CertificateExtract = forwardRef(({ initialFormValues, setInitialFormData, isLoading, jobNumberId, initStepData, onReload, setIsECUSLoading }: ExtractFormProps, ref) => {
    const intl = useIntl();
    const theme = useTheme();
    const [seconds, setSeconds] = useState(0); // chỉ lấy từ API
    const [count, setCount] = useState(0); // chỉ đếm khi loading
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isLoading) {
            setCount(0);
            interval = setInterval(() => {
                setCount((prev) => prev + 1000);
            }, 1000);
        } else {
            getTimesJob(jobNumberId, setSeconds, "extract");
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    const fetchData = async (jobNumberId: string) => {
        await getTimesJob(jobNumberId, setSeconds, "extract");
    }


    useEffect(() => {
        fetchData(jobNumberId);
    }, [])

    const extractRef = useRef<any>(null);
    const isExportNull = areObjectsEqual(initialFormValues as any, mockFormExport);
    const isImportNull = areObjectsEqual(initialFormValues as any, mockFormImport);


    const handleContainerFile = async () => {
        try {
            await downloadContainerFile(jobNumberId, initStepData.method);
        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            return extractRef.current?.submitForm();
        },
    }));

    return (
        isLoading ? (
            <>
                <Alert sx={{ my: 2 }} color="warning" variant="filled" icon={<CircularProgress size={15}
                    sx={{ color: '#fff' }} thickness={7} />}>
                    {intl.formatMessage({ id: 'job-number.edit.extract.alert.processing', defaultMessage: 'Extracting documents for job number {jobNumber}…' }, { jobNumber: initStepData.jobNumber })}
                </Alert>
                <Alert sx={{ mb: 2 }} color="warning" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                    {intl.formatMessage({ id: 'job-number.edit.extract.alert.duration-running', defaultMessage: 'Extraction duration: {duration}' }, { duration: formatTime(count) })}
                </Alert>
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={50} />
            </>
        ) : (
            <>
                {initialFormValues && Object.keys(initialFormValues).length > 0 ? (
                    <>
                        {!(isExportNull || isImportNull) && (
                            <>
                                <Alert sx={{ my: 2 }} color="success" variant="filled">
                                    {intl.formatMessage({ id: 'job-number.edit.extract.alert.complete', defaultMessage: 'Document extraction for job number {jobNumber} completed' }, { jobNumber: initStepData.jobNumber })}
                                </Alert>
                                <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                    {intl.formatMessage({ id: 'job-number.edit.extract.alert.duration-finished', defaultMessage: 'Extraction completed in {duration}' }, { duration: formatTime(seconds) })}
                                </Alert>
                            </>
                        )}
                        <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<FileOutlined />}
                                onClick={handleContainerFile}
                            >
                                {intl.formatMessage({ id: 'job-number.edit.extract.export-container-list', defaultMessage: 'Export total invoice' })}
                            </Button>
                            <Button color="success" endIcon={<RedoOutlined />} onClick={onReload}>{intl.formatMessage({ id: 'job-number.edit.extract.button.retry', defaultMessage: 'Extract again' })}</Button>
                        </Stack>

                        {
                            initStepData.method === "import" && !isImportNull ? (
                                <JobFormImport
                                    initialFormValues={initialFormValues}
                                    setInitialFormData={setInitialFormData}
                                    mode='edit'
                                    initStepData={initStepData}
                                    jobNumberId={jobNumberId}
                                    ref={extractRef}
                                    setIsECUSLoading={setIsECUSLoading}
                                />
                            )
                                : initStepData.method === "export" && !isExportNull ? (
                                    <JobFormExport
                                        initialFormValues={initialFormValues}
                                        setInitialFormData={setInitialFormData}
                                        mode='edit'
                                        initStepData={initStepData}
                                        jobNumberId={jobNumberId}
                                        ref={extractRef}
                                        setIsECUSLoading={setIsECUSLoading}
                                    />
                                ) : (
                                    <EmptyTable msg={intl.formatMessage({ id: 'job-number.edit.extract.empty', defaultMessage: 'No extraction data available' })} />
                                )
                        }
                    </>
                ) : (
                    (isExportNull || isImportNull) && (
                        <>
                            <Alert sx={{ my: 3 }} color="error" variant="filled">
                                {intl.formatMessage({ id: 'job-number.edit.extract.alert.error', defaultMessage: 'OpenAI system error. Please extract again.' })}
                            </Alert>
                            <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1 }}>
                                <Button color="error" endIcon={<RedoOutlined />} onClick={onReload}>{intl.formatMessage({ id: 'job-number.edit.extract.button.retry', defaultMessage: 'Extract again' })}</Button>
                            </Stack>
                        </>
                    )

                )}
            </>
        )

    );
});

export default CertificateExtract;