import { tarefaService } from "../services/index.js";
import AppError from "../utils/AppError.js";

const getAllTarefas = async (req, res, next) => {
  try {
    const tarefas = await tarefaService.getAllTarefas();

    return res.status(200).json(tarefas);
  } catch (error) {
    next(error);
  }
};

const getTarefa = async (req, res, next) => {
  try {
    const { objectId } = req.params;

    const tarefa = await tarefaService.getTarefaById(objectId);

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    next(error);
  }
};

const createTarefa = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.createTarefa(req.body);

    return res.status(201).json(tarefa);
  } catch (error) {
    next(error);
  }
};

const updateTarefa = async (req, res, next) => {
  try {
    const { objectId } = req.params;

    const tarefa = await tarefaService.updateTarefa(
      objectId,
      req.body
    );

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.status(200).json(tarefa);
  } catch (error) {
    next(error);
  }
};

const deleteTarefa = async (req, res, next) => {
  try {
    const { objectId } = req.params;

    const deleted = await tarefaService.deleteTarefa(objectId);

    if (!deleted) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.status(200).json({
      message: "Tarefa excluída com sucesso.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTarefas,
  getTarefa,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
