import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

// router.post('/register',)
// router.route("/register").post(registerUser)
router.post('/register',registerUser)
router.post('/login',loginUser)

router.get('/user',getUser);






export default router;