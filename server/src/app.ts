import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

export const app = express();

//////////////////////// Global Middlewares//////////////////////////
// Add http headers that secure the server
app.use(helmet());

// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
app.use(express.json({ limit: "10kb" })); // package will parse 10kb into meaningful data

// Data sanitization against NoSQL query injection
//Look at the req and filter out all '$' and '.' that sends queries to db illegaly
app.use(mongoSanitize());
