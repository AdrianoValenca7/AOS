import { z } from "zod";

import AppError from "../utils/AppError.js";

const createTarefaSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória."),

  concluida: z.boolean().optional().default(false),
});

const updateTarefaSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descrição não pode ser vazia.")
    .optional(),

  concluida: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Informe pelo menos um campo para atualizar.",
  }
);

const validateCreateTarefa = (req, res, next) => {
  const result = createTarefaSchema.safeParse(req.body);

  if (!result.success) {
    return next(
      new AppError(
        result.error.issues[0].message,
        400
      )
    );
  }

  req.body = result.data;

  next();
};

const validateUpdateTarefa = (req, res, next) => {
  const result = updateTarefaSchema.safeParse(req.body);

  if (!result.success) {
    return next(
      new AppError(
        result.error.issues[0].message,
        400
      )
    );
  }

  req.body = result.data;

  next();
};

export {
  validateCreateTarefa,
  validateUpdateTarefa,
};
