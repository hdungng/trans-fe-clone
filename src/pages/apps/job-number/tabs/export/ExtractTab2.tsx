import { Box, Grid, Typography } from "@mui/material";
import DynamicField from "../../form/dynamic-fields/DynamicField";
import React from "react";


interface ExtractTab2Props {
    generalFormFields2: any;
    isDefaultPage?: boolean;
}

export const ExtractTab2: React.FC<ExtractTab2Props> = React.memo(
    ({ generalFormFields2, isDefaultPage = false }) => {
        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Địa điểm xếp hàng lên xe chở hàng</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(0, 5)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <DynamicField
                        fields={[generalFormFields2[5]]}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                    <DynamicField
                        fields={[generalFormFields2[6]]}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h5">Số container</Typography>
                    </Grid>
                    <DynamicField
                        fields={generalFormFields2.slice(7, 57)}
                        gridSize={{ xs: 12, sm: 6, lg: 3 }}
                        isDefaultPage={isDefaultPage}
                    />
                </Grid>
            </Box>
        );
    }
);


export default React.memo(ExtractTab2);