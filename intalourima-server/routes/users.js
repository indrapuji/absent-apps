const router = require("express").Router();
const UserController = require("../controllers/UsersController");
const multer = require("multer");
const storage = require("../helpers/multer");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const upload = multer({ storage });

router.get("/profile", authentication, UserController.getUserProfile);
router.get("/", authentication, authorization, UserController.getAllUser);
router.get("/:id", authentication, authorization, UserController.getUserbyId);
router.post("/register-admin", UserController.superAdminRegister);
router.post("/login", UserController.userLogin);
router.post("/validation", authentication, UserController.userValidation);
router.put("/update-password", authentication, UserController.changePassword);
router.put("/update/:id", authentication, authorization, UserController.userUpdate);
router.put("/reset-password/:id", authentication, authorization, UserController.resetPassword);
router.post("/register", authentication, authorization, upload.single("img_url"), UserController.userRegister);
router.put("/status/:id", authentication, authorization, UserController.changeUserStatus);
router.put("/event/:id", authentication, authorization, UserController.changeUserEvent);

module.exports = router;
