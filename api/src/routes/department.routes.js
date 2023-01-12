const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/department.controller");

router.get("/", controller.ListAll);
router.get("/:id", controller.ListOne);
router.post("/", controller.Save);
router.delete("/:id", controller.Delete);
router.put("/:id", controller.Update);

module.exports = router;
