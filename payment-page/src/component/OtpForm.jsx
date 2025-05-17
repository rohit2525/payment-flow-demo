import React, {useState} from 'react';
import '../css/OtpForm.css';

function OtpForm({onSubmit, errorMessage}) {
    const [otp, setOtp] = useState('');
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length <= 6) {
            setOtp(value);
            if (localError) setLocalError(''); // clear local error when typing
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            onSubmit(otp);
        } else {
            setLocalError('Please enter a 6-digit OTP');
        }
    };

    return (
        <div className="form-container">
            <h2>Enter OTP</h2>

            {/* Show either local error or server error */}
            {(localError || errorMessage) && (
                <p style={{color: 'red', marginBottom: '1rem'}}>
                    {localError || errorMessage}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    maxLength="6"
                    placeholder="Enter 6-digit OTP"
                    className="otp-input"
                />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
}

export default OtpForm;
