'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
}
