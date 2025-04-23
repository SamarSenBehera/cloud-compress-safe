
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About SecureZip</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            The fastest and most secure way to compress and store your files.
          </p>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">David Chen</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                Compression algorithm expert with 15+ years in data storage technologies.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600">
                Security specialist focusing on encryption and privacy technologies.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                  alt="Lead Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Michael Rodriguez</h3>
              <p className="text-blue-600 mb-2">Lead Developer</p>
              <p className="text-gray-600">
                Cloud infrastructure expert who architected our scalable platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Using SecureZip Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Compress, store, and share your files securely with our advanced platform.
          </p>
          <Link to="/register">
            <Button className="text-lg bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 h-auto font-bold">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
