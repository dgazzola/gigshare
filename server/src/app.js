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

app.set('trust proxy', 1); // Trust the first proxy, which is Heroku's

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? "https://gigshare-breakable-toy-d3d5ed3d577f.herokuapp.com" : "*",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensures cookies are only sent over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-site cookies in production
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(LocalStrategy);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.query().findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(rootRouter);

app.use(express.static(path.join(__dirname, "../public")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;