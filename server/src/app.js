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

// Enforce HTTPS in production
// if (process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(`https://${req.headers.host}${req.url}`);
//     }
//     next();
//   });
// }

// CORS setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? "https://gigshare-breakable-toy-d3d5ed3d577f.herokuapp.com" : "*",
  credentials: true  // Required for cross-origin cookies
}));

// Session setup with secure cookies in production
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Cross-site setting
    httpOnly: true,
  }
}));

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

passport.use(LocalStrategy);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  console.log("Deserializing user with ID:", id);
  User.query().findById(id)
    .then(user => {
      console.log("User found:", user);
      done(null, user);
    })
    .catch(err => {
      console.error("Error deserializing user:", err);
      done(err);
    });
});

// Set up Handlebars view engine
app.set("views", path.join(__dirname, "../views"));
app.engine("hbs", hbsMiddleware({
  defaultLayout: "default",
  extname: ".hbs",
}));
app.set("view engine", "hbs");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Main router
app.use(rootRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Serve frontend for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;