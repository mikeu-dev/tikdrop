'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/types';
import { getAllPosts, upsertPost, deletePost } from '@/lib/db/blog';
import { generateBlogPostFlow } from '@/ai/flows/blog-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, Sparkles, Trash2, Edit2, Save, X, Eye, PenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleGenerateAI = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const result = await generateBlogPostFlow({ prompt: aiPrompt, language: 'id' });
      setCurrentPost({
        ...result,
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

  const handleSave = async () => {
    if (!currentPost.slug || !currentPost.title) {
      toast({ title: "Error", description: "Slug dan Judul wajib diisi.", variant: "destructive" });
      return;
    }
    try {
      await upsertPost(currentPost as BlogPost);
      toast({ title: "Berhasil!", description: "Artikel telah disimpan." });
      setIsEditing(false);
      setCurrentPost({});
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
        {!isEditing && (
          <Button onClick={() => { setIsEditing(true); setCurrentPost({}); }}>
            <Plus className="w-4 h-4 mr-2" /> Add New Post
          </Button>
        )}
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
                <label className="text-sm font-medium">Slug (URL)</label>
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
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={currentPost.description || ''} 
                onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                placeholder="Meta description untuk SEO"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Tabs defaultValue="edit" className="w-full border rounded-xl overflow-hidden">
                <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
                  <TabsTrigger value="edit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background py-2 px-4 gap-2">
                    <PenLine className="w-4 h-4" /> Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background py-2 px-4 gap-2">
                    <Eye className="w-4 h-4" /> Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="p-0 m-0">
                  <Textarea 
                    className="min-h-[400px] font-mono text-sm border-0 focus-visible:ring-0 resize-y p-4"
                    value={currentPost.content || ''} 
                    onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                    placeholder="Masukkan konten HTML di sini..."
                  />
                </TabsContent>
                <TabsContent value="preview" className="p-0 m-0">
                  <div className="min-h-[400px] p-6 bg-white dark:bg-slate-950 overflow-auto">
                    <div 
                      className="prose prose-sm md:prose-base dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:text-foreground
                        prose-p:text-muted-foreground prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-li:text-muted-foreground prose-strong:text-foreground
                        prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:border prose-img:border-primary/10"
                      dangerouslySetInnerHTML={{ __html: currentPost.content || '<p class="text-muted-foreground italic">Belum ada konten untuk dipratinjau.</p>' }} 
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <p className="text-[10px] text-muted-foreground">Tip: Gunakan tag HTML standar seperti &lt;p&gt;, &lt;h2&gt;, &lt;img&gt;, &lt;ul&gt;, dll.</p>
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
                <div>
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">/{post.slug} • {post.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setIsEditing(true); setCurrentPost(post); }}>
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
