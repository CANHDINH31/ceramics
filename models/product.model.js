const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    img: {
      type: String,
    },

    description: {
      type: String,
    },

    content: {
      type: String,
    },

    price: {
      type: Number,
    },

    status: {
      default: 1,
      type: Number,
    },

    //1: active 2:inactive
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
