const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/invitation.controller");

router.get("/", verifyToken, controller.ListAll);
router.get("/:id", verifyToken, controller.ListOne);
router.post("/", verifyToken, controller.Save);
router.delete("/:id", verifyToken, controller.Delete);
router.put("/:id", verifyToken, controller.Update);

module.exports = router;
