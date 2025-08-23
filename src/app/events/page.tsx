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
        capacity: '50 people',
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
    {
        title: 'Jazz Night',
        date: 'First Saturday Monthly',
        time: '9:00 PM - 12:00 AM',
        description: 'Experience the smooth sounds of jazz in our intimate setting. Professional jazz musicians create the perfect ambiance for a sophisticated evening. Enjoy craft cocktails and gourmet snacks while listening to timeless jazz classics.',
        image: '/images/event-acoustic.jpg',
        imageHint: 'jazz performance',
        category: 'Music',
        price: '₹300 Entry',
        capacity: '35 people',
        features: ['Live Jazz Music', 'Craft Cocktails', 'Gourmet Snacks', 'Sophisticated Atmosphere'],
        highlights: ['Professional jazz musicians', 'Craft cocktail menu', 'Elegant setting', 'Monthly themes']
    },
    {
        title: 'Creative Writing Workshop',
        date: 'Second Sunday Monthly',
        time: '10:00 AM - 12:00 PM',
        description: 'Unlock your writing potential in our creative writing workshop. Learn new techniques, get feedback on your work, and connect with fellow writers. Perfect for aspiring authors and anyone who loves to write.',
        image: '/images/event-art.jpg',
        imageHint: 'writing workshop',
        category: 'Creative',
        price: '₹400',
        capacity: '20 people',
        features: ['Writing Exercises', 'Peer Feedback', 'Expert Tips', 'Coffee & Pastries'],
        highlights: ['Published author instructor', 'Small group size', 'Personal attention', 'Writing prompts']
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
                        Immerse yourself in our vibrant cultural scene. From live music to art workshops, 
                        poetry readings to jazz nights - every event is crafted to inspire creativity and 
                        bring our community together.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span>6+ Events Monthly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span>200+ Attendees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary fill-current" />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Coffee className="w-5 h-5 text-primary" />
                            <span>Free Coffee for Performers</span>
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
                    {events.map((event, index) => (
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
            
            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-amber-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-responsive-lg font-bold mb-4">
                        Want to Host an Event?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Have a great idea for an event? We're always looking for creative partners to bring 
                        unique experiences to our community. Let's collaborate!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                            <Link href="/contact" className="flex items-center gap-2">
                                <Mic className="w-5 h-5" />
                                Propose an Event
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4">
                            <Link href="/menu" className="flex items-center gap-2">
                                <Coffee className="w-5 h-5" />
                                View Menu
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="font-bold text-2xl text-primary mb-4">
                        Art in Every Sip. Soul in Every Bite.
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Join our vibrant community of artists, musicians, writers, and coffee lovers. 
                        Every event is an opportunity to connect, create, and celebrate the arts.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Siddharth Nagar, UP</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Open Daily 7AM-11PM</span>
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
