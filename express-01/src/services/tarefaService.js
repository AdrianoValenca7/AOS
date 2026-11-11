import models from "../models/index.js";

const getAllTarefas = async () => {
  return await models.Tarefa.findAll();
};

const getTarefaById = async (objectId) => {
  return await models.Tarefa.findByPk(objectId);
};

const createTarefa = async (tarefaData) => {
  return await models.Tarefa.create(tarefaData);
};

const updateTarefa = async (objectId, tarefaData) => {
  const tarefa = await getTarefaById(objectId);

  if (!tarefa) {
    return null;
  }

  return await tarefa.update(tarefaData);
};

const deleteTarefa = async (objectId) => {
  const tarefa = await getTarefaById(objectId);

  if (!tarefa) {
    return false;
  }

  await tarefa.destroy();
  return true;
};

export default {
  getAllTarefas,
  getTarefaById,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
