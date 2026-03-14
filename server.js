const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Sabse upar load karna zaroori hai

const patientRoutes = require('./routes/patientRoutes');

const app = express();

// 1. Middlewares
app.use(cors()); 
app.use(express.json()); // React se data pakadne ke liye

// 2. Database Connection Logic
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file!");
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully...");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1); // Error hone par server stop kar do
    }
};

connectDB();

// 3. Routes
app.use('/api/patients', patientRoutes); // Ab aapka URL hoga: /api/patients/signup

// Default Route
app.get('/', (req, res) => {
    res.send("Hospital Management Server is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});