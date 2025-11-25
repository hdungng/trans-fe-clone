import { Box, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import DynamicField from "../../form/dynamic-fields/DynamicField";
import React from "react";
import { Field, useFormikContext } from "formik";
import { comboBoxCustom } from "data/comboBoxCustom";
import ContextMenu from "../../form/dynamic-fields/ContextMenu";
import { useIntl } from "react-intl";


export interface FormField {
    label: string;
    key: string;
    readOnly?: boolean;
    type: 'text' | 'number' | 'select' | 'date' | 'checkbox' | string;
    options?: Array<{ label: string; value: string | number }>;
}

interface ExtractImportTab1Props {
    generalFormFields1: any;
    method?: string;
    isDefaultPage?: boolean;
}

export const ExtractImportTab1: React.FC<ExtractImportTab1Props> = React.memo(
    ({ generalFormFields1, method, isDefaultPage = false }) => {
        const intl = useIntl();

        const { values, setFieldValue } = useFormikContext<any>();

        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(0, 5)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        {isDefaultPage ?
                            <ContextMenu>
                                <Box component="span" sx={{ display: 'none' }}>
                                    general_info.declaration_processing_department_code
                                </Box>
                                <Box component="span" sx={{ display: 'none' }}>
                                    import
                                </Box>
                                <Box component="span" sx={{ display: 'none' }}>
                                    {intl.formatMessage({ id: 'job-number.extract.import.form.general-info.declaration-processing-department' })}
                                </Box>
                                <Stack spacing={1}>
                                    <InputLabel required htmlFor="job-number.extract.import.form.general-info.declaration-processing-department">
                                        {intl.formatMessage({ id: 'job-number.extract.import.form.general-info.declaration-processing-department' })}
                                    </InputLabel>
                                    <Field name="general_info.declaration_processing_department_code">
                                        {({ field }: any) => (
                                            <TextField
                                                select
                                                fullWidth
                                                id="general_info.declaration_processing_department_code"
                                                {...field}
                                                onChange={(e) => {
                                                    setFieldValue("general_info.declaration_processing_department_code", e.target.value);
                                                }}
                                                variant="outlined"
                                            >
                                                {(comboBoxCustom[values.general_info.customs_agency_code] || []).map((opt: any) => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    </Field>
                                </Stack>
                            </ContextMenu> : <>
                                <Stack spacing={1}>
                                    <InputLabel required htmlFor="job-number.extract.import.form.general-info.declaration-processing-department">
                                        {intl.formatMessage({ id: 'job-number.extract.import.form.general-info.declaration-processing-department' })}
                                    </InputLabel>
                                    <Field name="general_info.declaration_processing_department_code">
                                        {({ field }: any) => (
                                            <TextField
                                                select
                                                fullWidth
                                                id="general_info.declaration_processing_department_code"
                                                {...field}
                                                onChange={(e) => {
                                                    setFieldValue("general_info.declaration_processing_department_code", e.target.value);
                                                }}
                                                variant="outlined"
                                            >
                                                {(comboBoxCustom[values.general_info.customs_agency_code] || []).map((opt: any) => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    </Field>
                                </Stack>
                            </>}
                    </Grid>

                    <DynamicField
                        fields={generalFormFields1.slice(6, 7)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(7, 12)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.consignor-name' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(12, 14)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(14, 24)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.title' })}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                        <Stack sx={{ gap: 1 }}>
                            <FormGroup>
                                {generalFormFields1.slice(24, 26).map((field: any, index: number) => {
                                    
                                    const handleChange = () => {
                                        // Lấy danh sách hai field
                                        const selectedFields = generalFormFields1.slice(24, 26);
                                        // Cập nhật field đang chọn thành true, field còn lại thành false
                                        selectedFields.forEach((f: any) => {
                                            setFieldValue(
                                                `general_info.${f.key}`,
                                                f.key === field.key
                                            );
                                        });
                                    };
                                    return isDefaultPage ? (
                                        <ContextMenu>
                                            <Box component="span" sx={{ display: 'none' }}>
                                                {intl.formatMessage({ id: `job-number.extract.import.form.general-info.${field.key}` })}
                                            </Box>
                                            <Box component="span" className={method} sx={{ display: 'none' }}>
                                                import
                                            </Box>
                                            <Box component="span" sx={{ display: 'none' }}>
                                                {field.label}
                                            </Box>
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={values.general_info[field.key]}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label={intl.formatMessage({ id: `job-number.extract.import.form.general-info.${field.key}` })}
                                            />
                                        </ContextMenu>
                                    ) : (
                                        <>
                                            <Box component="span" sx={{ display: 'none' }}>
                                                {intl.formatMessage({ id: `job-number.extract.import.form.general-info.${field.key}` })}
                                            </Box >
                                            <Box component="span" className={method} sx={{ display: 'none' }}>
                                                import
                                            </Box>
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={values.general_info[field.key]}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label={intl.formatMessage({ id: `job-number.extract.import.form.general-info.${field.key}` })}
                                            />
                                        </>
                                    )
                                }
                                )}
                            </FormGroup>
                        </Stack>
                    </Grid>


                    <Grid size={{ xs: 12 }} >
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.section' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(26, 46)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5"></Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(46, 50)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <DynamicField
                        fields={generalFormFields1.slice(50, 52)}
                        gridSize={{ xs: 12, sm: 12, lg: 12 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <DynamicField
                        fields={generalFormFields1.slice(52, 54)}
                        gridSize={{ xs: 6, sm: 6, lg: 6 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <DynamicField
                        fields={generalFormFields1.slice(54, 59)}
                        gridSize={{ xs: 12, sm: 12, lg: 12 }}
                        isDefaultPage={isDefaultPage}
                    />
                </Grid>
            </Box >
        );
    }
);


export default React.memo(ExtractImportTab1);