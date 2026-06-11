import { Metadata } from 'next';
import HistoryClient from './history-client';

export const metadata: Metadata = {
    title: 'Download History',
    description: 'Lihat riwayat unduhan video TikTok Anda di TikDrop.',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: '/history/',
    },
};

export default function HistoryPage() {
    return <HistoryClient />;
}
