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
    }
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
        <div className="bg-background text-foreground font-body min-h-screen">
            {/* Hero Header */}
            <header className="relative py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-amber-50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                        🎭 Events & Entertainment
                    </Badge>
                    <h1 className="text-responsive-xl font-bold mb-6">
                        Where Art Meets Coffee
                    </h1>
                    <p className="text-responsive-md text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        Explore our intimate cultural evenings. From open mics to poetry nights, there’s always something brewing.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span>{events.length}+ Events</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span>Community Evenings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary fill-current" />
                            <span>Great Vibes</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Filter */}
            <section className="py-12 bg-white border-b border-border/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <Button
                                key={category.name}
                                variant="outline"
                                className="flex items-center gap-2 px-6 py-3 rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <category.icon className="w-4 h-4" />
                                {category.name}
                                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                                    {category.count}
                                </Badge>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <main className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <Card key={event.title} className="group overflow-hidden card-hover bg-card/50 border-border/50">
                            {/* Image Section */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover image-hover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-primary/90 text-primary-foreground border-0">
                                        {event.category}
                                    </Badge>
                                </div>
                                
                                {/* Price Badge */}
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-amber-500 text-white border-0">
                                        {event.price}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content Section */}
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {event.title}
                                </CardTitle>

                                {/* Date & Time */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {event.time}
                                    </div>
                                </div>

                                {/* Capacity */}
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                                    <Users className="w-4 h-4" />
                                    <span>Capacity: {event.capacity}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                    {event.description}
                                </CardDescription>

                                {/* Features */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-foreground mb-2">What's Included:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {event.features.map((feature) => (
                                            <Badge key={feature} variant="secondary" className="text-xs bg-muted/50">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-2">Highlights:</h4>
                                    <ul className="space-y-1">
                                        {event.highlights.map((highlight, idx) => (
                                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>

                            {/* Action Section */}
                            <CardFooter className="pt-0">
                                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <Link href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2">
                                        <Ticket className="w-4 h-4" />
                                        Book Now
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="font-bold text-2xl text-primary mb-4">
                        Art in Every Sip. Soul in Every Bite.
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Siddharth Nagar, UP</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>+91 8130770794</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Open Daily 11:30 AM - 11:00 PM</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground mt-6">
                        &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
