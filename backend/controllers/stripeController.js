const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_KEY)

const createPaymentIntent = async(req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createPaymentIntent }