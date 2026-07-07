import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Store, 
  Phone, 
  ChevronRight, 
  Star,
  Send,
  Navigation
} from 'lucide-react';
import type { Restaurant, Address } from '../data/mockData';

interface OrderTrackingProps {
  restaurant: Restaurant | null;
  address: Address;
  amount: number;
  onOrderComplete: () => void;
  appMode: 'food' | 'instamart';
}

interface ChatMessage {
  id: string;
  sender: 'driver' | 'user';
  text: string;
  time: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  restaurant,
  address,
  amount,
  onOrderComplete,
  appMode
}) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Confirmed, 1: Preparing, 2: Out for delivery, 3: Delivered
  const [riderProgress, setRiderProgress] = useState(0); // 0 to 100 during delivery
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'driver',
      text: appMode === 'food' 
        ? "Hello! I am Ramesh. I'm waiting at the restaurant to pick up your hot food."
        : "Hello! I am Ramesh. I'm picking up your fresh groceries from the Instamart store.",
      time: 'Just now'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Stepper timeline simulation
  useEffect(() => {
    // 0 -> 1: Confirmed to Preparing (after 6 seconds)
    const prepTimer = setTimeout(() => {
      setCurrentStep(1);
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_prep`,
          sender: 'driver',
          text: appMode === 'food'
            ? "Your food is being freshly prepared by the kitchen crew! Almost done."
            : "Your groceries are being packed and checked for quality. Almost ready to ride.",
          time: '1 min ago'
        }
      ]);
    }, 6000);

    // 1 -> 2: Preparing to Out for Delivery (after 14 seconds)
    const deliveryTimer = setTimeout(() => {
      setCurrentStep(2);
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_out`,
          sender: 'driver',
          text: "I've picked up your order and I'm heading your way! See you shortly.",
          time: 'Just now'
        }
      ]);
    }, 14000);

    // 2 -> 3: Out for Delivery to Delivered (after 30 seconds)
    const arriveTimer = setTimeout(() => {
      setCurrentStep(3);
      setRiderProgress(100);
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_delivered`,
          sender: 'driver',
          text: "I've arrived at your location. Order delivered! Thank you.",
          time: 'Just now'
        }
      ]);
    }, 30000);

    return () => {
      clearTimeout(prepTimer);
      clearTimeout(deliveryTimer);
      clearTimeout(arriveTimer);
    };
  }, [appMode]);

  // Rider movement simulation (interpolated progress during step 2)
  useEffect(() => {
    if (currentStep === 2) {
      const interval = setInterval(() => {
        setRiderProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1; // takes ~16 seconds to slide
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle user send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: chatText,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatText('');

    // Simulated driver response
    setTimeout(() => {
      let response = "Okay, understood!";
      if (chatText.toLowerCase().includes('gate') || chatText.toLowerCase().includes('guard')) {
        response = "Sure, I will leave it with the security guard at the gate.";
      } else if (chatText.toLowerCase().includes('ring') || chatText.toLowerCase().includes('bell')) {
        response = "Noted. I will call you directly instead of ringing the bell.";
      } else if (chatText.toLowerCase().includes('where')) {
        response = "I am currently crossing the main tech park junction. Will be there in 3 minutes!";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_d_resp_${Date.now()}`,
          sender: 'driver',
          text: response,
          time: 'Just now'
        }
      ]);
    }, 2500);
  };

  // SVG Coordinates interpolation for the rider icon
  // Path points: Restaurant(50, 310) -> Waypoint1(160, 140) -> Waypoint2(260, 240) -> Destination(440, 90)
  const getRiderCoords = () => {
    if (currentStep < 2) return { x: 50, y: 310 };
    if (currentStep === 3) return { x: 440, y: 90 };

    const p = riderProgress / 100;
    
    // Simplistic interpolation across 3 segments
    if (p < 0.33) {
      // Seg 1: Rest to WP1
      const segP = p / 0.33;
      return {
        x: 50 + (160 - 50) * segP,
        y: 310 + (140 - 310) * segP
      };
    } else if (p < 0.66) {
      // Seg 2: WP1 to WP2
      const segP = (p - 0.33) / 0.33;
      return {
        x: 160 + (260 - 160) * segP,
        y: 140 + (240 - 140) * segP
      };
    } else {
      // Seg 3: WP2 to Dest
      const segP = (p - 0.66) / 0.34;
      return {
        x: 260 + (440 - 260) * segP,
        y: 240 + (90 - 240) * segP
      };
    }
  };

  const riderCoords = getRiderCoords();

  const steps = [
    { label: 'Order Confirmed', desc: 'Your order has been acknowledged by the partner.' },
    { 
      label: appMode === 'food' ? 'Preparing Food' : 'Packing Groceries', 
      desc: appMode === 'food' ? 'Kitchen is preparing your delicious meal.' : 'Store agent is selecting the freshest groceries.' 
    },
    { label: 'Out for Delivery', desc: 'Ramesh has picked up your items and is on the way.' },
    { label: 'Delivered', desc: 'Enjoy your items! Thank you for ordering.' }
  ];

  return (
    <main className="main-content">
      <div className="container tracking-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            Live Order Tracking
          </h2>
          {currentStep === 3 && (
            <button 
              className="btn-primary" 
              onClick={onOrderComplete}
              style={{ backgroundColor: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Back to Home</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        <div className="tracking-grid">
          {/* Left Column: Order Stepper and Driver details */}
          <div className="tracking-left-panel">
            
            {/* Status Header */}
            <div className="order-meta-card">
              <div className="track-status-alert">
                {currentStep === 0 && 'Awaiting Confirmation...'}
                {currentStep === 1 && (appMode === 'food' ? 'Chef is cooking...' : 'Packing your items...')}
                {currentStep === 2 && 'Ramesh is out for delivery!'}
                {currentStep === 3 && 'Order Delivered!'}
              </div>
              <div className="track-eta">
                {currentStep === 3 
                  ? 'Delivered successfully at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : `Estimated Delivery: ${Math.max(2, 35 - currentStep * 10 - Math.round(riderProgress * 0.15))} mins`
                }
                <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Total Paid: ₹{amount}
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="tracking-stepper">
                {steps.map((step, idx) => {
                  let status: 'pending' | 'active' | 'completed' = 'pending';
                  if (idx < currentStep) status = 'completed';
                  else if (idx === currentStep) status = 'active';

                  return (
                    <div 
                      key={idx} 
                      className={`step-node ${status === 'completed' ? 'completed' : ''} ${status === 'active' ? 'active' : ''}`}
                    >
                      <div className="step-bullet"></div>
                      <div className="step-label">{step.label}</div>
                      <div className="step-desc">{step.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Profile */}
            <div className="driver-card">
              <div className="driver-info-block">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Delivery Partner"
                  className="driver-avatar-img"
                />
                <div>
                  <div className="driver-name">Ramesh Kumar</div>
                  <div className="driver-subtext">
                    <span>Activa 6G (KA-05-JY-4819)</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#eab308' }}>
                      <Star size={11} fill="#eab308" stroke="none" /> 4.8
                    </span>
                  </div>
                </div>
              </div>

              <div className="driver-contact-actions">
                <a href="tel:+919876543210" className="contact-btn" title="Call Ramesh">
                  <Phone size={16} />
                </a>
              </div>
            </div>

            {/* Chat Box widget */}
            <div className="chat-widget-box">
              <div className="chat-widget-header">
                Chat with Ramesh Kumar
              </div>
              <div className="chat-messages-container">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: '9px', textAlign: 'right', marginTop: '4px', opacity: 0.7 }}>
                      {msg.time}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-row">
                <input 
                  type="text" 
                  className="chat-text-input"
                  placeholder="Send instructions (e.g. Leave at gate)..."
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  disabled={currentStep === 3}
                />
                <button type="submit" className="chat-send-btn" disabled={currentStep === 3}>
                  <Send size={14} />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Custom Animated SVG Map */}
          <div className="tracking-map-card">
            <svg className="map-svg-element" viewBox="0 0 500 400">
              {/* Map background grids/roads */}
              <rect x="0" y="0" width="500" height="400" fill="var(--bg-secondary)" />
              
              {/* Fake road networks */}
              <path d="M 0 100 L 500 100" stroke="var(--border-color)" strokeWidth="12" fill="none" />
              <path d="M 0 250 L 500 250" stroke="var(--border-color)" strokeWidth="12" fill="none" />
              <path d="M 120 0 L 120 400" stroke="var(--border-color)" strokeWidth="12" fill="none" />
              <path d="M 380 0 L 380 400" stroke="var(--border-color)" strokeWidth="12" fill="none" />

              {/* Delivery route path from Restaurant to Home */}
              {/* Path points: Restaurant(50, 310) -> Waypoint1(160, 140) -> Waypoint2(260, 240) -> Destination(440, 90) */}
              <path 
                d="M 50 310 L 160 140 L 260 240 L 440 90" 
                stroke="var(--theme-color)" 
                strokeWidth="4" 
                strokeDasharray="8,6" 
                fill="none" 
                opacity="0.8"
              />

              {/* Restaurant marker */}
              <g transform="translate(50, 310)" style={{ cursor: 'pointer' }}>
                <circle r="18" fill="var(--bg-color)" stroke="var(--border-strong)" strokeWidth="2" />
                <Store size={16} x="-8" y="-8" style={{ color: 'var(--theme-color)' }} />
                <text x="0" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-primary)">
                  {restaurant?.name || 'Store'}
                </text>
              </g>

              {/* Home marker */}
              <g transform="translate(440, 90)">
                <circle r="18" fill="var(--bg-color)" stroke="var(--border-strong)" strokeWidth="2" />
                <MapPin size={16} x="-8" y="-8" style={{ color: '#22c55e' }} />
                <text x="0" y="-24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-primary)">
                  {address.tag} (You)
                </text>
              </g>

              {/* Moving Rider Icon */}
              <g transform={`translate(${riderCoords.x}, ${riderCoords.y})`}>
                <circle r="15" fill="var(--theme-color)" style={{ boxShadow: 'var(--shadow-md)' }} />
                <Navigation 
                  size={12} 
                  x="-6" 
                  y="-6" 
                  style={{ 
                    color: 'white', 
                    transform: `rotate(${
                      currentStep === 3 
                        ? 0 
                        : (riderProgress < 33 ? -45 : (riderProgress < 66 ? 45 : -40))
                    }deg)`, 
                    transition: 'transform 0.5s' 
                  }} 
                />
                
                {/* Ping wave animation if active */}
                {currentStep === 2 && (
                  <circle r="22" fill="none" stroke="var(--theme-color)" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r" values="15;30;15" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            </svg>
          </div>
        </div>

      </div>
    </main>
  );
};
