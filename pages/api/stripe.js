import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1MUrpUKsMG89wxJEgiEnrWzV' }],

        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/m3dpot6x/production/'
            )
            .replace('-jpg', '.jpg');
          return {
            price_data: {
              currency: 'ngn',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 1000000,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${req.headers.origin}/?success=true`,

        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params, {
        apiVersion: '2022-11-15',
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
