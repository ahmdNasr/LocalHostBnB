const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { userRouter } = require("./routes");

const PORT = process.env.PORT || 9001;
const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/stays", () => {});
// app.use("/api/v1/chats", () => {});

app.listen(PORT, () => console.log("Server listening on port", PORT));
