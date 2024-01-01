import { faker } from "@faker-js/faker";
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

// Get list of post title using faker
const posts = Array.from(
  {
    length: 1500
  },
  () => ({
    title: capitalizeFirstLetter(faker.word.words({ count: { min: 3, max: 10 } }))
  })
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
