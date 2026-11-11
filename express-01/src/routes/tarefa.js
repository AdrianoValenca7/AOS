import { Router } from "express";

import { tarefaController } from "../controllers/index.js";

import {
  validateCreateTarefa,
  validateUpdateTarefa,
} from "../middlewares/validate.js";

const router = Router();

router.get("/", tarefaController.getAllTarefas);

router.get("/:objectId", tarefaController.getTarefa);

router.post(
  "/",
  validateCreateTarefa,
  tarefaController.createTarefa
);

router.put(
  "/:objectId",
  validateUpdateTarefa,
  tarefaController.updateTarefa
);

router.delete("/:objectId", tarefaController.deleteTarefa);

export default router;
