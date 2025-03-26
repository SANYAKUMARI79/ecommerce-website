import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';  // Make sure this path is correct
import OrderSummary from './OrderSummary'; // Make sure this path is correct

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the step from the query string
  const querySearch = new URLSearchParams(location.search);
  const stepFromUrl = Number(querySearch.get("get")) || 0; // Default to 0 if not found
  
  const [activeStep, setActiveStep] = React.useState(stepFromUrl);

  // Function to update URL when step changes
  const updateStepInUrl = (step) => {
    navigate(`?get=${step}`, { replace: true }); // Updates URL without reloading
  };

  const handleNext = () => {
    setActiveStep((prevStep) => {
      const newStep = prevStep + 1;
      updateStepInUrl(newStep);
      return newStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => {
      const newStep = prevStep - 1;
      updateStepInUrl(newStep);
      return newStep;
    });
  };

  return (
    <div className='px-10 lg:px-20'>
      <Box sx={{ width: '100%' }}>
        {/* Stepper Navigation */}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Step Content */}
        <div className="mt-10">
          {activeStep === 0 && <Typography>Login Step</Typography>}
          {activeStep === 1 && <DeliveryAddressForm />}
          {activeStep === 2 && <OrderSummary />}
          {activeStep === 3 && <Typography>Payment Step</Typography>}
        </div>

        {/* Step Navigation Buttons */}
        {activeStep < steps.length && (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        )}

        {/* Completion Message */}
        {activeStep === steps.length && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished!
          </Typography>
        )}
      </Box>
    </div>
  );
}
