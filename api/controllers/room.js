import Room from "../models/room.js";
import Hotel from "../models/hotel.js";

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room deleted");
  } catch (err) {
    next(err);
  }
};
const getRoom = async (req, res, next) => {
  try {
    const selectedRoom = await Room.findById(req.params.id);
    res.status(200).json(selectedRoom);
  } catch (err) {
    next(err);
  }
};
const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find();
    res.status(200).json(Rooms);
  } catch (err) {
    next(err);
  }
};
export { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms };
