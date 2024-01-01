"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Environment variables
if (process.env.NODE_ENV === "production") {
  dotenv_1.default.config({
    path: path_1.default.join(__dirname, "..", "production.env")
  });
} else {
  dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "config.env") });
}
exports.PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
  console.error("PORT not defined in config, defaults to 3000");
}
exports.NODE_ENV = process.env.NODE_ENV || "Development";
if (!process.env.NODE_ENV) {
  console.error("NODE_ENV not defined in config, defaults to development");
}
exports.DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:3002/StrataTown";
if (!process.env.DATABASE) {
  console.error("DATABASE not defined in config, defaults to development");
}
