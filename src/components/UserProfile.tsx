import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  User, 
  Clock, 
  Plus,
  ShieldCheck
} from 'lucide-react';
import type { Address, PastOrder } from '../data/mockData';

interface UserProfileProps {
  pastOrders: PastOrder[];
  addresses: Address[];
  onAddAddress: (newAddr: Address) => void;
  onReorder: (order: PastOrder) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  pastOrders,
  addresses,
  onAddAddress,
  onReorder
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'one'>('orders');
  const [newTag, setNewTag] = useState<'Home' | 'Work' | 'Other'>('Other');
  const [newDetails, setNewDetails] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetails.trim()) return;

    const newAddr: Address = {
      id: `addr_${Date.now()}`,
      tag: newTag,
      details: newDetails
    };

    onAddAddress(newAddr);
    setNewDetails('');
    setShowAddForm(false);
  };

  return (
    <main className="main-content">
      <div className="container profile-container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--theme-color)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>John Doe</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              johndoe@example.com • +91 98765 43210
            </p>
          </div>
        </div>

        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <button 
              className={`profile-side-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Clock size={16} />
              <span>Past Orders</span>
            </button>
            <button 
              className={`profile-side-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={16} />
              <span>Saved Addresses</span>
            </button>
            <button 
              className={`profile-side-btn ${activeTab === 'one' ? 'active' : ''}`}
              onClick={() => setActiveTab('one')}
            >
              <Sparkles size={16} />
              <span>Swiggy One</span>
            </button>
          </aside>

          {/* Main Dashboard panel */}
          <div className="profile-main-panel">
            
            {activeTab === 'orders' && (
              <div className="profile-section-card">
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Your Order History</h3>
                {pastOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                    No orders placed yet.
                  </div>
                ) : (
                  <div className="past-orders-list">
                    {pastOrders.map((order) => (
                      <div key={order.id} className="order-history-card">
                        <div className="order-history-header">
                          <div>
                            <div className="order-history-rest-name">{order.restaurantName}</div>
                            <div className="order-history-date">{order.date}</div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', backgroundColor: '#f0fdf4', padding: '4px 10px', borderRadius: '4px' }}>
                            Delivered
                          </span>
                        </div>

                        <div className="order-history-items">
                          {order.items.join(', ')}
                        </div>

                        <div className="order-history-footer">
                          <span>Total Paid: ₹{order.total}</span>
                          <button className="reorder-btn" onClick={() => onReorder(order)}>
                            Reorder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="profile-section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Manage Addresses</h3>
                  <button 
                    className="filter-badge-btn active" 
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={14} /> Add New
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddAddressSubmit} style={{ marginBottom: '24px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input 
                          type="radio" 
                          name="tag" 
                          checked={newTag === 'Home'} 
                          onChange={() => setNewTag('Home')}
                        />
                        <span>Home</span>
                      </label>
                      <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input 
                          type="radio" 
                          name="tag" 
                          checked={newTag === 'Work'} 
                          onChange={() => setNewTag('Work')}
                        />
                        <span>Work</span>
                      </label>
                      <label style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input 
                          type="radio" 
                          name="tag" 
                          checked={newTag === 'Other'} 
                          onChange={() => setNewTag('Other')}
                        />
                        <span>Other</span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                      <label htmlFor="address-details" style={{ fontSize: '12px', fontWeight: 600 }}>Address Details</label>
                      <input 
                        id="address-details"
                        type="text" 
                        placeholder="Flat no., Building, Street name, Locality" 
                        value={newDetails}
                        onChange={(e) => setNewDetails(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          fontSize: '13px',
                          border: '1px solid var(--border-strong)',
                          borderRadius: 'var(--radius-sm)',
                          outline: 'none',
                          backgroundColor: 'var(--bg-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--theme-color)' }}>
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        backgroundColor: 'var(--bg-secondary)'
                      }}
                    >
                      <MapPin size={20} style={{ color: 'var(--theme-color)', marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{addr.tag}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                          {addr.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'one' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="swiggy-one-banner">
                  <div className="one-logo-text">one</div>
                  <h3 style={{ color: 'white', fontSize: '20px', marginTop: '8px' }}>Active Membership</h3>
                  <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '4px' }}>
                    Member since July 2026 • Valid till July 2027
                  </p>

                  <div className="one-benefits-grid">
                    <div className="one-benefit-item">
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#f59e0b' }}>Free Delivery</div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>On all food orders above ₹199</div>
                    </div>
                    <div className="one-benefit-item">
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#ec4899' }}>10-Min Free</div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>On grocery orders above ₹199</div>
                    </div>
                    <div className="one-benefit-item">
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#8b5cf6' }}>Extra 30% Off</div>
                      <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>On 10,000+ premium restaurants</div>
                    </div>
                  </div>
                </div>

                <div className="profile-section-card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <ShieldCheck size={40} color="#22c55e" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Total Savings Tracker</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      You saved <strong style={{ color: '#22c55e', fontSize: '14px' }}>₹450</strong> in delivery fees and discounts this month!
                    </p>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
                      <div style={{ width: '60%', height: '100%', backgroundColor: '#22c55e' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  );
};
