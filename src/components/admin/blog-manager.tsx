'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/types';
import { getAllPosts, upsertPost, deletePost } from '@/lib/db/blog';
import { 
  generateBlogPostFlow, 
  generateSlugFlow, 
  generateDescriptionFlow, 
  polishContentFlow,
  generateThumbnailFlow
} from '@/ai/flows/blog-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, Sparkles, Trash2, Edit2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { getAdsenseSettings, generateAdsenseScript } from '@/lib/db/settings';
import { formatThumbnailUrl } from '@/lib/utils';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleSeedArticles = async () => {
    if (!confirm('Apakah Anda ingin memicu AI untuk menghasilkan 5 artikel blog premium tentang TikTok & Media Sosial secara otomatis langsung ke database? Ini akan memakan waktu sekitar 1-2 menit.')) return;
    setIsSeeding(true);
    toast({ title: "Mulai Memproses", description: "AI sedang membuat artikel berkualitas satu per satu. Jangan menutup halaman ini." });

    const seedPrompts = [
      "Panduan lengkap cara mengoptimalkan video TikTok agar FYP di tahun 2026: memahami algoritma terbaru, penggunaan hashtag pintar, dan trik visual di detik pertama.",
      "Cara download video TikTok tanpa watermark secara aman dan etis: etika hak cipta kreator dan cara membagikan ulang konten secara legal.",
      "Tren editing video TikTok 2026: rahasia transisi yang viral, teknik color grading sinematik menggunakan aplikasi gratis, dan cara membuat hook menarik.",
      "Cara menghasilkan uang dari TikTok Affiliate dan TikTok Shop untuk pemula: langkah demi langkah dari nol pengikut hingga pecah telur komisi pertama.",
      "Panduan privasi dan keamanan akun TikTok: cara melindungi data pribadi dari pengintai dan mengamankan akun dari pembajakan dengan otentikasi dua faktor."
    ];

    let successCount = 0;
    for (const promptText of seedPrompts) {
      try {
        const result = await generateBlogPostFlow({ prompt: promptText, language: 'id' });
        const finalContent = await injectAdsense(result.content);
        
        await upsertPost({
          ...result,
          content: finalContent,
          date: new Date().toISOString().split('T')[0],
          author: 'TikDrop Editorial Team'
        } as BlogPost);
        
        successCount++;
        toast({ title: `Artikel ${successCount}/${seedPrompts.length} Berhasil`, description: `"${result.title}" disimpan ke database.` });
      } catch (err) {
        console.error("Gagal seeding artikel:", err);
        toast({ title: "Artikel Gagal", description: `Gagal membuat artikel untuk prompt: "${promptText.substring(0, 30)}..."`, variant: "destructive" });
      }
    }

    setIsSeeding(false);
    toast({ title: "Proses Selesai", description: `Berhasil menambahkan ${successCount} artikel premium ke database.` });
    fetchPosts();
  };

  const injectAdsense = async (content: string) => {
    const adsSettings = await getAdsenseSettings();
    if (adsSettings?.isEnabled) {
      const adScript = generateAdsenseScript(adsSettings);
      if (adScript && !content.includes('adsbygoogle')) {
        const paragraphs = content.split('\n\n');
        if (paragraphs.length > 3) {
          paragraphs.splice(2, 0, adScript);
          return paragraphs.join('\n\n');
        } else {
          return content + '\n\n' + adScript;
        }
      }
    }
    return content;
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogPostFlow({ prompt: aiPrompt, language: 'id' });
      const finalContent = await injectAdsense(result.content);
      setCurrentPost({
        ...result,
        content: finalContent,
        date: new Date().toISOString().split('T')[0],
        author: 'Admin'
      });
      toast({ title: "Konten Berhasil Dibuat!", description: "Silakan periksa dan simpan." });
    } catch (error) {
      console.error(error);
      toast({ title: "Gagal!", description: "AI gagal menghasilkan konten.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMagicSlug = async () => {
    if (!currentPost.title) return;
    try {
      const slug = await generateSlugFlow(currentPost.title);
      setCurrentPost({...currentPost, slug});
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal generate slug.", variant: "destructive" });
    }
  };

  const handleMagicDescription = async () => {
    if (!currentPost.title) return;
    try {
      const desc = await generateDescriptionFlow(currentPost.title);
      setCurrentPost({...currentPost, description: desc});
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal generate deskripsi.", variant: "destructive" });
    }
  };

  const handleMagicPolish = async () => {
    if (!currentPost.content) return;
    try {
      const polished = await polishContentFlow(currentPost.content);
      setCurrentPost({...currentPost, content: polished});
      toast({ title: "Berhasil!", description: "Konten telah dipoles." });
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal memoles konten.", variant: "destructive" });
    }
  };

  const handleMagicThumbnail = async () => {
    if (!currentPost.title) return;
    try {
      const thumbUrl = await generateThumbnailFlow(currentPost.title);
      setCurrentPost({...currentPost, thumbnail: thumbUrl});
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal generate thumbnail.", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    if (!currentPost.slug || !currentPost.title) {
      toast({ title: "Error", description: "Slug dan Judul wajib diisi.", variant: "destructive" });
      return;
    }
    try {
      // Jika slug berubah, hapus dokumen lama terlebih dahulu
      if (originalSlug && originalSlug !== currentPost.slug) {
        await deletePost(originalSlug);
      }

      // Injeksi otomatis iklan jika aktif
      const finalContent = await injectAdsense(currentPost.content || '');
      
      await upsertPost({
        ...currentPost,
        content: finalContent
      } as BlogPost);
      
      toast({ title: "Berhasil!", description: "Artikel telah disimpan." });
      setIsEditing(false);
      setCurrentPost({});
      setOriginalSlug(null);
      fetchPosts();
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal menyimpan artikel.", variant: "destructive" });
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      await deletePost(slug);
      toast({ title: "Terhapus!", description: "Artikel telah dihapus." });
      fetchPosts();
    } catch (error) {
      toast({ title: "Gagal!", description: "Gagal menghapus artikel.", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button onClick={handleSeedArticles} disabled={isSeeding} variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                {isSeeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} 
                {isSeeding ? 'Seeding...' : 'Seed Premium Articles'}
              </Button>
              <Button onClick={() => { setIsEditing(true); setCurrentPost({}); setOriginalSlug(null); }}>
                <Plus className="w-4 h-4 mr-2" /> Add New Post
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>{currentPost.slug ? 'Edit Post' : 'New Post'}</CardTitle>
            <CardDescription>Gunakan AI untuk membantu menulis konten yang menarik.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Generate with Gemini AI
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Contoh: Tutorial download video tiktok tanpa watermark yang kocak..." 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button onClick={handleGenerateAI} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  Slug (URL)
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]" onClick={handleMagicSlug} title="Generate from Title">
                    <Sparkles className="w-3 h-3 mr-1" /> Magic Slug
                  </Button>
                </label>
                <Input 
                  value={currentPost.slug || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})}
                  placeholder="cara-download-tiktok"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={currentPost.title || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                  placeholder="Judul Artikel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Thumbnail URL
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]" onClick={handleMagicThumbnail} title="Generate from Title">
                  <Sparkles className="w-3 h-3 mr-1" /> Magic Thumb
                </Button>
              </label>
              <div className="flex gap-4 items-start">
                <Input 
                  value={currentPost.thumbnail || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, thumbnail: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                />
                {currentPost.thumbnail && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border shrink-0">
                    <img src={formatThumbnailUrl(currentPost.thumbnail)} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Description
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]" onClick={handleMagicDescription} title="Generate from Title">
                  <Sparkles className="w-3 h-3 mr-1" /> Magic Desc
                </Button>
              </label>
              <Input 
                value={currentPost.description || ''} 
                onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                placeholder="Meta description untuk SEO"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Content (Markdown)
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]" onClick={handleMagicPolish} title="Polish & Improve Grammar">
                  <Sparkles className="w-3 h-3 mr-1" /> Magic Polish
                </Button>
              </label>
              <div data-color-mode="light" className="border rounded-xl overflow-hidden">
                <MDEditor
                  value={currentPost.content || ''}
                  onChange={(val) => setCurrentPost({...currentPost, content: val || ''})}
                  height={500}
                  preview="live"
                  hideToolbar={false}
                  enableScroll={true}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Editor mendukung sintaks Markdown penuh (## Judul, **Tebal**, ![Gambar](url), dll).</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Save Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:border-primary/30 transition-colors">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  {post.thumbnail && (
                    <div className="w-16 h-16 rounded-md overflow-hidden border shrink-0">
                      <img src={formatThumbnailUrl(post.thumbnail)} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">/{post.slug} • {post.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setIsEditing(true); setCurrentPost(post); setOriginalSlug(post.slug); }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.slug)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && <p className="text-center text-muted-foreground py-12 border rounded-lg border-dashed">Belum ada artikel di Firestore.</p>}
        </div>
      )}
    </div>
  );
}
