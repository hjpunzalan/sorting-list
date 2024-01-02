import dotenv from "dotenv";
import path from "path";

// Environment variables
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "..", "production.env") });
} else {
  dotenv.config({ path: path.join(__dirname, "..", "config.env") });
}

export const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
  console.error("PORT not defined in config, defaults to 3000");
}
export const NODE_ENV = process.env.NODE_ENV || "Development";
if (!process.env.NODE_ENV) {
  console.error("NODE_ENV not defined in config, defaults to development");
}

export const DATABASE = process.env.DATABASE || "mongodb://127.0.0.1:3002/StrataTown";
if (!process.env.DATABASE) {
  console.error(
    "DATABASE not defined in config, defaults to mongodb://127.0.0.1:3002/StrataTown"
  );
}

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
if (!process.env.CLIENT_ORIGIN) {
  console.error("CLIENT_ORIGIN not defined in config, defaults to http://localhost:3000");
}

export const SANDBOX_ORIGIN = "https://studio.apollographql.com";
