import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { BlogPost } from '@/lib/types';

const BLOG_COLLECTION = 'blog_posts';

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, BLOG_COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    } as BlogPost));
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOG_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as BlogPost;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export async function upsertPost(post: BlogPost): Promise<void> {
  try {
    const docRef = doc(db, BLOG_COLLECTION, post.slug);
    await setDoc(docRef, {
      ...post,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error upserting post:", error);
    throw error;
  }
}

export async function deletePost(slug: string): Promise<void> {
  try {
    const docRef = doc(db, BLOG_COLLECTION, slug);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting post with slug ${slug}:`, error);
    throw error;
  }
}
