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
  2. **Typography & Structure**:
     - Gunakan hierarki visual yang jelas: ## untuk bagian utama, ### untuk poin bersarang.
     - Gunakan Blockquotes (>) untuk "Pro Tips", poin penting, atau observasi humoris.
     - Gunakan **Tebal** secara strategis.
     - Gunakan list (ul/ol) untuk memecah teks yang panjang.
     - Sertakan blok kode jika relevan dengan sintaks modern.
  3. **Humor & Memes**: Sertakan 2-3 lelucon teknis atau observasi meme yang relevan dengan dunia developer/konten kreator.
  4. **Images**: Sertakan 2-3 gambar relevan menggunakan sintaks Markdown: ![Alt Text Deskriptif](https://loremflickr.com/800/600/tech,coding,humor).
  5. **SEO Optimization**:
     - Pastikan kata kunci utama muncul secara natural.
     - Judul dan deskripsi harus dioptimalkan untuk Click-Through Rate (CTR).
     - Alt text gambar harus deskriptif.

  Format output harus JSON sesuai skema. Bahasa yang digunakan adalah {{language}}.`,
});

export const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: BlogGeneratorInputSchema,
    outputSchema: BlogGeneratorOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await blogGeneratorPrompt(input);
      if (!output) {
        throw new Error('Gagal menghasilkan konten blog dari AI (output kosong).');
      }
      return output;
    } catch (error) {
      console.error('AI Flow Error Details:', error);
      throw error;
    }
  }
);
