import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ExportExtractResponse } from 'types/pages/form-field';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { useIntl } from 'react-intl';

interface TabDetailExport2Props {
    initialGeneralCheckData: ExportExtractResponse | undefined;
}

const TabDetailExport2 = ({ initialGeneralCheckData }: TabDetailExport2Props) => {
    const intl = useIntl();
    const containerInfo = initialGeneralCheckData?.container_info as Record<string, any> | undefined;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.container.loading-locations.title' })}
                    </Typography>
                </Grid>
                {[1, 2, 3, 4, 5].map((index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`loading-location-${index}`}>
                        <Typography variant="subtitle2">
                            {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.container.loading-location-code' }, { index })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getLabelByCode(comboBoxData[10].data, containerInfo?.[`loading_location_code_${index}`]) || '-'}
                        </Typography>
                    </Grid>
                ))}

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.container.loading-location-name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {containerInfo?.loading_location_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.container.address' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {containerInfo?.address || '-'}
                    </Typography>
                </Grid>

                {Array.from({ length: 50 }, (_, index) => index + 1).map((containerIndex) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`container-number-${containerIndex}`}>
                        <Typography variant="subtitle2">
                            {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.container.number' }, { index: containerIndex })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {containerInfo?.[`container_number_${containerIndex}`] || '-'}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TabDetailExport2;