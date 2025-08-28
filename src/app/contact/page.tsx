import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube, Send, Coffee, Heart, Star, MessageCircle, Navigation, Calendar, Users, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Creative Street, Siddharth Nagar, UP 272192",
      color: "from-blue-500 to-cyan-500",
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 8130770794",
      color: "from-green-500 to-emerald-500",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@craftybean.com",
      color: "from-purple-500 to-pink-500",
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: "Daily: 11:30 AM - 11:00 PM",
      color: "from-amber-500 to-orange-500",
      action: "View Menu"
    }
  ];

  const features = [
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "Stay connected while you work or relax"
    },
    {
      icon: Coffee,
      title: "Artisanal Coffee",
      description: "Freshly brewed specialty coffee"
    },
    {
      icon: Users,
      title: "Community Space",
      description: "Perfect for meetings and events"
    },
    {
      icon: Calendar,
      title: "Event Hosting",
      description: "Book our space for your events"
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "from-pink-500 to-rose-500" },
    { name: "Facebook", icon: Facebook, href: "#", color: "from-blue-500 to-indigo-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "from-sky-500 to-blue-500" },
    { name: "YouTube", icon: Youtube, href: "#", color: "from-red-500 to-pink-500" }
  ];

  return (
    <div className="bg-background text-foreground font-body">
      {/* Hero Header */}
      <header className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 text-amber-600/20">
          <MessageCircle className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-20 w-32 h-32 text-orange-600/20">
          <Heart className="w-full h-full" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            📞 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a question, want to book an event, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Contact Information Cards */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🎯 Quick Contact
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Reach Out to <span className="text-primary">The Crafty Bean</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Multiple ways to get in touch. Choose what works best for you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{info.details}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  ✍️ Send Message
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Drop Us a <span className="text-primary">Message</span>
                </h2>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours. Promise!
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Your first name" 
                      className="form-input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Your last name" 
                      className="form-input-modern"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="form-input-modern"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+91 98765 43210" 
                    className="form-input-modern"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What's this about?" 
                    className="form-input-modern"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us what's on your mind..." 
                    rows={5}
                    className="form-input-modern resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Location Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  📍 Find Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Visit Our <span className="text-primary">Creative Space</span>
                </h2>
                <p className="text-muted-foreground">
                  Located in the heart of Siddharth Nagar, we're easy to find!
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden border-2 border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground">Map integration coming soon!</p>
                  </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
              </div>

              {/* Location Details */}
              <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Getting Here</h3>
                      <p className="text-muted-foreground mb-3">
                        We're located on Creative Street, just a 5-minute walk from the main market. 
                        Look for our artistic café sign with the coffee cup and paintbrush!
                      </p>
                      <Button variant="outline" size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Why Visit Us
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              More Than Just a <span className="text-primary">Café</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of creativity, community, and culinary excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Media & CTA */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl">
            <div className="max-w-3xl mx-auto px-4">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🌟 Stay Connected
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Follow Our <span className="text-primary">Creative Journey</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get daily inspiration, behind-the-scenes content, and updates about our events and special offers.
              </p>
              
              {/* Social Media Links */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className={`bg-gradient-to-br ${social.color} text-white border-0 hover:scale-110 transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5 mr-2" />
                    {social.name}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  <Link href="/menu" className="flex items-center gap-2">
                    Explore Our Menu
                    <Star className="w-5 h-5" />
                  </Link>
                </Button>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">☕</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              The Crafty Bean
            </h3>
            <p className="text-slate-300">Art in Every Sip. Soul in Every Bite.</p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} The Crafty Bean. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
