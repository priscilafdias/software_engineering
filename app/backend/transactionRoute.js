// routes/transaction.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Render the transaction page with the publishable key
router.get('/', (req, res) => {
  res.render('transaction', {
    title: 'Secure Checkout',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

// Create PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount, 10),
      currency,
      description: 'Clothing Rental Payment'
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
