import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Flame, Plus, Minus } from 'lucide-react';
import { MOCK_GROCERIES } from '../data/mockData';
import type { GroceryItem } from '../data/mockData';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight?: string;
}

interface InstamartProps {
  cartItems: CartItem[];
  onAddToCart: (item: GroceryItem) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  searchQuery: string;
}

export const Instamart: React.FC<InstamartProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  searchQuery
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('g_dairy');

  const selectedCategory = MOCK_GROCERIES.find(cat => cat.id === selectedCategoryId) || MOCK_GROCERIES[0];

  // Filtering based on active category & search query
  const filteredProducts = selectedCategory.items.filter(item => {
    if (!searchQuery.trim()) return true;
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate quantity of a product in cart
  const getProductQty = (productId: string) => {
    const found = cartItems.find(i => i.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <main className="main-content">
      <div className="container instamart-container">
        
        {/* Instamart Promo Banners */}
        <div className="instamart-banner-grid">
          <div className="instamart-big-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Flame size={20} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Instamart Express</span>
            </div>
            <h2 style={{ fontSize: '28px', color: 'white', lineHeight: 1.2, marginBottom: '8px' }}>
              Groceries Delivered in 10 Minutes!
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.9, maxWidth: '400px' }}>
              Fresh dairy, green vegetables, premium fruits, and late-night munchies sent straight to your door step.
            </p>
          </div>

          <div className="instamart-small-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={16} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Super Offer</span>
            </div>
            <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '6px' }}>Flat 20% OFF</h3>
            <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '12px' }}>
              On your first grocery order above ₹250.
            </p>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 800 }}>
              Use Code: INSTASAVE
            </div>
          </div>
        </div>

        {/* Instamart Shop Layout */}
        <div className="instamart-layout-grid">
          
          {/* Sidebar Navigation */}
          <aside className="instamart-sidebar">
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', padding: '0 12px 8px', textTransform: 'uppercase', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
              Categories
            </div>
            {MOCK_GROCERIES.map((category) => (
              <button
                key={category.id}
                className={`instamart-side-btn ${selectedCategoryId === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.label}
              </button>
            ))}
          </aside>

          {/* Products Grid */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>
                {selectedCategory.label}
              </h3>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Showing {filteredProducts.length} items
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>No products found</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Try searching for something else or browse different categories.
                </p>
              </div>
            ) : (
              <div className="instamart-product-grid">
                {filteredProducts.map((product) => {
                  const qty = getProductQty(product.id);

                  return (
                    <article key={product.id} className="instamart-product-card">
                      <div className="product-img-wrapper">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-img"
                          loading="lazy"
                        />
                      </div>
                      <span className="product-weight">{product.weight}</span>
                      <h4 className="product-name">{product.name}</h4>
                      
                      <div className="product-price-row">
                        <span className="product-price">₹{product.price}</span>
                        
                        {qty === 0 ? (
                          <button 
                            className="instamart-add-btn"
                            onClick={() => onAddToCart(product)}
                          >
                            Add
                          </button>
                        ) : (
                          <div 
                            className="item-quantity-selector" 
                            style={{ 
                              width: '76px', 
                              padding: '2px 6px', 
                              borderColor: 'var(--instamart-primary)',
                              color: 'var(--instamart-primary)',
                              fontSize: '12px' 
                            }}
                          >
                            <button 
                              className="quantity-control-btn"
                              style={{ width: '16px', height: '16px', fontSize: '12px' }}
                              onClick={() => onUpdateQuantity(product.id, qty - 1)}
                            >
                              <Minus size={10} />
                            </button>
                            <span>{qty}</span>
                            <button 
                              className="quantity-control-btn"
                              style={{ width: '16px', height: '16px', fontSize: '12px' }}
                              onClick={() => onUpdateQuantity(product.id, qty + 1)}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

      </div>
    </main>
  );
};
