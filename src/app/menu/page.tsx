'use client';

import { useState } from 'react';
import { Pizza, Cookie, Filter, Search, Star, Clock, TrendingUp, MessageCircle, Coffee, Utensils, Sandwich, CupSoda, Flame, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { MenuCard } from '@/components/menu-card';
import { WhatsAppOrder } from '@/components/whatsapp-order';

const menuItems = {
  desiBites: [
    { 
      name: 'Onion Pakoda', 
      price: '₹120', 
      description: 'Crispy bites of tradition - Golden-fried onion fritters with spices.', 
      image: '/images/veggie.jpg', // Using veggie image as it's food-related
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Pakoda', 
      price: '₹150', 
      description: 'Soft inside, crunchy outside - Juicy paneer cubes in spiced batter, deep-fried.', 
      image: '/images/veggie.jpg', // Using veggie image as it's food-related
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
  ],
  maggiPasta: [
    { 
      name: 'Plain Maggi', 
      price: '₹80', 
      description: 'Simple, soulful & satisfying - Classic comfort noodles cooked to perfection.', 
      image: '/images/veggie.jpg', // Using veggie image for noodles
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Veg Maggi', 
      price: '₹100', 
      description: 'A healthy twist on nostalgia - Loaded with fresh vegetables.', 
      image: '/images/veggie.jpg', // Perfect match - veg maggi with veggie image
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Cheese Maggi', 
      price: '₹120', 
      description: 'Cheese makes everything better - Creamy cheesy goodness with Maggi.', 
      image: '/images/margherita.jpg', // Using margherita for cheesy dishes
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'White Sauce Pasta', 
      price: '₹180', 
      description: 'Silky, creamy, dreamy - Pasta in rich white sauce.', 
      image: '/images/margherita.jpg', // Using margherita for pasta dishes
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Red Sauce Pasta', 
      price: '₹160', 
      description: 'A tangy Italian romance - Tomato-based pasta with herbs.', 
      image: '/images/veggie.jpg', // Using veggie for tomato-based pasta
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Cheese Baked Pasta', 
      price: '₹200', 
      description: 'Cheese lava on your plate - Baked till golden, oozing with cheese.', 
      image: '/images/margherita.jpg', // Using margherita for cheesy baked dishes
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
  ],
  pizzas: [
    { 
      name: 'Margherita Pizza', 
      price: '₹350', 
      description: 'Simplicity at its cheesiest - Tomato, mozzarella & basil.', 
      image: '/images/margherita.jpg', // Perfect match - existing margherita pizza image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Veggie Overload Pizza', 
      price: '₹380', 
      description: 'Every bite, a garden party - Bell peppers, onions, corn & olives.', 
      image: '/images/veggie.jpg', // Perfect match - existing veggie pizza image
      rating: 4.7,
      vegetarian: true
    },
    { 
      name: 'Paneer Tikka Pizza', 
      price: '₹400', 
      description: 'When Italy meets India - Tikka-flavored paneer on a cheesy base.', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder for paneer tikka
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
  ],
  burgers: [
    { 
      name: 'Aloo Tikki Burger', 
      price: '₹150', 
      description: 'Street-style desi bite - Crispy potato patty with tangy sauces.', 
      image: '/images/veggie.jpg', // Using veggie image for potato-based burger
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Veg Patty Burger', 
      price: '₹160', 
      description: 'Classic, hearty & filling - Veg patty with cheese & lettuce.', 
      image: '/images/veggie.jpg', // Perfect match - veg burger with veggie image
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Cheese Veg Grilled Burger', 
      price: '₹180', 
      description: 'Melted cheese magic - Grilled to perfection with gooey cheese.', 
      image: '/images/margherita.jpg', // Using margherita for cheesy burger
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Burger', 
      price: '₹200', 
      description: 'Paneer lovers paradise - Juicy paneer patty in soft buns.', 
      image: '/images/veggie.jpg', // Using veggie image for paneer burger
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Chicken Patty Burger', 
      price: '₹220', 
      description: 'For the meat lovers - Classic chicken burger with sauces.', 
      image: '/images/pepperoni.jpg', // Using pepperoni for meat-based burger
      rating: 4.6,
      popular: false,
      vegetarian: false
    },
    { 
      name: 'Crispy Burger', 
      price: '₹170', 
      description: 'Crunch that speaks louder - Crispy patty, fresh veggies & mayo.', 
      image: '/images/veggie.jpg', // Using veggie image for crispy burger
      rating: 4.5,
      popular: false,
      vegetarian: false
    },
  ],
  hotCoffee: [
    { 
      name: 'Cappuccino', 
      price: '₹120', 
      description: 'Foam that feels like a hug - Espresso with steamed milk & foam.', 
      image: '/images/waffle-chocolate.jpg', // Using chocolate waffle for coffee drinks
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Latte', 
      price: '₹130', 
      description: 'Smoothness in every sip - Espresso & steamed milk.', 
      image: '/images/waffle-chocolate.jpg', // Using chocolate waffle for coffee drinks
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Mocha', 
      price: '₹140', 
      description: 'Chocolates coffee affair - Espresso with cocoa & milk.', 
      image: '/images/waffle-chocolate.jpg', // Perfect match - chocolate mocha with chocolate waffle
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Americano', 
      price: '₹100', 
      description: 'For the bold & strong - Espresso with hot water.', 
      image: '/images/waffle-classic.jpg', // Using classic waffle for black coffee
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Espresso', 
      price: '₹80', 
      description: 'Small shot, big kick - Pure intense coffee shot.', 
      image: '/images/waffle-classic.jpg', // Using classic waffle for strong coffee
      rating: 4.4,
      vegetarian: true
    },
  ],
  coldCoffee: [
    { 
      name: 'Cold Coffee', 
      price: '₹140', 
      description: 'Chill, sip, repeat - Classic iced cold coffee.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for cold drinks
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Cold Coffee with Ice Cream', 
      price: '₹180', 
      description: 'The creamy upgrade - Coffee topped with a scoop of ice cream.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for ice cream coffee
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Butterscotch Cold Coffee', 
      price: '₹160', 
      description: 'Nutty-sweet delight - Icy coffee with butterscotch flavor.', 
      image: '/images/waffle-chocolate.jpg', // Using chocolate waffle for butterscotch
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Vanilla Cold Coffee', 
      price: '₹150', 
      description: 'Smooth, subtle, sweet - Coffee with vanilla twist.', 
      image: '/images/waffle-classic.jpg', // Using classic waffle for vanilla
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Hazelnut Cold Coffee', 
      price: '₹160', 
      description: 'Nutty meets creamy - Hazelnut flavored chilled coffee.', 
      image: '/images/waffle-chocolate.jpg', // Using chocolate waffle for hazelnut
      rating: 4.7,
      vegetarian: true
    },
  ],
  teaTime: [
    { 
      name: 'Ice Tea', 
      price: '₹80', 
      description: 'Coolness in a glass - Refreshing chilled tea.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for refreshing tea
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Peach Ice Tea', 
      price: '₹100', 
      description: 'Fruity, tangy, peachy - Perfect summer sip.', 
      image: '/images/waffle-berry.jpg', // Perfect match - peach tea with berry waffle
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Lemon Ice Tea', 
      price: '₹90', 
      description: 'Citrus chill - Lemon twist with iced tea.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for citrus tea
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Sparkling Ice Tea (Orange/Cranberry)', 
      price: '₹120', 
      description: 'Fizz that refreshes - Iced tea with sparkling water & fruity zest.', 
      image: '/images/waffle-berry.jpg', // Perfect match - fruity tea with berry waffle
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Boba Tea', 
      price: '₹150', 
      description: 'Fun in every bubble - Sweet milk tea with tapioca pearls.', 
      image: '/images/waffle-chocolate.jpg', // Using chocolate waffle for sweet tea
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Matcha Tea', 
      price: '₹130', 
      description: 'The green powerhouse - Earthy Japanese green tea.', 
      image: '/images/waffle-classic.jpg', // Using classic waffle for green tea
      rating: 4.6,
      vegetarian: true
    },
  ],
  flowerTeas: [
    { 
      name: 'Blue Tea', 
      price: '₹140', 
      description: 'Sip the sky - Butterfly pea flowers brewed into calming tea.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for blue tea
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Red Hibiscus Tea', 
      price: '₹130', 
      description: 'Tangy & refreshing - A ruby-red herbal infusion.', 
      image: '/images/waffle-berry.jpg', // Perfect match - red tea with berry waffle
      rating: 4.6,
      vegetarian: true
    },
    { 
      name: 'Butterfly Pea Tea (Purple)', 
      price: '₹150', 
      description: 'Magic in your cup - Color-changing tea with lemon drops.', 
      image: '/images/waffle-berry.jpg', // Using berry waffle for colorful tea
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
  ],
  waffles: [
    { 
      name: 'Classic Waffle', 
      price: '₹180', 
      description: 'A simple, elegant waffle served with maple syrup and butter. Perfect for a sweet breakfast or dessert.', 
      image: '/images/waffle-classic.jpg', // Perfect match - existing classic waffle image
      rating: 4.5,
      vegetarian: true
    },
    { 
      name: 'Chocolate Overload Waffle', 
      price: '₹250', 
      description: 'For the chocolate lovers! A rich waffle with chocolate chips, chocolate sauce, and chocolate ice cream.', 
      image: '/images/waffle-chocolate.jpg', // Perfect match - existing chocolate waffle image
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Berry Blast Waffle', 
      price: '₹220', 
      description: 'A fruity delight with fresh berries, whipped cream, and a drizzle of berry coulis.', 
      image: '/images/waffle-berry.jpg', // Perfect match - existing berry waffle image
      rating: 4.6,
      vegetarian: true
    },
  ],
};

const categories = [
  { id: 'all', name: 'All Items', count: Object.values(menuItems).flat().length },
  { id: 'desiBites', name: 'Desi Twist Bites', count: menuItems.desiBites.length, icon: Flame },
  { id: 'maggiPasta', name: 'Maggi & Pasta', count: menuItems.maggiPasta.length, icon: Utensils },
  { id: 'pizzas', name: 'Pizzas', count: menuItems.pizzas.length, icon: Pizza },
  { id: 'burgers', name: 'Burgers', count: menuItems.burgers.length, icon: Sandwich },
  { id: 'hotCoffee', name: 'Hot Coffee', count: menuItems.hotCoffee.length, icon: Coffee },
  { id: 'coldCoffee', name: 'Cold Coffee', count: menuItems.coldCoffee.length, icon: Coffee },
  { id: 'teaTime', name: 'Tea Time', count: menuItems.teaTime.length, icon: CupSoda },
  { id: 'flowerTeas', name: 'Flower Teas', count: menuItems.flowerTeas.length, icon: Leaf },
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

  const allItems = Object.values(menuItems).flat();
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'desiBites' && menuItems.desiBites.includes(item)) ||
                           (selectedCategory === 'maggiPasta' && menuItems.maggiPasta.includes(item)) ||
                           (selectedCategory === 'pizzas' && menuItems.pizzas.includes(item)) ||
                           (selectedCategory === 'burgers' && menuItems.burgers.includes(item)) ||
                           (selectedCategory === 'hotCoffee' && menuItems.hotCoffee.includes(item)) ||
                           (selectedCategory === 'coldCoffee' && menuItems.coldCoffee.includes(item)) ||
                           (selectedCategory === 'teaTime' && menuItems.teaTime.includes(item)) ||
                           (selectedCategory === 'flowerTeas' && menuItems.flowerTeas.includes(item)) ||
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
            Discover our carefully curated selection of Desi Twist Bites, Maggi & Pasta, Pizzas, Burgers, 
            Hot & Cold Coffee, Tea Time Bliss, Blooming Flower Teas, and delectable Waffles - 
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
          <TabsList className="grid w-full grid-cols-5 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
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
                  <Flame className="text-primary h-8 w-8" />
                  Desi Twist Bites
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.desiBites.map((item) => (
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
                  <Utensils className="text-primary h-8 w-8" />
                  Maggi & Pasta Tales
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.maggiPasta.map((item) => (
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
                  <Sandwich className="text-primary h-8 w-8" />
                  Bun & Fun - Burgers
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.burgers.map((item) => (
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
                  <Coffee className="text-primary h-8 w-8" />
                  Bloom in a Cup - Hot Coffee
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.hotCoffee.map((item) => (
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
                  <Coffee className="text-primary h-8 w-8" />
                  Cold Café Creations
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.coldCoffee.map((item) => (
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
                  <CupSoda className="text-primary h-8 w-8" />
                  Tea Time Bliss
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.teaTime.map((item) => (
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
                  <Leaf className="text-primary h-8 w-8" />
                  Blooming Flower Teas
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.flowerTeas.map((item) => (
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

          {/* Desi Twist Bites Only */}
          <TabsContent value="desiBites" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Flame className="text-primary h-8 w-8" />
              Desi Twist Bites
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.desiBites.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="desi"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Maggi & Pasta Only */}
          <TabsContent value="maggiPasta" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Utensils className="text-primary h-8 w-8" />
              Maggi & Pasta Tales
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.maggiPasta.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="pasta"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Burgers Only */}
          <TabsContent value="burgers" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sandwich className="text-primary h-8 w-8" />
              Bun & Fun - Burgers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.burgers.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="burger"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Hot Coffee Only */}
          <TabsContent value="hotCoffee" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Coffee className="text-primary h-8 w-8" />
              Bloom in a Cup - Hot Coffee
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.hotCoffee.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="coffee"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Cold Coffee Only */}
          <TabsContent value="coldCoffee" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Coffee className="text-primary h-8 w-8" />
              Cold Café Creations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.coldCoffee.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="coffee"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Tea Time Only */}
          <TabsContent value="teaTime" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CupSoda className="text-primary h-8 w-8" />
              Tea Time Bliss
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.teaTime.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="tea"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Flower Teas Only */}
          <TabsContent value="flowerTeas" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Leaf className="text-primary h-8 w-8" />
              Blooming Flower Teas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.flowerTeas.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="tea"
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
