'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, Pizza, Book, Wifi, Mic, ArrowRight, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Coffee, text: 'Artisanal Coffee', color: 'text-amber-600' },
    { icon: Pizza, text: 'Fresh Food', color: 'text-red-600' },
    { icon: Book, text: 'Creative Space', color: 'text-blue-600' },
    { icon: Wifi, text: 'Free WiFi', color: 'text-green-600' },
    { icon: Mic, text: 'Live Events', color: 'text-purple-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-30" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
          alt="Artistic cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Floating Badge */}
        <Badge className="mb-8 animate-float bg-primary/90 text-primary-foreground border-0 px-4 py-2 text-sm">
          🎨 First Artistic Café in Siddharth Nagar
        </Badge>

        {/* Main Heading */}
        <h1 className="text-responsive-xl font-bold tracking-tight mb-6 animate-fade-in">
          Where{' '}
          <span className="text-gradient bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Creativity
          </span>{' '}
          Brews
        </h1>

        {/* Subtitle */}
        <p className="text-responsive-md text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in">
          Experience the perfect blend of art, culture, and culinary excellence. 
          A place where every sip inspires and every bite delights.
        </p>

        {/* Animated Feature */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            {(() => {
              const IconComponent = features[currentFeature].icon;
              return <IconComponent className={`w-5 h-5 ${features[currentFeature].color}`} />;
            })()}
            <span className="text-white font-medium">{features[currentFeature].text}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <Button asChild size="lg" className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
            <Link href="/menu" className="flex items-center gap-2">
              Explore Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="btn-modern border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
            <Link href="/order" className="flex items-center gap-2">
              Order Now
              <Play className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Quick Menu Access */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <span className="text-white font-medium">🍕 Quick Menu Access</span>
            <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-amber-400">500+</div>
            <div className="text-sm text-white/70">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-amber-400">50+</div>
            <div className="text-sm text-white/70">Menu Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-amber-400">24/7</div>
            <div className="text-sm text-white/70">WiFi Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-amber-400">5★</div>
            <div className="text-sm text-white/70">Rated</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block animate-float">
        <div className="w-20 h-20 bg-amber-400/20 rounded-full backdrop-blur-sm border border-amber-400/30" />
      </div>
      
      <div className="absolute top-40 right-20 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-red-400/20 rounded-full backdrop-blur-sm border border-red-400/30" />
      </div>
      
             <div className="absolute bottom-40 left-20 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
         <div className="w-12 h-12 bg-amber-400/20 rounded-full backdrop-blur-sm border border-amber-400/30" />
       </div>
    </section>
  );
}
