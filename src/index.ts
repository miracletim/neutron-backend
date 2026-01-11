import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

// const customer = await stripe.customers.create({
//   email: "miracletimothy@gmail.com",
// });

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is running");
});

app.post("/create-payment-intent", async (req: Request, res: Response) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(5000, "192.168.78.4", () => {
  console.log("server is running");
});
