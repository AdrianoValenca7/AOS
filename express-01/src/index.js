import "dotenv/config";
import express from "express";
import helmet from "helmet";

import { sequelize } from "./models/index.js";

import {
  corsMiddleware,
  logMiddleware,
  contextMiddleware,
  notFoundMiddleware,
  errorMiddleware,
  limiterMiddleware,
} from "./middlewares/index.js";

import * as routes from "./routes/index.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(corsMiddleware);
app.use(limiterMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);
app.use(contextMiddleware);

app.get("/", (req, res) => {
  res.send("Servidor express executando...");
});

app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync =
  process.env.ERASE_DATABASE_ON_SYNC === "true";

const syncDatabase =
  process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
  });
};

if (!process.env.VERCEL) {
  if (syncDatabase) {
    sequelize
      .sync({ force: eraseDatabaseOnSync })
      .then(() => {
        startServer();
      })
      .catch((error) => {
        console.error("Erro ao sincronizar o banco:", error);
      });
  } else {
    startServer();
  }
}

export default app;
