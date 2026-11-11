import { messageService } from "../services/index.js";
import AppError from "../utils/AppError.js";

const getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getAllMessages();

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const message = await messageService.getMessageById(messageId);

    if (!message) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.context?.me?.id;

    if (!userId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const message = await messageService.createMessage({
      text,
      userId,
    });

    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const message = await messageService.updateMessage(
      messageId,
      req.body
    );

    if (!message) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const deleted = await messageService.deleteMessage(messageId);

    if (!deleted) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
