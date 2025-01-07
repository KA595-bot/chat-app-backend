import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { validateDTO } from "../middlewares/validators";
import { RegisterUserDTO, LoginUserDTO } from "../dtos/auth.dto";

const router = Router();

router.post("/register", validateDTO(RegisterUserDTO), registerUser);
router.post("/login", validateDTO(LoginUserDTO), loginUser);

export default router;
