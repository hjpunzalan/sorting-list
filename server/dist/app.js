"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const constants_1 = require("./constants");
const schema_1 = __importDefault(require("./schema"));
exports.app = (0, express_1.default)();
//////////////////////// Global Middlewares//////////////////////////
// Add http headers that secure the server
exports.app.use((0, helmet_1.default)());
// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
exports.app.use(express_1.default.json({ limit: "10kb" })); // package will parse 10kb into meaningful data
// Data sanitization against NoSQL query injection
// Look at the req and filter out all '$' and '.' that sends queries to db illegaly
exports.app.use((0, express_mongo_sanitize_1.default)());
// Apollo server.
const apolloServer = new server_1.ApolloServer({ schema: schema_1.default });
apolloServer.start().then(() => {
    // HTTP endpoints.
    exports.app.use("/graphql", (0, cors_1.default)({ origin: [constants_1.SANDBOX_ORIGIN, constants_1.CLIENT_ORIGIN] }), (0, express4_1.expressMiddleware)(apolloServer));
});
