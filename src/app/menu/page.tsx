'use client';

import { useState, useMemo } from 'react';
import { Pizza, Cookie, Filter, Search, Star, Clock, TrendingUp, MessageCircle, Coffee, Utensils, Sandwich, CupSoda, Flame, Leaf, GraduationCap, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { MenuCard } from '@/components/menu-card';
import { WhatsAppOrder } from '@/components/whatsapp-order';
import { cafeAddress } from '@/lib/config';

// address comes from centralized config

const menuItems = {
  desiBites: [],
  maggiPasta: [
    { 
      name: 'Plain Maggie', 
      price: '₹39', 
      description: 'Simple, homely & forever loved. 👉 "The 2-minute hug in a bowl!"', 
      image: '/images/plain-maggi.jpg', // kebab-case filename
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veg Maggie', 
      price: '₹69', 
      description: 'Colorful veggies tossed with masala magic. 👉 "Veggies that vibe with maggie!"', 
      image: '/images/veg-maggi.jpg', // kebab-case filename
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Maggie', 
      price: '₹89', 
      description: 'Gooey cheese meets desi masala. 👉 "Cheesy twist to your childhood favorite!"', 
      image: '/images/cheese-maggi.jpg', // kebab-case filename
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'White Sauce Pasta', 
      price: '₹129', 
      description: 'Creamy, rich & oh-so-satisfying. 👉 "Silky smooth bite of joy!"', 
      image: '/images/white-sauce-pasta.jpg', // kebab-case filename
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Red Sauce Pasta', 
      price: '₹119', 
      description: 'Tangy tomato base with herby touch. 👉 "The saucy Italian romance!"', 
      image: '/images/red-sauce-pasta.jpg', // kebab-case filename
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Baked Pasta', 
      price: '₹149', 
      description: 'Oven baked pasta topped with golden cheese. 👉 "Baked to cheesy perfection!"', 
      image: '/images/cheese-baked-pasta.jpg', // kebab-case filename
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
      image: '/images/OTC Pizza Onion, Tomato.jpg', // Perfect match - actual OTC pizza image
      rating: 4.7,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veggie Delight Pizza', 
      price: '₹179', 
      description: 'Loaded with onion, capsicum, tomato, sweet corn & mushroom. 👉 "More veggies, more joy!"', 
      image: '/images/Veggie Delight Pizza.jpg', // Perfect match - actual veggie delight pizza image
      rating: 4.7,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Farmhouse Pizza', 
      price: '₹179', 
      description: 'Topped with olives & jalapeños for a bold bite. 👉 "Where freshness meets spice!"', 
      image: '/images/Farmhouse Pizza.jpg', // Perfect match - actual farmhouse pizza image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'India Peri Peri Spicy Pizza', 
      price: '₹199', 
      description: 'A fiery desi twist with peri peri magic. 👉 "Spice that ignites your soul!"', 
      image: '/images/India Peri Peri Spicy Pizza.jpg', // Perfect match - actual peri peri pizza image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Paneer Pizza', 
      price: '₹149', 
      description: 'Soft paneer chunks with creamy cheese. 👉 "A paneer lover\'s dream!"', 
      image: '/images/Paneer Pizza.jpg', // Perfect match - actual paneer pizza image
      rating: 4.9,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Chicken Pizza', 
      price: '₹179', 
      description: 'Juicy chicken with melted cheese topping. 👉 "One bite = pure delight!"', 
      image: '/images/Chicken Pizza.jpg', // Perfect match - actual chicken pizza image
      rating: 4.7,
      popular: true,
      vegetarian: false
    },
    { 
      name: 'Kabab Pizza', 
      price: '₹149', 
      description: 'Smoky kebab chunks on a cheesy base. 👉 "Desi kebab meets Italian base!"', 
      image: '/images/Kabab Pizza.jpg', // Perfect match - actual kabab pizza image
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
      image: '/images/Bombay Kaccha Sandwich.jpg', // Perfect match - actual bombay sandwich image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Veg Cheese Sandwich', 
      price: '₹89', 
      description: 'Cheese-loaded classic veggie sandwich. 👉 "Cheesy & breezy!"', 
      image: '/images/Veg Cheese Sandwich.jpg', // Perfect match - actual veg cheese sandwich image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Cheese Chutney Sandwich', 
      price: '₹85', 
      description: 'Cheese paired with mint chutney. 👉 "Fresh zing meets cheese king!"', 
      image: '/images/Cheese Chutney Sandwich.jpg', // Perfect match - actual cheese chutney sandwich image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    
    { 
      name: 'Paneer Masala Sandwich', 
      price: '₹99', 
      description: 'Paneer chunks with desi masala twist. 👉 "The royal sandwich of India!"', 
      image: '/images/Paneer Masala Sandwich.jpg', // Perfect match - actual paneer masala sandwich image
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
      image: '/images/French Fries Plain Salted.jpg', // Perfect match - actual french fries image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Cheese Fries', 
      price: '₹79', 
      description: 'Fries smothered with molten cheese. 👉 "Say cheese, eat fries!"', 
      image: '/images/Cheese Fries.jpg', // Perfect match - actual cheese fries image
      rating: 4.7,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Baked Cheese Fries', 
      price: '₹95', 
      description: 'Oven-baked, cheesy & guilt-free. 👉 "Baked, not fried – pure delight!"', 
      image: '/images/Baked Cheese Fries.jpg', // Perfect match - actual baked cheese fries image
      rating: 4.6,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Peri Peri Masala Fries', 
      price: '₹85', 
      description: 'Hot & spicy peri peri seasoning. 👉 "One bite, spice ignite!"', 
      image: '/images/Peri Peri Masala Fries.jpg', // Perfect match - actual peri peri fries image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Appam (6 pcs)', 
      price: '₹46', 
      description: 'Soft, fluffy South Indian snack. 👉 "Little clouds of joy!"', 
      image: '/images/Appam.jpg', // Perfect match - actual appam image
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
      name: 'Butterscotch Cold Coffee', 
      price: '₹115', 
      description: 'Cold coffee with butterscotch flavor. 👉 "Every sip a new story!"', 
      image: '/images/Butterscotch Cold Coffee.jpg', // Perfect match - actual butterscotch cold coffee image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Vanilla Cold Coffee', 
      price: '₹115', 
      description: 'Cold coffee with vanilla flavor. 👉 "Every sip a new story!"', 
      image: '/images/Vanilla Cold Coffee.jpg', // Perfect match - actual vanilla cold coffee image
      rating: 4.8,
      popular: true,
      vegetarian: true
    },
    { 
      name: 'Hazelnut Cold Coffee', 
      price: '₹115', 
      description: 'Cold coffee with hazelnut flavor. 👉 "Every sip a new story!"', 
      image: '/images/Hazelnut Cold Coffee.jpg', // Perfect match - actual hazelnut cold coffee image
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
      name: 'Peach Ice Tea', 
      price: '₹79', 
      description: 'Refreshing peach iced tea. 👉 "Cool down with a twist!"', 
      image: '/images/Peach Ice Tea.jpg', // Perfect match - actual peach ice tea image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Lemon Ice Tea', 
      price: '₹79', 
      description: 'Refreshing lemon iced tea. 👉 "Cool down with a twist!"', 
      image: '/images/Lemon Ice Tea.jpg', // Perfect match - actual lemon ice tea image
      rating: 4.5,
      popular: false,
      vegetarian: true
    },
    { 
      name: 'Iced Tea with Sparkling Water (Orange/Cranberry)', 
      price: '₹119', 
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
      image: '/images/Matcha Tea.jpg', // Perfect match - actual matcha tea image
      rating: 4.6,
      popular: false,
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
  waffles: [],
  studentOffers: [
    { 
      name: 'Combo – Plain Maggie + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹139', 
      description: 'Quick fix for hunger & energy! 👉 "Quick fix for hunger & energy!"', 
      image: '/images/Plain Maggi.jpg', // Using plain maggi image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Aloo Tikki Burger + French Fries + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹169', 
      description: 'Snack attack sorted! 👉 "Snack attack sorted!"', 
      image: '/images/Aloo Tikki Burger.jpg', // Using aloo tikki burger image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Veg Cheese Sandwich + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹159', 
      description: 'Cheese & chill in every sip & bite! 👉 "Cheese & chill in every sip & bite!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Paneer Pizza (Small) + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹209', 
      description: 'Slice & sip happiness! 👉 "Slice & sip happiness!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Chicken Patty Burger + Peri Peri Fries + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹229', 
      description: 'Crispy, spicy, juicy – all in one! 👉 "Crispy, spicy, juicy – all in one!"', 
      image: '/images/Chicken Patty Burger.jpg', // Using chicken patty burger image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: false,
      isCombo: true
    },
    { 
      name: 'Combo – Red Sauce Pasta + Garlic Bread (2 pc) + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹199', 
      description: 'Italian cravings, desi price! 👉 "Italian cravings, desi price!"', 
      image: '/images/Red Sauce Pasta.jpg', // Using red sauce pasta image as placeholder
      rating: 4.6,
      popular: false,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Farmhouse Pizza + 2 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹309', 
      description: 'Share the slice, double the love! 👉 "Share the slice, double the love!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.9,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Cheese Sandwich + Cheese Maggie + 2 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹279', 
      description: 'For friends who share bites & gossips! 👉 "For friends who share bites & gossips!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.7,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – Paneer Masala Sandwich + Veg Sandwich + Fries + 2 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹299', 
      description: 'Sandwich stories for two! 👉 "Sandwich stories for two!"', 
      image: '/images/Classic Waffle.jpg', // Using waffle image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    { 
      name: 'Combo – 1 Veggie Delight Pizza + 1 Kabab Pizza + Fries + 4 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹619', 
      description: 'Family happiness in every slice & sip! 👉 "Family happiness in every slice & sip!"', 
      image: '/images/veggie.jpg', // Using veggie pizza image as placeholder
      rating: 4.9,
      popular: true,
      vegetarian: false,
      isCombo: true
    },
    { 
      name: 'Combo – 2 Burgers (Veg + Chicken) + Cheese Baked Pasta + Fries + 4 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹569', 
      description: 'Burger-pasta love for the whole gang! 👉 "Burger-pasta love for the whole gang!"', 
      image: '/images/Cheese Baked Pasta.jpg', // Using cheese baked pasta image as placeholder
      rating: 4.8,
      popular: true,
      vegetarian: false,
      isCombo: true
    },
    { 
      name: 'Combo – 1 India Peri Peri Pizza + Paneer Pizza + Crispy Burger + 4 (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)', 
      price: '₹659', 
      description: 'Full table, full smiles! 👉 "Full table, full smiles!"', 
      image: '/images/pepperoni.jpg', // Using pepperoni image as placeholder
      rating: 4.9,
      popular: true,
      vegetarian: false,
      isCombo: true
    },
  ],
  mealForOne: [
    {
      name: 'Meal – Paneer Pizza (Small) + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)',
      price: '₹209',
      description: 'Slice & sip happiness! 👉 "Slice & sip happiness!"',
      image: '/images/Paneer Pizza.jpg',
      rating: 4.8,
      popular: true,
      vegetarian: true,
      isCombo: true
    },
    {
      name: 'Meal – Chicken Patty Burger + Peri Peri Fries + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)',
      price: '₹229',
      description: 'Crispy, spicy, juicy – all in one! 👉 "Crispy, spicy, juicy – all in one!"',
      image: '/images/Chicken Patty Burger.jpg',
      rating: 4.7,
      popular: true,
      vegetarian: false,
      isCombo: true
    },
    {
      name: 'Meal – Red Sauce Pasta + Garlic Bread (2 pc) + (Cold Coffee / Peach Iced Tea / Lemon Iced Tea)',
      price: '₹199',
      description: 'Italian cravings, desi price! 👉 "Italian cravings, desi price!"',
      image: '/images/Red Sauce Pasta.jpg',
      rating: 4.6,
      popular: false,
      vegetarian: true,
      isCombo: true
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
  { id: 'studentOffers', name: 'Student Offers', count: menuItems.studentOffers.length, icon: GraduationCap },
  { id: 'mealForOne', name: 'Meal for One', count: menuItems.mealForOne.length, icon: Utensils },
];

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleWhatsAppOrder = (item: any) => {
    const message = `🍽️ *The Crafty Bean - Quick Order*\n\n` +
                   `📋 *Item:* ${item.name}\n` +
                   `💰 *Price:* ${item.price}\n` +
                   `📝 *Description:* ${item.description}\n\n` +
                   `📍 *Address:* ${cafeAddress}\n` +
                   `⏰ *Order Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                   `Please confirm this order and provide your delivery address. Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/918130770794?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppOrderWithAddress = () => {
    const message = `🍽️ *The Crafty Bean - Menu Inquiry*\n\n` +
                   `Hi! I'd like to see your menu and place an order with delivery.\n\n` +
                   `📍 *Address:* ${cafeAddress}\n` +
                   `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                   `Please share your menu and help me place an order with delivery address. Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/918130770794?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get all items and apply filters
  const allItems = (
    [
      ...menuItems.desiBites,
      ...menuItems.maggiPasta,
      ...menuItems.pizzas,
      ...menuItems.burgers,
      ...menuItems.sandwiches,
      ...menuItems.fries,
      ...menuItems.hotCoffee,
      ...menuItems.coldCoffee,
      ...menuItems.teaTime,
      ...menuItems.flowerTeas,
      ...menuItems.studentOffers,
      ...menuItems.mealForOne,
    ] as any[]
  );
  
  const filteredAndSortedItems = useMemo(() => {
    let filtered = allItems.filter(item => {
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'desiBites' && (menuItems.desiBites as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'maggiPasta' && (menuItems.maggiPasta as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'pizzas' && (menuItems.pizzas as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'burgers' && (menuItems.burgers as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'sandwiches' && (menuItems.sandwiches as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'fries' && (menuItems.fries as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'hotCoffee' && (menuItems.hotCoffee as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'coldCoffee' && (menuItems.coldCoffee as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'teaTime' && (menuItems.teaTime as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'flowerTeas' && (menuItems.flowerTeas as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'studentOffers' && (menuItems.studentOffers as any[]).some((si: any) => si.name === (item as any).name)) ||
                             (selectedCategory === 'mealForOne' && (menuItems.mealForOne as any[]).some((si: any) => si.name === (item as any).name));
      
      // Price filter
      const price = parseInt(item.price.replace('₹', ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // Vegetarian filter
      const matchesVegetarian = !showVegetarianOnly || item.vegetarian;
      
      // Popular filter
      const matchesPopular = !showPopularOnly || (item as any).popular;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesVegetarian && matchesPopular;
    });

    // Sort items
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = parseInt(a.price.replace('₹', ''));
          bValue = parseInt(b.price.replace('₹', ''));
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'popular':
          aValue = (a as any).popular ? 1 : 0;
          bValue = (b as any).popular ? 1 : 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder, priceRange, showVegetarianOnly, showPopularOnly]);

  // Get items for specific category
  const getCategoryItems = (categoryId: string) => {
    if (categoryId === 'all') {
      return filteredAndSortedItems;
    }
    return filteredAndSortedItems.filter(item => {
      return (categoryId === 'desiBites' && (menuItems.desiBites as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'maggiPasta' && (menuItems.maggiPasta as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'pizzas' && (menuItems.pizzas as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'burgers' && (menuItems.burgers as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'sandwiches' && (menuItems.sandwiches as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'fries' && (menuItems.fries as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'hotCoffee' && (menuItems.hotCoffee as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'coldCoffee' && (menuItems.coldCoffee as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'teaTime' && (menuItems.teaTime as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'flowerTeas' && (menuItems.flowerTeas as any[]).some((si: any) => si.name === (item as any).name)) ||
             (categoryId === 'studentOffers' && (menuItems.studentOffers as any[]).some((si: any) => si.name === (item as any).name));
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setSortOrder('asc');
    setPriceRange([0, 1000]);
    setShowVegetarianOnly(false);
    setShowPopularOnly(false);
  };

  const activeFiltersCount = [
    searchTerm ? 1 : 0,
    selectedCategory !== 'all' ? 1 : 0,
    sortBy !== 'name' || sortOrder !== 'asc' ? 1 : 0,
    priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0,
    showVegetarianOnly ? 1 : 0,
    showPopularOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

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
            Hot & Cold Coffee, Tea Time Bliss, and Blooming Flower Teas — 
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
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] btn-modern">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Button 
                variant="outline" 
                size="sm" 
                className="btn-modern"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>

              {/* Filters Button */}
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="btn-modern relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Filter Menu Items</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Price Range */}
                    <div>
                      <Label className="text-base font-semibold">Price Range</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Dietary Preferences */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Dietary Preferences</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vegetarian" 
                          checked={showVegetarianOnly}
                          onCheckedChange={(checked) => setShowVegetarianOnly(checked as boolean)}
                        />
                        <Label htmlFor="vegetarian">Vegetarian Only</Label>
                      </div>
                    </div>

                    <Separator />

                    {/* Popular Items */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Popularity</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="popular" 
                          checked={showPopularOnly}
                          onCheckedChange={(checked) => setShowPopularOnly(checked as boolean)}
                        />
                        <Label htmlFor="popular">Popular Items Only</Label>
                      </div>
                    </div>

                    <Separator />

                    {/* Clear Filters */}
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchTerm}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchTerm('')}
                  />
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find(c => c.id === selectedCategory)?.name}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory('all')}
                  />
                </Badge>
              )}
              {showVegetarianOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Vegetarian Only
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setShowVegetarianOnly(false)}
                  />
                </Badge>
              )}
              {showPopularOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Popular Only
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setShowPopularOnly(false)}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedItems.length} of {allItems.length} items
          </p>
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
                  {getCategoryItems(category.id).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Items */}
          <TabsContent value="all" className="space-y-12">
            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Desi Twist Bites */}
                {getCategoryItems('desiBites').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Flame className="text-primary h-8 w-8" />
                      Desi Twist Bites
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('desiBites').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...(item as any)}
                          category="desi"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Maggi & Pasta */}
                {getCategoryItems('maggiPasta').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Utensils className="text-primary h-8 w-8" />
                      Maggi & Pasta Tales
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('maggiPasta').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...(item as any)}
                          category="pasta"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pizzas */}
                {getCategoryItems('pizzas').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Pizza className="text-primary h-8 w-8" />
                      Pizzas
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('pizzas').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="pizza"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Burgers */}
                {getCategoryItems('burgers').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Sandwich className="text-primary h-8 w-8" />
                      Bun & Fun - Burgers
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('burgers').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="burger"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sandwiches */}
                {getCategoryItems('sandwiches').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Sandwich className="text-primary h-8 w-8" />
                      Between the Bread - Sandwiches
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('sandwiches').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="desi"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Fries */}
                {getCategoryItems('fries').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Utensils className="text-primary h-8 w-8" />
                      Crunchy Cravings - Fries
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('fries').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="desi"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Hot Coffee */}
                {getCategoryItems('hotCoffee').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Coffee className="text-primary h-8 w-8" />
                      Bloom in a Cup - Hot Coffee
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('hotCoffee').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="coffee"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Cold Coffee */}
                {getCategoryItems('coldCoffee').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Coffee className="text-primary h-8 w-8" />
                      Cold Café Creations
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('coldCoffee').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="coffee"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tea Time */}
                {getCategoryItems('teaTime').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <CupSoda className="text-primary h-8 w-8" />
                      Tea Time Bliss
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('teaTime').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="tea"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Flower Teas */}
                {getCategoryItems('flowerTeas').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Leaf className="text-primary h-8 w-8" />
                      Blooming Flower Teas
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('flowerTeas').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="tea"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                

                {/* Student Offers */}
                {getCategoryItems('studentOffers').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <GraduationCap className="text-primary h-8 w-8" />
                      👨‍🎓 Student Saver Combos
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('studentOffers').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="combo"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Meal for One */}
                {getCategoryItems('mealForOne').length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Utensils className="text-primary h-8 w-8" />
                      🍔 Meal for One
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCategoryItems('mealForOne').map((item) => (
                        <MenuCard
                          key={item.name}
                          {...item}
                          category="combo"
                          onOrder={() => handleWhatsAppOrder(item)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Individual Category Tabs */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                {category.icon && <category.icon className="text-primary h-8 w-8" />}
                {category.name}
              </h2>
              {getCategoryItems(category.id).length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items found in this category</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCategoryItems(category.id).map((item) => (
                    <MenuCard
                      key={item.name}
                      {...item}
                      category={
                        category.id === 'pizzas' ? 'pizza' :
                        category.id === 'maggiPasta' ? 'pasta' :
                        category.id === 'burgers' ? 'burger' :
                        category.id === 'sandwiches' ? 'desi' :
                        category.id === 'fries' ? 'desi' :
                        category.id === 'hotCoffee' ? 'coffee' :
                        category.id === 'coldCoffee' ? 'coffee' :
                        category.id === 'teaTime' ? 'tea' :
                        category.id === 'flowerTeas' ? 'tea' : 'pizza'
                      }
                      onOrder={() => handleWhatsAppOrder(item)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
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
                                      `📍 *Address:* ${cafeAddress}\n` +
                                      `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                                      `Please share your menu and help me place an order. Thank you! 🙏`;
                        
                        const whatsappUrl = `https://wa.me/918130770794?text=${encodeURIComponent(message)}`;
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
              <a href="https://wa.me/918130770794" target="_blank" rel="noopener noreferrer">
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
