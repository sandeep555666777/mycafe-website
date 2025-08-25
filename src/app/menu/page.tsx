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
      image: '/images/Onion Pakoda.jpg', // Perfect match - actual onion pakoda image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Pakoda', 
      price: '₹150', 
      description: 'Soft inside, crunchy outside - Juicy paneer cubes in spiced batter, deep-fried.', 
      image: '/images/Paneer Pakoda.jpg', // Perfect match - actual paneer pakoda image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
  ],
  maggiPasta: [
    { 
      name: 'Plain Maggie', 
      price: '₹39', 
      description: 'Simple, homely & forever loved. 👉 "The 2-minute hug in a bowl!"', 
      image: '/images/Plain Maggi.jpg', // Perfect match - actual plain maggi image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veg Maggie', 
      price: '₹69', 
      description: 'Colorful veggies tossed with masala magic. 👉 "Veggies that vibe with maggie!"', 
      image: '/images/Veg Maggi.jpg', // Perfect match - actual veg maggi image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Maggie', 
      price: '₹89', 
      description: 'Gooey cheese meets desi masala. 👉 "Cheesy twist to your childhood favorite!"', 
      image: '/images/Cheese Maggi.jpg', // Perfect match - actual cheese maggi image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'White Sauce Pasta', 
      price: '₹129', 
      description: 'Creamy, rich & oh-so-satisfying. 👉 "Silky smooth bite of joy!"', 
      image: '/images/White Sauce Pasta.jpg', // Perfect match - actual white sauce pasta image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Red Sauce Pasta', 
      price: '₹119', 
      description: 'Tangy tomato base with herby touch. 👉 "The saucy Italian romance!"', 
      image: '/images/Red Sauce Pasta.jpg', // Perfect match - actual red sauce pasta image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Baked Pasta', 
      price: '₹149', 
      description: 'Oven baked pasta topped with golden cheese. 👉 "Baked to cheesy perfection!"', 
      image: '/images/Cheese Baked Pasta.jpg', // Perfect match - actual cheese baked pasta image
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
  ],
  pizzas: [
    { 
      name: 'Margherita Pizza', 
      price: '₹129', 
      description: 'Simple cheese magic in every bite. 👉 "Because classics never go out of style!"', 
      image: '/images/margherita.jpg', // Perfect match - existing margherita pizza image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'OTC Pizza (Onion, Tomato, Capsicum)', 
      price: '₹149', 
      description: 'A crunchy mix of fresh veggies with melted cheese. 👉 "The trio of taste!"', 
      image: '/images/veggie.jpg', // Using veggie pizza image as placeholder
      rating: 4.7,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veggie Delight Pizza', 
      price: '₹179', 
      description: 'Loaded with onion, capsicum, tomato, sweet corn & mushroom. 👉 "More veggies, more joy!"', 
      image: '/images/veggie.jpg', // Perfect match - existing veggie pizza image
      rating: 4.7,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Farmhouse Pizza', 
      price: '₹179', 
      description: 'Topped with olives & jalapeños for a bold bite. 👉 "Where freshness meets spice!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'India Peri Peri Spicy Pizza', 
      price: '₹199', 
      description: 'A fiery desi twist with peri peri magic. 👉 "Spice that ignites your soul!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Pizza', 
      price: '₹149', 
      description: 'Soft paneer chunks with creamy cheese. 👉 "A paneer lover\'s dream!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder for paneer pizza
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Chicken Pizza', 
      price: '₹179', 
      description: 'Juicy chicken with melted cheese topping. 👉 "One bite = pure delight!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: false
    },
    { 
      name: 'Kabab Pizza', 
      price: '₹149', 
      description: 'Smoky kebab chunks on a cheesy base. 👉 "Desi kebab meets Italian base!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: false
    },
  ],
  burgers: [
    { 
      name: 'Aloo Tikki Burger', 
      price: '₹69', 
      description: 'Crispy tikki tucked in soft buns. 👉 "Desi bite, global delight!"', 
      image: '/images/Aloo Tikki Burger.jpg', // Perfect match - actual aloo tikki burger image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veg Patty Burger', 
      price: '₹79', 
      description: 'Loaded veg patty with creamy sauces. 👉 "Full veg, full swag!"', 
      image: '/images/Veg Patty Burger.jpg', // Perfect match - actual veg patty burger image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Veg Grilled Burger', 
      price: '₹89', 
      description: 'Grilled layers of cheese & veggies. 👉 "Grilled to thrill!"', 
      image: '/images/Cheese Veg Grilled Burger.jpg', // Perfect match - actual cheese veg grilled burger image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Chicken Patty Burger', 
      price: '₹99', 
      description: 'Juicy chicken patty with crunchy veggies. 👉 "Bite full of boldness!"', 
      image: '/images/Chicken Patty Burger.jpg', // Perfect match - actual chicken patty burger image
      rating: 4.6,
      popular: false,
      vegetarian: false
    },
    { 
      name: 'Crispy Burger', 
      price: '₹110', 
      description: 'Crispy outside, soft inside. 👉 "The crunch that speaks!"', 
      image: '/images/Crispy Burger.jpg', // Perfect match - actual crispy burger image
      rating: 4.5,
      popular: false,
      vegetarian: false
    },
  ],
  sandwiches: [
    { 
      name: 'Bombay Kaccha Sandwich', 
      price: '₹69', 
      description: 'Street-style flavors in every layer. 👉 "Mumbai\'s love in a bite!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veg Cheese Sandwich', 
      price: '₹89', 
      description: 'Cheese-loaded classic veggie sandwich. 👉 "Cheesy & breezy!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Aloo Masala Sandwich', 
      price: '₹69', 
      description: 'Spiced potato filling with buttered bread. 👉 "Simple, spicy, satisfying!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Chutney Sandwich', 
      price: '₹85', 
      description: 'Cheese paired with mint chutney. 👉 "Fresh zing meets cheese king!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Tandoori Sandwich', 
      price: '₹99', 
      description: 'Tandoori flavored filling with melted cheese. 👉 "Bold, smoky & irresistible!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Masala Sandwich', 
      price: '₹99', 
      description: 'Paneer chunks with desi masala twist. 👉 "The royal sandwich of India!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
  ],
  fries: [
    { 
      name: 'French Fries (Plain Salted)', 
      price: '₹79', 
      description: 'Crispy golden fries, just right. 👉 "Simple but addictive!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Fries', 
      price: '₹79', 
      description: 'Fries smothered with molten cheese. 👉 "Say cheese, eat fries!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Baked Cheese Fries', 
      price: '₹95', 
      description: 'Oven-baked, cheesy & guilt-free. 👉 "Baked, not fried – pure delight!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Peri Peri Masala Fries', 
      price: '₹85', 
      description: 'Hot & spicy peri peri seasoning. 👉 "One bite, spice ignite!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Appam (6 pcs)', 
      price: '₹46', 
      description: 'Soft, fluffy South Indian snack. 👉 "Little clouds of joy!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.4,
      popular: false,
      vegetarian: true
    },
  ],
  hotCoffee: [
    { 
      name: 'Cappuccino', 
      price: '₹99', 
      description: 'Foamy, creamy, coffee hug. 👉 "Love at first sip!"', 
      image: '/images/Cappuccino.jpg', // Perfect match - actual cappuccino image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Latte', 
      price: '₹119', 
      description: 'Smooth milk & bold coffee. 👉 "Latte is always a good idea!"', 
      image: '/images/Latte.jpg', // Perfect match - actual latte image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Mocha', 
      price: '₹129', 
      description: 'Chocolate + coffee = heaven. 👉 "Sip the sweet side of coffee!"', 
      image: '/images/Mocha.jpg', // Perfect match - actual mocha image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Americano', 
      price: '₹99', 
      description: 'Strong, black, bold. 👉 "For the real coffee lover!"', 
      image: '/images/Americano.jpg', // Perfect match - actual americano image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Espresso', 
      price: '₹69', 
      description: 'Shot of pure energy. 👉 "Small cup, big kick!"', 
      image: '/images/Espresso.jpg', // Perfect match - actual espresso image
      rating: 4.4,
      popular: false,
      vegetarian: true
    },
  ],
  coldCoffee: [
    { 
      name: 'Cold Coffee', 
      price: '₹99', 
      description: 'Chilled, creamy & refreshing. 👉 "Cool your coffee cravings!"', 
      image: '/images/Cold Coffee.jpg', // Perfect match - actual cold coffee image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Cold Coffee with Ice Cream', 
      price: '₹139', 
      description: 'Coffee topped with a scoop of ice cream. 👉 "Spoon & sip happiness!"', 
      image: '/images/Cold Coffee with Ice Cream.jpg', // Perfect match - actual cold coffee with ice cream image
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Flavoured Cold Coffee (Butterscotch/Vanilla/Hazelnut)', 
      price: '₹115', 
      description: 'Cold coffee with a twist of flavors. 👉 "Every sip a new story!"', 
      image: '/images/Butterscotch Cold Coffee.jpg', // Perfect match - actual butterscotch cold coffee image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
  ],
  teaTime: [
    { 
      name: 'Ice Tea (Classic/Peach/Lemon)', 
      price: '₹79', 
      description: 'Refreshing iced tea variants. 👉 "Cool down with a twist!"', 
      image: '/images/Ice Tea.jpg', // Perfect match - actual ice tea image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Iced Tea with Sparkling Water (Orange/Cranberry)', 
      price: '₹99', 
      description: 'Zesty fizz with fruity punch. 👉 "Fizz that refreshes!"', 
      image: '/images/Sparkling Ice Tea Orange Cranberry.jpg', // Perfect match - actual sparkling ice tea image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Boba Tea', 
      price: '₹115', 
      description: 'Trendy bubble tea with chewy pearls. 👉 "Pop, sip & smile!"', 
      image: '/images/Boba Tea.jpg', // Perfect match - actual boba tea image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Matcha Tea', 
      price: '₹129', 
      description: 'Earthy green tea packed with health. 👉 "Sip the Zen energy!"', 
      image: '/images/matcha-tea.jpg', // Perfect match - actual matcha tea image
      rating: 4.6,
      vegetarian: true
    },
  ],
  flowerTeas: [
    { 
      name: 'Blue Tea', 
      price: '₹140', 
      description: 'Sip the sky - Butterfly pea flowers brewed into calming tea.', 
      image: '/images/Blue Tea.jpg', // Perfect match - actual blue tea image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Red Hibiscus Tea', 
      price: '₹130', 
      description: 'Tangy & refreshing - A ruby-red herbal infusion.', 
      image: '/images/Red Hibiscus Tea.jpg', // Perfect match - actual red hibiscus tea image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Butterfly Pea Tea (Purple)', 
      price: '₹150', 
      description: 'Magic in your cup - Color-changing tea with lemon drops.', 
      image: '/images/Butterfly Pea Tea.jpg', // Perfect match - actual butterfly pea tea image
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
      image: '/images/Classic Waffle.jpg', // Perfect match - actual classic waffle image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Chocolate Overload Waffle', 
      price: '₹250', 
      description: 'For the chocolate lovers! A rich waffle with chocolate chips, chocolate sauce, and chocolate ice cream.', 
      image: '/images/Chocolate Overload Waffle.jpg', // Perfect match - actual chocolate overload waffle image
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Berry Blast Waffle', 
      price: '₹220', 
      description: 'A fruity delight with fresh berries, whipped cream, and a drizzle of berry coulis.', 
      image: '/images/Berry Blast Waffle.jpg', // Perfect match - actual berry blast waffle image
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
  { id: 'sandwiches', name: 'Sandwiches', count: menuItems.sandwiches.length, icon: Sandwich },
  { id: 'fries', name: 'Fries', count: menuItems.fries.length, icon: Utensils },
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
          <TabsList className="flex w-full mb-8 overflow-x-auto">
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
                  <Sandwich className="text-primary h-8 w-8" />
                  Between the Bread - Sandwiches
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.sandwiches.map((item) => (
                    <MenuCard
                      key={item.name}
                      {...item}
                      category="burger"
                      onOrder={() => handleWhatsAppOrder(item)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Utensils className="text-primary h-8 w-8" />
                  Crunchy Cravings - Fries
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.fries.map((item) => (
                    <MenuCard
                      key={item.name}
                      {...item}
                      category="burger"
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

          {/* Sandwiches Only */}
          <TabsContent value="sandwiches" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sandwich className="text-primary h-8 w-8" />
              Between the Bread - Sandwiches
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.sandwiches.map((item) => (
                <MenuCard
                  key={item.name}
                  {...item}
                  category="burger"
                  onOrder={() => handleWhatsAppOrder(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Fries Only */}
          <TabsContent value="fries" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Utensils className="text-primary h-8 w-8" />
              Crunchy Cravings - Fries
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.fries.map((item) => (
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
