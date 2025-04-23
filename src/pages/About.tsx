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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://avatars.githubusercontent.com/u/131295002?v=4" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">BIDYADHAR SAHU</h3>
              <p className="text-blue-600 mb-2">Cloud Solution Developer</p>
              <p className="text-gray-600">
                Expert in algorithms and cloud infrastructure, with a strong background in designing scalable platforms and working with blockchain technologies.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://avatars.githubusercontent.com/u/148786427?s=400&u=794e7f3fe9c184c5fbb45f64d548f7d55175a5ea&v=4" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">SAMAR SEN BEHERA</h3>
              <p className="text-blue-600 mb-2">UI/UX Designer</p>
              <p className="text-gray-600">
                Experienced DevOps specialist focused on streamlining development workflows and infrastructure automation.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://avatars.githubusercontent.com/u/183403536?v=4" 
                  alt="Lead Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">SOUMIK ROUTRAY</h3>
              <p className="text-blue-600 mb-2">Frontend Devloper</p>
              <p className="text-gray-600">
                Skilled frontend developer focused on creating seamless and interactive user interfaces.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 shadow-xl">
                <img 
                  src="https://avatars.githubusercontent.com/u/148786427?s=400&u=794e7f3fe9c184c5fbb45f64d548f7d55175a5ea&v=4" 
                  alt="Product Manager" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">ADITYA PRASAD SAHU</h3>
              <p className="text-blue-600 mb-2">Cybersecurity specialist</p>
              <p className="text-gray-600">
                Experienced in cybersecurity, focused on protecting digital assets through advanced security practices.
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
