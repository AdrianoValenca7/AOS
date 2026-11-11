import rateLimit from "express-rate-limit";

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Muitas requisições. Tente novamente mais tarde.",
  },
});

export default limiterMiddleware;
