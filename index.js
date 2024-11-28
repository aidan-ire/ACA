const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Mongoose Schema
const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    inquiryType: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});
const Submission = mongoose.model('Submission', submissionSchema);

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('styles'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/aboutUs', (req, res) => {
    res.render('aboutUs');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/services', (req, res) => {
    res.render('services');
});

// POST route to handle form submission
app.post('/submit', [
    // Input validation and sanitization
    body('name').trim().escape().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('inquiryType').trim().escape().notEmpty().withMessage('Inquiry type is required.'),
    body('message').trim().escape().notEmpty().withMessage('Message cannot be empty.'),
], async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Honeypot check to detect bots
    if (req.body.honeypot) {
        console.log('Bot detected, honeypot triggered.');
        return res.status(400).send('Bot detected.');
    }

    // Extract data
    const { name, email, inquiryType, message } = req.body;

    try {
        // Save submission to MongoDB
        const newSubmission = new Submission({ name, email, inquiryType, message });
        await newSubmission.save();

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Inquiry: ${inquiryType}`,
            text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\nMessage: ${message}`
        };

        // Send email notification
        await transporter.sendMail(mailOptions);

        res.send('Thank you for your message! We will get back to you soon.');
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

