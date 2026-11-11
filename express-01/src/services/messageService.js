import models from "../models/index.js";

const getAllMessages = async () => {
  return await models.Message.findAll();
};

const getMessageById = async (messageId) => {
  return await models.Message.findByPk(messageId);
};

const createMessage = async (messageData) => {
  return await models.Message.create(messageData);
};

const updateMessage = async (messageId, messageData) => {
  const message = await getMessageById(messageId);

  if (!message) {
    return null;
  }

  return await message.update(messageData);
};

const deleteMessage = async (messageId) => {
  const message = await getMessageById(messageId);

  if (!message) {
    return false;
  }

  await message.destroy();
  return true;
};

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
