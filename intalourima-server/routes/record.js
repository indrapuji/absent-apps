const router = require("express").Router();
const RecordController = require("../controllers/RecordsController");
const multer = require("multer");
const storage = require("../helpers/multer");
const authentication = require("../middlewares/authentication");

const upload = multer({ storage });

router.post("/checkin", authentication, upload.single("image_url"), RecordController.checkInRecord);
router.get("/history", authentication, RecordController.getHistory);
router.put("/checkout", authentication, RecordController.checkOutRecord);
router.post("/leaderboard", authentication, RecordController.getLeaderBoard);
router.get("/all", authentication, RecordController.getAllRecord);
router.get("/:id", authentication, RecordController.getRecordbyId);

module.exports = router;
