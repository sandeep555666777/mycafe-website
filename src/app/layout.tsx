import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Pizza } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const cafeAddress = "Gobrahwa bazar road shastri nagar in front of little angle play school tettri bazar siddharth nagar";

export const metadata: Metadata = {
  title: "The Crafty Bean - Artistic Café",
  description: "Where creativity brews. Experience the perfect blend of art, culture, and culinary excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        
        {/* Site-wide Footer */}
        <footer className="py-8 bg-card border-t mt-20">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p className="font-medium text-foreground">The Crafty Bean</p>
            <p className="mt-1">📍 {cafeAddress}</p>
          </div>
        </footer>
        
        {/* Floating Menu Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button asChild size="lg" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110">
            <Link href="/menu" className="flex items-center justify-center">
              <Pizza className="w-8 h-8" />
            </Link>
          </Button>
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}
