import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  appMode: 'food' | 'instamart';
}

export const Footer: React.FC<FooterProps> = ({ appMode }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-col">
            <h4 className="footer-col-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'white' }}>
              {appMode === 'food' ? 'swiggy' : 'instamart'}
            </h4>
            <p style={{ fontSize: '13px', lineHeight: 1.6 }}>
              © 2026 Bundl Technologies Pvt. Ltd. Made with <Heart size={12} fill="#ef4444" color="#ef4444" style={{ display: 'inline' }} /> for pairing.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                style={{ height: '36px', cursor: 'pointer' }}
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on the App Store" 
                style={{ height: '36px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">About us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Team</a>
              <a href="#" className="footer-link">Swiggy One</a>
              <a href="#" className="footer-link">Swiggy Instamart</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Help & Support</a>
              <a href="#" className="footer-link">Partner with us</a>
              <a href="#" className="footer-link">Ride with us</a>
              <a href="#" className="footer-link">Terms & Conditions</a>
              <a href="#" className="footer-link">Privacy Policy</a>
            </div>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4 className="footer-col-title">We Deliver To</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Bangalore</a>
              <a href="#" className="footer-link">Gurgaon</a>
              <a href="#" className="footer-link">Hyderabad</a>
              <a href="#" className="footer-link">Delhi</a>
              <a href="#" className="footer-link">Mumbai</a>
              <a href="#" className="footer-link">Pune</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div style={{ color: 'var(--text-muted)' }}>
            Bundl Technologies Private Limited - CIN: U72200KA2013PTC098765
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.1-1.6 1.6-1.6H15V1.2C14.7 1.1 13.9 1 12.9 1 10.9 1 9.5 2.2 9.5 4.5V8H9z"/>
              </svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.2 2.4h3.3L14 10.8l8.2 10.8h-6.7l-5.2-6.8-6 6.8H1l7.8-9L1.2 2.4h6.9l4.7 6.2 5.4-6.2zm-1.2 17.5h1.8L7.1 4.7H5.2l11.8 15.2z"/>
              </svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Instagram">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Youtube">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.6a3 3 0 0 0-2.1-2.1C19.6 4 12 4 12 4s-7.6 0-9.4.5A3 3 0 0 0 .5 6.6C0 8.4 0 12 0 12s0 3.6.5 5.4a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.4.5-5.4s0-3.6-.5-5.4zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
