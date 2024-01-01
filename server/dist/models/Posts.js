"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postsSchema = new mongoose_1.default.Schema(
  {
    title: { type: String, required: true }
  },
  { timestamps: true }
);
exports.Posts = mongoose_1.default.model("Posts", postsSchema);
