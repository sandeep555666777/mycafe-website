import Image from 'next/image';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <header className="py-10 bg-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">
            Visit Us
          </h1>
          <p className="text-xl text-muted-foreground mt-2">We can't wait to see you!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <Card className="shadow-lg max-w-5xl mx-auto bg-card/50 border-2 border-primary/10">
          <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-10 items-center">
             <div className="w-full h-80 md:h-full rounded-lg overflow-hidden relative">
               <Image src="https://images.unsplash.com/photo-1511920183353-3c7c9097d2a9?q=80&w=1887&auto=format&fit=crop" alt="Cafe Location" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
             </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-headline text-3xl flex items-center gap-3 mb-3">
                  <MapPin className="w-8 h-8 text-accent" />
                  Location
                </h3>
                <p className="mt-2 text-muted-foreground text-lg pl-11">
                  Gobrahwa Bazar Road
                  <br />
                  Near Hotel Aashiyana
                  <br />
                  Infront of Little Angle Play School
                  <br />
                  Siddharth Nagar, Uttar Pradesh
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-headline text-3xl flex items-center gap-3 mb-3">
                  <Clock className="w-8 h-8 text-accent" />
                  Hours
                </h3>
                <ul className="mt-2 text-muted-foreground text-lg space-y-1 pl-11">
                  <li>Mon - Fri: 8am - 8pm</li>
                  <li>Sat - Sun: 9am - 10pm</li>
                </ul>
              </div>
               <Separator />
               <div>
                <h3 className="font-headline text-3xl flex items-center gap-3 mb-3">
                  <Phone className="w-8 h-8 text-accent" />
                  Contact
                </h3>
                <p className="mt-2 text-muted-foreground text-lg pl-11">
                  <a href="tel:918770149314" className="hover:text-primary">8770149314</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

       <footer className="py-10 mt-10 bg-primary/5">
        <div className="container mx-auto text-center text-muted-foreground">
           <p className="font-headline text-2xl text-primary mb-2">Art in Every Sip. Soul in Every Bite.</p>
          <p>
            &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
