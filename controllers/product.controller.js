const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    try {
      let query = {};

      query = {
        ...(req?.query?.name && {
          name: { $regex: req.query.name, $options: "i" },
        }),
        ...(req?.query?.status && {
          status: req.query.status,
        }),
      };

      const data = await productModel
        .find(query)
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findById: async (req, res) => {
    try {
      let data = await productModel
        .findById(req.params.id)
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      let { ...body } = req.body;
      const data = await productModel.create(body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );

      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
        req.params.id,
        { status: 0 },
        { new: true }
      );

      const categories = await categoryModel.find();
      for (const category of categories) {
        const listProduct = category?.products?.toString()?.split(",");

        if (listProduct.includes(req.params.id)) {
          category.products = listProduct.filter((id) => id !== req.params.id);
          await category.save();
        }
      }

      res.status(201).json("Xóa product thành công");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
};
