
import { Link } from "react-router-dom";
import { ArrowRight, Lock, FileUp, FileDown, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Compress Your Files Without Losing Quality
              </h1>
              <p className="text-xl opacity-90">
                Securely compress, encrypt, and store any file type in the cloud with 
                our lossless compression technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button className="text-lg bg-white text-blue-600 hover:bg-gray-100 px-6 py-6 h-auto w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button className="text-lg bg-transparent border-2 border-white hover:bg-white/10 px-6 py-6 h-auto w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=2787&auto=format&fit=crop" 
                    alt="Cloud Storage Illustration" 
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides a simple, secure way to compress and store files without 
              losing quality or functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Lossless Compression" 
              description="Compress any file type without losing quality or functionality. Our technology ensures your files remain exactly as they were."
              icon={<FileUp className="w-6 h-6" />}
            />
            <FeatureCard 
              title="End-to-End Encryption" 
              description="Your files are encrypted before storage using AES-256 encryption, ensuring no one but you can access your data."
              icon={<Lock className="w-6 h-6" />}
            />
            <FeatureCard 
              title="Secure Cloud Storage" 
              description="Store your compressed files in our secure cloud infrastructure with 99.9% uptime and instant access from anywhere."
              icon={<Database className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600">50%+</p>
              <p className="mt-2 text-lg text-gray-600">Average File Size Reduction</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="mt-2 text-lg text-gray-600">Lossless Quality</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600">256-bit</p>
              <p className="mt-2 text-lg text-gray-600">AES Encryption</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Compressing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users saving storage space without compromising quality.
          </p>
          <Link to="/register">
            <Button className="text-lg bg-white text-blue-600 hover:bg-gray-100 px-6 py-6 h-auto">
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
