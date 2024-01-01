"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
exports.app = (0, express_1.default)();
//////////////////////// Global Middlewares//////////////////////////
// Add http headers that secure the server
exports.app.use((0, helmet_1.default)());
// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
exports.app.use(express_1.default.json({ limit: "10kb" })); // package will parse 10kb into meaningful data
// Data sanitization against NoSQL query injection
//Look at the req and filter out all '$' and '.' that sends queries to db illegaly
exports.app.use((0, express_mongo_sanitize_1.default)());
