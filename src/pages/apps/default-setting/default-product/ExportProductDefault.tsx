import React from 'react';
import Grid from '@mui/material/Grid';
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import DynamicField from 'pages/apps/job-number/form/dynamic-fields/DynamicField';
import { Box } from '@mui/material';
import { defaultProductFormFieldsControlExport } from 'types/extract-form-field/default-product-form';
import { Field, useFormikContext } from 'formik';
import ContextMenu from 'pages/apps/job-number/form/dynamic-fields/ContextMenu';
import { useIntl } from 'react-intl';


const ExportProductDefault: React.FC = () => {
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

                <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                    <ContextMenu>
                        <Box component="span" sx={{ display: 'none' }}>
                            item_code_option
                        </Box>
                        <Box component="span" sx={{ display: 'none' }}>
                            export
                        </Box>
                        <Box component="span" sx={{ display: 'none' }}>
                            {intl.formatMessage({
                                id: 'default-setting.product.item-code-option-label',
                                defaultMessage: 'Item code entry option'
                            })}
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
                                            label={intl.formatMessage({
                                                id: 'default-setting.product.item-code-option-label',
                                                defaultMessage: 'Item code entry option'
                                            })}
                                        />
                                    )}
                                </Field>
                            </FormGroup>
                        </Stack>
                    </ContextMenu>
                </Grid>
                <Grid container spacing={3}>
                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(0, 3)}
                        gridSize={{ xs: 12, sm: 6, lg: 6 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.quantity-section',
                                defaultMessage: 'Quantity and units'
                            })}
                        </Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(3, 8)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.unit-price-section',
                                defaultMessage: 'Unit price and currency'
                            })}
                        </Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(8, 14)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.tax-section',
                                defaultMessage: 'Export/import taxes'
                            })}
                        </Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(14, 21)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.temporary-declaration-section',
                                defaultMessage: 'Temporary import/export declaration'
                            })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(21, 24)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.legal-section',
                                defaultMessage: 'Related legal documents'
                            })}
                        </Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(24, 29)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />


                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({
                                id: 'default-setting.product.export.additional-info-section',
                                defaultMessage: 'Additional information'
                            })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(29, 31)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExportProductDefault;
