import { Router } from "express";
import userRegisterDTO from "../dto/user.register.dto.js";

const userRouter = Router();

userRouter.post("/register", userRegisterDTO, (req, res) => {
  res.send();
});

userRouter.post("/login");

userRouter.get("/profile");

userRouter.patch("/update-data");
userRouter.patch("/update-email");
userRouter.patch("/update-password");
userRouter.delete("/unregister");

export default userRouter;
