'use client';

import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Users, Download, DollarSign } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock data
const STATS = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
    { label: 'Total Downloads', value: '54,321', icon: Download, change: '+25%' },
    { label: 'Revenue', value: '$12,345', icon: DollarSign, change: '+15%' },
    { label: 'Active Sessions', value: '567', icon: BarChart, change: '+5%' },
];

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogManager } from '@/components/admin/blog-manager';
import { SettingsManager } from '@/components/admin/settings-manager';

export default function AdminClient() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'dashboard';
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth?callbackUrl=/admin');
            } else {
                const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
                if (user.email === adminEmail) {
                    setIsAdmin(true);
                } else {
                    router.push('/');
                }
            }
        }
    }, [user, loading, router]);

    if (loading || !isAdmin) {
        return <div className="min-h-screen flex items-center justify-center"><Skeleton className="h-12 w-12 rounded-full" /></div>;
    }

    return (
        <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <div className="text-sm text-muted-foreground font-mono bg-muted px-3 py-1 rounded-full">
                        {user?.email}
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={(value) => router.push(`/admin?tab=${value}`)} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[600px] p-1 bg-muted/50">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="blog">Manage Blog</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {STATS.map((stat, i) => (
                                <Card key={i} className="border-primary/5 bg-card/50 backdrop-blur-md">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.label}
                                        </CardTitle>
                                        <stat.icon className="h-4 w-4 text-primary" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {stat.change} from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="border-primary/5 bg-card/50 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">User activity log will appear here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="blog" className="animate-in fade-in duration-500">
                        <BlogManager />
                    </TabsContent>

                    <TabsContent value="settings" className="animate-in fade-in duration-500">
                        <SettingsManager />
                    </TabsContent>
                </Tabs>
        </div>
    );
}
