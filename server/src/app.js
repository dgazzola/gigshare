import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import "./boot.js";
import rootRouter from "./routes/rootRouter.js";
import hbsMiddleware from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure CORS to allow all origins for testing purposes
app.use(cors({ origin: "*", credentials: true }));

// Set up Handlebars for server-side rendering (if used)
app.set("views", path.join(__dirname, "../views"));
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// Logger, JSON, and URL-encoded parser setup
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use(rootRouter);

// Serve static files from client/build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  // Serve the frontend for non-API routes only
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

// Error-handling middleware for unhandled routes and errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use Heroku's $PORT or default to 3000 for local development
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;