if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
require("./config/passport-setup");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

// database
require("./database")();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);
app.use(
  cookieSession({
    maxAge: 24 * 3600 * 1000, //1 day
    keys: [process.env.SESSION_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

const postRouter = require("./routes/post");
app.use("/api/posts", postRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
