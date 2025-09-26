import React from 'react';
import Grid from '@mui/material/Grid';
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import DynamicField from 'pages/apps/job-number/form/dynamic-fields/DynamicField';
import { Box } from '@mui/material';
import { defaultProductFormFieldsControlExport } from 'types/extract-form-field/default-product-form';
import { Field, useFormikContext } from 'formik';
import ContextMenu from 'pages/apps/job-number/form/dynamic-fields/ContextMenu';


const ExportProductDefault: React.FC = () => {
    const { setFieldValue } = useFormikContext();

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid>
                    <Typography variant="h5">Cập nhật thông số mặc định sản phẩm</Typography>
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
                            Tùy chọn nhập mã hàng
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
                                            label="Tùy chọn nhập mã hàng"
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
                        <Typography variant="h5">Số lượng và đơn vị</Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(3, 8)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">Đơn giá và tiền tệ</Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(8, 14)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">Thuế xuất nhập khẩu</Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(14, 21)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">Tờ khai tạm nhập/tái xuất</Typography>
                    </Grid>
                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(21, 24)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />

                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">Pháp lý liên quan</Typography>
                    </Grid>

                    <DynamicField
                        fields={defaultProductFormFieldsControlExport.slice(24, 29)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={true}
                    />


                    <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                        <Typography variant="h5">Thông tin bổ sung</Typography>
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
