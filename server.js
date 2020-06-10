if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();

// database
require("./database")();

//routes
const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

const postRouter = require("./routes/post");
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
