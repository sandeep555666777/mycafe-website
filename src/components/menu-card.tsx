'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  name: string;
  price: string;
  description: string;
  image: string;
  category: 'pizza' | 'waffle';
  rating?: number;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  onOrder?: () => void;
}

export function MenuCard({ 
  name, 
  price, 
  description, 
  image, 
  category, 
  rating = 4.5, 
  popular = false,
  spicy = false,
  vegetarian = false,
  onOrder
}: MenuItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleOrder = () => {
    if (onOrder) {
      onOrder();
    } else {
      // Default WhatsApp order
      const message = `🍽️ *The Crafty Bean - Quick Order*\n\n` +
                     `📋 *Item:* ${name}\n` +
                     `💰 *Price:* ${price}\n` +
                     `📝 *Description:* ${description}\n\n` +
                     `📍 *Location:* The Crafty Bean Cafe\n` +
                     `⏰ *Order Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
                     `Please confirm this order and provide your delivery address. Thank you! 🙏`;
      
      const whatsappUrl = `https://wa.me/918770149314?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <Card className="group overflow-hidden card-hover bg-card/50 border-border/50">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover image-hover" 
        />
        
        {/* Overlay with badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top right badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {popular && (
            <Badge className="bg-amber-500 text-white border-0 text-xs">
              🔥 Popular
            </Badge>
          )}
          {spicy && (
            <Badge className="bg-red-500 text-white border-0 text-xs">
              🌶️ Spicy
            </Badge>
          )}
          {vegetarian && (
            <Badge className="bg-green-500 text-white border-0 text-xs">
              🌱 Veg
            </Badge>
          )}
        </div>

        {/* Like button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 left-3 w-8 h-8 p-0 bg-white/20 hover:bg-white/30 text-white border-0"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-all duration-200",
              isLiked ? "fill-red-500 text-red-500" : "fill-transparent"
            )} 
          />
        </Button>

        {/* Category icon */}
        <div className="absolute bottom-3 left-3 w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-lg">
            {category === 'pizza' ? '🍕' : '🧇'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : i < rating 
                    ? "fill-amber-400/50 text-amber-400/50" 
                    : "fill-gray-300 text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({rating})</span>
        </div>

        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Action Section */}
      <CardContent className="pt-0">
        <div className="flex justify-end">
          {/* WhatsApp Order Button */}
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
            onClick={handleOrder}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Order via WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
