import { userService } from "../services/index.js";
import AppError from "../utils/AppError.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.updateUser(userId, req.body);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const deleted = await userService.deleteUser(userId);

    if (!deleted) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
