import React, { FormEvent, forwardRef, useEffect, useState } from 'react';
import CrossCheckTable from 'pages/apps/job-number/tables/CrossCheckTable';
import {
    Alert, Skeleton,
    CircularProgress,
    Stack,
    Tabs,
    Tab,
    Box,
    useTheme,
} from '@mui/material';
import {
    BugFilled, InfoCircleFilled, InfoCircleTwoTone, RedoOutlined,
} from '@ant-design/icons';
import ProductCheckTable from 'pages/apps/job-number/tables/ProductCheckTable';
import { Button } from '@mui/material';
import { isEmptyObject } from 'utils/object';
import { fetchCOCheckData, fetchCOCheckProduct, fetchCrossCheckProductWithMSL, fetchGeneralCheckData, fetchHCCheck, fetchProductCheckData, fetchSummaryIssues, fetchVFTACheck, getTimesJob } from '../services/jobService';
import { TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { getRexCodeCheck } from 'api/cross-check';
import { Typography } from '@mui/material';
import { formatTime } from 'utils/formatDate';
import { useIntl } from 'react-intl';


const CertificateProcess = forwardRef(({ initialValues, jobNumberId, isLoading, isError, onReload }: any, ref) => {
    const intl = useIntl();
    const [seconds, setSeconds] = useState(0);
    const [count, setCount] = useState(0);
    const [uploadSec, setUploadSec] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isLoading) {
            setCount(0);
            interval = setInterval(() => {
                setCount((prev) => prev + 1000);
            }, 1000);
        } else {
            getTimesJob(jobNumberId, setSeconds, "crosscheck");
            getTimesJob(jobNumberId, setUploadSec, "upload");
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    const theme = useTheme();
    const [tabValue, setTabValue] = useState(1);
    const [HCData, setHCData] = useState<any>([]);
    const [crossCheckMSLData, setCrossCheckMSLData] = useState<any>([]);
    const [COProductData, setCOProductData] = useState<any>([]);


    const [generalCheckData, setGeneralCheckData] = useState<any>([]);
    const [COCheckData, setCOCheckData] = useState<any>([]);
    const [summaryIssues, setSummaryIssues] = useState<any>([]);
    const [productCheckData, setProductCheckData] = useState<any>([]);


    const [EVFTACheckData, setEVFTACheckData] = useState<any>([]);
    const [rexCodeData, setRexCodeData] = useState<string | null>(null);

    const [RESCodeStatus, setRESCodeStatus] = useState<any>();
    const [isRESLoading, setRESIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (rexCodeData) {
            await getRexCode(rexCodeData)
        }
    };

    const getRexCode = async (rexCodeData: string) => {
        setRESIsLoading(true);
        const resCodeStatusRes = await getRexCodeCheck(jobNumberId, rexCodeData);
        setRESCodeStatus(resCodeStatusRes)
        setRESIsLoading(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRexCodeData(e.target.value);
    };

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Not exist, not data
    const isCOCheckDataNotExist = !COCheckData || !COCheckData.rows || COCheckData.rows.length === 0;
    const isGeneralCheckDataNotExist = !generalCheckData || !generalCheckData.rows || generalCheckData.rows.length === 0;
    const isProductCheckNotExist = !productCheckData || isEmptyObject(productCheckData) || productCheckData.length === 0;
    const isCOProductDataNotExist = COProductData.length === 0 || COProductData.every((item: any) => item.issues.length === 0);
    const isCrossCheckMSLDataExist = crossCheckMSLData.length === 0 || crossCheckMSLData.every((item: any) => item.issues.length === 0);
    const isHCNoData = !HCData || !HCData.rows || HCData.rows.length === 0;


    // Exist data
    const isEVFTACheckDataExist = Array.isArray(EVFTACheckData.comments) && EVFTACheckData.comments.length > 0;


    useEffect(() => {
        // Open the WebSocket connection when the component mounts
        const socket = new WebSocket(`${import.meta.env.VITE_APP_SOCKET_URL}/ws/test`);

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            let res = JSON.parse(event.data);

            if (res.table && res.jobId === jobNumberId) {
                if (res.table === "general_check") {
                    fetchGeneralCheckData(jobNumberId, setGeneralCheckData);
                    fetchSummaryIssues(jobNumberId, setSummaryIssues);
                    fetchHCCheck(jobNumberId, setHCData);
                    fetchVFTACheck(jobNumberId, setEVFTACheckData);
                }

                if (res.table === "co_check") {
                    fetchCOCheckData(jobNumberId, setCOCheckData);
                }

                if (res.table === "product-check") {
                    fetchProductCheckData(jobNumberId, setProductCheckData);
                }

                if (res.table === "product-co-masterlist-check") {
                    fetchCOCheckProduct(jobNumberId, setCOProductData);
                    fetchCrossCheckProductWithMSL(jobNumberId, setCrossCheckMSLData);
                }
            }
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        // Cleanup WebSocket connection when component unmounts
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };

    }, []);


    useEffect(() => {
        if (!isLoading) {
            fetchData(jobNumberId);
        }
    }, [tabValue, isLoading])


    const fetchData = async (jobNumberId: string) => {
        await Promise.allSettled([
            getTimesJob(jobNumberId, setUploadSec, "upload"),
            getTimesJob(jobNumberId, setSeconds, "crosscheck"),
            fetchGeneralCheckData(jobNumberId, setGeneralCheckData),
            fetchProductCheckData(jobNumberId, setProductCheckData),
            fetchCOCheckData(jobNumberId, setCOCheckData),
            fetchSummaryIssues(jobNumberId, setSummaryIssues),
            fetchCrossCheckProductWithMSL(jobNumberId, setCrossCheckMSLData),
            fetchCOCheckProduct(jobNumberId, setCOProductData),
            fetchHCCheck(jobNumberId, setHCData),
        ]);

        await fetchVFTACheck(jobNumberId, setEVFTACheckData)

        if (EVFTACheckData) {
            setRexCodeData(EVFTACheckData.rex_code)
            if (EVFTACheckData.rex_code) {
                await getRexCode(EVFTACheckData.rex_code)
            }
        }
    };

    const resetData = () => {
        setCrossCheckMSLData([]);
        setCOProductData([]);
        setGeneralCheckData([]);
        setCOCheckData([]);
        setSummaryIssues([]);
        setProductCheckData([])
        setEVFTACheckData([]);
        setRexCodeData(null);
    }


    return (
        <>
            {isError && (
                <>
                    <Alert sx={{ my: 2 }} color="error" variant="filled" icon={<BugFilled />}>
                        {intl.formatMessage({ id: 'job-number.edit.process.alert.error', defaultMessage: 'An error occurred while processing with OpenAI' })}
                    </Alert>
                    <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1 }}>
                        <Button color="error" endIcon={<RedoOutlined />} onClick={() => {
                            resetData();
                            onReload();
                        }}>{intl.formatMessage({ id: 'job-number.edit.process.button.crosscheck-again', defaultMessage: 'Crosscheck again' })}</Button>
                    </Stack>
                </>
            )}

            <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 3 }}>
                <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.documents', defaultMessage: 'Related documents' })} value={1} />
                {!(isCOCheckDataNotExist && isCOProductDataNotExist) && (
                    <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.coo', defaultMessage: 'Certificate of Origin' })} value={2} />
                )}
                {!isHCNoData && (
                    <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.health', defaultMessage: 'Health Certificate' })} value={3} />
                )}
                {isEVFTACheckDataExist && (
                    <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.evfta', defaultMessage: 'EVFTA Check' })} value={4} />
                )}
                {/* <Tab disabled={isLoading} label="Chứng nhận kiểm dịch thực vật" value={4} /> */}
            </Tabs>


            {tabValue === 1 &&
                (
                    <React.Fragment>
                        {isLoading ? (
                            <>
                                <Alert sx={{ my: 2 }} color="warning" variant="filled" icon={<CircularProgress size={15}
                                    sx={{ color: '#fff' }} thickness={7} />}>
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.crosscheck-processing', defaultMessage: 'Classifying and crosschecking job number {jobNumber}…' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>
                                <Alert sx={{ mb: 2 }} color="warning" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                    {intl.formatMessage({ id: 'job-number.detail.alert.crosscheck-duration', defaultMessage: 'Crosscheck completed in {duration}' }, { duration: formatTime(count) })}
                                </Alert>
                            </>
                        ) : !generalCheckData || !generalCheckData.rows || generalCheckData.rows.length === 0 ? <></> : (
                            <>
                                <Alert sx={{ my: 2 }} color="success" variant="filled">
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.crosscheck-complete', defaultMessage: 'Crosscheck for job number {jobNumber} completed' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>
                                <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                    {intl.formatMessage({ id: 'job-number.detail.alert.document-duration', defaultMessage: 'Document processing completed in {duration}' }, { duration: formatTime(uploadSec) })}
                                </Alert>
                                <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                    {intl.formatMessage({ id: 'job-number.detail.alert.crosscheck-duration', defaultMessage: 'Crosscheck completed in {duration}' }, { duration: formatTime(seconds) })}
                                </Alert>
                            </>
                        )
                        }

                        {!isLoading && <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1, marginBottom: 3 }}>
                            <Button color="success" endIcon={<RedoOutlined />} onClick={() => {
                                resetData();
                                onReload();
                            }}>{intl.formatMessage({ id: 'job-number.edit.process.button.crosscheck-again', defaultMessage: 'Crosscheck again' })}</Button>
                        </Stack>}

                        {isLoading && (
                            <>
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                            </>
                        )}

                        {!isGeneralCheckDataNotExist && <CrossCheckTable
                            title={intl.formatMessage({ id: 'job-number.detail.crosscheck.general.title', defaultMessage: 'Crosscheck general information' })}
                            columnHeaders={generalCheckData.headers}
                            rowData={generalCheckData.rows}
                        />}


                        {Array.isArray(summaryIssues) && summaryIssues.length > 0 && (
                            <Stack spacing={1} sx={{ my: 2 }}>
                                {summaryIssues.map((msg: string, index: number) => (
                                    <Alert key={index} severity="warning" variant="outlined">
                                        {msg}
                                    </Alert>
                                ))}
                            </Stack>
                        )}

                        {!isProductCheckNotExist && <ProductCheckTable data={productCheckData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.product.title', defaultMessage: 'Crosscheck product information' })} />}


                        {!isCrossCheckMSLDataExist && (
                            <ProductCheckTable data={crossCheckMSLData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.master-list.title', defaultMessage: 'Crosscheck products with Master List' })} />
                        )}

                    </React.Fragment>
                )
            }

            {tabValue === 2 &&
                (
                    <React.Fragment>
                        {isLoading ? (
                            <>
                                <Alert sx={{ my: 3 }} color="warning" variant="filled" icon={<CircularProgress size={15}
                                    sx={{ color: '#fff' }} thickness={7} />}>
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.coo-processing', defaultMessage: 'Checking Certificate of Origin for job number {jobNumber}…' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>

                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                            </>
                        ) : !(isCOCheckDataNotExist && isCOProductDataNotExist) ? <></> : (
                            <>
                                <Alert sx={{ my: 3 }} color="success" variant="filled">
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.coo-complete', defaultMessage: 'Certificate of Origin check for job number {jobNumber} completed' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>
                            </>
                        )}

                        {!isCOCheckDataNotExist && <CrossCheckTable
                            title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.title', defaultMessage: 'Certificate of Origin crosscheck information' })}
                            columnHeaders={COCheckData.headers}
                            rowData={COCheckData.rows}
                        />}


                        {!isCOProductDataNotExist && (
                            <ProductCheckTable data={COProductData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.product.title', defaultMessage: 'Crosscheck rules of origin with Certificate of Origin' })} />
                        )}
                    </React.Fragment>
                )
            }
            {
                tabValue === 3 && (
                    <>
                        {isLoading ? (
                            <>
                                <Alert sx={{ my: 3 }} color="warning" variant="filled" icon={<CircularProgress size={15}
                                    sx={{ color: '#fff' }} thickness={7} />}>
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.health-processing', defaultMessage: 'Crosschecking Health Certificate for job number {jobNumber}…' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>

                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                                <Skeleton animation="wave" height={50} />
                            </>
                        ) : isHCNoData ? <></> : (
                            <>
                                <Alert sx={{ my: 3 }} color="success" variant="filled">
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.health-complete', defaultMessage: 'Health Certificate crosscheck for job number {jobNumber} completed' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>
                            </>
                        )}

                        {!isHCNoData && <CrossCheckTable
                            title={intl.formatMessage({ id: 'job-number.detail.crosscheck.health.title', defaultMessage: 'Health Certificate crosscheck information' })}
                            columnHeaders={HCData.headers}
                            rowData={HCData.rows}
                        />}
                    </>
                )
            }
            {
                tabValue === 4 && (
                    <>
                        {isLoading ? (
                            <Alert sx={{ my: 3 }} color="warning" variant="filled" icon={<CircularProgress size={15}
                                sx={{ color: '#fff' }} thickness={7} />}>
                                {intl.formatMessage({ id: 'job-number.edit.process.alert.evfta-processing', defaultMessage: 'Crosschecking EVFTA for job number {jobNumber}…' }, { jobNumber: initialValues.jobNumber })}
                            </Alert>
                        ) : !isEVFTACheckDataExist ? <></> : (
                            <>
                                <Alert sx={{ my: 3 }} color="success" variant="filled">
                                    {intl.formatMessage({ id: 'job-number.edit.process.alert.evfta-complete', defaultMessage: 'EVFTA crosscheck for job number {jobNumber} completed' }, { jobNumber: initialValues.jobNumber })}
                                </Alert>
                            </>
                        )}

                        {isEVFTACheckDataExist && (
                            <>
                                <Stack spacing={1} sx={{ my: 2 }}>
                                    {EVFTACheckData.declaration && <Alert color="info" variant="border" icon={<InfoCircleFilled />}>
                                        {EVFTACheckData.declaration}
                                    </Alert>}

                                    {EVFTACheckData.comments.map((msg: string, index: number) => (
                                        <Alert key={index} severity="warning" variant="outlined">
                                            {msg}
                                        </Alert>
                                    ))}
                                </Stack>

                                <MainCard title={intl.formatMessage({ id: 'job-number.detail.evfta.card.title', defaultMessage: 'REX number validation' })} sx={{
                                    marginTop: 3,
                                }}>

                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit}
                                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                                    >
                                        <TextField
                                            placeholder={intl.formatMessage({ id: 'job-number.detail.evfta.rex.placeholder', defaultMessage: 'Enter REX code' })}
                                            variant="outlined"
                                            sx={{ width: '500px' }}
                                            value={rexCodeData}
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            disabled={!rexCodeData}
                                            type="submit"
                                            loading={isRESLoading}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {intl.formatMessage({ id: 'job-number.detail.evfta.rex.submit', defaultMessage: 'Submit' })}
                                        </Button>
                                    </Box>

                                    {RESCodeStatus && <Typography variant="h6" sx={{ mt: 3 }} color={RESCodeStatus.status === "success" ? 'success' : 'error'} gutterBottom>
                                        {RESCodeStatus.status === "success" ? intl.formatMessage({ id: 'job-number.detail.evfta.rex.valid', defaultMessage: 'Valid REX code' }) : intl.formatMessage({ id: 'job-number.detail.evfta.rex.invalid', defaultMessage: 'Invalid REX code' })}
                                    </Typography>}
                                </MainCard>
                            </>
                        )
                        }
                    </>
                )
            }
        </>
    );
});

export default CertificateProcess;