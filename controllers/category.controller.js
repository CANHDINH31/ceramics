const categoryModel = require("../models/category.model");
const ErrorResponse = require("../helpers/ErrorResponse");

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

      const data = await categoryModel
        .find(query)
        .select(["-updatedAt", "-createdAt"])
        .populate("products")
        .sort({ createdAt: -1 });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findById: async (req, res) => {
    try {
      let data = await categoryModel
        .findById(req.params.id)
        .populate("products")
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      let { ...body } = req.body;
      const data = await categoryModel.create(body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await categoryModel.findByIdAndUpdate(
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

  addProduct: async (req, res) => {
    try {
      const { listId } = req.body;

      const category = await categoryModel.findById(req.params.id);

      const newProductIds = listId.filter(
        (productId) => !category.products.includes(productId)
      );
      category.products = [...category.products, ...newProductIds];

      const updatedCategory = await category.save();

      res.status(201).json(updatedCategory);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      const data = await categoryModel.findByIdAndUpdate(
        req.params.id,
        { status: 0 },
        { new: true }
      );
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
};
