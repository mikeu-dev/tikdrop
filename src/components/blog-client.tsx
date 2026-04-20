'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  // Filter posts based on search and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const featured = filteredPosts[0];
  const others = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/30 backdrop-blur-md p-4 rounded-2xl border border-primary/10 sticky top-24 z-30 shadow-xl">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Cari artikel (misal: cara download, fyp...)" 
            className="pl-10 bg-background/50 border-primary/5 focus:border-primary/30 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <Button 
            variant={selectedTag === null ? "default" : "outline"} 
            size="sm" 
            onClick={() => setSelectedTag(null)}
            className="rounded-full text-xs h-8"
          >
            All
          </Button>
          {allTags.map(tag => (
            <Button 
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"} 
              size="sm" 
              onClick={() => setSelectedTag(tag)}
              className="rounded-full text-xs h-8 whitespace-nowrap"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-bold">Hasil tidak ditemukan</h3>
          <p className="text-muted-foreground">Coba gunakan kata kunci lain atau hapus filter.</p>
          <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedTag(null); }}>
            Reset Pencarian
          </Button>
        </div>
      ) : (
        <>
          {/* Featured Post (Only show if not searching/filtering or if it's the first result) */}
          {featured && (
            <div className="mb-20">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <Card className="overflow-hidden border-primary/10 bg-card/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-primary/30">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                      {featured.thumbnail ? (
                        <img 
                          src={featured.thumbnail} 
                          alt={featured.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                          <span className="text-primary font-bold text-6xl opacity-10">TikDrop</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {featured.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/20 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground/70 mb-6 font-mono">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8 line-clamp-3 font-light leading-relaxed">
                        {featured.description}
                      </p>
                      <div>
                        <span className="inline-flex items-center gap-2 text-primary font-bold group/btn">
                          Baca Artikel Lengkap 
                          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Secondary Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex">
                <Card className="flex flex-col overflow-hidden border-primary/5 bg-card/30 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20">
                  <div className="relative aspect-video overflow-hidden">
                    {post.thumbnail ? (
                      <img 
                        src={post.thumbnail} 
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-3xl opacity-10">TikDrop</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      {post.tags?.[0] && (
                        <span className="px-2.5 py-1 bg-primary/90 text-primary-foreground text-[10px] font-bold rounded-md uppercase tracking-tighter">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <CardHeader className="p-6 grow">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 mb-3 font-mono">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span>{post.author}</span>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-4 line-clamp-2 font-light opacity-80 leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <span className="text-xs text-primary font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
