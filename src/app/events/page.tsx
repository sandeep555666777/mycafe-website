import { Mic, Calendar, Ticket, Clock, MapPin, Users, Star, ArrowRight, Music, Palette, Coffee, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const events = [
    {
        title: 'Open Mic Night',
        date: 'Every Friday Night',
        time: '8:00 PM - 11:00 PM',
        description: 'Unleash your inner poet, comedian, or musician! Our stage is open to all performers. Come share your talent or just enjoy the show with a warm cup of coffee. Whether you\'re a seasoned performer or trying for the first time, our supportive audience will cheer you on!',
        image: '/images/event-mic.jpg',
        imageHint: 'open mic stage',
        category: 'Performance',
        price: 'Free Entry',
        capacity: '20 people (reservation basis)',
        features: ['Live Music', 'Poetry', 'Comedy', 'Coffee & Snacks'],
        highlights: ['First-time performers welcome', 'Professional sound system', 'Cozy atmosphere', 'Networking opportunities']
    },
    {
        title: 'Acoustic Saturdays',
        date: 'Every Saturday Evening',
        time: '6:00 PM - 9:00 PM',
        description: 'Relax and unwind with live acoustic music from local artists. A perfect backdrop for a peaceful evening with friends and great food. Our intimate setting creates the perfect atmosphere for enjoying soulful melodies while sipping on artisanal coffee.',
        image: '/images/event-acoustic.jpg',
        imageHint: 'acoustic guitar',
        category: 'Music',
        price: '₹200 Entry',
        capacity: '40 people',
        features: ['Live Acoustic Music', 'Local Artists', 'Intimate Setting', 'Food & Drinks'],
        highlights: ['Featured local musicians', 'Request songs', 'Cozy seating', 'Perfect date night']
    },
    {
        title: 'Art Workshop',
        date: 'Last Sunday of the Month',
        time: '2:00 PM - 5:00 PM',
        description: 'Join our monthly art workshop where we explore different mediums and techniques. All skill levels are welcome. Materials are provided! Discover your creative side in our inspiring cafe environment. Perfect for beginners and experienced artists alike.',
        image: '/images/event-art.jpg',
        imageHint: 'painting workshop',
        category: 'Creative',
        price: '₹500 (Materials Included)',
        capacity: '25 people',
        features: ['All Materials Provided', 'Expert Guidance', 'Take Home Your Art', 'Refreshments'],
        highlights: ['Professional art instructor', 'All skill levels welcome', 'Unique cafe atmosphere', 'Monthly themes']
    },
    {
        title: 'Coffee & Poetry',
        date: 'Every Wednesday',
        time: '7:00 PM - 8:30 PM',
        description: 'A cozy evening of poetry readings and coffee appreciation. Share your favorite poems or discover new ones while enjoying our specialty coffee. A perfect mid-week escape for literature lovers and coffee enthusiasts.',
        image: '/images/event-mic.jpg',
        imageHint: 'poetry reading',
        category: 'Literature',
        price: 'Free Entry',
        capacity: '30 people',
        features: ['Poetry Readings', 'Coffee Tasting', 'Discussion', 'Book Exchange'],
        highlights: ['Open mic poetry', 'Coffee education', 'Literary discussions', 'Community building']
    },
    
];

const categories = [
    { name: 'All Events', icon: Calendar, count: events.length },
    { name: 'Music', icon: Music, count: events.filter(e => e.category === 'Music').length },
    { name: 'Performance', icon: Mic, count: events.filter(e => e.category === 'Performance').length },
    { name: 'Creative', icon: Palette, count: events.filter(e => e.category === 'Creative').length },
    { name: 'Literature', icon: Coffee, count: events.filter(e => e.category === 'Literature').length },
];

export default function EventsPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Events are currently unavailable</h1>
            <p className="text-muted-foreground">
                We’re focusing on great food and coffee right now. Check back later!
            </p>
        </div>
    );
}
