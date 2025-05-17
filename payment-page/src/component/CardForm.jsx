// src/components/CardForm.jsx
import React, {useRef, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import valid from 'card-validator';
import {getCardLogo} from '../utils/cardBrandLogos.js';


const CardForm = ({onSubmit}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const numberValidation = valid.number(cardNumber);
    const expiryValidation = valid.expirationDate(expiry);
    const cvvValidation = valid.cvv(cvv, numberValidation.card ? numberValidation.card.code.size : undefined);
    const cardBrand = numberValidation.card ? numberValidation.card.type : null;
    const logoSrc = getCardLogo(cardBrand);

    const isFormValid =
        numberValidation.isValid &&
        expiryValidation.isValid &&
        cvvValidation.isValid &&
        cardholderName.trim() !== '';


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({cardNumber, cardholderName, expiry, cvv});
    };

    const handleCardNumberChange = (e) => {
        const rawValue = e.target.value.replace(/\s+/g, '');
        // Optional: limit to 19 digits (max card length)
        if (rawValue.length <= 19) {
            setCardNumber(formatCardNumber(e.target.value));
        }
    };

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, '') // remove non-digits
            .replace(/(.{4})/g, '$1 ') // insert space after every 4 digits
            .trim();
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // remove non-digits
        if (value.length > 4) value = value.slice(0, 4); // max 4 digits

        // Auto-insert slash after MM
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setExpiry(value);

        // Auto-focus CVV when MMYY complete
        if (value.length === 5 && expiry.length < 5) {
            cvvRef.current?.focus();
        }
    };

    const cvvRef = useRef(null);


    return (<Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
            margin: 'auto',
            padding: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#f9f9f9'
        }}
    >
        <Typography variant="h6" align="center">Enter Card Details</Typography>

        <TextField
            label="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            fullWidth
            inputProps={{maxLength: 19 + 4}} // max 19 digits + 4 spaces
            error={cardNumber.length > 0 && !numberValidation.isValid}
            helperText={cardNumber.length > 0 && !numberValidation.isValid ? 'Invalid card number' : ''}
            InputProps={{
                endAdornment: (<InputAdornment position="end">
                    <img
                        src={logoSrc}
                        alt="card logo"
                        style={{width: 40, height: 24, objectFit: 'contain'}}
                    />
                </InputAdornment>),
            }}
        />

        <TextField
            label="Cardholder Name"
            variant="outlined"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            fullWidth
        />

        <TextField
            label="Expiry Date (MM/YY)"
            variant="outlined"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            inputProps={{maxLength: 5}}
            fullWidth
            error={expiry.length > 0 && !expiryValidation.isValid}
            helperText={
                expiry.length > 0 && !expiryValidation.isValid
                    ? 'Invalid expiry date'
                    : ''
            }
        />

        <TextField
            label="CVV"
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            type="password"
            fullWidth
            inputProps={{
                maxLength: numberValidation.card ? numberValidation.card.code.size : 4
            }}
            error={cvv.length > 0 && !cvvValidation.isValid}
            helperText={
                cvv.length > 0 && !cvvValidation.isValid
                    ? 'Invalid CVV'
                    : ''
            }
            inputRef={cvvRef}
        />


        <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
            Pay Now
        </Button>
    </Box>);
};

export default CardForm;