'use client';

import { useState, useEffect } from 'react';
import { AdsenseSettings, getAdsenseSettings, saveAdsenseSettings } from '@/lib/db/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save, ExternalLink, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SettingsManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<AdsenseSettings>({
    adClient: '',
    adSlot: '',
    isEnabled: false
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    const data = await getAdsenseSettings();
    if (data) {
      setSettings(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveAdsenseSettings(settings);
      toast({ title: "Berhasil", description: 'Pengaturan AdSense berhasil disimpan' });
    } catch (error) {
      toast({ title: "Gagal", description: 'Gagal menyimpan pengaturan', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Google AdSense Configuration
          </CardTitle>
          <CardDescription>
            Atur integrasi iklan otomatis pada konten blog Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">Aktifkan Iklan</Label>
              <p className="text-sm text-muted-foreground">
                Jika diaktifkan, iklan akan otomatis disisipkan saat artikel baru dibuat.
              </p>
            </div>
            <Switch 
              checked={settings.isEnabled} 
              onCheckedChange={(val) => setSettings({...settings, isEnabled: val})} 
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adClient">Ad Client ID (ca-pub-xxx)</Label>
              <Input 
                id="adClient" 
                placeholder="ca-pub-6698556269439251" 
                value={settings.adClient}
                onChange={(e) => setSettings({...settings, adClient: e.target.value})}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adSlot">Ad Slot ID</Label>
              <Input 
                id="adSlot" 
                placeholder="3745392242" 
                value={settings.adSlot}
                onChange={(e) => setSettings({...settings, adSlot: e.target.value})}
                className="bg-background/50"
              />
            </div>
          </div>

          <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Penting</AlertTitle>
            <AlertDescription className="text-xs">
              Sistem akan menyisipkan kode iklan di bagian tengah artikel. Pastikan akun AdSense Anda sudah disetujui.
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="w-full font-bold shadow-lg shadow-primary/20"
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Konfigurasi
          </Button>

          <div className="pt-4 border-t border-primary/5 flex justify-center">
            <a 
              href="https://adsense.google.com" 
              target="_blank" 
              className="text-xs text-primary flex items-center gap-1 hover:underline font-mono"
            >
              Buka Google AdSense Console <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
