//const secret_key = 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;
//const publishable_key = pk_live_51MrRBoA8xt4rMlKrQuXhpqhjcFl30IdEk6D8pEC50vBK5oX9P5umeZ6lhhYaLvNM4fsolW77SshM471kVddPA1HC00vJAEBUqe
//1-hour-game: price_1Mro2NA8xt4rMlKr2g4Ve0eQ
//1-hour-game-extended: price_1Mro42A8xt4rMlKrHIHeGK6h

const express = require("express");
var cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51MrRBoA8xt4rMlKrFWV4NV3qnlKjmeVROJ5fLqGS8MlKA9SBxVfnLblIWxoqIGXVOXlH7My9FP1pi7eaaSlObl9h00meM8hIl2"
);

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
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000"));
