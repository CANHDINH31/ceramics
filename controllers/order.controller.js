const orderModel = require("../models/order.model");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await orderModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("cart.product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const payload = {
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        note: data?.note,
        cart: data?.cart?.map((e) => ({
          product: e?.product,
          amount: e?.amount,
        })),
      };
      const order = await orderModel.create(payload);

      const token = "7052278326:AAHLnMwVC5mcrIRUncaCofVtM5XBtRCRfnA";

      const chat_id = "-4113907577";

      const teleOrder = await orderModel
        .findById(order._id)
        .populate("cart.product");

      const teleProduct = teleOrder?.cart?.map(
        (e) => `%0ATên: ${e?.product?.name} * SL: ${e?.amount}`
      );

      const text = `Họ và tên: ${data?.name}
      %0ASố điện thoại: ${data?.phone}
      %0AĐịa chỉ: ${data?.address}
      %0AGhi chú: ${data?.note}
      %0A
      %0A---------------- ĐƠN HÀNG ---------------
      ${teleProduct}
      `;

      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`;

      await axios.post(url);

      res.status(201).json(teleOrder);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      let data = await orderModel
        .findById(req.params.id)
        .populate("cart.product");
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
