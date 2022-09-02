const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  purchaseInfo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
