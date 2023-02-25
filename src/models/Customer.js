const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: String,
    serviceInfo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'service'
    }]
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
