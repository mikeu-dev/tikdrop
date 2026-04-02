'use client';

import { useState, useEffect } from 'react';
import { Accessibility, Settings2, Type, Contrast, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { useLanguage } from '@/hooks/use-language';

export function AccessibilityWidget() {
  const { t } = useLanguage();
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from local storage on mount
    const savedLargeText = localStorage.getItem('access-large-text') === 'true';
    const savedHighContrast = localStorage.getItem('access-high-contrast') === 'true';
    const savedHighlightLinks = localStorage.getItem('access-highlight-links') === 'true';

    setLargeText(savedLargeText);
    setHighContrast(savedHighContrast);
    setHighlightLinks(savedHighlightLinks);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (largeText) {
      document.documentElement.classList.add('access-large-text');
    } else {
      document.documentElement.classList.remove('access-large-text');
    }
    localStorage.setItem('access-large-text', largeText.toString());

    if (highContrast) {
      document.body.classList.add('access-high-contrast');
    } else {
      document.body.classList.remove('access-high-contrast');
    }
    localStorage.setItem('access-high-contrast', highContrast.toString());

    if (highlightLinks) {
      document.body.classList.add('access-highlight-links');
    } else {
      document.body.classList.remove('access-highlight-links');
    }
    localStorage.setItem('access-highlight-links', highlightLinks.toString());

  }, [largeText, highContrast, highlightLinks, mounted]);

  const resetAll = () => {
    setLargeText(false);
    setHighContrast(false);
    setHighlightLinks(false);
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-0 z-50 -translate-x-[60%] hover:translate-x-0 transition-transform duration-300 ease-out">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-r-2xl rounded-l-none shadow-[4px_0_20px_rgba(var(--primary),0.3)] hover:shadow-[4px_0_25px_rgba(var(--primary),0.5)] h-12 w-12 md:h-14 md:w-14 items-center justify-end pr-2 md:pr-3 pl-10 md:pl-12 ml-5 md:ml-6 hover:ml-0 cursor-pointer transition-all duration-300 ease-out"
            aria-label="Accessibility options"
            title="Accessibility options"
          >
            <Accessibility className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0 rounded-xl overflow-hidden glass border-white/20 dark:border-white/10" align="start" side="right" sideOffset={16}>
          <div className="bg-primary/5 border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Settings2 className="w-5 h-5" />
              <span>Aksesibilitas</span>
            </div>
            {(largeText || highContrast || highlightLinks) && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={resetAll} title="Reset">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="p-4 space-y-5">
            {/* Setting 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Type className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Teks Lebih Besar</p>
                  <p className="text-xs text-muted-foreground">Perbesar ukuran (110%)</p>
                </div>
              </div>
              <Switch checked={largeText} onCheckedChange={setLargeText} />
            </div>

            {/* Setting 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Contrast className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Kontras Tinggi</p>
                  <p className="text-xs text-muted-foreground">Tajamkan visibilitas</p>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            {/* Setting 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <LinkIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Tandai Tautan</p>
                  <p className="text-xs text-muted-foreground">Garis bawahi tombol</p>
                </div>
              </div>
              <Switch checked={highlightLinks} onCheckedChange={setHighlightLinks} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
