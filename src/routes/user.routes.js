import { Router } from "express";
import userJWTDTO from "../dto/user.jwt.dto.js";
import userLoginDTO from "../dto/user.login.dto.js";
import userRegisterDTO from "../dto/user.register.dto.js";
import userUnregisterDTO from "../dto/user.unregister.dto.js";
import userUpdateEmailDTO from "../dto/user.updata-email.dto.js";
import userUpdateDataDTO from "../dto/user.update-data.dto.js.js";
import userUpdatePasswordDTO from "../dto/user.update-password.dto.js";

const userRouter = Router();

userRouter.post("/register", userRegisterDTO);

userRouter.post("/login", userLoginDTO);

userRouter.get("/profile", userJWTDTO);

userRouter.patch("/update-data", userJWTDTO, userUpdateDataDTO);
userRouter.patch("/update-email", userJWTDTO, userUpdateEmailDTO);
userRouter.patch("/update-password", userJWTDTO, userUpdatePasswordDTO);
userRouter.delete("/unregister", userJWTDTO, userUnregisterDTO);

export default userRouter;
