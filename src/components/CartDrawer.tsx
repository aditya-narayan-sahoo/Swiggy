import React, { useState } from 'react';
import { X, Plus, Minus, Tag, Trash2, ShoppingBag } from 'lucide-react';
import { MOCK_COUPONS } from '../data/mockData';
import type { Coupon } from '../data/mockData';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg?: boolean; // for restaurant items
  weight?: string; // for grocery items
  restaurantId?: string; // for restaurant items
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (finalTotal: number, discountAmount: number) => void;
  appMode: 'food' | 'instamart';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appMode
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [instructions, setInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Delivery calculations
  const platformFee = 5;
  const isFreeDelivery = itemTotal > 199;
  const deliveryFee = itemTotal === 0 ? 0 : (isFreeDelivery ? 0 : 30);
  const gstCharges = Math.round(itemTotal * 0.05); // 5% GST

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon) {
    if (itemTotal >= appliedCoupon.minOrderValue) {
      discountAmount = Math.round((itemTotal * appliedCoupon.discountPercent) / 100);
      if (discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      // Coupon invalid due to reduced cart total
      setAppliedCoupon(null);
      setErrorMsg(`Coupon requires minimum order of ₹${appliedCoupon.minOrderValue}`);
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + platformFee + gstCharges - discountAmount);

  const handleApplyCoupon = (code: string) => {
    setErrorMsg('');
    const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      setErrorMsg('Invalid Coupon Code');
      return;
    }

    if (itemTotal < coupon.minOrderValue) {
      setErrorMsg(`Minimum order value to apply is ₹${coupon.minOrderValue}`);
      return;
    }

    if (appMode === 'instamart' && code === 'SWIGGYIT') {
      setErrorMsg('SWIGGYIT is only valid for food delivery');
      return;
    }

    if (appMode === 'food' && code === 'INSTASAVE') {
      setErrorMsg('INSTASAVE is only valid for Instamart groceries');
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setErrorMsg('');
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    onCheckout(grandTotal, discountAmount);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3 className="drawer-title">
            <ShoppingBag size={20} style={{ color: 'var(--theme-color)' }} />
            <span>My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
          </h3>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close Cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80" 
                alt="Empty Cart" 
                className="empty-cart-img"
                style={{ borderRadius: 'var(--radius-md)', opacity: 0.8 }}
              />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Add items to get started on your delicious order!
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="cart-items-scroll">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-name-group">
                      {appMode === 'food' && (
                        <span className={item.isVeg ? 'veg-icon-badge' : 'nonveg-icon-badge'} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        {item.weight && (
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.weight}</div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="cart-item-qty-box">
                        <button 
                          className="quantity-control-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="quantity-control-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="cart-item-price">
                        ₹{item.price * item.quantity}
                      </div>

                      <button 
                        style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Selection */}
              <div>
                {!appliedCoupon ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="ENTER PROMO CODE" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{
                          flexGrow: 1,
                          border: '1px solid var(--border-strong)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '8px 12px',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          outline: 'none',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <button 
                        onClick={() => handleApplyCoupon(couponCode)}
                        style={{
                          backgroundColor: 'var(--theme-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '8px 16px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        APPLY
                      </button>
                    </div>
                    {errorMsg && (
                      <div style={{ color: '#ef4444', fontSize: '11px', fontWeight: 600 }}>
                        {errorMsg}
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Available Codes: <strong style={{ color: 'var(--theme-color)' }}>SWIGGYIT</strong> (50% Food), <strong style={{ color: 'var(--theme-color)' }}>INSTASAVE</strong> (20% Groceries)
                    </div>
                  </div>
                ) : (
                  <div className="coupon-applied-alert">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={16} />
                      <div>
                        <strong>'{appliedCoupon.code}' APPLIED</strong>
                        <div>Saved ₹{discountAmount} on this order!</div>
                      </div>
                    </div>
                    <button className="remove-coupon-btn" onClick={handleRemoveCoupon}>
                      REMOVE
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="instructions-section">
                <label className="instructions-title" htmlFor="instructions">Delivery Instructions</label>
                <textarea 
                  id="instructions"
                  className="instructions-input"
                  placeholder="e.g. Avoid ringing bell, leave at the door..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              {/* Billing Info */}
              <div className="billing-section">
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Bill Details</div>
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="bill-row savings">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span style={{ color: '#22c55e', fontWeight: 600 }}>FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="bill-row">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="bill-row">
                  <span>GST & Restaurant Charges</span>
                  <span>₹{gstCharges}</span>
                </div>

                <div className="bill-row grand-total">
                  <span>To Pay</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <button className="checkout-action-btn" onClick={handleCheckoutClick}>
              <span>Proceed to Checkout</span>
              <span style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '8px' }}>
                ₹{grandTotal}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
