import 'dotenv/config';
import { blogPosts } from '../lib/blog';
import { upsertPost } from '../lib/db/blog';

async function migrate() {
  console.log("Starting migration...");
  for (const post of blogPosts) {
    console.log(`Migrating: ${post.title}`);
    await upsertPost(post);
  }
  console.log("Migration finished successfully!");
}

migrate().catch(console.error);
