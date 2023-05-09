import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//getAll
router.get("/", getAllRooms);
//get
router.get("/:id", getRoom);
//create
router.post("/:hotelId", verifyAdmin, createRoom);
//update
router.put("/:id", verifyAdmin, updateRoom);
//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
