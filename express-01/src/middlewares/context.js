import { userService } from "../services/index.js";

const contextMiddleware = async (req, res, next) => {
  try {
    req.context = {
      me: await userService.getUserByLogin("rwieruch"),
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default contextMiddleware;
