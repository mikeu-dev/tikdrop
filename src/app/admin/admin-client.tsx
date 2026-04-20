'use client';

import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Users, Download, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

export default function AdminClient() {
    const { user, loading } = useAuth();
    const router = useRouter();
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
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <div className="text-sm text-muted-foreground">Logged in as: {user?.email}</div>
                </div>

                <Tabs defaultValue="dashboard" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="blog">Manage Blog</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {STATS.map((stat, i) => (
                                <Card key={i}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.label}
                                        </CardTitle>
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
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

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">User activity log will appear here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="blog">
                        <BlogManager />
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </>
    );
}
