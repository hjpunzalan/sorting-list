"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const constants_1 = require("./constants");
// SYNC Unhandled rejections
// listening to event uncaughtException
process.on("uncaughtException", err => {
  console.log("UNCAUGHT Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1); // 0 success , 1 for unhandled rejection
});
// Connecting to mongoDB using mongoose
mongoose_1.default
  .connect(constants_1.DATABASE, {
    autoIndex: true,
    autoCreate: true
  })
  .then(() => console.log("DB connection is successful!"));
// Development / Production mode
console.log(`Server running on: ${constants_1.NODE_ENV} mode`);
const server = app_1.app.listen(constants_1.PORT, () => {
  console.log(`App running on port ${constants_1.PORT}`);
});
// ASYNC Promises
// process object will emmit unhandled rejection
// promise rejection to have last safety nets
process.on("unhandledRejection", (reason, promise) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  if (reason instanceof Error) console.log(`AT ${promise}`, reason.name, reason.message);
  server.close(() => {
    //  BY having server.close finishes all request that is being handled then closes the app
    process.exit(1); // 0 success , 1 for unhandled rejection
  });
});
// Need a tool that restarts application
