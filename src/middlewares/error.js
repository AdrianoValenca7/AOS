import AppError from "../utils/AppError.js";

const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      status: "fail",
      message: "Esse registro já existe.",
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "fail",
      message: "Dados inválidos.",
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      status: "fail",
      message: "Erro nos dados enviados ao banco.",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor.",
  });
};

export default errorMiddleware;
