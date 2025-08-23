'use client';

import { useState } from 'react';
import { Pizza, Cookie, Filter, Search, Star, Clock, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { MenuCard } from '@/components/menu-card';
import { WhatsAppOrder } from '@/components/whatsapp-order';

const menuItems = {
  pizzas: [
    { 
      name: 'Margherita Pizza', 
      price: '₹350', 
      description: 'Classic delight with 100% real mozzarella cheese, fresh basil, and our signature tomato sauce', 
      image: '/images/margherita.jpg',
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Pepperoni Pizza', 
      price: '₹400', 
      description: 'A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese', 
      image: '/images/pepperoni.jpg',
      rating: 4.6,
      popular: true
    },
    { 
      name: 'Veggie Supreme Pizza', 
      price: '₹380', 
      description: 'A supreme combination of black olives, onion, capsicum, grilled mushroom, corn, tomato & jalapeno', 
      image: '/images/veggie.jpg',
      rating: 4.7,
      vegetarian: true
    },
  ],
  waffles: [
    { 
      name: 'Classic Waffle', 
      price: '₹180', 
      description: 'A simple, elegant waffle served with maple syrup and butter. Perfect for a sweet breakfast or dessert.', 
      image: '/images/waffle-classic.jpg',
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Chocolate Overload Waffle', 
      price: '₹250', 
      description: 'For the chocolate lovers! A rich waffle with chocolate chips, chocolate sauce, and chocolate ice cream.', 
      image: '/images/waffle-chocolate.jpg',
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Berry Blast Waffle', 
      price: '₹220', 
      description: 'A fruity delight with fresh berries, whipped cream, and a drizzle of berry coulis.', 
      image: '/images/waffle-berry.jpg',
      rating: 4.6,
      vegetarian: true
    },
  ],
};

const categories = [
  { id: 'all', name: 'All Items', count: menuItems.pizzas.length + menuItems.waffles.length },
  { id: 'pizzas', name: 'Pizzas', count: menuItems.pizzas.length, icon: Pizza },
  { id: 'waffles', name: 'Waffles', count: menuItems.waffles.length, icon: Cookie },
];

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleWhatsAppOrder = (item: any) => {
    const message = `🍽️ *The Crafty Bean - Quick Order*\n\n` +
                   `📋 *Item:* ${item.name}\n` +
                   `💰 *Price:* ${item.price}\n` +
                   `📝 *Description:* ${item.description}\n\n` +
                   `📍 *Location:* The Crafty Bean Cafe\n` +
                   `⏰ *Order Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                   `Please confirm this order and provide your delivery address. Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/918770149314?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppOrderWithAddress = () => {
    const message = `🍽️ *The Crafty Bean - Menu Inquiry*\n\n` +
                   `Hi! I'd like to see your menu and place an order with delivery.\n\n` +
                   `📍 *Location:* The Crafty Bean Cafe\n` +
                   `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                   `Please share your menu and help me place an order with delivery address. Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/918770149314?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const allItems = [...menuItems.pizzas, ...menuItems.waffles];
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'pizzas' && menuItems.pizzas.includes(item)) ||
                           (selectedCategory === 'waffles' && menuItems.waffles.includes(item));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background text-foreground font-body min-h-screen">
      {/* Hero Header */}
      <header className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            🍽️ Our Menu
          </Badge>
          <h1 className="text-responsive-xl font-bold mb-4">
            Handcrafted with Love
          </h1>
          <p className="text-responsive-md text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our carefully curated selection of artisanal pizzas and delectable waffles, 
            each crafted with the finest ingredients and a passion for flavor.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>500+ Orders</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search menu items..."
                className="pl-10 pr-4 py-3 form-input-modern"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="btn-modern">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="btn-modern">
                Sort by
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Items */}
          <TabsContent value="all" className="space-y-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Pizza className="text-primary h-8 w-8" />
                  Pizzas
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.pizzas.map((item) => (
                    <MenuCard
                      key={item.name}
                      {...item}
                      category="pizza"
                      onOrder={() => handleWhatsAppOrder(item)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Cookie className="text-primary h-8 w-8" />
                  Waffles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.waffles.map((item) => (
                    <MenuCard
                      key={item.name}
                      {...item}
                      category="waffle"
                      onOrder={() => handleWhatsAppOrder(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Pizzas Only */}
          <TabsContent value="pizzas" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Pizza className="text-primary h-8 w-8" />
              Our Pizzas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.pizzas.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="pizza"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Waffles Only */}
          <TabsContent value="waffles" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Cookie className="text-primary h-8 w-8" />
              Our Waffles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.waffles.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="waffle"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* WhatsApp Order Section */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Want to Order Multiple Items?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Order multiple items or customize your order through WhatsApp!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  WhatsApp Order
                </CardTitle>
                <CardDescription>
                  Order multiple items or customize your order through WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Order via WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">
                    Click below to open WhatsApp and place your order
                  </p>
                                    <div className="space-y-3">
                    <Button 
                      onClick={handleWhatsAppOrderWithAddress}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 w-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Order with Delivery
                    </Button>
                    <Button 
                      onClick={() => {
                        const message = `🍽️ *The Crafty Bean - Menu Inquiry*\n\n` +
                                      `Hi! I'd like to see your menu and place an order.\n\n` +
                                      `📍 *Location:* The Crafty Bean Cafe\n` +
                                      `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                                      `Please share your menu and help me place an order. Thank you! 🙏`;
                        
                        const whatsappUrl = `https://wa.me/918770149314?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      variant="outline"
                      className="px-8 py-3 w-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Menu Only
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Other Ways to Connect</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Button asChild size="lg" className="btn-modern bg-green-600 hover:bg-green-700 text-white">
               <a href="https://wa.me/918770149314" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-modern">
              <Link href="/contact">Visit Our Cafe</Link>
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-12 bg-card border-t mt-20">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-xl">☕</span>
            </div>
            <h3 className="text-xl font-bold mb-2">The Crafty Bean</h3>
            <p className="text-muted-foreground">
              Art in Every Sip. Soul in Every Bite.
            </p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link>
            <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
