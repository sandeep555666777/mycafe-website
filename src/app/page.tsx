import { Button } from '@/components/ui/button';
import { Coffee, Pizza, Book, Wifi, Mic, Star, Clock, MapPin, Phone, ArrowRight, MessageCircle, Heart, Users, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { MenuQR } from '@/components/menu-qr';

export default function Home() {
  return (
    <div className="bg-background text-foreground font-body flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/margherita.jpg" 
            alt="Cafe atmosphere background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            ☕ First Artistic Café in Siddharth Nagar
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            Where <span className="text-primary">Creativity</span> Brews
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Experience the perfect blend of art, culture, and culinary excellence. 
            A place where every sip inspires and every bite delights.
          </p>
          
          {/* Feature Badge */}
          <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full mb-6">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Free WiFi</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
            <Button asChild size="lg" className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base">
              <Link href="/menu" className="flex items-center gap-2">
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-modern px-6 py-3 text-base">
              <Link href="/events" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                View Events
              </Link>
            </Button>
          </div>
          
          {/* Quick Access */}
          <div className="flex justify-center">
            <Button asChild size="sm" className="btn-modern bg-muted hover:bg-muted/80">
              <Link href="/menu" className="flex items-center gap-2">
                <Pizza className="w-4 h-4" />
                Quick Menu Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-8 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Users, number: "500+", label: "Happy Customers" },
              { icon: Star, number: "4.9", label: "Rating" },
              { icon: Award, number: "3+", label: "Years Experience" },
              { icon: Heart, number: "100%", label: "Fresh Ingredients" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-primary">{stat.number}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Menu Preview */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              🍽️ Popular Items
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              Taste Our Best Sellers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Discover our most loved dishes that keep customers coming back for more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
            {/* Margherita Pizza */}
            <div className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-40 mb-3 overflow-hidden rounded-xl">
                <img 
                  src="/images/margherita.jpg" 
                  alt="Margherita Pizza" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-white border-0 text-xs">🔥 Popular</Badge>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Margherita Pizza</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                Classic delight with 100% real mozzarella cheese, fresh basil, and our signature tomato sauce
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">₹350</span>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href="/menu">View Details</Link>
                </Button>
              </div>
            </div>

            {/* Pepperoni Pizza */}
            <div className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-40 mb-3 overflow-hidden rounded-xl">
                <img 
                  src="/images/pepperoni.jpg" 
                  alt="Pepperoni Pizza" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-500 text-white border-0 text-xs">🌶️ Spicy</Badge>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pepperoni Pizza</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">₹400</span>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href="/menu">View Details</Link>
                </Button>
              </div>
            </div>

            {/* Classic Waffle */}
            <div className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="relative h-40 mb-3 overflow-hidden rounded-xl">
                <img 
                  src="/images/waffle-classic.jpg" 
                  alt="Classic Waffle" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-white border-0 text-xs">🌱 Veg</Badge>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Classic Waffle</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                A simple, elegant waffle served with maple syrup and butter. Perfect for a sweet breakfast or dessert
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">₹180</span>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href="/menu">View Details</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base">
              <Link href="/menu" className="flex items-center gap-2">
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              ✨ Why Choose Us
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              A Vibe Like No Other
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              The Crafty Bean is where our community comes alive. Step in, feel the energy, and be part of a unique experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { icon: Wifi, title: 'Free High-Speed WiFi', description: 'Stay connected with complimentary high-speed internet' },
              { icon: Book, title: 'Cozy Book Nook', description: 'Perfect reading spot with curated collection' },
              { icon: Pizza, title: 'Delicious Food & Coffee', description: 'Fresh ingredients, artisanal preparation' },
              { icon: Mic, title: 'Open Mic Nights', description: 'Showcase your talent or enjoy live performances' },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center group p-5 bg-white/50 rounded-2xl backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              🍽️ Food Gallery
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              Our Delicious Creations
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Take a peek at our mouthwatering pizzas and waffles that keep customers coming back
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/margherita.jpg", alt: "Delicious Margherita Pizza - Our Signature Dish" },
              { src: "/images/pepperoni.jpg", alt: "Spicy Pepperoni Pizza - Classic American Taste" },
              { src: "/images/waffle-classic.jpg", alt: "Classic Waffle - Perfect Breakfast Choice" },
              { src: "/images/waffle-chocolate.jpg", alt: "Chocolate Overload Waffle - Sweet Indulgence" },
            ].map((image, index) => (
              <div key={index} className="h-40 md:h-48 w-full relative rounded-xl overflow-hidden shadow-soft group">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover image-hover" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 bg-card rounded-3xl mx-2 md:mx-8 lg:mx-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="space-y-5">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                🏆 Our Story
              </Badge>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                Siddharth Nagar's First Artistic Café
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We're not just a café — we're a creative hub. A place where art meets aroma, 
                where every cup of coffee is brewed with passion, and every corner inspires 
                you to create, relax, and connect.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Open Daily</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="btn-modern">
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-modern">
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="relative h-56 md:h-64 lg:h-72 w-full rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" 
                  alt="Interior of the cafe" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground p-3 rounded-2xl shadow-strong">
                <div className="text-center">
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-xs">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu QR Code Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              📱 Scan & Order
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              Quick Menu Access
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Scan our QR code to instantly view our complete menu and place your order
            </p>
          </div>
          <div className="flex justify-center">
            <MenuQR />
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              🚀 Ready to Experience?
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              Hungry? Thirsty? Creative?
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              Our kitchen is ready to serve up deliciousness. Order your favorite pizza or waffle 
              and get it delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="btn-modern bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base">
                <a href="https://wa.me/918770149314" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-modern px-6 py-3 text-base">
                <Link href="/contact">Visit Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 text-center">
            <div className="space-y-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <MapPin className="w-6 h-6 text-primary mx-auto" />
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground text-sm">
                Gobrahwa Bazar Road<br />
                Near Hotel Aashiyana<br />
                Siddharth Nagar, UP
              </p>
            </div>
            <div className="space-y-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <Clock className="w-6 h-6 text-primary mx-auto" />
              <h3 className="font-semibold">Hours</h3>
              <p className="text-muted-foreground text-sm">
                Mon - Fri: 8AM - 8PM<br />
                Sat - Sun: 9AM - 10PM
              </p>
            </div>
            <div className="space-y-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <Phone className="w-6 h-6 text-primary mx-auto" />
              <h3 className="font-semibold">Contact</h3>
              <p className="text-muted-foreground text-sm">
                <a href="tel:918770149314" className="hover:text-primary transition-colors">
                  +91 8770149314
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-card border-t">
        <div className="container mx-auto text-center">
          <div className="mb-5">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-foreground font-bold text-lg">☕</span>
            </div>
            <h3 className="text-lg font-bold mb-2">The Crafty Bean</h3>
            <p className="text-muted-foreground text-sm">
              Art in Every Sip. Soul in Every Bite.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mb-5">
            <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link>
            <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
