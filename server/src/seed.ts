import { faker } from "@faker-js/faker";
import { LexoRank } from "lexorank";
import mongoose from "mongoose";
import { DATABASE } from "./constants";
import { Posts } from "./models/Posts";

// Helper.
function capitalizeFirstLetter(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

// Connecting to mongoDB using mongoose
mongoose
  .connect(DATABASE, {
    autoIndex: true,
    autoCreate: true
  })
  .then(() => console.log("DB connection is successful!"));

// Generate seed posts.
// Use lexorank for ordering.
let lexorank = LexoRank.min();
const posts = Array.from(
  {
    length: 1500
  },
  () => {
    // Increment
    lexorank = lexorank.genNext();

    return {
      // Get list of post title using faker
      title: capitalizeFirstLetter(faker.word.words({ count: { min: 3, max: 10 } })),
      order: lexorank.toString()
    };
  }
);

async function seedDB() {
  // Clear collections
  await Posts.deleteMany({});

  // Insert into collections:
  await Posts.create(posts);
}

seedDB().then(() => {
  mongoose.connection.close();
});
