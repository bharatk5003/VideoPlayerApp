import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.post('/register',)
// router.route("/register").post(registerUser)
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.post("/login", loginUser);

router.get("/user", getUser);

export default router;
