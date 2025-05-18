// index.js (Node backend)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dummy merchant validation
app.post('/api/validate-merchant', (req, res) => {
    const {username, password} = req.body;
    if (username === 'merchant123' && password === 'secret') {
        res.status(200).json({valid: true});
    } else {
        res.status(401).json({valid: false, message: 'Invalid credentials'});
    }
});

// Dummy customer capture (optional, you already have this)
app.post('/api/customer', (req, res) => {
    const {name, email, phone} = req.body;
    console.log('Received customer data:', {name, email, phone});
    res.status(200).json({message: 'Customer data received successfully!'});
});

// ✅ New: Dummy OTP validation
app.post('/api/validate-otp', (req, res) => {
    const {otp, merchantUsername, customer, cardData} = req.body;

    // Dummy OTP check
    if (otp === '123456') {
        res.status(200).json({message: 'OTP validated successfully. Payment authorized.'});
    } else {
        res.status(400).json({message: 'Invalid OTP. Please try again.'});
    }
});

app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
