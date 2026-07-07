import React, { useState } from 'react';
import { X, MapPin, CreditCard, Landmark, DollarSign, Smartphone } from 'lucide-react';
import type { Address } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  grandTotal: number;
  discountAmount: number;
  addresses: Address[];
  selectedAddress: Address;
  onSelectAddress: (addr: Address) => void;
  onPaySuccess: (paymentMethod: string) => void;
  appMode: 'food' | 'instamart';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  grandTotal,
  discountAmount,
  addresses,
  selectedAddress,
  onSelectAddress,
  onPaySuccess,
  appMode
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  if (!isOpen) return null;

  const handlePayClick = () => {
    let methodLabel = '';
    switch(selectedMethod) {
      case 'upi': methodLabel = 'UPI'; break;
      case 'card': methodLabel = 'Credit/Debit Card'; break;
      case 'netbanking': methodLabel = 'Net Banking'; break;
      case 'cod': methodLabel = 'Cash on Delivery'; break;
    }
    onPaySuccess(methodLabel);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Confirm Order & Pay</h3>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close Checkout">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Section 1: Delivery Address */}
          <div>
            <h4 className="modal-section-title">Delivery Address</h4>
            <div className="address-selection-grid">
              {addresses.map((addr) => (
                <div 
                  key={addr.id}
                  className={`address-option-card ${selectedAddress.id === addr.id ? 'selected' : ''}`}
                  onClick={() => onSelectAddress(addr)}
                >
                  <MapPin 
                    size={18} 
                    style={{ 
                      color: selectedAddress.id === addr.id ? 'var(--theme-color)' : 'var(--text-muted)',
                      flexShrink: 0 
                    }} 
                  />
                  <div className="address-card-info">
                    <span className="address-tag-title">{addr.tag}</span>
                    <span className="address-details-text">{addr.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Payment Methods */}
          <div>
            <h4 className="modal-section-title">Select Payment Method</h4>
            <div className="payment-methods-list">
              <div 
                className={`payment-method-row ${selectedMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('upi')}
              >
                <Smartphone size={18} style={{ color: selectedMethod === 'upi' ? 'var(--theme-color)' : 'var(--text-muted)' }} />
                <span className="pay-title">UPI (Google Pay, PhonePe, Paytm)</span>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedMethod === 'upi'} 
                  onChange={() => {}}
                  style={{ accentColor: 'var(--theme-color)' }}
                />
              </div>

              <div 
                className={`payment-method-row ${selectedMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('card')}
              >
                <CreditCard size={18} style={{ color: selectedMethod === 'card' ? 'var(--theme-color)' : 'var(--text-muted)' }} />
                <span className="pay-title">Credit or Debit Cards</span>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedMethod === 'card'} 
                  onChange={() => {}}
                  style={{ accentColor: 'var(--theme-color)' }}
                />
              </div>

              <div 
                className={`payment-method-row ${selectedMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('netbanking')}
              >
                <Landmark size={18} style={{ color: selectedMethod === 'netbanking' ? 'var(--theme-color)' : 'var(--text-muted)' }} />
                <span className="pay-title">Net Banking</span>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedMethod === 'netbanking'} 
                  onChange={() => {}}
                  style={{ accentColor: 'var(--theme-color)' }}
                />
              </div>

              <div 
                className={`payment-method-row ${selectedMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('cod')}
              >
                <DollarSign size={18} style={{ color: selectedMethod === 'cod' ? 'var(--theme-color)' : 'var(--text-muted)' }} />
                <span className="pay-title">Cash on Delivery (COD)</span>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedMethod === 'cod'} 
                  onChange={() => {}}
                  style={{ accentColor: 'var(--theme-color)' }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Summary breakdown */}
          <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600 }}>
              <span>Total Bill Amount:</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>₹{grandTotal}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#22c55e', marginTop: '4px', fontWeight: 600 }}>
                <span>Coupon discount saved:</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handlePayClick}
            style={{ 
              backgroundColor: 'var(--theme-color)',
              boxShadow: appMode === 'food' ? '0 4px 12px rgba(255, 82, 0, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}
          >
            Pay ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
};
