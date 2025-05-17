// src/components/LandingPage.jsx
import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';

const LandingPage = ({onSuccess}) => {
    const [merchantUsername, setMerchantUsername] = useState('');
    const [merchantPassword, setMerchantPassword] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!merchantUsername.trim()) newErrors.merchantUsername = 'Merchant username is required';
        if (!merchantPassword.trim()) newErrors.merchantPassword = 'Merchant password is required';
        if (!customerName.trim()) newErrors.customerName = 'Customer name is required';
        if (!/^\S+@\S+\.\S+$/.test(customerEmail)) newErrors.customerEmail = 'Invalid email';
        if (!/^\d{10}$/.test(customerPhone)) newErrors.customerPhone = 'Phone must be 10 digits';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Pass captured data to parent (App)
            onSuccess({
                merchantUsername,
                merchantPassword,
                customer: {name: customerName, email: customerEmail, phone: customerPhone},
            });
        }
    };

    return (
        <Box
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
                backgroundColor: '#f0f0f0',
            }}
        >
            <Typography variant="h5" align="center">Merchant Login & Customer Details</Typography>

            <TextField
                label="Merchant Username"
                value={merchantUsername}
                onChange={(e) => setMerchantUsername(e.target.value)}
                error={!!errors.merchantUsername}
                helperText={errors.merchantUsername}
            />

            <TextField
                label="Merchant Password"
                type="password"
                value={merchantPassword}
                onChange={(e) => setMerchantPassword(e.target.value)}
                error={!!errors.merchantPassword}
                helperText={errors.merchantPassword}
            />

            <TextField
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                error={!!errors.customerName}
                helperText={errors.customerName}
            />

            <TextField
                label="Customer Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
            />

            <TextField
                label="Customer Phone (10 digits)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                error={!!errors.customerPhone}
                helperText={errors.customerPhone}
            />

            <Button variant="contained" color="primary" type="submit">Continue</Button>
        </Box>
    );
};

export default LandingPage;
