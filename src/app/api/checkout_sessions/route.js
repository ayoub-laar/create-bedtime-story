const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: process.env.ARTICLE_PRICE,
          quantity: 1,
        },
      ],
      discounts: [{coupon: 'LAUNCH'}], // Appliquer le coupon "LAUNCH" automatiquement
      mode: 'payment',
      return_url: `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });
  
    return Response.json({clientSecret: session.client_secret});
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const session =
      await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams.get('session_id'))

      return Response.json({
        status: session.status,
        customer_email: session.customer_details.email
      })
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, {
      status: 500,
    })
  }
}