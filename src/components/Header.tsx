import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  ChevronDown 
} from 'lucide-react';
import type { Address } from '../data/mockData';

interface HeaderProps {
  appMode: 'food' | 'instamart';
  setAppMode: (mode: 'food' | 'instamart') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentAddress: Address;
  addresses: Address[];
  onSelectAddress: (addr: Address) => void;
  onResetView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  theme,
  toggleTheme,
  cartCount,
  onCartClick,
  onProfileClick,
  searchQuery,
  setSearchQuery,
  currentAddress,
  addresses,
  onSelectAddress,
  onResetView
}) => {
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        {/* Left Side: Logo & Address */}
        <div className="header-left">
          <div className="brand-logo" onClick={onResetView}>
            <div className="brand-logo-img">
              {appMode === 'food' ? 'S' : 'I'}
            </div>
            <span>{appMode === 'food' ? 'swiggy' : 'instamart'}</span>
          </div>

          <div 
            className="location-picker" 
            onClick={() => setShowAddressDropdown(!showAddressDropdown)}
            style={{ position: 'relative' }}
          >
            <MapPin size={16} className="theme-color" style={{ color: 'var(--theme-color)' }} />
            <span className="location-title">{currentAddress.tag}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentAddress.details}
            </span>
            <ChevronDown size={14} className="text-muted" />

            {showAddressDropdown && (
              <div 
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  width: '300px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-premium)',
                  zIndex: 110,
                  padding: '8px 0'
                }}
              >
                <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  Select Delivery Address
                </div>
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAddress(addr);
                      setShowAddressDropdown(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s',
                      backgroundColor: currentAddress.id === addr.id ? 'var(--bg-secondary)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentAddress.id === addr.id ? 'var(--bg-secondary)' : 'transparent'}
                  >
                    <div style={{ fontWeight: 700, color: currentAddress.id === addr.id ? 'var(--theme-color)' : 'var(--text-primary)' }}>
                      {addr.tag}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {addr.details}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Service toggle & Search */}
        <div className="header-center">
          <div className="service-toggle">
            <button 
              className={`toggle-btn ${appMode === 'food' ? 'active' : ''}`}
              onClick={() => setAppMode('food')}
            >
              Food Delivery
            </button>
            <button 
              className={`toggle-btn ${appMode === 'instamart' ? 'active' : ''}`}
              onClick={() => setAppMode('instamart')}
            >
              Instamart
            </button>
          </div>

          <div className="search-bar-container">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="search-bar-input"
              placeholder={appMode === 'food' ? "Search for restaurants or dishes..." : "Search groceries, snacks..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Cart, Profile, Theme Toggle */}
        <div className="header-right">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="nav-action-btn" onClick={onProfileClick}>
            <User size={18} />
            <span>Profile</span>
          </button>

          <button className="nav-action-btn" onClick={onCartClick}>
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
