import { PostsTC } from "../models/Posts";

// Constants.
const MAX_PER_PAGE = 500;

export const PostsQuery = {
  postsById: PostsTC.getResolver("findById"),
  postsByIds: PostsTC.getResolver("findByIds"),
  postsOne: PostsTC.getResolver("findOne"),
  postsMany: PostsTC.getResolver("findMany"),
  postsCount: PostsTC.getResolver("count"),
  postsConnection: PostsTC.getResolver("connection"),
  postsPagination: PostsTC.getResolver("pagination").wrapResolve(next => rp => {
    // Limit results per page
    if (rp.args.perPage > MAX_PER_PAGE) rp.args.perPage = MAX_PER_PAGE;

    return next(rp);
  })
};
