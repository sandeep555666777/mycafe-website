import Image from 'next/image';
import { Users, Wifi, Book, Pizza, Mic, Coffee, Heart, Star, Award, MapPin, Clock, Phone, Instagram, Facebook, Twitter, Youtube, ArrowRight, Sparkles, Palette, Music, Camera, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';

// Safe Image Component with Error Handling
function SafeImage({ src, alt, className, fallbackSrc = "/images/margherita.jpg", ...props }: any) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

export default function AboutPage() {
  const features = [
    {
      icon: Wifi,
      title: "Free High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Book,
      title: "Cozy Book Nook",
      description: "Perfect reading spot with curated collection",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Pizza,
      title: "Delicious Food & Coffee",
      description: "Fresh ingredients, artisanal preparation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mic,
      title: "Open Mic Nights",
      description: "Showcase your talent or enjoy live performances",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Art Gallery Space",
      description: "Local artists showcase their creativity",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Music,
      title: "Live Music Events",
      description: "Regular performances and jam sessions",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "4.9", label: "Rating", icon: Star },
    { number: "3+", label: "Years Experience", icon: Award },
    { number: "100%", label: "Fresh Ingredients", icon: Heart }
  ];

  const team = [
    {
      name: "Rahil",
      role: "Founder & Creative Director",
      image: "/images/event-art.jpg",
      description: "The visionary behind our creative concept, passionate about bringing art and community together."
    },
    {
      name: "Shabina",
      role: "Founder & Operations Manager",
      image: "/images/event-mic.jpg",
      description: "Ensuring every detail is perfect, from the coffee beans to the customer experience."
    }
  ];

  const galleryImages = [
    "/images/margherita.jpg",
    "/images/pepperoni.jpg", 
    "/images/veggie.jpg",
    "/images/waffle-berry.jpg",
    "/images/waffle-chocolate.jpg",
    "/images/waffle-classic.jpg"
  ];

  return (
    <div className="bg-background text-foreground font-body">
      {/* Hero Header */}
      <header className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Decorative Coffee Cup */}
        <div className="absolute top-20 right-20 w-24 h-24 text-amber-600/20">
          <Coffee className="w-full h-full" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            ☕ Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            About The Crafty Bean
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where creativity brews, art meets aroma, and every corner inspires you to create, relax, and connect.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-amber-200/50">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-amber-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
      </header>
      
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Our Story Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🎭 Our Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Story Behind <span className="text-primary">The Crafty Bean</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are Rahil & Shabina — two souls who believe that every town deserves a corner where imagination feels at home.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our journey started with a simple question: "Why isn't there a peaceful place in Siddharthnagar where minds can pause, create, and sip?" So we built one. From sketchbooks to steaming cups, this is our dream served warm.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We envisioned a space where artists, writers, students, and dreamers could find their creative spark. A place where the aroma of freshly brewed coffee mingles with the energy of creative minds at work.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/menu" className="flex items-center gap-2">
                    Explore Our Menu
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full h-48 relative rounded-2xl overflow-hidden shadow-lg">
                    <SafeImage 
                      src={galleryImages[0]} 
                      alt="Delicious Margherita Pizza" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full h-32 relative rounded-2xl overflow-hidden shadow-lg">
                    <SafeImage 
                      src={galleryImages[1]} 
                      alt="Pepperoni Pizza" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="w-full h-32 relative rounded-2xl overflow-hidden shadow-lg">
                    <SafeImage 
                      src={galleryImages[2]} 
                      alt="Veggie Pizza" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full h-48 relative rounded-2xl overflow-hidden shadow-lg">
                    <SafeImage 
                      src={galleryImages[3]} 
                      alt="Berry Waffle" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              👥 Meet Our Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The <span className="text-primary">Creative Minds</span> Behind It All
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate founders who turned a dream into reality and created Siddharth Nagar's first artistic café.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 relative mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                    <SafeImage 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">{member.name}</h3>
                  <p className="text-lg text-muted-foreground mb-4 font-medium">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              A <span className="text-primary">Vibe</span> Like No Other
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Crafty Bean is where our community comes alive. Step in, feel the energy, and be part of a unique experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🎯 Our Values
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What <span className="text-primary">Drives</span> Us Forward
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion for Quality</h3>
              <p className="text-muted-foreground">Every cup of coffee, every dish, every moment is crafted with love and attention to detail.</p>
            </Card>

            <Card className="text-center p-8 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Creative Community</h3>
              <p className="text-muted-foreground">We believe in fostering creativity and building a community where artists and dreamers thrive.</p>
            </Card>

            <Card className="text-center p-8 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">We strive for excellence in everything we do, from our coffee to our customer service.</p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl">
          <div className="max-w-3xl mx-auto px-4">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🚀 Ready to Experience?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-primary">Creative Community</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Come visit us and experience the perfect blend of art, culture, and culinary excellence. 
              Where every sip inspires and every bite delights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link href="/menu" className="flex items-center gap-2">
                  Explore Our Menu
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Link href="/contact">Visit Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">☕</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              The Crafty Bean
            </h3>
            <p className="text-slate-300">Art in Every Sip. Soul in Every Bite.</p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
