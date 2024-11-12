import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import rootRouter from "./routes/rootRouter.js";
import hbsMiddleware from "express-handlebars";

console.log("Database URL:", process.env.DATABASE_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// const corsOptions = {
//   origin: process.env.CLIENT_URL || "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors({ origin: "*", credentials: true }));

app.set("views", path.join(__dirname, "../views"));
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

addMiddlewares(app);
app.use(rootRouter);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Serve static files from client/build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

app.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...");
});

export default app;