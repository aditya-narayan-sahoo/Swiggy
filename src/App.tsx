import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RestaurantCard } from './components/RestaurantCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentSpinner } from './components/PaymentSpinner';
import { OrderTracking } from './components/OrderTracking';
import { Instamart } from './components/Instamart';
import { UserProfile } from './components/UserProfile';
import { 
  MOCK_RESTAURANTS, 
  MOCK_ADDRESSES, 
  MOCK_PAST_ORDERS 
} from './data/mockData';
import type { 
  Restaurant, 
  Address, 
  PastOrder, 
  MenuItem, 
  GroceryItem 
} from './data/mockData';
import { Clock, Star, AlertCircle, Plus, Minus } from 'lucide-react';


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg?: boolean;
  weight?: string;
  restaurantId?: string;
}

function App() {
  // Navigation & View states
  const [appMode, setAppMode] = useState<'food' | 'instamart'>('food');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeView, setActiveView] = useState<'home' | 'menu' | 'profile' | 'tracking'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [deliveryFilter, setDeliveryFilter] = useState(false);
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // User details
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [currentAddress, setCurrentAddress] = useState<Address>(MOCK_ADDRESSES[0]);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>(MOCK_PAST_ORDERS);

  // Cart configurations (independent for Food and Instamart)
  const [foodCart, setFoodCart] = useState<CartItem[]>([]);
  const [groceryCart, setGroceryCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout & Payment workflow states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [paymentMethodUsed, setPaymentMethodUsed] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Sync data attribute with HTML for theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync app mode styling
  useEffect(() => {
    document.documentElement.setAttribute('data-app', appMode);
    // Clear search query on app mode switch
    setSearchQuery('');
  }, [appMode]);

  // Toggle light/dark
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Address updates
  const handleSelectAddress = (addr: Address) => {
    setCurrentAddress(addr);
  };

  const handleAddAddress = (newAddr: Address) => {
    setAddresses(prev => [...prev, newAddr]);
    setCurrentAddress(newAddr);
  };

  // Cart operations
  const currentCart = appMode === 'food' ? foodCart : groceryCart;
  const setCurrentCart = appMode === 'food' ? setFoodCart : setGroceryCart;

  const handleAddFoodToCart = (item: MenuItem, restaurantId: string) => {
    setCurrentCart(prev => {
      // Check if item is from a different restaurant
      const hasDifferentRestaurant = prev.some(i => i.restaurantId && i.restaurantId !== restaurantId);
      
      if (hasDifferentRestaurant) {
        // Clear previous restaurant food, and add new one
        return [{
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          isVeg: item.isVeg,
          restaurantId
        }];
      }

      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += 1;
        return nextCart;
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        isVeg: item.isVeg,
        restaurantId
      }];
    });
  };

  const handleAddGroceryToCart = (item: GroceryItem) => {
    setCurrentCart(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += 1;
        return nextCart;
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        weight: item.weight
      }];
    });
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCurrentCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveCartItem = (id: string) => {
    setCurrentCart(prev => prev.filter(item => item.id !== id));
  };

  // Reorder functionality
  const handleReorder = (order: PastOrder) => {
    // Populate cart with mock items
    // Reorders default to food appMode
    setAppMode('food');
    // Find restaurant or default to first
    const rest = MOCK_RESTAURANTS.find(r => r.name === order.restaurantName) || MOCK_RESTAURANTS[0];
    setSelectedRestaurant(rest);
    
    // Scrape items
    const reorderItems: CartItem[] = order.items.map((itemStr, idx) => {
      const parts = itemStr.split(' x ');
      const name = parts[0];
      const qty = parseInt(parts[1]) || 1;
      
      // search item in restaurant menu categories
      let matchingItem: MenuItem | undefined;
      for (const cat of rest.menuCategories) {
        const found = cat.items.find(i => i.name === name);
        if (found) {
          matchingItem = found;
          break;
        }
      }

      return {
        id: matchingItem?.id || `re_${idx}`,
        name: name,
        price: matchingItem?.price || 200,
        quantity: qty,
        isVeg: matchingItem?.isVeg || true,
        restaurantId: rest.id
      };
    });

    setFoodCart(reorderItems);
    setActiveView('menu');
  };

  // Filter computations for restaurants list
  const filteredRestaurants = MOCK_RESTAURANTS.filter(rest => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = rest.name.toLowerCase().includes(q);
      const matchCuisines = rest.cuisines.some(c => c.toLowerCase().includes(q));
      const matchMenu = rest.menuCategories.some(cat => 
        cat.items.some(item => item.name.toLowerCase().includes(q))
      );
      if (!matchName && !matchCuisines && !matchMenu) return false;
    }

    // 2. Cuisine Quick Filter
    if (selectedCuisineFilter && !rest.cuisines.includes(selectedCuisineFilter)) {
      return false;
    }

    // 3. High Rating
    if (ratingFilter && rest.rating < 4.0) return false;

    // 4. Fast Delivery
    if (deliveryFilter && rest.deliveryTime > 25) return false;

    // 5. Veg Options
    if (vegOnlyFilter && !rest.tags.includes('Pure Veg Options')) return false;

    return true;
  });

  // Sort logic for restaurants list
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'deliveryTime') return a.deliveryTime - b.deliveryTime;
    if (sortBy === 'costLow') return a.costForTwo - b.costForTwo;
    if (sortBy === 'costHigh') return b.costForTwo - a.costForTwo;
    return 0; // relevance
  });

  // Unique list of cuisines for categories scroll
  const allCuisines = Array.from(
    new Set(MOCK_RESTAURANTS.flatMap(r => r.cuisines))
  );

  // Checkout handling
  const handleOpenCheckout = (total: number, discount: number) => {
    setIsCartOpen(false);
    setCheckoutTotal(total);
    setDiscountApplied(discount);
    setIsCheckoutOpen(true);
  };

  const handlePaySuccess = (method: string) => {
    setIsCheckoutOpen(false);
    setPaymentMethodUsed(method);
    setIsPaying(true);
  };

  const handleOrderConfirmed = () => {
    setIsPaying(false);
    
    // Add current cart items to Past Orders Log!
    const summaryItems = currentCart.map(i => `${i.name} x ${i.quantity}`);
    const newPastOrder: PastOrder = {
      id: `ord_${Date.now()}`,
      restaurantName: appMode === 'food' ? (selectedRestaurant?.name || 'Restaurant') : 'Swiggy Instamart Store',
      restaurantImage: appMode === 'food' 
        ? (selectedRestaurant?.image || 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80')
        : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      date: 'Today',
      items: summaryItems,
      total: checkoutTotal
    };

    setPastOrders(prev => [newPastOrder, ...prev]);

    // Clear cart
    setCurrentCart([]);
    // Redirect to order tracking page!
    setActiveView('tracking');
  };

  // Quick reset view to main home
  const handleResetView = () => {
    setActiveView('home');
    setSelectedRestaurant(null);
    setSelectedCuisineFilter(null);
    setRatingFilter(false);
    setDeliveryFilter(false);
    setVegOnlyFilter(false);
  };

  // Menu Search states
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [menuVegOnly, setMenuVegOnly] = useState(false);

  return (
    <div id="root">
      
      {/* HEADER SECTION */}
      <Header 
        appMode={appMode}
        setAppMode={(mode) => {
          setAppMode(mode);
          setActiveView('home');
        }}
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={currentCart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setActiveView('profile')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentAddress={currentAddress}
        addresses={addresses}
        onSelectAddress={handleSelectAddress}
        onResetView={handleResetView}
      />

      {/* RENDER ACTIVE VIEW */}
      
      {/* 1. HOME VIEW */}
      {activeView === 'home' && appMode === 'food' && (
        <main className="main-content">
          
          {/* Promotion Banner Carousel */}
          <section className="promo-section">
            <div className="container">
              <div className="promo-carousel">
                <div className="promo-card" onClick={() => handleApplyCouponFromBanner('SWIGGYIT')}>
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=200&q=80" alt="Special Deal" className="promo-img" />
                  <div className="promo-overlay">
                    <span className="promo-discount">50% OFF UP TO ₹120</span>
                    <span className="promo-code">USE CODE: SWIGGYIT</span>
                  </div>
                </div>
                <div className="promo-card" onClick={() => handleApplyCouponFromBanner('FREEFEAST')}>
                  <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&h=200&q=80" alt="Free Feast" className="promo-img" />
                  <div className="promo-overlay">
                    <span className="promo-discount">30% OFF UP TO ₹200</span>
                    <span className="promo-code">USE CODE: FREEFEAST</span>
                  </div>
                </div>
                <div className="promo-card">
                  <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&h=200&q=80" alt="Healthy Choices" className="promo-img" />
                  <div className="promo-overlay">
                    <span className="promo-discount">SUPER HEALTHY SALADS</span>
                    <span className="promo-code">UP TO 20% OFF EXTRA</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Categories Filter */}
          <section className="categories-section">
            <div className="container">
              <div className="section-title-row">
                <h2 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>What's on your mind?</h2>
              </div>
              <div className="categories-carousel">
                {allCuisines.map((cuisine) => {
                  const isActive = selectedCuisineFilter === cuisine;
                  return (
                    <div 
                      key={cuisine} 
                      className={`category-item ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedCuisineFilter(isActive ? null : cuisine)}
                    >
                      <div className="category-img-wrapper">
                        {/* Render simple food item avatars using text placeholder in clean style */}
                        <div style={{ fontSize: '28px' }}>
                          {cuisine === 'Biryani' && '🍛'}
                          {cuisine === 'Andhra' && '🌶️'}
                          {cuisine === 'North Indian' && '🫓'}
                          {cuisine === 'Burgers' && '🍔'}
                          {cuisine === 'American' && '🍟'}
                          {cuisine === 'Continental' && '🥩'}
                          {cuisine === 'Turkish' && '🥙'}
                          {cuisine === 'Salads' && '🥗'}
                          {cuisine === 'Mediterranean' && '🫓'}
                          {cuisine === 'Pizzas' && '🍕'}
                          {cuisine === 'Italian' && '🍝'}
                          {cuisine === 'Pastas' && '🍜'}
                          {cuisine === 'Mughlai' && '🥘'}
                          {cuisine === 'South Indian' && '🥞'}
                          {cuisine === 'Chettinad' && '🍖'}
                        </div>
                      </div>
                      <span className="category-label">{cuisine}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Restaurant listings section */}
          <section className="listings-section">
            <div className="container">
              
              {/* Filter bar */}
              <div className="filters-bar">
                <div className="filter-left-btns">
                  <button 
                    className={`filter-badge-btn ${selectedCuisineFilter ? 'active' : ''}`}
                    onClick={() => setSelectedCuisineFilter(null)}
                    disabled={!selectedCuisineFilter}
                  >
                    Clear Cuisine Filter
                  </button>

                  <button 
                    className={`filter-badge-btn ${ratingFilter ? 'active' : ''}`}
                    onClick={() => setRatingFilter(!ratingFilter)}
                  >
                    Ratings 4.0+
                  </button>

                  <button 
                    className={`filter-badge-btn ${deliveryFilter ? 'active' : ''}`}
                    onClick={() => setDeliveryFilter(!deliveryFilter)}
                  >
                    Fast Delivery (&lt; 25 mins)
                  </button>

                  <button 
                    className={`filter-badge-btn ${vegOnlyFilter ? 'active' : ''}`}
                    onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
                  >
                    Pure Veg Option
                  </button>
                </div>

                {/* Sorting Select */}
                <div>
                  <select 
                    className="sort-select" 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="deliveryTime">Delivery Speed</option>
                    <option value="costLow">Cost: Low to High</option>
                    <option value="costHigh">Cost: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Grid listings */}
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
                {selectedCuisineFilter ? `${selectedCuisineFilter} Restaurants` : 'Restaurants with online food delivery'}
              </h2>

              {sortedRestaurants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-secondary)' }}>
                  <AlertCircle size={40} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 700 }}>No restaurants match your filters</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Try clearing some tags to see online kitchens.
                  </p>
                </div>
              ) : (
                <div className="restaurants-grid">
                  {sortedRestaurants.map((rest) => (
                    <RestaurantCard 
                      key={rest.id} 
                      restaurant={rest} 
                      onClick={() => {
                        setSelectedRestaurant(rest);
                        setActiveView('menu');
                        setMenuSearchQuery('');
                        setMenuVegOnly(false);
                      }}
                    />
                  ))}
                </div>
              )}

            </div>
          </section>

        </main>
      )}

      {/* 1.1 INSTAMART GROCERY VIEW */}
      {activeView === 'home' && appMode === 'instamart' && (
        <Instamart 
          cartItems={groceryCart}
          onAddToCart={handleAddGroceryToCart}
          onUpdateQuantity={handleUpdateCartQty}
          searchQuery={searchQuery}
        />
      )}

      {/* 2. DETAILED RESTAURANT MENU VIEW */}
      {activeView === 'menu' && selectedRestaurant && (
        <main className="main-content">
          <div className="container detail-view-container">
            
            {/* Back button */}
            <div className="back-link" onClick={() => setActiveView('home')}>
              <span>← Back to Restaurants</span>
            </div>

            {/* Restaurant Detail Banner */}
            <div className="restaurant-banner">
              <div className="banner-header">
                <div>
                  <h1 className="banner-title">{selectedRestaurant.name}</h1>
                  <p className="banner-cuisines">{selectedRestaurant.cuisines.join(', ')}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {selectedRestaurant.distance} km • Koramangala
                  </p>
                </div>

                <div className="banner-rating-box">
                  <div className="banner-rating-score">
                    <Star size={14} fill="#22c55e" stroke="none" />
                    <span>{selectedRestaurant.rating}</span>
                  </div>
                  <div className="banner-rating-count">
                    {selectedRestaurant.ratingCount}
                  </div>
                </div>
              </div>

              <div className="banner-info-strip">
                <div className="banner-info-item">
                  <Clock size={16} />
                  <span>{selectedRestaurant.deliveryTime} MINS</span>
                </div>
                <span>|</span>
                <div>
                  ₹{selectedRestaurant.costForTwo} FOR TWO
                </div>
              </div>
            </div>

            {/* Menu Filters */}
            <div className="menu-controls">
              <div className="menu-veg-toggle">
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>Veg Only</span>
                <label className="switch-label">
                  <input 
                    type="checkbox" 
                    className="switch-input"
                    checked={menuVegOnly}
                    onChange={(e) => setMenuVegOnly(e.target.checked)}
                  />
                  <span className="switch-slider"></span>
                </label>
              </div>

              <div className="menu-search-container">
                <input 
                  type="text" 
                  className="search-bar-input" 
                  style={{ width: '100%' }}
                  placeholder="Search in menu..."
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Menu Categories */}
            <div>
              {selectedRestaurant.menuCategories.map((cat, catIdx) => {
                // Filter items inside category
                const filteredItems = cat.items.filter(item => {
                  if (menuVegOnly && !item.isVeg) return false;
                  if (menuSearchQuery.trim()) {
                    return item.name.toLowerCase().includes(menuSearchQuery.toLowerCase());
                  }
                  return true;
                });

                if (filteredItems.length === 0) return null;

                return (
                  <div key={catIdx} className="menu-category-block">
                    <div className="menu-category-header">
                      <span className="menu-category-title">
                        {cat.title} ({filteredItems.length})
                      </span>
                    </div>

                    <div className="menu-items-list">
                      {filteredItems.map((item) => {
                        const cartItem = foodCart.find(ci => ci.id === item.id);
                        const qty = cartItem ? cartItem.quantity : 0;

                        return (
                          <div key={item.id} className="menu-item-row">
                            <div className="menu-item-left">
                              <span className={item.isVeg ? 'veg-icon-badge' : 'nonveg-icon-badge'} />
                              <h3 className="menu-item-name">{item.name}</h3>
                              <div className="menu-item-price">₹{item.price}</div>
                              <p className="menu-item-desc">{item.description}</p>
                            </div>

                            <div className="menu-item-right">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="menu-item-img"
                              />
                              <div className="add-item-btn-container">
                                {qty === 0 ? (
                                  <button 
                                    className="add-item-btn"
                                    onClick={() => handleAddFoodToCart(item, selectedRestaurant.id)}
                                  >
                                    Add
                                  </button>
                                ) : (
                                  <div className="item-quantity-selector">
                                    <button 
                                      className="quantity-control-btn"
                                      onClick={() => handleUpdateCartQty(item.id, qty - 1)}
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span>{qty}</span>
                                    <button 
                                      className="quantity-control-btn"
                                      onClick={() => handleUpdateCartQty(item.id, qty + 1)}
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </main>
      )}

      {/* 3. USER PROFILE VIEW */}
      {activeView === 'profile' && (
        <UserProfile 
          pastOrders={pastOrders}
          addresses={addresses}
          onAddAddress={handleAddAddress}
          onReorder={handleReorder}
        />
      )}

      {/* 4. LIVE TRACKING VIEW */}
      {activeView === 'tracking' && (
        <OrderTracking 
          restaurant={selectedRestaurant}
          address={currentAddress}
          amount={checkoutTotal}
          onOrderComplete={handleResetView}
          appMode={appMode}
        />
      )}

      {/* FOOTER SECTION */}
      <Footer appMode={appMode} />

      {/* CART DRAWER SLIDER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={currentCart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleOpenCheckout}
        appMode={appMode}
      />

      {/* CHECKOUT & ADDRESS MODAL */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        grandTotal={checkoutTotal}
        discountAmount={discountApplied}
        addresses={addresses}
        selectedAddress={currentAddress}
        onSelectAddress={handleSelectAddress}
        onPaySuccess={handlePaySuccess}
        appMode={appMode}
      />

      {/* INTERACTIVE OTP & BANK SPINNER */}
      {isPaying && (
        <PaymentSpinner 
          paymentMethod={paymentMethodUsed}
          amount={checkoutTotal}
          onSuccess={handleOrderConfirmed}
          onClose={() => setIsPaying(false)}
        />
      )}

    </div>
  );

  // Quick helper to apply coupon from promo cards
  function handleApplyCouponFromBanner(_code: string) {
    setIsCartOpen(true);
  }
}

export default App;
