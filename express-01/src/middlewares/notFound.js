import AppError from "../utils/AppError.js";

const notFoundMiddleware = (req, res, next) => {
  next(
    new AppError(
      `Rota não encontrada: ${req.method} ${req.originalUrl}`,
      404
    )
  );
};

export default notFoundMiddleware;
