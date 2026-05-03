import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: `${env.appName} running` });
});

app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
