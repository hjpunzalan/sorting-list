"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
const Posts_1 = require("./models/Posts");
// Helper.
function capitalizeFirstLetter(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}
// Connecting to mongoDB using mongoose
mongoose_1.default
  .connect(constants_1.DATABASE, {
    autoIndex: true,
    autoCreate: true
  })
  .then(() => console.log("DB connection is successful!"));
// Get list of post title using faker
const posts = Array.from(
  {
    length: 1500
  },
  () => ({
    title: capitalizeFirstLetter(faker_1.faker.word.words({ count: { min: 3, max: 10 } }))
  })
);
function seedDB() {
  return __awaiter(this, void 0, void 0, function* () {
    // Clear collections
    yield Posts_1.Posts.deleteMany({});
    // Insert into collections:
    yield Posts_1.Posts.create(posts);
  });
}
seedDB().then(() => {
  mongoose_1.default.connection.close();
});
