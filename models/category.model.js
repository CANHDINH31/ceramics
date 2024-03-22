const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    img: {
      type: String,
    },

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

    status: {
      default: 1,
      type: Number,
    },

    // 1:active 0:inactive
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
