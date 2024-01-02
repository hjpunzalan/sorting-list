/**
 *
 * https://www.apollographql.com/docs/react/development-testing/static-typing/
 */

import { CodegenConfig } from "@graphql-codegen/cli";

const GRAPHQL_API = process.env.VITE_GRAPHQL_API;

if (!GRAPHQL_API) {
  console.error("Missing Schema URL: ", GRAPHQL_API);
}
const config: CodegenConfig = {
  schema: GRAPHQL_API,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
