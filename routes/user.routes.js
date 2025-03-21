import express from "express";
import { body } from "express-validator";
import { authUser } from "../middlesware/Auth.middlewares.js";
import { loginUser, logOutUser, register, userProflie,  } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6"),
  ],
  register
);


router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6"),
], loginUser);

router.get("/profile", authUser, userProflie);
router.get("/logout", authUser, logOutUser);


export default router;
