import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import TransactionInformation from './TransactionInformation';
import SupplierInformation from './SupplierInformation';
import Costs from './Costs';
import AnalysisSummary from './AnalysisSummary';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Thông tin giao dịch', 'Thông tin nhà cung cấp', 'Chi phí', 'Tổng hợp phân tích'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <TransactionInformation />;
    case 1:
      return <SupplierInformation />;
    case 2:
      return <Costs />;
    case 3:
      return <AnalysisSummary />;
    default:
      throw new Error('Unknown step');
  }
}

// ==============================|| FORMS ORDER - BASIC ||============================== //

export default function BasicOrder() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title="Basic">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => setActiveStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Đặt hàng thành công!
            </Typography>
            <Typography variant="subtitle1">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</Typography>
            <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
              <AnimateButton>
                <Button variant="contained" color="error" onClick={() => setActiveStep(0)} sx={{ my: 3, ml: 1 }}>
                  Làm lại
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Stack direction="row" sx={{ justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Quay lại
                </Button>
              )}
              <AnimateButton>
                <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Đặt hàng' : 'Tiếp tục'}
                </Button>
              </AnimateButton>
            </Stack>
          </>
        )}
      </>
    </MainCard>
  );
}
