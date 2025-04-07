// public/js/transaction.js

document.addEventListener('DOMContentLoaded', function() {
    if (typeof stripePublishableKey === 'undefined') {
      console.error('Stripe publishable key not found');
      return;
    }
  
    // Initialize Stripe
    const stripe = Stripe(stripePublishableKey);
    const elements = stripe.elements();
  
    // Custom styling for card element
    const style = {
      base: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        color: '#333',
        '::placeholder': { color: '#a0a0a0' }
      },
      invalid: {
        color: '#e53e3e'
      }
    };
  
    // Create and mount card element
    const card = elements.create('card', { style: style });
    card.mount('#card-element');
  
    // Real-time validation errors
    card.addEventListener('change', function(event) {
      const errorDisplay = document.getElementById('card-errors');
      errorDisplay.textContent = event.error ? event.error.message : '';
    });
  
    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      const resultContainer = document.getElementById('payment-result');
      resultContainer.textContent = '';
  
      try {
        // Create PaymentIntent on the server
        const response = await fetch('/transaction/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 5000, currency: 'usd' }) // Example: $50.00
        });
        const { clientSecret } = await response.json();
  
        // Confirm the card payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: card }
        });
  
        if (error) {
          resultContainer.textContent = error.message;
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          resultContainer.textContent = 'Payment successful! Payment ID: ' + paymentIntent.id;
        }
      } catch (err) {
        console.error(err);
        resultContainer.textContent = 'An error occurred. Please try again.';
      }
    });
  });