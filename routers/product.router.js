const express = require("express");
const router = express.Router();

const {
  create,
  list,
  findById,
  deleteData,
  update,
} = require("../controllers/product.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").put(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteData));
router.route("/:id").get(asyncMiddelware(findById));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
