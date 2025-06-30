import express from "express";
import Stripe from "stripe"
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount, currency = "inr" } = req.body; // amount in rupees

  try {
    // Stripe expects amount in the smallest currency unit (e.g., paise for INR)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // ₹100.50 → 10050 paise
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe PaymentIntent error:", err);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

export default router;
