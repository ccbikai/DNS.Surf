import { cn } from "@/lib/utils";
import Header from '@/components/Header'
import Footer from "@/components/Footer";


export default function Layout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex flex-1">
        <div className={cn("container mx-auto", className)}>
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
