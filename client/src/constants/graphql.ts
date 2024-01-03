import { gql } from "@/__generated__/gql";

export const GET_POSTS_TITLE = gql(/* GraphQL */ `
  query PostsPagination($perPage: Int) {
    postsPagination(perPage: $perPage) {
      items {
        _id
        title
        order
      }
    }
  }
`);
