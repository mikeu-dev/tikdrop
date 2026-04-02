'use client';

import { useState, useEffect, FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Hourglass, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  downloadInfo: { url: string; type: string } | null;
  onDownloadSuccess: () => void;
}

export const DownloadModal: FC<DownloadModalProps> = ({ open, onOpenChange, downloadInfo, onDownloadSuccess }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { t } = useLanguage();

  const handleDownload = async () => {
    if (!downloadInfo) return;
    
    try {
      setIsDownloading(true);
      // Fetch as blob to force silent background download without navigating tabs
      const response = await fetch(downloadInfo.url);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `TikDrop_${Date.now()}.${downloadInfo.type.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      
      onDownloadSuccess();
      onOpenChange(false);
    } catch (error) {
      console.warn('Blob download failed or blocked by CORS, falling back to direct link:', error);
      const link = document.createElement('a');
      link.href = downloadInfo.url;
      link.setAttribute('download', `TikDrop_${Date.now()}.${downloadInfo.type.toLowerCase()}`);
      // Remove target="_blank" to prevent new tabs, relying on browser auto-download mechanisms if possible
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onDownloadSuccess();
      onOpenChange(false);
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-6 transition-all duration-300">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-center">{t('modal.title')}</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            {t('modal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">

          {/* Status & Controls Area */}
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-lg text-center animate-in fade-in zoom-in-95 duration-300 mobile-safe-area">
              <p className="font-semibold flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                {t('modal.ready')}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto min-w-[200px] h-12 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all"
            size="lg"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Download className="mr-2 h-5 w-5" />
            )}
            {isDownloading ? t('result.zipping') : t('modal.button', { type: downloadInfo?.type || '' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
