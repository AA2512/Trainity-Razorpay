const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();

var instance = new Razorpay({
  key_id: "rzp_live_gumcDKRkOrvooo",
  key_secret: "piZ4CHjF52ra8pJjGrte0cMo",
});

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create/order", async (req, res) => {
  try {
    let options = {
      amount: 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.json({ order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port ", 3000);
});
