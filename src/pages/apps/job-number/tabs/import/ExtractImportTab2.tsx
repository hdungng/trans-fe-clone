import { Box, Grid, Typography } from "@mui/material";
import DynamicField from "../../form/dynamic-fields/DynamicField";
import React from "react";
import DeclarationTypeSyncOnCode7 from "../../form/dynamic-fields/handlers/DeclarationTypeSyncOnCode7";
import { useIntl } from "react-intl";


interface ExtractImportTab2Props {
    generalFormFields2: any;
    isDefaultPage?: boolean;
}

export const ExtractImportTab2: React.FC<ExtractImportTab2Props> = React.memo(
    ({ generalFormFields2, isDefaultPage = false }) => {
        const intl = useIntl();
        return (
            <Box>
                <Grid container spacing={3}>
                    <DynamicField
                        fields={generalFormFields2.slice(0, 3)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(3, 8)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.import-license.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(8, 13)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(13, 22)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(22, 26)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.adjustment' })}
                        </Typography>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-fee.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(26, 29)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(29, 33)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(33, 38)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(38, 43)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(43, 48)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(48, 53)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(53, 58)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(58, 59)}
                        gridSize={{ xs: 12, sm: 12, lg: 12 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}></Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(59, 60)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(60, 62)}
                        gridSize={{ xs: 12, sm: 12, lg: 6 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <DynamicField
                        fields={generalFormFields2.slice(62, 65)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <DynamicField
                        fields={generalFormFields2.slice(65, 67)}
                        gridSize={{ xs: 12, sm: 12, lg: 12 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <DynamicField
                        fields={generalFormFields2.slice(67, 70)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.attachments.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(70, 76)}
                        gridSize={{ xs: 6, sm: 6, lg: 6 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-info.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(76, 78)}
                        gridSize={{ xs: 6, sm: 6, lg: 6 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(78, 89)}
                        gridSize={{ xs: 12, sm: 6, lg: 4 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.misc.title' })}
                        </Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(89, 91)}
                        gridSize={{ xs: 12, sm: 12, lg: 12 }}
                        isDefaultPage={isDefaultPage}
                    />
                </Grid>


                <DeclarationTypeSyncOnCode7 />
            </Box>
        );
    }
);


export default React.memo(ExtractImportTab2);