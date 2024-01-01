import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }
  },
  { timestamps: true }
);

export const Posts = mongoose.model("Posts", postsSchema);
