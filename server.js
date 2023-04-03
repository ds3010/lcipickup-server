require("dotenv").config();
const express = require("express");
var cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {id: 1}
    ]

    stripe wants
    [{price:1}]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: 1 });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:
      "http://localhost:3000/aaokyU3dphUVoJEMV6hQTaEhLiEn9z8eUTWugdCHNE014sp8zfEiV6YU9MaLtNwQi97H7WBhBHo21zqunD0ZgBgAJWj7fhqZy0BZ",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000"));
