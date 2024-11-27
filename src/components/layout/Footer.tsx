import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-white">GroceryStore</h3>
            <p className="text-sm">
              Your one-stop shop for fresh groceries and daily essentials.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#1DA1F2' }}
                className="hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#4267B2' }}
                className="hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#E1306C' }}
                className="hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3, color: '#FF0000' }}
                className="hover:text-white transition-colors"
              >
                <FaYoutube size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Shop', 'Categories', 'Blog', 'Contact'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div 
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <ul className="space-y-2">
              {[
                'FAQ',
                'Shipping Policy',
                'Returns & Exchanges',
                'Track Order',
                'Privacy Policy'
              ].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <FiMapPin className="text-green-500" />
                <span>123 Grocery St, Food City, FC 12345</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="text-green-500" />
                <span>+1 (234) 567-8900</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <FiMail className="text-green-500" />
                <span>support@grocerystore.com</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} GroceryStore. All rights reserved.
          </p>
          <div className="mt-2 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="mx-2">•</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 