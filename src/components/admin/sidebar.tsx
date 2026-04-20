'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Home,
  Users,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', id: 'dashboard', icon: LayoutDashboard },
    { name: 'Manage Blog', href: '/admin?tab=blog', id: 'blog', icon: FileText },
    { name: 'User Stats', href: '/admin?tab=users', id: 'users', icon: Users },
    { name: 'Analytics', href: '/admin?tab=analytics', id: 'analytics', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-xl h-screen sticky top-0 hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="bg-primary p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="font-bold text-xl tracking-tight">Admin<span className="text-primary">Panel</span></span>
      </div>

      <nav className="grow p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors w-full">
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Site</span>
        </Link>
        <Button 
          variant="ghost" 
          onClick={() => logout()}
          className="w-full justify-start gap-3 px-4 py-6 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
