const router = require("express").Router();
const ReferalController = require("../controllers/ReferalsController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/all", authentication, authorization, ReferalController.referalGetAll);
router.post("/register", authentication, authorization, ReferalController.referalRegister);
router.delete("/delete/:id", authentication, authorization, ReferalController.referalDelete);
router.get("/:id", authentication, authorization, ReferalController.referalGetId);
router.put("/update/:id", authentication, authorization, ReferalController.referalUpdate);

module.exports = router;
