import { Link } from "react-router-dom";
import { ArrowRight, Lock, FileUp, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="purple-blue-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[50vw] h-full z-0" style={{background:"radial-gradient(circle at top left, #a78bfa66 40%, transparent 85%)"}}></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 z-0" style={{background:"radial-gradient(circle at bottom right, #0ea5e966 40%, transparent 85%)"}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purplebrand via-bluebrand to-blue-400">
                  Compress Your Files Without Losing Quality
                </span>
              </h1>
              <p className="text-xl opacity-90">
                Securely compress, encrypt, and store any file type in the cloud with
                our lossless compression technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button className="text-lg bg-white text-purplebrand hover:bg-blue-100 px-6 py-6 h-auto w-full sm:w-auto cta-glow border-0 font-bold">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button className="text-lg blue-purple-gradient border-0 hover:opacity-80 px-6 py-6 h-auto w-full sm:w-auto font-bold">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-90"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-80"></div>
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
      <section className="py-20 bg-lightpurple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purplebrand drop-shadow">How It Works</h2>
            <p className="mt-4 text-xl text-bluebrand max-w-2xl mx-auto">
              Our platform provides a simple, secure way to compress and store files without
              losing quality or functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Lossless Compression"
              description="Compress any file type without losing quality or functionality. Our technology ensures your files remain exactly as they were."
              icon={<FileUp className="w-7 h-7 text-purplebrand" />}
            />
            <FeatureCard
              title="End-to-End Encryption"
              description="Your files are encrypted before storage using AES-256 encryption, ensuring no one but you can access your data."
              icon={<Lock className="w-7 h-7 text-bluebrand" />}
            />
            <FeatureCard
              title="Secure Cloud Storage"
              description="Store your compressed files in our secure cloud infrastructure with 99.9% uptime and instant access from anywhere."
              icon={<Database className="w-7 h-7 text-purplebrand" />}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl stat-gradient shadow-lg border-0">
              <p className="text-4xl font-bold">50%+</p>
              <p className="mt-2 text-lg">Average File Size Reduction</p>
            </div>
            <div className="p-6 rounded-xl stat-gradient shadow-lg border-0">
              <p className="text-4xl font-bold">100%</p>
              <p className="mt-2 text-lg">Lossless Quality</p>
            </div>
            <div className="p-6 rounded-xl stat-gradient shadow-lg border-0">
              <p className="text-4xl font-bold">256-bit</p>
              <p className="mt-2 text-lg">AES Encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 feature-gradient text-white relative">
        <div className="absolute left-0 top-0 w-full h-full opacity-30 z-0" style={{background:"radial-gradient(circle at top, #a78bfa44 50%, transparent 90%)"}}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-lg">Ready to Start Compressing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users saving storage space without compromising quality.
          </p>
          <Link to="/register">
            <Button className="text-lg bg-white text-purplebrand hover:bg-blue-100 px-6 py-6 h-auto cta-glow border-0 font-bold">
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
