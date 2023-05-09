import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
// router.get("/authentification", verifyToken, (req, res, next) => {
//   res.send("you are logged in ");
// });
// router.get("/Userauthentification/:id", verifyUser, (req, res, next) => {
//   res.send("you are logged in and you can delete account");
// });
// router.get("/Adminauthentification/:id", verifyAdmin, (req, res, next) => {
//   res.send("you are logged in and you can delete account");
// });
//getAll
router.get("/", verifyAdmin, getAllUsers);
//get
router.get("/:id", verifyUser, getUser);
//update
router.put("/:id", verifyUser, updateUser);
//delete
router.delete("/:id", verifyUser, deleteUser);

export default router;
