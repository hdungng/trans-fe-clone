import React, { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import { ImportProduct } from 'types/pages/form-field';
import { Typography } from '@mui/material';
import { productFormFieldsControlImport } from 'types/extract-form-field/extract-import-form';
import DynamicField from '../dynamic-fields/DynamicField';
import { CloseOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { InitForm } from 'types/pages/job-number';
import { getListItemCodeImport } from 'api/item-code';


const createValidationSchema = (intl: ReturnType<typeof useIntl>) =>
    Yup.object({
        item_code: Yup.string().nullable(),
        item_name: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.item-name', defaultMessage: 'Item name is required' })),
        hs_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.hs-code', defaultMessage: 'HS code is required' })),
        country_of_origin_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.country-of-origin', defaultMessage: 'Country of origin code is required' })),
        quantity: Yup.number().required(intl.formatMessage({ id: 'job-number.extract.product.validation.quantity', defaultMessage: 'Quantity is required' })),
        quantity_unit: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.quantity-unit', defaultMessage: 'Quantity unit is required' })),
        secondary_quantity: Yup.number().nullable(),
        secondary_quantity_unit: Yup.string().nullable(),
        invoice_unit_price: Yup.number().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-unit-price', defaultMessage: 'Invoice unit price is required' })),
        unit_price_currency_code: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.unit-price-currency', defaultMessage: 'Unit price currency is required' })),
        invoice_unit_price_unit: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-unit-price-unit', defaultMessage: 'Invoice unit price unit is required' })),
        invoice_value: Yup.string().required(intl.formatMessage({ id: 'job-number.extract.product.validation.invoice-value', defaultMessage: 'Invoice value is required' })),
        taxable_value: Yup.string().nullable(),
        taxable_value_currency_code: Yup.string().nullable(),
        import_tariff_code: Yup.string().nullable(),
        import_tax_rate: Yup.number().nullable(),
        import_tax_amount: Yup.number().nullable(),
        special_consumption_tax_code_1: Yup.string().nullable(),
        special_consumption_tax_exemption_reduction_code_1: Yup.string().nullable(),
        special_consumption_tax_reduction_amount_1: Yup.number().nullable(),
        environmental_tax_code_2: Yup.string().nullable(),
        environmental_tax_exemption_reduction_code_2: Yup.string().nullable(),
        environmental_tax_reduction_amount_2: Yup.number().nullable(),
        vat_tax_code_3: Yup.string().nullable(),
        vat_tax_exemption_reduction_code_3: Yup.string().nullable(),
        vat_tax_reduction_amount_3: Yup.number().nullable(),
        tax_rate_code_4: Yup.string().nullable(),
        tax_exemption_reduction_code_4: Yup.string().nullable(),
        tax_reduction_amount_4: Yup.number().nullable(),
        tax_rate_code_5: Yup.string().nullable(),
        tax_exemption_reduction_code_5: Yup.string().nullable(),
        tax_reduction_amount_5: Yup.number().nullable(),
        absolute_tax_rate: Yup.number().nullable(),
        absolute_tax_rate_unit: Yup.string().nullable(),
        absolute_tax_currency_code: Yup.string().nullable(),
        absolute_tax_application_code: Yup.string().nullable(),
        non_quota_code: Yup.string().nullable(),
        adjustment_item_sequence_1: Yup.string().nullable(),
        adjustment_item_sequence_2: Yup.string().nullable(),
        adjustment_item_sequence_3: Yup.string().nullable(),
        adjustment_item_sequence_4: Yup.string().nullable(),
        adjustment_item_sequence_5: Yup.string().nullable(),
        item_sequence_on_temporary_import_export_declaration: Yup.string().nullable(),
        import_tax_exemption_list_registration_number: Yup.string().nullable(),
        corresponding_line_in_exemption_list: Yup.string().nullable(),
        import_tax_exemption_reduction_code: Yup.string().nullable(),
        import_tax_reduction_amount: Yup.number().nullable(),
        private_management_code: Yup.string().nullable(),
    });

interface ProductEditFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ImportProduct, helpers: FormikHelpers<ImportProduct>) => void;
    initialData?: ImportProduct;
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
    const defaultValues: ImportProduct = initialData ? initialData : {} as ImportProduct;
    const intl = useIntl();
    const validationSchema = useMemo(() => createValidationSchema(intl), [intl]);
    const [itemCodeData, setItemCodeData] = useState<any>([]);

    const fetchData = async () => {
        const response: any = await getListItemCodeImport(initStepData?.taxCode ?? '');;
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
        productFormFieldsControlImport[0].options = itemCodeData;
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
                                    fields={productFormFieldsControlImport.slice(0, 2)}
                                    gridSize={{ xs: 12, sm: 6, lg: 6 }}
                                />

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(2, 5)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.quantity', defaultMessage: 'Quantity & unit price' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(5, 14)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />


                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.import-tax', defaultMessage: 'Import taxes' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(14, 17)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.other-tax', defaultMessage: 'Other taxes & exemptions' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(17, 20)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(20, 23)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(23, 26)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(26, 29)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(29, 32)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.absolute-tax', defaultMessage: 'Absolute tax & quota' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(32, 37)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />

                                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                    <Typography variant="h5">
                                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.adjustment', defaultMessage: 'Adjustments & temporary import/export' })}
                                    </Typography>
                                </Grid>

                                <DynamicField
                                    fields={productFormFieldsControlImport.slice(37, 44)}
                                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                                />
                            </Grid>
                            <DialogActions>
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