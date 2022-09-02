//paypal SDK API
const paypal = require("paypal-rest-sdk");

//importing the ProductModel and the PurchaseModel
const productModel = require("../models/productsModel");
const purchaseModel = require("../models/purchases");

//intalizing variable for totalPrice, itemsList and authenticated user
let totalPrice;
let authUser;
let itemsList;

//creating date
const date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

//paypal configuration
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

//FUNCTION FOR THE PAY ROUTE
const initailizingPayment = async function (req, res) {
  const { productsId, productQuantity } = req.body;
  authUser = req.user;

  // fetching products from our database
  const products = await productModel.find({ _id: productsId });

  //list of items for the paypal object
  itemsList = products.map((product, i) => {
    return {
      name: product.name,
      sku: `00${i + 1}`,
      price: product.price,
      currency: "USD",
      quantity: productQuantity[i],
    };
  });

  totalPrice = itemsList
    .map((item) => item.price * item.quantity)
    .reduce((sum, amount) => sum + amount);

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/api/v1/payments/success",
      cancel_url: "http://localhost:3000/api/v1/payments/cancel",
    },
    transactions: [
      {
        item_list: {
          items: itemsList,
        },
        amount: {
          currency: "USD",
          total: totalPrice,
        },
        description: "payment for goods orderded;.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      const link = payment.links.filter((link) => {
        return link.rel === "approval_url";
      });
      res.json(link[0].href);
    }
  });
};

// FUNCTION FOR THE SUCCESS ROUTE
const executePayment = async function (req, res) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalPrice,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        const paymentInformation = JSON.stringify(payment);
        console.log(paymentInformation);
        res.send("success");
      }
    }
  );
  await purchaseModel.create({
    userId: authUser.userId,
    userName: authUser.username,
    purchaseInfo: {
      itemspurchased: itemsList,
      totalPrice,
      date: new Date().getDay(),
    }`${totalPrice} USD`,
  });
};

// FUNCTION FOR THE CANCEL ROUTE
const cancelPayment = async function (req, res) {
  res.send("cancelled");
};

module.exports = { initailizingPayment, executePayment, cancelPayment };
