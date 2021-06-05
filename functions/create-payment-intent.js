// domain/.netlify/functions/create-payment-intent

require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
	if (event.body) {
		// endpoint receives POST req payload
		const { cart, shipping_fee, total_amount } = JSON.parse(event.body); //destructuring

		const calculateOrderAmount = () => {
			return shipping_fee + total_amount; //making calc
		};

		try {
			//sending intentRequest to stripe which requires amount and curr
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(), //total amount
				currency: "usd",
			});
			return {
				// respond to frontend client with stat 200 if SUCCESS and body of clientSecret
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: error.message }),
			};
		}
	}
};
