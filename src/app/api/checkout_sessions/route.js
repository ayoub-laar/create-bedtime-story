const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price: 'price_1OpeXPLxsdjOwhqlsHcUxuL2',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url:
        `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
    });
  
    return Response.json({clientSecret: session.client_secret})
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, {
      status: 500,
    })
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