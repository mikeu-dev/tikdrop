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
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { BlogPost } from '@/lib/types';

const BLOG_COLLECTION = 'blog_posts';

export async function getAllPosts(limitCount?: number): Promise<BlogPost[]> {
  try {
    let q = query(collection(db, BLOG_COLLECTION), orderBy('date', 'desc'));
    
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        // Konversi Firestore Timestamp ke string agar bisa dikirim ke Client Component
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      } as any as BlogPost;
    });
  } catch (error) {
    console.error("Error fetching all posts details:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOG_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      } as any as BlogPost;
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
