import { Router } from "express";
import { register, login, logout } from "../controllers/auth.js";
import { validate } from "../middlewares/validator.js";
import {
  LoginVerification,
  RegisterUserValidation,
} from "../utils/validations.js";
import { authCheck } from "../middlewares/auth.js";

const router = Router();

router.post("/register", validate(RegisterUserValidation), register);
router.post("/login", validate(LoginVerification), login);
router.post("/logout", authCheck, logout);

export default router;
