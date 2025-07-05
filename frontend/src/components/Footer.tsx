import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">JobPortal</h2>
          <p className="mt-2 text-gray-400">
            Find your dream job with ease. Connecting top talent with the best companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-blue-300">Browse Jobs</a></li>
            <li><a href="#" className="hover:text-blue-300">Post a Job</a></li>
            <li><a href="#" className="hover:text-blue-300">Companies</a></li>
            <li><a href="#" className="hover:text-blue-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400">Follow Us</h3>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="hover:text-blue-400 text-xl">
              <FaDiscord />
            </a>
            <a href="https://x.com/Shubhanshu69973" className="hover:text-blue-400 text-xl">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/shubh9999/" className="hover:text-blue-400 text-xl">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/ShubhanshuOO7" className="hover:text-blue-400 text-xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
