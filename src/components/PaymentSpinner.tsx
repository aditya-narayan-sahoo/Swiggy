import React, { useState, useEffect, useRef } from 'react';
import { Check, ShieldCheck, AlertCircle } from 'lucide-react';

interface PaymentSpinnerProps {
  paymentMethod: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const PaymentSpinner: React.FC<PaymentSpinnerProps> = ({
  paymentMethod,
  amount,
  onSuccess,
  onClose
}) => {
  const [stage, setStage] = useState<'loading' | 'otp' | 'success'>('loading');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (paymentMethod === 'Cash on Delivery (COD)') {
      // COD bypasses OTP
      const timer = setTimeout(() => {
        setStage('success');
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Card/UPI/NetBanking goes to OTP after loading
      const timer = setTimeout(() => {
        setStage('otp');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (stage === 'success') {
      const timer = setTimeout(() => {
        onSuccess();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [stage, onSuccess]);

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return; // numbers only

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setErrorMsg('');

    // Auto-focus next input
    if (val !== '' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace auto-focus previous
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp === '1234') {
      setStage('success');
    } else {
      setErrorMsg('Incorrect OTP. Try entering 1234');
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 400 }}>
      <div className="modal-card" style={{ maxWidth: '400px', padding: '24px' }}>
        
        {stage === 'loading' && (
          <div className="payment-loader-container">
            <div className="radial-loader"></div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px' }}>Processing Payment</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Contacting secure servers via {paymentMethod}. Do not close this window or click back.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#22c55e" />
              <span>PCI-DSS Compliant Encryption Gateway</span>
            </div>
          </div>
        )}

        {stage === 'otp' && (
          <div className="payment-loader-container" style={{ gap: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Enter Bank OTP</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              A simulated transaction OTP was sent for <strong>₹{amount}</strong>.
            </p>
            
            <div style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', fontSize: '12px', color: 'var(--text-muted)' }}>
              Enter mock code <strong style={{ color: 'var(--theme-color)', fontSize: '13px' }}>1234</strong> to approve.
            </div>

            <form onSubmit={handleVerifyOtp} className="otp-box-form">
              <div className="otp-inputs">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="otp-input-field"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {errorMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', fontWeight: 600 }}>
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--theme-color)' }}>
                  Submit OTP
                </button>
              </div>
            </form>
          </div>
        )}

        {stage === 'success' && (
          <div className="payment-loader-container" style={{ padding: '30px 10px' }}>
            <div className="success-checkmark-circle">
              <Check size={36} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#22c55e', fontFamily: 'var(--font-display)' }}>
              Payment Successful!
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Order placed successfully. Redirecting you to Live Order Tracker...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
