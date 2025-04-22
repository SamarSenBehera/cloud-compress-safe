
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About CloudCompress</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Our mission is to make file storage and sharing more efficient and secure for everyone.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                CloudCompress was founded with a simple idea: storage shouldn't be expensive, and compression 
                shouldn't mean losing quality. We saw how people and businesses were struggling with limited 
                storage space and slow file transfers, and we wanted to create a solution.
              </p>
              <p>
                Our team of data compression experts and security professionals came together to build a platform 
                that could compress any file type without losing a single bit of data, while ensuring the highest 
                levels of security and privacy.
              </p>
              <p>
                Today, CloudCompress is trusted by thousands of users worldwide, from individual professionals 
                to large enterprises, all benefiting from our advanced compression technology and secure cloud storage.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Technology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                CloudCompress uses proprietary compression algorithms that analyze file structures to find 
                redundancies and patterns that can be efficiently stored. Unlike many compression tools 
                that use lossy methods, our technology is completely lossless.
              </p>
              <p>
                When you upload a file to CloudCompress, it goes through several stages:
              </p>
              <ol>
                <li>
                  <strong>Analysis:</strong> Our system analyzes the file structure to determine the most 
                  effective compression method.
                </li>
                <li>
                  <strong>Lossless Compression:</strong> The file is compressed using our advanced algorithms, 
                  maintaining 100% of the original data.
                </li>
                <li>
                  <strong>Encryption:</strong> Your compressed file is encrypted using AES-256 encryption before storage.
                </li>
                <li>
                  <strong>Secure Storage:</strong> The encrypted file is stored in our secure cloud infrastructure 
                  with redundancy across multiple data centers.
                </li>
              </ol>
              <p>
                When you download your file, the process is reversed, delivering a file that is identical to the original.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
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
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
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
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
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
          <h2 className="text-3xl font-bold mb-6">Join the CloudCompress Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience the power of lossless compression and secure storage today.
          </p>
          <Link to="/register">
            <Button className="text-lg bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 h-auto">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
