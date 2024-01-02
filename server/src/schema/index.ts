import { SchemaComposer } from "graphql-compose";
import { PostsQuery } from "./Posts";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...PostsQuery
});

export default schemaComposer.buildSchema();
