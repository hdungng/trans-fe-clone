import React, { forwardRef, MouseEvent, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import {
    Tabs,
    Tab,
    CircularProgress,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Tooltip,
} from '@mui/material';
import * as yup from 'yup';
import { Field, Formik, FormikProps } from 'formik';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ExtractResponse, ImportExtractResponse, GeneralFormProps, ImportProduct } from 'types/pages/form-field';
import { initialImportFormFactory } from '../formik/ImportExtractFormik';
import { Button } from '@mui/material';
import { generalFormFieldsControl1Import, generalFormFieldsControl2Import, markAllFieldsTouched, validationFormImport } from 'types/extract-form-field/extract-import-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateExtract, uploadEcus } from 'api/job-number';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { getAllErrorMessages, extractMessagesFromErrors } from 'utils/validator';
import ExtractImportTab1 from '../../tabs/import/ExtractImportTab1';
import ExtractImportTab2 from '../../tabs/import/ExtractImportTab2';
import { ColumnDef } from '@tanstack/react-table';
import { CrossCheckTableDataProps } from 'types/table';
import { IconButton } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProductEditFormDialog from './ProductEditForm';
import AlertDelete from 'components/common/AlertDelete';
import { createExtractProduct, deleteExtractProduct, getExtractProductDetail, getExtractProducts, updateExtractProduct } from 'api/extract_product';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { APIResponse } from 'types/response';
import DynamicTable from 'components/common/DynamicTable';
import { Box } from '@mui/material';
import { useIntl } from 'react-intl';


