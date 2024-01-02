import { gql } from "@/__generated__/gql";

export const GET_POSTS_TITLE = gql(/* GraphQL */ `
  query Query($page: Int) {
    postsPagination(page: $page, perPage: 500) {
      count
      items {
        _id
        title
      }
    }
  }
`);
