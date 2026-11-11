import models from "../models/index.js";

const getAllUsers = async () => {
  return await models.User.findAll();
};

const getUserById = async (userId) => {
  return await models.User.findByPk(userId);
};

const getUserByLogin = async (login) => {
  let user = await models.User.findOne({
    where: { username: login },
  });

  if (!user) {
    user = await models.User.findOne({
      where: { email: login },
    });
  }

  return user;
};

const createUser = async (userData) => {
  return await models.User.create(userData);
};

const updateUser = async (userId, userData) => {
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  return await user.update(userData);
};

const deleteUser = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  await user.destroy();
  return true;
};

export default {
  getAllUsers,
  getUserById,
  getUserByLogin,
  createUser,
  updateUser,
  deleteUser,
};