const JobFormImport = forwardRef(({ initialFormValues, setInitialFormData, jobNumberId, initStepData, setIsECUSLoading }: GeneralFormProps, ref) => {


    const validationSchema = validationFormImport(yup);
    const generalFormFields1 = generalFormFieldsControl1Import;
    const generalFormFields2 = generalFormFieldsControl2Import;

    const [tabValue, setTabValue] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const [productDeleteId, setProductDeleteId] = useState<any>('');
    const [productUpdateId, setProductUpdateId] = useState<any>('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ImportProduct | undefined>(undefined);
    const [productData, setProductData] = useState<ImportProduct[]>([]);

    const intl = useIntl();

    const columns = useMemo<ColumnDef<CrossCheckTableDataProps>[]>(() => [
        {
            id: 'id',
            header: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index', defaultMessage: 'No.' }),
            cell: ({ row }) => row.index + 1,
        },
        {
            id: 'item_code',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.item-code', defaultMessage: 'Item code' }),
            cell: ({ row }) => row.original.item_code,
            accessorKey: 'item_code'
        },
        {
            id: 'item_name',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.item-name', defaultMessage: 'Item name' }),
            cell: ({ row }) => row.original.item_name,
            accessorKey: 'item_name',
            minSize: 740,
        },
        {
            id: 'hs_code',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.hs-code', defaultMessage: 'HS code' }),
            cell: ({ row }) => row.original.hs_code,
            accessorKey: 'hs_code',
        },
        {
            id: 'quantity',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.quantity', defaultMessage: 'Quantity' }),
            cell: ({ row }) => row.original.quantity,
            accessorKey: 'quantity',
        },
        {
            id: 'country_of_origin_code',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.country-of-origin', defaultMessage: 'Country of origin code' }),
            cell: ({ row }) => `${row.original.country_of_origin_code || ''} - ${getLabelByCode(comboBoxData[5].data, row.original.country_of_origin_code || '')}`,
            accessorKey: 'country_of_origin_code',

        },
        {
            id: 'quantity_unit',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.quantity-unit', defaultMessage: 'Quantity unit' }),
            cell: ({ row }) => `${row.original.quantity_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.quantity_unit || '')}`,
            accessorKey: 'quantity_unit',
        },
        {
            id: 'secondary_quantity',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.secondary-quantity', defaultMessage: 'Secondary quantity' }),
            cell: ({ row }) => row.original.secondary_quantity,
            accessorKey: 'secondary_quantity',
        },
        {
            id: 'secondary_quantity_unit',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.secondary-quantity-unit', defaultMessage: 'Secondary quantity unit' }),
            cell: ({ row }) => `${row.original.secondary_quantity_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.secondary_quantity_unit || '')}`,
            accessorKey: 'secondary_quantity_unit',
        },
        {
            id: 'invoice_unit_price',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-unit-price', defaultMessage: 'Invoice unit price' }),
            cell: ({ row }) => row.original.invoice_unit_price,
            accessorKey: 'invoice_unit_price',
        },
        {
            id: 'unit_price_currency_code',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.unit-price-currency', defaultMessage: 'Unit price currency' }),
            cell: ({ row }) => `${row.original.unit_price_currency_code || ''} - ${getLabelByCode(comboBoxData[18].data, row.original.unit_price_currency_code || '')}`,
            accessorKey: 'unit_price_currency_code',

        },
        {
            id: 'invoice_unit_price_unit',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-unit-price-unit', defaultMessage: 'Invoice unit price unit' }),
            cell: ({ row }) => `${row.original.invoice_unit_price_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.invoice_unit_price_unit || '')}`,
            accessorKey: 'invoice_unit_price_unit',

        },
        {
            id: 'invoice_value',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-value', defaultMessage: 'Invoice value' }),
            cell: ({ row }) => row.original.invoice_value,
            accessorKey: 'invoice_value',

        },
        {
            id: 'taxable_value',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.taxable-value', defaultMessage: 'Taxable value' }),
            cell: ({ row }) => row.original.taxable_value,
            accessorKey: 'taxable_value',

        },
        {
            id: 'taxable_value_currency_code',
            header: intl.formatMessage({ id: 'job-number.detail.products.column.taxable-value-currency', defaultMessage: 'Taxable value currency' }),
            cell: ({ row }) => `${row.original.taxable_value_currency_code || ''} - ${getLabelByCode(comboBoxData[18].data, row.original.taxable_value_currency_code || '')}`,
            accessorKey: 'taxable_value_currency_code',
        },
        {
            header: intl.formatMessage({ id: 'job-number.extract.products.column.actions', defaultMessage: 'Actions' }),
            disableSortBy: true,
            cell: ({ row }) => {
                return (
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title={intl.formatMessage({ id: 'job-number.detail.action.edit', defaultMessage: 'Edit' })}>
                            <IconButton
                                color="primary"
                                onClick={(e) => handleIconClick(e, row.original.id)}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={intl.formatMessage({ id: 'job-number.detail.action.delete', defaultMessage: 'Delete' })}>
                            <IconButton
                                color="error"
                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    setDeleteOpen(true);
                                    setProductDeleteId(row.original.id);
                                }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
            }
        }
    ], [intl]);


    const handleIconClick = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.stopPropagation();
        setProductUpdateId(id);

        try {
            const detail = await getExtractProductDetail(jobNumberId, initStepData.method, id);

            if (detail.status === 'success') {
                handleEditClick(detail.data);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };


    const formikValues = initialImportFormFactory(initialFormValues as ImportExtractResponse, validationSchema, setInitialFormData)


    let productDelete: any = Array.isArray(productData) ? productData.find((c: any) => c.id === productDeleteId) : {};


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const formikRef = useRef<FormikProps<any>>(null);

    const tempoSave = async () => {
        const formik = formikRef.current;
        if (!formik) return;

        // Lấy values hiện tại mà KHÔNG chạy validate
        const values = formik.values as ExtractResponse;

        const response: APIResponse = await updateExtract(jobNumberId, initStepData.method, values);

        if (response.status === 'success') {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: { color: 'success' },
                message: intl.formatMessage({ id: 'job-number.extract.form.notification.save-success', defaultMessage: 'Extraction information saved successfully' }),
                close: true
            } as SnackbarProps);

        } else {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: { color: 'error' },
                message: intl.formatMessage({ id: 'job-number.extract.form.notification.save-error', defaultMessage: 'Failed to save extraction information' }),
                close: true
            } as SnackbarProps);
        };

        setInitialFormData(values);
    }

    const handleSubmit = async (values: ExtractResponse) => {
        const response: APIResponse = await updateExtract(jobNumberId, initStepData.method, values);

        setIsECUSLoading(true);

        try {

            if (response.status === "success") {
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'info'
                    },
                    message: (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CircularProgress size={15} sx={{ color: '#fff' }} thickness={7} />
                            <span>{intl.formatMessage({ id: 'job-number.extract.form.notification.uploading', defaultMessage: 'Sending data entry request to the server...' })}</span>
                        </Stack>
                    ),
                    autoHideDuration: 30000,
                    close: true
                } as SnackbarProps);

                await uploadEcus(jobNumberId);

            } else if (response.status === "error") {
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message: (
                        <>
                            {extractMessagesFromErrors(response.data.errors).split('<br>').map((line, index) => (
                                <div key={index}>- {line}</div>
                            ))}
                        </>
                    ),
                    close: true
                } as SnackbarProps);
            }
            setIsECUSLoading(false);

        } catch {
            setIsECUSLoading(false);
        }

        setInitialFormData(values);
    };

    const handleSubmitEditing = async (data: any, { setErrors }: any) => {
        // TODOS
        try {
            if (editingProduct) {
                const response: APIResponse = await updateExtractProduct(jobNumberId, productUpdateId, initStepData.method, data);

                if (response.status === "success") {
                    fetchData();
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'job-number.extract.products.notification.update-success', defaultMessage: 'Product updated successfully' }),
                        close: true
                    } as SnackbarProps);
                    setDialogOpen(false);


                } else if (response.status === "error") {
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        message: extractMessagesFromErrors(response.data.errors),
                        close: true
                    } as SnackbarProps);
                }

            } else {
                // setUsers([...users, data]);
                const response: APIResponse = await createExtractProduct(jobNumberId, initStepData.method, data);

                if (response.status === "success") {
                    fetchData();
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'job-number.extract.products.notification.create-success', defaultMessage: 'Product created successfully' }),
                        close: true
                    } as SnackbarProps);
                    setDialogOpen(false);

                } else if (response.status === "error") {
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        message: editingProduct
                            ? intl.formatMessage({ id: 'job-number.extract.products.notification.update-error', defaultMessage: 'Failed to update product' })
                            : intl.formatMessage({ id: 'job-number.extract.products.notification.create-error', defaultMessage: 'Failed to create product' }),
                        close: true
                    } as SnackbarProps);


                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    }
                }

            }
        } catch (error) {
            console.log(error);

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: editingProduct
                    ? intl.formatMessage({ id: 'job-number.extract.products.notification.update-error', defaultMessage: 'Failed to update product' })
                    : intl.formatMessage({ id: 'job-number.extract.products.notification.create-error', defaultMessage: 'Failed to create product' }),
                close: true
            } as SnackbarProps);
        }
    }

    const deleteProductCallback = async () => {
        try {
            const response: APIResponse = await deleteExtractProduct(jobNumberId, initStepData.method, productDeleteId);
            if (response.status === "success") {
                fetchData();
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'job-number.extract.products.notification.delete-success', defaultMessage: 'Product deleted successfully' }),
                    close: true
                } as SnackbarProps);
                setDeleteOpen(false);
            } else if (response.status === "error") {

                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message: extractMessagesFromErrors(response.data.errors),
                    close: true
                } as SnackbarProps);
            }
        } catch (error) {
            console.log(error);

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: intl.formatMessage({ id: 'job-number.extract.products.notification.delete-error', defaultMessage: 'Failed to delete product' }),
                close: true
            } as SnackbarProps);
            setDeleteOpen(false);
        }
    }

    const fetchData = async () => {
        const usersResponse: APIResponse = await getExtractProducts(jobNumberId, initStepData.method);

        if (usersResponse.status === 'success')
            setProductData(usersResponse.data);
        else
            setProductData([]);
    }


    useEffect(() => {
        fetchData();
    }, [])


    const handleAddClick = () => {
        setEditingProduct(undefined);
        setDialogOpen(true);
    }

    const handleEditClick = (product: ImportProduct) => {
        setEditingProduct(product);
        setDialogOpen(true);
    };

    // Expose submitForm cho component cha
    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            const formik = formikRef.current;

            if (!formik) return false;

            formik.setTouched(markAllFieldsTouched(formik.initialValues), true);

            const errors = await formik.validateForm();

            if (Object.keys(errors).length === 0) {
                await formik.submitForm();
                return true;
            }

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: (
                    <>
                        {getAllErrorMessages(errors).split('<br>').map((line, index) => (
                            <div key={index}>- {line}</div>
                        ))}
                    </>
                ),
                autoHideDuration: 30000,
                close: true
            } as SnackbarProps);

            return false;
        },
    }));

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Formik initialValues={formikValues.initialValues} onSubmit={handleSubmit} validationSchema={formikValues.validationSchema} innerRef={formikRef}>
                {
                    ({ values, setFieldValue }) => (
                        <>
                            <Grid size={12}>
                                <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
                                    {intl.formatMessage({ id: 'job-number.extract.form.title', defaultMessage: 'Enter extraction information' })}
                                </Typography>
                            </Grid>

                            <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 5 }}>
                                <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-1', defaultMessage: 'General information 1' })} value={1} />
                                <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-2', defaultMessage: 'General information 2' })} value={2} />
                                <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.products', defaultMessage: 'Product list' })} value={3} />
                            </Tabs>
                            {/* 1 */}
                            {tabValue === 1 && (
                                <ExtractImportTab1 generalFormFields1={generalFormFields1} />
                            )}
                            {tabValue === 2 && (
                                <ExtractImportTab2 generalFormFields2={generalFormFields2} />
                            )}
                            {tabValue === 3 && (
                                <React.Fragment>
                                    <Grid size={{ xs: 12, sm: 12, lg: 12 }} sx={{ marginBottom: 5 }}>
                                        <Stack sx={{ gap: 1 }}>
                                            <FormGroup>
                                                <Box component="span" sx={{ display: 'none' }}>
                                                    item_code_option
                                                </Box>
                                                <Field name="item_code_option">
                                                    {({ field }: any) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    {...field}
                                                                    checked={field.value}
                                                                    onChange={() => setFieldValue('item_code_option', !field.value)}
                                                                />
                                                            }
                                                            label={intl.formatMessage({ id: 'job-number.extract.form.option.item-code', defaultMessage: 'Optional item code input' })}
                                                        />
                                                    )}
                                                </Field>
                                            </FormGroup>
                                        </Stack>
                                    </Grid>

                                    <Grid size={12}>
                                        <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
                                            {intl.formatMessage({ id: 'job-number.extract.products.section.title', defaultMessage: 'Product list' })}
                                        </Typography>
                                    </Grid>

                                    <DynamicTable
                                        {...{
                                            data: productData,
                                            columns: columns,
                                            modalToggler: () => {
                                                handleAddClick();
                                            },
                                            filename: intl.formatMessage({ id: 'job-number.extract.products.export.filename', defaultMessage: 'product_list' }),
                                        }}
                                    >
                                    </DynamicTable>

                                    <ProductEditFormDialog
                                        open={dialogOpen}
                                        onClose={() => setDialogOpen(false)}
                                        onSubmit={handleSubmitEditing}
                                        initialData={editingProduct}
                                        initStepData={initStepData}
                                        isEdit={!!editingProduct}
                                    />
                                    <AlertDelete title={productDelete?.item_name || "-"} alertMethod={deleteProductCallback} open={deleteOpen} handleClose={() => setDeleteOpen(false)} />

                                </React.Fragment>
                            )}


                        </>
                    )
                }
            </Formik>
            <Stack direction="row" spacing={1} justifyContent="end" alignItems="center" sx={{ my: 3 }}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={tempoSave}
                >
                    {intl.formatMessage({ id: 'job-number.extract.form.save', defaultMessage: 'Save' })}
                </Button>
            </Stack>
        </LocalizationProvider >
    )
});



export default JobFormImport;