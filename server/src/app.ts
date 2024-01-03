import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import path from "path";
import { CLIENT_ORIGIN, NODE_ENV, SANDBOX_ORIGIN } from "./constants";
import schema from "./schema";

export const app = express();

//////////////////////// Global Middlewares//////////////////////////
// Add http headers that secure the server
app.use(helmet());

// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
app.use(express.json({ limit: "10kb" })); // package will parse 10kb into meaningful data

// Data sanitization against NoSQL query injection
// Look at the req and filter out all '$' and '.' that sends queries to db illegaly
app.use(mongoSanitize());

// Apollo server.
const apolloServer = new ApolloServer({ schema });
apolloServer.start().then(() => {
  // HTTP endpoints.
  app.use("/graphql", cors({ origin: [SANDBOX_ORIGIN, CLIENT_ORIGIN] }), expressMiddleware(apolloServer));

  // Serve static assets in production
  if (NODE_ENV === "production") {
    // set static folder
    app.use(express.static(path.join(__dirname, "..", "..", "client/dist")));

    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "..", "..", "client", "dist", "index.html"));
    });
  }
});
