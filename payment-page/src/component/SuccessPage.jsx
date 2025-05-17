// src/component/SuccessPage.jsx
import React from 'react';
import '../css/SuccessPage.css';

function SuccessPage({transactionData}) {
    const {cardData} = transactionData;
    const last4Digits = cardData.cardNumber.slice(-4);
    const timestamp = new Date().toLocaleString();

    return (
        <div className="success-container">
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you for your payment.</p>
            <div className="success-details">
                <p><strong>Card ending:</strong> **** **** **** {last4Digits}</p>
                <p><strong>Transaction Time:</strong> {timestamp}</p>
                <p><strong>Reference:</strong> TXN{Math.floor(Math.random() * 1000000)}</p>
            </div>
            <button onClick={() => window.location.reload()}>Make Another Payment</button>
        </div>
    );
}

export default SuccessPage;
