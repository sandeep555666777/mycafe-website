import Image from 'next/image';
import { Users, Wifi, Book, Pizza, Mic, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground font-body">
       <header className="py-10 bg-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground mt-2">The story behind the first artistic cafe in town.</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 space-y-20">
         <section id="founders">
            <h2 className="font-headline text-4xl mb-8 text-center">Our Story</h2>
            <Card className="max-w-4xl mx-auto shadow-lg border-2 border-primary/10">
              <CardContent className="p-6 md:p-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <div className="w-48 h-48 relative">
                     <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop" alt="Founders of The Crafty Bean" fill className="rounded-full shadow-md border-4 border-secondary object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Users className="w-10 h-10 text-accent mb-3" />
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    We are Rahil & Shabina — two souls who believe that every town deserves a corner where imagination feels at home. Our journey started with a question: "Why isn't there a peaceful place in Siddharthnagar where minds can pause, create, and sip?" So we built one. From sketchbooks to steaming cups, this is our dream served warm.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section
            id="why-us"
            className="text-center max-w-3xl mx-auto flex flex-col items-center"
          >
            <Coffee className="w-12 h-12 text-primary mb-4" />
            <h2 className="font-headline text-4xl mb-4">Why The Crafty Bean?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Because it's not just a café — it's a creative hub. A place where art meets aroma, where every cup of coffee is brewed with passion, and every corner inspires you to create, relax, and connect. The Crafty Bean is where Siddharth Nagar comes alive. Step in, feel the vibe, and be part of the city’s first true artistic café experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-2xl mt-4">
              <div className="flex flex-col items-center gap-2">
                <Wifi className="w-8 h-8 text-accent"/>
                <span className="font-semibold">Free WiFi</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Book className="w-8 h-8 text-accent"/>
                <span className="font-semibold">Book Nook</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Pizza className="w-8 h-8 text-accent"/>
                 <span className="font-semibold">Delicious Food</span>
              </div>
               <div className="flex flex-col items-center gap-2">
                <Mic className="w-8 h-8 text-accent"/>
                 <span className="font-semibold">Open Mic Nights</span>
              </div>
            </div>
          </section>
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
