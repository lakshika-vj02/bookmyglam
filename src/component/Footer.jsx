import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer pt-5 mt-5">
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-title">💄 BookMyGlam</h3>
            <p className="mb-4">
              Book your favorite makeup artist easily for weddings, parties, and special occasions.
            </p>
            <div className="social-links mb-4">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Artists</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Booking</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-lg-2 col-md-6">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#">Bridal Makeup</a></li>
              <li><a href="#">Party Makeup</a></li>
              <li><a href="#">HD Makeup</a></li>
              <li><a href="#">Engagement Makeup</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-title">Contact Us</h3>
            <p className="mb-1 text-gray-400">📍 Jaipur, India</p>
            <p className="mb-1 text-gray-400">📞 +91 9876543210</p>
            <p className="mb-4 text-gray-400">✉️ support@bookmyglam.com</p>

            {/* Newsletter Form */}
                      </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom mt-5">
        <div className="container">
          <div className="row py-3">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">&copy; 2026 BookMyGlam. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Designed with <i className="fas fa-heart text-danger"></i> for Beauty
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}