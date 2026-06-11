'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { BlogPost } from '@/lib/types';

const BlogGeneratorInputSchema = z.object({
  prompt: z.string().describe('The topic or instruction for the blog post.'),
  language: z.string().optional().default('id').describe('The language of the post.'),
});

export type BlogGeneratorInput = z.infer<typeof BlogGeneratorInputSchema>;

const BlogGeneratorOutputSchema = z.object({
  slug: z.string().describe('URL friendly slug.'),
  title: z.string().describe('Engaging title.'),
  thumbnail: z.string().describe('URL of the main thumbnail image.'),
  description: z.string().describe('Short meta description.'),
  content: z.string().describe('Full Markdown content of the blog post. Use markdown syntax for images, headings, lists, and links.'),
  tags: z.array(z.string()).describe('Array of relevant tags.'),
  author: z.string().describe('Author name.'),
});

export type BlogGeneratorOutput = z.infer<typeof BlogGeneratorOutputSchema>;

const blogGeneratorPrompt = ai.definePrompt({
  name: 'blogGeneratorPrompt',
  input: { schema: BlogGeneratorInputSchema },
  output: { schema: BlogGeneratorOutputSchema },
  prompt: `Anda adalah seorang konten kreator TikTok profesional, ahli SEO, dan tech blogger berpengalaman.
  Tugas Anda adalah membuat draf artikel blog yang sangat menarik, kaya konten, dan menghibur berdasarkan prompt: "{{prompt}}".

  Requirements:
  1. **Dynamic Content**:
     - Gunakan standar industri TERBARU (2024-2025) untuk teknologi apa pun yang disebutkan.
     - Gunakan bahasa yang santai, gaul, namun tetap informatif (campuran bahasa Indonesia dan istilah tech populer).
  2. **Visuals**:
     - **Thumbnail**: Sertakan URL gambar thumbnail yang menarik (800x600) menggunakan LoremFlickr berbasis kata kunci bahasa Inggris yang sangat relevan (contoh: https://loremflickr.com/800/600/tiktok,socialmedia). Jangan gunakan Unsplash.
     - **Images**: Sertakan 2-3 gambar relevan di dalam konten menggunakan sintaks Markdown dengan URL dari LoremFlickr berbasis kata kunci (contoh: ![deskripsi](https://loremflickr.com/800/600/smartphone,app)). Jangan gunakan Unsplash.
  3. **Typography & Structure**:
     - Gunakan hierarki visual yang jelas: ## untuk bagian utama, ### untuk poin bersarang.
     - Gunakan Blockquotes (>) untuk "Pro Tips", poin penting, atau observasi humoris.
  4. **Humor & Memes**: Sertakan 2-3 lelucon teknis atau observasi meme yang relevan.
  5. **SEO Optimization**:
     - Pastikan kata kunci utama muncul secara natural.
     - Judul dan deskripsi harus dioptimalkan untuk Click-Through Rate (CTR).

  Format output harus JSON sesuai skema. Bahasa yang digunakan adalah {{language}}.`,
});

// Helper untuk retry otomatis jika server AI sibuk (Error 503/429)
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.status === 503 || error.status === 429)) {
      console.warn(`AI Server busy (503/429). Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
}

export const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: BlogGeneratorInputSchema,
    outputSchema: BlogGeneratorOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await withRetry(() => blogGeneratorPrompt(input));
      if (!output) {
        throw new Error('Gagal menghasilkan konten blog dari AI (output kosong).');
      }
      return output;
    } catch (error: any) {
      console.error("AI Flow Error Details:", error);
      throw new Error(`AI Error: ${error.message || 'Unknown error'}`);
    }
  }
);

// New Granular Flows
export const generateSlugFlow = ai.defineFlow(
  { name: 'generateSlugFlow', inputSchema: z.string(), outputSchema: z.string() },
  async (title) => {
    const { text } = await withRetry(() => ai.generate({
      prompt: `Generate a URL-friendly slug (English/ASCII) from this Indonesian/English title: "${title}". Return ONLY the slug string, no extra characters.`,
    }));
    return text.trim().toLowerCase().replace(/ /g, '-');
  }
);

export const generateDescriptionFlow = ai.defineFlow(
  { name: 'generateDescriptionFlow', inputSchema: z.string(), outputSchema: z.string() },
  async (title) => {
    const { text } = await withRetry(() => ai.generate({
      prompt: `Generate a compelling SEO meta description (2 sentences) for a blog post titled "${title}". Use Indonesian language. Return ONLY the description text.`,
    }));
    return text.trim();
  }
);

export const polishContentFlow = ai.defineFlow(
  { name: 'polishContentFlow', inputSchema: z.string(), outputSchema: z.string() },
  async (content) => {
    const { text } = await withRetry(() => ai.generate({
      prompt: `Rewrite and polish the following blog content to make it more professional, engaging, and SEO-friendly. Keep the original meaning but improve the tone and structure. Use the same language as the input. Return ONLY the polished markdown content:\n\n${content}`,
    }));
    return text.trim();
  }
);

export const generateThumbnailFlow = ai.defineFlow(
  { name: 'generateThumbnailFlow', inputSchema: z.string(), outputSchema: z.string() },
  async (title) => {
    const { text } = await withRetry(() => ai.generate({
      prompt: `Based on this blog title: "${title}", suggest 2-3 English keywords for a relevant stock photo. Return ONLY the keywords separated by commas, no other text.`,
    }));
    const keywords = text.trim().replace(/ /g, '');
    return `https://loremflickr.com/800/600/${keywords}`;
  }
);
