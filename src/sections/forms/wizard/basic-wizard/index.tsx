import { useRef, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';
import ContractsForm from '../steps/constract/ConstractForm';
import LogisticForm from '../steps/logistic/LogisticForm';
import PaymentForm from '../steps/payment/PaymentForm';
import Review from '../steps/review/Review';
// step options
const steps = ['Thông tin hợp đồng & tài chính', 'Thông tin logistics', 'Tạm ứng & Thanh toán', "Review"];

// Define types for form values to ensure type safety
interface ContractFormValues {
  contractNumber: string;
  taxCode: string;
  sellerName: string;
  sellerAddress: string;
  contractDate: Date;
  signDate: Date;
  customer: string;
  contractType: string;
  paymentTerms: string;
  deliveryTerms: string;
  contractDetails: string;
  allowableError: string;
  deliveryPort: string;
  receiptPort: string;
  currency: string;
  price: string;
  unit: string;
  totalVolume: string;
  saveContract: boolean;
  sellerBeneficiary: string;
  sellerBankName: string;
  sellerBankAddress: string;
  sellerBankAccount: string;
  sellerSwiftCode: string;
  buyerBeneficiary: string;
  buyerBankName: string;
  buyerBankAddress: string;
  buyerBankAccount: string;
  buyerSwiftCode: string;
  lcNumber: string;
  lcDate: Date;
}

interface FactoryType {
  factoryName: string;
  quantity: string;
  price: string;
  loadingTimeFrom: Date;
  loadingTimeTo: Date;
}

interface ProductType {
  goodsName: string;
  factories: FactoryType[];
}

interface LogisticFormValues {
  bookingNumber: string;
  bookingCode: string;
  containerQuantity: string;
  etaDate: Date;
  etdDate: Date;
  shipName: string;
  forwarderName: string;
  shippingLineName: string;
  yardDate: Date;
  cutoffDate: Date;
  region: string;
  portName: string;
  cargoType: string;
  shippingNote: string;
  selectedBookingCode: string;
  products: ProductType[];
  totalQuantity: string;
  totalPrice: string;
  averagePrice: string;
}

interface FactoryPaymentType {
  factoryName: string;
  quantity: string;
  price: string;
  amount: string;
}

interface PaymentFormValues {
  contractNumber: string;
  bookingNumber: string;
  advanceDate: Date;
  paymentPurpose: string;
  factoryPayments: FactoryPaymentType[];
  totalQuantity: string;
  totalAmount: string;
  notes: string;
}

// ==============================|| FORMS WIZARD - BASIC ||============================== //

export default function BasicWizard() {
  const [activeStep, setActiveStep] = useState(0);
  
  // Refs for each form to access their methods
  const contractFormRef = useRef<any>(null);
  const logisticFormRef = useRef<any>(null);
  const paymentFormRef = useRef<any>(null);
  
  // Default initial values for each form
  const defaultContractData: ContractFormValues = {
    contractNumber: '',
    taxCode: '',
    sellerName: '',
    sellerAddress: '',
    contractDate: new Date(),
    signDate: new Date(),
    customer: '',
    contractType: '',
    paymentTerms: '',
    deliveryTerms: '',
    contractDetails: '',
    allowableError: '',
    deliveryPort: '',
    receiptPort: '',
    currency: '',
    price: '',
    unit: '',
    totalVolume: '',
    saveContract: false,
    sellerBeneficiary: '',
    sellerBankName: '',
    sellerBankAddress: '',
    sellerBankAccount: '',
    sellerSwiftCode: '',
    buyerBeneficiary: '',
    buyerBankName: '',
    buyerBankAddress: '',
    buyerBankAccount: '',
    buyerSwiftCode: '',
    lcNumber: '',
    lcDate: new Date()
  };

  const defaultLogisticData: LogisticFormValues = {
    bookingNumber: '',
    bookingCode: '',
    containerQuantity: '',
    etaDate: new Date(),
    etdDate: new Date(),
    shipName: '',
    forwarderName: '',
    shippingLineName: '',
    yardDate: new Date(),
    cutoffDate: new Date(),
    region: '',
    portName: '',
    cargoType: '',
    shippingNote: '',
    selectedBookingCode: '',
    products: [{
      goodsName: '',
      factories: [{
        factoryName: '',
        quantity: '',
        price: '',
        loadingTimeFrom: new Date(),
        loadingTimeTo: new Date()
      }]
    }],
    totalQuantity: '',
    totalPrice: '',
    averagePrice: ''
  };

  const defaultPaymentData: PaymentFormValues = {
    contractNumber: '',
    bookingNumber: '',
    advanceDate: new Date(),
    paymentPurpose: '',
    factoryPayments: [{
      factoryName: '',
      quantity: '',
      price: '',
      amount: '0'
    }],
    totalQuantity: '0',
    totalAmount: '0',
    notes: ''
  };
  
  // State to store form values
  const [contractData, setContractData] = useState<ContractFormValues>(defaultContractData);
  const [logisticData, setLogisticData] = useState<LogisticFormValues>(defaultLogisticData);
  const [paymentData, setPaymentData] = useState<PaymentFormValues>(defaultPaymentData);

  const handleNext = () => {
    // Validate and collect data from the current step before proceeding
    if (activeStep === 0 && contractFormRef.current) {
      contractFormRef.current.submitForm().then((errors: any) => {
        if (Object.keys(errors).length === 0) {
          setContractData(contractFormRef.current.getValues());
          setActiveStep(activeStep + 1);
        }
      });
    } 
    else if (activeStep === 1 && logisticFormRef.current) {
      logisticFormRef.current.submitForm().then((errors: any) => {
        if (Object.keys(errors).length === 0) {
          setLogisticData(logisticFormRef.current.getValues());
          setActiveStep(activeStep + 1);
        }
      });
    }
    else if (activeStep === 2 && paymentFormRef.current) {
      paymentFormRef.current.submitForm().then((errors: any) => {
        if (Object.keys(errors).length === 0) {
          setPaymentData(paymentFormRef.current.getValues());
          setActiveStep(activeStep + 1);
        }
      });
    }
    else if (activeStep === 3) {
      // Submit data to API
      handleSubmitToAPI();
      setActiveStep(activeStep + 1);
    }
    else {
      setActiveStep(activeStep + 1);
    }

    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    scrollToTop();
  };

  // Function to handle submitting all data to API
  const handleSubmitToAPI = () => {
    // Combine all form data
    const completeFormData = {
      contractData,
      logisticData,
      paymentData
    };
    
    // Here you would call your API
    console.log('Submitting data to API:', completeFormData);
    
    // In a real implementation, you would add something like:
    // api.postContract(completeFormData)
    //   .then(response => console.log('Success:', response))
    //   .catch(error => console.error('Error:', error));
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Return the appropriate step content component
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ContractsForm 
                 ref={contractFormRef} 
                 initialValues={contractData} 
               />;
      case 1:
        return <LogisticForm 
                 ref={logisticFormRef} 
                 initialValues={logisticData} 
               />;
      case 2:
        return <PaymentForm 
                 ref={paymentFormRef} 
                 initialValues={paymentData} 
               />;
      case 3:
        return <Review 
                 contractData={contractData}
                 logisticData={logisticData}
                 paymentData={paymentData}
               />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <MainCard title="" sx={{ width: '100%' }} style={{fontSize: '20px'}}>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => (
          <Step style={{cursor: 'pointer'}} key={label} onClick={() => setActiveStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h3" gutterBottom>
              Đã hoàn thành tạo hợp đồng.
            </Typography>
            <Typography variant="subtitle1">
              Hợp đồng của bạn đã được tạo thành công. Mã hợp đồng của bạn là #2001539. Chúng tôi đã gửi email xác nhận, và sẽ 
              thông báo cho bạn khi hợp đồng được xử lý.
            </Typography>
            <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
              <AnimateButton>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => {
                    setActiveStep(0);
                    setContractData(defaultContractData);
                    setLogisticData(defaultLogisticData);
                    setPaymentData(defaultPaymentData);
                  }} 
                  sx={{ my: 3, ml: 1 }}
                >
                  Tạo lại
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
                  {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                </Button>
              </AnimateButton>
            </Stack>
          </>
        )}
      </>
    </MainCard>
  );
}
