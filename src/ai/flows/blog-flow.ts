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
  content: z.string().describe('Full HTML content of the blog post. Include memes descriptions or placeholder image tags.'),
  tags: z.array(z.string()).describe('Array of relevant tags.'),
  author: z.string().describe('Author name.'),
});

export type BlogGeneratorOutput = z.infer<typeof BlogGeneratorOutputSchema>;

const blogGeneratorPrompt = ai.definePrompt({
  name: 'blogGeneratorPrompt',
  input: { schema: BlogGeneratorInputSchema },
  output: { schema: BlogGeneratorOutputSchema },
  prompt: `Anda adalah seorang konten kreator TikTok profesional dan ahli SEO. 
  Tugas Anda adalah membuat artikel blog yang sangat menarik, kaya konten, dan menghibur berdasarkan prompt: "{{prompt}}".
  
  Gunakan bahasa yang santai, gaul, namun tetap informatif (bahasa anak muda TikTok).
  Sisipkan humor dan "bumbu" meme di dalam teks. 
  Untuk gambar/meme, gunakan tag HTML <img> dengan URL placeholder yang relevan atau deskripsi visual yang menarik.
  Pastikan konten minimal 800 kata dan memiliki struktur HTML (h2, h3, p, ul, ol) yang baik.
  
  Format output harus JSON sesuai skema. Bahasa yang digunakan adalah {{language}}.`,
});

export const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: BlogGeneratorInputSchema,
    outputSchema: BlogGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await blogGeneratorPrompt(input);
    if (!output) {
      throw new Error('Gagal menghasilkan konten blog dari AI.');
    }
    return output;
  }
);
