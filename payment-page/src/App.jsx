// src/App.jsx
import React, {useState} from 'react';
import LandingPage from './component/LandingPage.jsx';
import CardForm from './component/CardForm.jsx';
import OtpForm from "./component/OtpForm.jsx";
import SuccessPage from "./component/SuccessPage.jsx";
import FailurePage from "./component/FailurePage.jsx";

function App() {
    const [step, setStep] = useState('landing');
    const [capturedData, setCapturedData] = useState(null);
    const [failureReason, setFailureReason] = useState('');
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [otpErrorMessage, setOtpErrorMessage] = useState('');


    const handleLandingSuccess = async (data) => {
        try {
            const response = await fetch('https://payment-flow-demo.onrender.com/api/validate-merchant', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: data.merchantUsername, password: data.merchantPassword}),
            });

            if (response.ok) {
                console.log('Merchant validated!');
                setCapturedData(data);
                setStep('cardForm');
            } else {
                alert('Invalid merchant credentials!');
            }
        } catch (err) {
            console.error('Error validating merchant:', err);
            alert('Error validating merchant. Please try again.');
        }
    };


    const handleCardSubmit = (cardData) => {
        console.log('Card data:', cardData);
        setCapturedData({...capturedData, cardData});
        setStep('otp');  // <-- Move to OTP step
    };

    const handleOtpSubmit = async (otp) => {
        const payload = {
            otp,
            merchantUsername: capturedData.merchantUsername,
            customer: capturedData.customer,
            cardData: capturedData.cardData,
        };

        try {
            const response = await fetch('https://payment-flow-demo.onrender.com/api/validate-otp', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });


            if (response.ok) {
                setOtpErrorMessage('');
                setOtpAttempts(0);
                setStep('success');
            } else {
                const newAttempts = otpAttempts + 1;
                setOtpAttempts(newAttempts);

                if (newAttempts >= 3) {
                    setFailureReason('Maximum OTP attempts exceeded');
                    setStep('failure');
                } else {
                    setOtpErrorMessage(`Invalid OTP. Attempt ${newAttempts} of 3`);
                    // stay on OTP page
                }
            }
        } catch (err) {
            setOtpErrorMessage('Error validating OTP. Please try again.');
            setStep('cardForm');
        }
    };

    return (<>
        {step === 'landing' && <LandingPage onSuccess={handleLandingSuccess}/>}
        {step === 'cardForm' && <CardForm onSubmit={handleCardSubmit}/>}
        {step === 'otp' && <OtpForm onSubmit={handleOtpSubmit} errorMessage={otpErrorMessage}/>}
        {step === 'success' && <SuccessPage transactionData={capturedData}/>}
        {step === 'failure' && (
            <FailurePage
                reason={failureReason}
                onRetry={() => setStep('cardForm')} // 👈 bring user back to card page
            />
        )}

    </>);
}

export default App;
