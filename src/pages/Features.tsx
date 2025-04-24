
import { Check, FileType, Shield, Lock, Zap, Server, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-violet-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Features & Benefits</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Discover how CloudCompress makes file storage and sharing more efficient and secure.
          </p>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mr-4">
                  <FileType className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white-900">Lossless Compression</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our advanced compression algorithms reduce file sizes while maintaining 100% 
                of the original quality. Compress files without losing any data or functionality.
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Support for all file types (documents, images, videos, archives)</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Typically 30-60% reduction in file size</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Perfect file restoration - byte-for-byte identical to original</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white-900">Military-Grade Security</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Your files are protected with advanced encryption and security protocols,
                ensuring only you can access your sensitive information.
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>AES-256 encryption for all stored files</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Secure HTTPS connections for all transfers</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Optional end-to-end encryption for maximum privacy</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white-900">Fast Processing</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Experience rapid compression and decompression with our high-performance 
                algorithms and cloud infrastructure.
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Optimized compression engines for speed</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Parallel processing for large files</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Quick downloads and uploads with global CDN</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mr-4">
                  <Server className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white-900">Cloud Storage</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Store your compressed files securely in the cloud, accessible from anywhere
                on any device with an internet connection.
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Redundant storage across multiple data centers</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>99.9% uptime guarantee</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Automatic backups and version history</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Additional Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Private Sharing</h3>
              <p className="text-gray-600">
                Share files securely with password protection and expiration dates.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Backups</h3>
              <p className="text-gray-600">
                Set up automatic compression and backup schedules for important files.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with team members with shared folders and permissions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who are already saving storage space while keeping their files secure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button className="text-lg bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto px-8 py-6 h-auto">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button className="text-lg bg-transparent border-2 border-white hover:bg-white/10 w-full sm:w-auto px-8 py-6 h-auto">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Features;
