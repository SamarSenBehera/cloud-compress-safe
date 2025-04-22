
import { Link } from "react-router-dom";
import { ArrowRight, Lock, FileUp, FileDown, Database, Shield, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-background pt-16 pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block">File compression</span>
                <span className="block text-primary">for the modern web</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                SecureZip compresses, encrypts, and stores any file type in the cloud with 
                our lossless compression technology. Never lose quality again.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button className="text-lg bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto w-full sm:w-auto">
                    Sign up for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" className="text-lg bg-transparent hover:bg-secondary/50 px-6 py-6 h-auto w-full sm:w-auto">
                    Learn more
                    <ArrowDown className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-primary/10 animate-pulse-slow">
                    <div className="flex items-center mb-4">
                      <Logo size="sm" />
                      <div className="ml-auto flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-5 bg-primary/10 rounded animate-pulse-slow" style={{ animationDelay: '0.1s' }}></div>
                      <div className="h-5 bg-primary/10 rounded w-3/4 animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-5 bg-primary/10 rounded w-5/6 animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
                      <div className="h-5 bg-primary/10 rounded w-2/3 animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
                      <div className="h-5 bg-primary/10 rounded animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex items-center text-sm">
                        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                        <div className="ml-2">
                          <div className="h-3 w-20 bg-primary/10 rounded"></div>
                          <div className="h-2 w-16 bg-primary/10 rounded mt-1"></div>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="h-8 w-20 bg-primary rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a simple, secure way to compress and store files without 
              losing quality or functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <FeatureCard 
                title="Lossless Compression" 
                description="Compress any file type without losing quality or functionality. Our technology ensures your files remain exactly as they were."
                icon={<FileUp className="w-6 h-6" />}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <FeatureCard 
                title="End-to-End Encryption" 
                description="Your files are encrypted before storage using AES-256 encryption, ensuring no one but you can access your data."
                icon={<Lock className="w-6 h-6" />}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <FeatureCard 
                title="Secure Cloud Storage" 
                description="Store your compressed files in our secure cloud infrastructure with 99.9% uptime and instant access from anywhere."
                icon={<Database className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg border border-border bg-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-4xl font-bold text-primary">50%+</p>
              <p className="mt-2 text-lg text-muted-foreground">Average File Size Reduction</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="mt-2 text-lg text-muted-foreground">Lossless Quality</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-4xl font-bold text-primary">256-bit</p>
              <p className="mt-2 text-lg text-muted-foreground">AES Encryption</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white animate-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Compressing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users saving storage space without compromising quality.
          </p>
          <Link to="/register">
            <Button className="text-lg bg-white text-primary hover:bg-gray-100 px-6 py-6 h-auto">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
