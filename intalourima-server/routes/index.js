const router = require("express").Router();
const users = require("./users");
const referal = require("./referal");
const event = require("./event");
const record = require("./record");

router.use("/user", users);
router.use("/referal", referal);
router.use("/event", event);
router.use("/record", record);

module.exports = router;
