'use client';

import { useState, useEffect } from 'react';
import { cafeAddress } from '@/lib/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, ShoppingCart, Phone, MapPin, Mail, Pizza, Clock, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Complete Fixed Navigation - Nothing scrolls */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        {/* Main Navigation Bar */}
        <nav className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground font-bold text-xl">☕</span>
                </div>
                <span className="font-bold text-xl text-foreground">
                  The Crafty Bean
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-link text-sm font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="btn-modern bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    const message = `🍽️ *The Crafty Bean - Quick Order*\n\n` +
                                  `Hi! I'd like to place an order.\n\n` +
                                  `📍 *Address:* ${cafeAddress}\n` +
                                  `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                                  `Please help me place an order. Thank you! 🙏`;
                    
                    const whatsappUrl = `https://wa.me/918770149314?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>

              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden p-2"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col h-full mt-6">
                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-4 mb-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`text-lg font-medium transition-colors duration-200 ${
                            pathname === item.href
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-8">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Search menu..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-3 form-input-modern"
                        />
                      </div>
                    </form>

                    {/* Mobile Actions */}
                    <div className="mt-auto space-y-4">
                      <Button asChild className="w-full btn-modern bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/order">Order Now</Link>
                      </Button>
                      <div className="text-center text-sm text-muted-foreground">
                        <p>Open Daily: 8AM - 8PM</p>
                        <p>Call: +91 8770149314</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar (Desktop) */}
            {isSearchOpen && (
              <div className="pb-4 animate-slide-up">
                <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search our menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 form-input-modern"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-2 h-8 px-3"
                  >
                    Search
                  </Button>
                </form>
              </div>
            )}
          </div>
        </nav>

        {/* Info Bar */}
        <div className="bg-primary/10 border-b border-border/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">+91 8770149314</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">hello@craftybean.com</span>
                </div>
              </div>
              
              {/* Quick Menu Access */}
              <div className="flex items-center gap-4">
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/menu" className="flex items-center gap-2">
                    <Pizza className="w-4 h-4" />
                    View Menu
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Open Daily 8AM-8PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navigation */}
      <div className="h-32"></div>
    </>
  );
}
