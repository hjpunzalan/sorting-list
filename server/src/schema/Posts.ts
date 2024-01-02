import { PostsTC } from "../models/Posts";

export const PostsQuery = {
  postsById: PostsTC.getResolver("findById"),
  postsByIds: PostsTC.getResolver("findByIds"),
  postsOne: PostsTC.getResolver("findOne"),
  postsMany: PostsTC.getResolver("findMany"),
  postsCount: PostsTC.getResolver("count"),
  postsConnection: PostsTC.getResolver("connection"),
  postsPagination: PostsTC.getResolver("pagination")
};
