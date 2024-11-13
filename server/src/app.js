import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import passport from "passport";
import rootRouter from "./routes/rootRouter.js";
import hbsMiddleware from "express-handlebars";
import session from "express-session";
import "./boot.js";
import User from "./models/User.js";

import LocalStrategy from "./authentication/passportStrategy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure CORS to allow all origins for testing purposes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? "https://your-heroku-app.herokuapp.com" : "*",
  credentials: true
}));

// Set up session middleware after CORS
app.use(session({
  secret: process.env.SESSION_SECRET,  // make sure SESSION_SECRET is defined in your .env and on Heroku
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // ensures secure cookies on production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // appropriate cross-site settings
    httpOnly: true, // makes cookie accessible only to HTTP(S), not JavaScript
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Use the custom local strategy
passport.use(LocalStrategy);

// Configure serialization and deserialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.query().findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

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

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Serve the frontend for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});

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