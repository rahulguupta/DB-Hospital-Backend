const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Iska pura path banega: POST http://localhost:5000/api/patients/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        let patient = await Patient.findOne({ email });
        if (patient) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Create and Save
        patient = new Patient({ name, email, phone, password });
        await patient.save();

        res.status(201).json({ 
            success: true, 
            message: "Patient registered successfully!",
            user: {name: patient.name, email: patient.email, phone: patient.phone}
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.post('/signin', async (req,res) =>
{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({message: "please type all fields"});
    }
    console.log(`attempting the login for: ${email}`);
    try{
        const user = await Patient.findOne({email: email});

        if(!user)
        {
            return res.status(404).json({message: "Patient not found"});
        }
        if(user.password !== password)
        {
            return res.status(401).json({message: ": Invalid password"});
        }
        res.status(200).json
        ({
            message: "login successfull ",
            email: user.email,
            name: user.name,
            phone: user.phone,
        });

    }
    catch(error)
    {
        console.error("database error:",error);
        res.status(500).json({message:": Internal server error"});
    }
});

module.exports = router;