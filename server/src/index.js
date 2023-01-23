const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { userRouter } = require("./routes");
const { connectToDatabase } = require("./models/mongoose-setup");

function configServer() {
  const PORT = process.env.PORT || 9001;
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  app.use("/api/v1/users", userRouter);
  // app.use("/api/v1/stays", () => {});
  // app.use("/api/v1/chats", () => {});

  return new Promise((resolve, _) => {
    app.listen(PORT, () => {
      console.log("Server listening on port", PORT);
      resolve();
    });
  });
}

// Promise.all([connectToDatabase(), configServer()]);
connectToDatabase().then(configServer);
