const router = require("express").Router();
const EventController = require("../controllers/EventsController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", authentication, authorization, EventController.eventRegister);
router.delete("/delete/:id", authentication, authorization, EventController.eventDeleted);
router.get("/all", authentication, EventController.eventGetAll);
router.get("/:id", authentication, authorization, EventController.eventGetId);
router.put("/update/:id", authentication, authorization, EventController.eventUpdate);

module.exports = router;
