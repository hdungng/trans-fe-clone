import React, { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { ExportProduct } from 'types/pages/form-field';
import { Typography } from '@mui/material';
import { productFormFieldsControlExport } from 'types/extract-form-field/extract-export-form';
import DynamicField from '../dynamic-fields/DynamicField';
import { CloseOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { InitForm } from 'types/pages/job-number';
import { getListItemCodeExport } from 'api/item-code';


const SyncQuantity: React.FC = () => {
    // Lấy formik context
    const { values, setFieldValue } = useFormikContext<ExportProduct>();

    useEffect(() => {
        if (values.invoice_value && values.quantity && values.secondary_quantity !== values.quantity) {
            setFieldValue('secondary_quantity', values.quantity, false);
            setFieldValue('invoice_unit_price', (values.invoice_value / values.quantity).toFixed(2))
        }
    }, [values.quantity, values.secondary_quantity, setFieldValue]);

    useEffect(() => {
        if (values.secondary_quantity_unit !== values.quantity_unit) {
            setFieldValue('secondary_quantity_unit', values.quantity_unit, false);
        }
    }, [values.quantity_unit, values.secondary_quantity_unit, setFieldValue]);

    useEffect(() => {
        if (values.taxable_value && values.invoice_value && values.quantity && values.taxable_value !== values.invoice_value) {
            setFieldValue('taxable_value', values.invoice_value, false);
            setFieldValue('invoice_unit_price', (values.invoice_value / values.quantity).toFixed(2))
        }
    }, [values.invoice_value, values.taxable_value, setFieldValue]);

    // Không hiển thị gì cả
    return null;
};

const createValidationSchema = (intl: ReturnType<typeof useIntl>) =>
    Yup.object({
        item_code: Yup.string().nullable(),
        item_name: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.item-name', defaultMessage: 'Item name is required' })),
        hs_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.hs-code', defaultMessage: 'HS code is required' })),
        quantity: Yup.number().required(intl.formatMessage({ id: 'job-number.extract.product.validation.quantity', defaultMessage: 'Quantity is required' })),
        country_of_origin_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.country-of-origin', defaultMessage: 'Country of origin code is required' })),
        quantity_unit: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.quantity-unit', defaultMessage: 'Quantity unit is required' })),
        secondary_quantity: Yup.number().nullable(),
        secondary_quantity_unit: Yup.string().nullable(),
        invoice_unit_price: Yup.number().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-unit-price', defaultMessage: 'Invoice unit price is required' })),
        unit_price_currency_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.unit-price-currency', defaultMessage: 'Unit price currency is required' })),
        invoice_unit_price_unit: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-unit-price-unit', defaultMessage: 'Invoice unit price unit is required' })),
        invoice_value: Yup.number().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-value', defaultMessage: 'Invoice value is required' })),
        taxable_value: Yup.number().nullable(),
        taxable_value_currency_code: Yup.string().nullable(),
        export_import_ratio: Yup.number().nullable(),
        absolute_tax_rate: Yup.number().nullable(),
        absolute_tax_rate_unit: Yup.string().nullable(),
        absolute_tax_currency_code: Yup.string().nullable(),
        export_import_tax_amount: Yup.number().nullable(),
        export_tax_exemption_reduction_code: Yup.string().nullable(),
        export_tax_reduction_amount: Yup.number().nullable(),
        item_sequence_on_temporary_import_export_declaration: Yup.number().nullable(),
        export_tax_exemption_list_registration_number: Yup.string().nullable(),
        corresponding_line_in_export_tax_exemption_list: Yup.number().nullable(),
        legal_document_code_1: Yup.string().nullable(),
        legal_document_code_2: Yup.string().nullable(),
        legal_document_code_3: Yup.string().nullable(),
        legal_document_code_4: Yup.string().nullable(),
        legal_document_code_5: Yup.string().nullable(),
        size_number: Yup.string().nullable(),
        po_number: Yup.string().nullable(),
        private_management_code: Yup.string().nullable(),
    });

interface ProductEditFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ExportProduct, helpers: FormikHelpers<ExportProduct>) => void;
    initialData?: ExportProduct;
    initStepData?: InitForm;
    isEdit?: boolean;
}

const ProductEditFormDialog: React.FC<ProductEditFormProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    initStepData,
    isEdit = false,
}) => {
    const defaultValues: ExportProduct = initialData ? initialData : {} as ExportProduct;

    const intl = useIntl();
    const validationSchema = useMemo(() => createValidationSchema(intl), [intl]);
    const [itemCodeData, setItemCodeData] = useState<any>([]);
    
        const fetchData = async () => {
            const response: any = await getListItemCodeExport(initStepData?.taxCode ?? '');;
            const normalized = response.data.map((item: { id: number; item_code: string }) => ({
                code: item.item_code,
            }));
            console.log("normal", normalized)
            if (response.status === 'success') {
                setItemCodeData(normalized);
                console.log("itemCodeData", itemCodeData)
            } else {
                setItemCodeData([]);
            }
        }
        useEffect(() => {
            fetchData();
        }, []);
    
        useEffect(() => {
            productFormFieldsControlExport[0].options = itemCodeData;
        }, [itemCodeData]);
    

    
    return (
        <Dialog open={open} onClose={onClose} scroll={'paper'} maxWidth='xl'>
            <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderBottom: '1px solid {theme.palette.divider}' }}
            >
                <Grid>
                    <DialogTitle>
                        {isEdit
                            ? intl.formatMessage({ id: 'job-number.extract.products.dialog.title.edit', defaultMessage: 'Update product' })
                            : intl.formatMessage({ id: 'job-number.extract.products.dialog.title.create', defaultMessage: 'Add product' })}
                    </DialogTitle>
                </Grid>
                <Grid sx={{ mr: 1.5 }}>
                    <IconButton color="secondary" onClick={onClose}>
                        <CloseOutlined />
                    </IconButton>
                </Grid>
            </Grid>
            <DialogContent dividers>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange
                    onSubmit={(values, actions) => {
                        onSubmit(values, actions);
                    }}
                    enableReinitialize
                    context={{ isEdit }}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(0, 3)}
                                    gridSize={{ xs: 12, sm: 6, lg: 6 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.quantity', defaultMessage: 'Quantity & units' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(3, 8)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.unit-price', defaultMessage: 'Unit price & currency' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(8, 14)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.tax', defaultMessage: 'Export/import taxes' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(14, 21)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.temp-import-export', defaultMessage: 'Temporary import/export declaration' })}
                                    </Typography>
                                </Grid>
                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(21, 24)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.legal', defaultMessage: 'Related legal documents' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(24, 29)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />


                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.export.products.section.additional', defaultMessage: 'Additional information' })}
                                    </Typography>
                                </Grid>
                                <DynamicField
                                    fields={productFormFieldsControlExport.slice(29, 31)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                            </Grid>

                            <SyncQuantity />
                            <DialogActions sx={{ marginTop: 5 }}>
                                <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel', defaultMessage: 'Cancel' })}</Button>
                                <Button type="submit" variant="contained">
                                    {isEdit
                                        ? intl.formatMessage({ id: 'job-number.extract.products.dialog.submit.edit', defaultMessage: 'Update' })
                                        : intl.formatMessage({ id: 'job-number.extract.products.dialog.submit.create', defaultMessage: 'Create' })}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ProductEditFormDialog;