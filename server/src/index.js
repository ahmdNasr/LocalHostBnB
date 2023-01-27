const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const cookieSession = require("cookie-session");
const { userRouter, stayRouter } = require("./routes");
const { connectToDatabase } = require("./models/mongoose-setup");

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;
if (!cookieSessionSecret) {
  throw new Error("COOKIE_SESSION_SECRET env variable is required");
}
const isLocalHost = process.env.FRONTEND_URL.startsWith("http://localhost:");

function configServer() {
  const PORT = process.env.PORT || 9001;
  const app = express();

  app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
  app.use(morgan("dev"));
  app.use(express.json());

  app.set("trust proxy", 1); // trust first proxy
  app.use(
    cookieSession({
      name: "session",
      secret: cookieSessionSecret,
      httpOnly: true, // only the server can read this cookie!
      expires: new Date(Date.now() + twoWeeksInMs),
      sameSite: isLocalHost ? "lax" : "none",
      secure: isLocalHost ? false : true,
    })
  );

  // DELETME:
  app.use((req, _, next) => {
    console.log("req.session", req.session);
    next();
  });

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/stays", stayRouter);
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
