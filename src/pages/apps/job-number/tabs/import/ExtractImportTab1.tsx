import { Box, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import DynamicField from "../../form/dynamic-fields/DynamicField";
import React from "react";
import { Field, useFormikContext } from "formik";
import { comboBoxCustom } from "data/comboBoxCustom";
import ContextMenu from "../../form/dynamic-fields/ContextMenu";


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

        const { values, setFieldValue } = useFormikContext<any>();

        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin cơ bản</Typography>
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
                                    Mã bộ phận xử lý tờ khai
                                </Box>
                                <Stack spacing={1}>
                                    <InputLabel required htmlFor="general_info.declaration_processing_department_code">
                                        Mã bộ phận xử lý tờ khai
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
                                    <InputLabel required htmlFor="general_info.declaration_processing_department_code">
                                        Mã bộ phận xử lý tờ khai
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
                        <Typography variant="h5">Thông tin đơn vị xuất nhập khẩu</Typography>

                        <Typography variant="h5" sx={{ my: 2 }}>Người nhập khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(7, 12)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Người ủy thác nhập khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(12, 14)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Người xuất khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(14, 24)}
                        isDefaultPage={isDefaultPage}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Vận đơn</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
                        <Stack sx={{ gap: 1 }}>
                            <FormGroup>
                                {generalFormFields1.slice(24, 26).map((field: any, index: number) => (
                                    isDefaultPage ? (<ContextMenu>
                                        <Box component="span" sx={{ display: 'none' }}>
                                            {`general_info.${field.key}`}
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
                                                    onChange={() => setFieldValue(`general_info.${field.key}`, !values.general_info[field.key])}
                                                />
                                            }
                                            label={field.label}
                                        />
                                    </ContextMenu>) : (
                                        <>
                                            <Box component="span" sx={{ display: 'none' }}>
                                                {`general_info.${field.key}`}
                                            </Box >
                                            <Box component="span" className={method} sx={{ display: 'none' }}>
                                                import
                                            </Box>
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={values.general_info[field.key]}
                                                        onChange={() => setFieldValue(`general_info.${field.key}`, !values.general_info[field.key])}
                                                    />
                                                }
                                                label={field.label}
                                            />
                                        </>
                                    )
                                ))}
                            </FormGroup>
                        </Stack>
                    </Grid>


                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Số vận đơn</Typography>
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