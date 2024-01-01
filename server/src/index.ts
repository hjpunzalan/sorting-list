import mongoose from "mongoose";

import { app } from "./app";
import { DATABASE, NODE_ENV, PORT } from "./constants";

// SYNC Unhandled rejections
// listening to event uncaughtException
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1); // 0 success , 1 for unhandled rejection
});

// Connecting to mongoDB using mongoose
mongoose
  .connect(DATABASE as string, {
    autoIndex: true,
    autoCreate: true
  })
  .then(() => console.log("DB connection is successful!"));

// Development / Production mode
console.log(`Server running on: ${NODE_ENV} mode`);

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// ASYNC Promises
// process object will emmit unhandled rejection
// promise rejection to have last safety nets

process.on(
  "unhandledRejection",
  (reason: Error | unknown | any, promise: Promise<any>): void => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    if (reason instanceof Error)
      console.log(`AT ${promise}`, reason.name, reason.message);
    server.close(() => {
      //  BY having server.close finishes all request that is being handled then closes the app
      process.exit(1); // 0 success , 1 for unhandled rejection
    });
  }
);

// Need a tool that restarts application
