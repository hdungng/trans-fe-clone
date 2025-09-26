import { Box, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import DynamicField from "../../form/dynamic-fields/DynamicField";
import React from "react";
import { Field, useFormikContext } from "formik";
import { InputLabel } from "@mui/material";
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
    isDefaultPage?: boolean;
}

export const ExtractImportTab1: React.FC<ExtractImportTab1Props> = React.memo(
    ({ generalFormFields1, isDefaultPage = false }) => {

        const { values, setFieldValue } = useFormikContext<any>();

        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin cơ bản</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(0, 3)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        {isDefaultPage ? <ContextMenu>
                            <Box component="span" sx={{ display: 'none' }}>
                                general_info.declaration_processing_department_code
                            </Box>
                            <Box component="span" sx={{ display: 'none' }}>
                                export
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
                        fields={generalFormFields1.slice(4, 7)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />


                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin đơn vị xuất nhập khẩu</Typography>

                        <Typography variant="h5" sx={{ my: 2 }}>Người xuất khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(7, 12)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Người ủy thác xuất khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(12, 14)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Người nhập khẩu</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(14, 23)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Vận đơn</Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Số vận đơn</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(23, 30)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    {/* Dynamic Start */}
                    {values.general_info.final_delivery_location === "VNZZZ" && (
                        <DynamicField
                            fields={generalFormFields1.slice(30, 31)}
                            gridSize={{ xs: 12, sm: 6, lg: 3 }}
                            isDefaultPage={isDefaultPage}
                        />
                    )
                    }

                    {/* Dynamic End  */}
                    <DynamicField
                        fields={generalFormFields1.slice(31, 32)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    {/* Dynamic Start */}
                    {values.general_info.loading_location_code === "VNZZZ" && (<DynamicField
                        fields={generalFormFields1.slice(32, 33)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />)}

                    {/* Dynamic End  */}

                    <DynamicField
                        fields={generalFormFields1.slice(33, 40)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />


                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Chứng từ kèm theo</Typography>
                    </Grid>

                    <DynamicField
                        fields={generalFormFields1.slice(40, 42)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(42, 44)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(44, 46)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(46, 48)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(48, 50)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin hóa đơn</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(50, 61)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thuế và bảo lãnh</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(61, 73)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin đính kèm</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(73, 75)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(75, 77)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(77, 79)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin vận chuyển</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(79, 91)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Thông tin khác</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields1.slice(91, 93)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                </Grid>
            </Box >
        );
    }
);


export default React.memo(ExtractImportTab1);