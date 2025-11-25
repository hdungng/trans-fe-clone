import React from 'react';
import Grid from '@mui/material/Grid';
import { FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import DynamicField from 'pages/apps/job-number/form/dynamic-fields/DynamicField';
import { Box } from '@mui/material';
import { defaultProductFormFieldsControlImport } from 'types/extract-form-field/default-product-form';
import { Field, useFormikContext } from 'formik';
import { Checkbox } from '@mui/material';
import ContextMenu from 'pages/apps/job-number/form/dynamic-fields/ContextMenu';
import { useIntl } from 'react-intl';


const ImportProductDefault: React.FC = () => {
    const { setFieldValue } = useFormikContext();
    const intl = useIntl();

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid>
                    <Typography variant="h5">
                        {intl.formatMessage({
                            id: 'default-setting.product.update-default-parameters',
                            defaultMessage: 'Update default product parameters'
                        })}
                    </Typography>
                </Grid>


                <Grid size={{ xs: 12, sm: 12, lg: 12 }} sx={{ mb: 3 }}>
                    <ContextMenu>
                        <Box component="span" sx={{ display: 'none' }}>
                            item_code_option
                        </Box>
                        <Box component="span" sx={{ display: 'none' }}>
                            import
                        </Box>
                        <Box component="span" sx={{ display: 'none' }}>
                            {intl.formatMessage({ id: 'job-number.extract.form.option.item-code', defaultMessage: 'Optional item code input' })}
                        </Box>
                        <Stack sx={{ gap: 1 }}>
                            <FormGroup>
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
                    </ContextMenu>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(0, 2)}
                    gridSize={{ xs: 12, sm: 6, lg: 6 }}
                    isDefaultPage={true}
                />

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(2, 5)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />

                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                    <Typography variant="h5">
                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.quantity', defaultMessage: 'Quantity & unit price' })}
                    </Typography>
                </Grid>

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(5, 14)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />


                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                    <Typography variant="h5">
                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.import-tax', defaultMessage: 'Import taxes' })}
                    </Typography>
                </Grid>

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(14, 17)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />

                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                    <Typography variant="h5">
                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.other-tax', defaultMessage: 'Other taxes & exemptions' })}
                    </Typography>
                </Grid>

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(17, 20)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />

                {/* <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}></Grid> */}

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(20, 23)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />
                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(23, 26)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />
                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(26, 29)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />
                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(29, 32)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />
                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                    <Typography variant="h5">
                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.absolute-tax', defaultMessage: 'Absolute tax & quota' })}
                    </Typography>
                </Grid>

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(32, 37)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />

                <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                    <Typography variant="h5">
                        {intl.formatMessage({ id: 'job-number.extract.import.products.section.adjustment', defaultMessage: 'Adjustments & temporary import/export' })}
                    </Typography>
                </Grid>

                <DynamicField
                    fields={defaultProductFormFieldsControlImport.slice(37, 44)}
                    gridSize={{ xs: 12, sm: 6, lg: 4 }}
                    isDefaultPage={true}
                />
            </Grid>
        </Box >
    );
};

export default ImportProductDefault;
