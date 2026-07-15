import React, { useState } from 'react';
import { useAppStore, useProfileSync } from '../lib/store';
import { supabase } from '../lib/supabase';
import { CreditCard, Lock, ShieldCheck, Check, MoreHorizontal } from 'lucide-react';
import { EternaPaymentService, PaymentMethod } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';

export function PaymentScreen() {
  const { go, user, signIn, showToast } = useAppStore();
  const { verifyProfileSync } = useProfileSync();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple' | 'google' | 'more'>('card');
  const [cardNetwork, setCardNetwork] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [localPayment, setLocalPayment] = useState<'mtn' | 'airtel' | 'orange' | 'mpesa'>('mtn');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    cardNum: '',
    mmYy: '',
    cvc: '',
    name: '',
    zip: ''
  });

  const [err, setErr] = useState('');

  const handleProcessPayment = async () => {
    setErr('');
    if (paymentMethod === 'card') {
      if (!form.cardNum || !form.mmYy || !form.cvc || !form.name || !form.zip) {
        setErr('Please fill in all banking and card details.');
        return;
      }
    }

    const method: PaymentMethod = paymentMethod === 'card'
      ? cardNetwork
      : paymentMethod === 'apple'
        ? 'apple_pay'
        : paymentMethod === 'google'
          ? 'google_pay'
          : paymentMethod === 'more'
            ? 'mobile_money'
            : 'paypal';

    setIsProcessing(true);

    try {
      const result = await EternaPaymentService.processPayment({
        method,
        planId: billingCycle === 'monthly' ? 'premium_monthly' : 'premium_yearly',
        amount: billingCycle === 'monthly' ? 29 : 290,
        currency: 'USD',
        userId: user?.id,
        userEmail: user?.email,
        details: paymentMethod === 'card'
          ? { cardNetwork, cardLast4: form.cardNum.replace(/\D/g, '').slice(-4), name: form.name, expiry: form.mmYy, zip: form.zip }
          : { wallet: method, localPayment },
        metadata: { source: 'normal_user_checkout', syncTargets: ['normal_user', 'partner_platform', 'super_admin_command_centre'] }
      });

      if (!result.success) throw new Error('Payment was not captured by the gateway.');

      if (supabase && user?.id) {
        await verifyProfileSync(user.id, user.role || 'normal');
      }

      if (user) {
        signIn({ ...user, plan: result.subscriptionLevel || 'Premium' });
      }

      setShowSuccessModal(true);
      showToast(`Payment ${result.transactionId} synced across all command centres.`);
    } catch (e: any) {
      setErr(e.message || 'Unable to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getFormatCardPreview = () => {
    const raw = form.cardNum.replace(/\s/g, '');
    let formatted = '**** **** **** 4589';
    if (raw.length > 0) {
      formatted = raw.match(/.{1,4}/g)?.join(' ') || '';
    }
    return formatted;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080808] text-white relative overflow-x-hidden font-sans">
      {/* Background radial gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none opacity-40 mix-blend-screen"
        style={{ background: 'radial-gradient(circle at top, rgba(0, 163, 255, 0.4), transparent 60%)' }}
      />
      {/* Blue and purple blurred orbs */}
      <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-[#00A3FF] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-[#4F46E5] rounded-full blur-[180px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[30%] left-[20%] w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[120px] opacity-10 pointer-events-none" />

      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between relative z-20">
        <div className="text-[#00A3FF] font-black text-2xl uppercase tracking-[0.2em] cursor-pointer" onClick={() => go('home')}>
          ETERNA
        </div>
        <div className="text-white/60 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <Lock className="w-3 h-3" /> Secure Payment Gateway
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10 w-full max-w-[1200px] mx-auto">
        <AnimatePresence mode="wait">
          {!showSuccessModal ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex lg:flex-row flex-col gap-8 lg:gap-12"
            >
              {/* Left Panel - Plan Summary */}
              <div className="lg:w-[400px] shrink-0 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,163,255,0.05)]">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#00A3FF]/5 to-transparent pointer-events-none" />
                
                <div className="mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#00A3FF] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Upgrade Your<br />Experience</h2>
                  <p className="text-[#8c8c8c] text-sm leading-relaxed">
                    Unlock unlimited AI workflows, priority processing, advanced automation and premium support.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#1A1A1A] p-1.5 rounded-full mb-8">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-[#2A2A2A] text-[#00A3FF]' : 'text-[#8c8c8c] hover:text-white'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all flex justify-center items-center gap-2 ${billingCycle === 'yearly' ? 'bg-[#2A2A2A] text-[#00A3FF]' : 'text-[#8c8c8c] hover:text-white'}`}
                  >
                    Yearly <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 17%</span>
                  </button>
                </div>

                <div className="mb-8 relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#00A3FF] mb-2">PREMIUM PLAN</div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-bold tracking-tight">{billingCycle === 'monthly' ? '$29' : '$290'}</span>
                    <span className="text-[#8c8c8c] mb-1.5">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <p className="text-sm text-[#8c8c8c]">Cancel anytime. No hidden fees.</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Unlimited AI Requests',
                    'Premium Models',
                    'Team Collaboration',
                    'API Access',
                    'Priority Support',
                    'Custom Workspaces'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00A3FF]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#00A3FF]" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-white/[0.08]">
                  <ShieldCheck className="w-6 h-6 text-[#8c8c8c] shrink-0" />
                  <div>
                    <div className="text-sm font-semibold mb-1">30-Day Money Back Guarantee</div>
                    <div className="text-xs text-[#8c8c8c]">Not satisfied? Get a full refund.</div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Payment Details */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl relative">
                  
                  <h3 className="text-lg font-bold mb-4">1. Choose Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                    <button onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] hover:bg-white/[0.02] text-[#8c8c8c]'}`}>
                      <CreditCard className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Credit Card</span>
                    </button>
                    <button onClick={() => setPaymentMethod('paypal')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'paypal' ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] hover:bg-white/[0.02] text-[#8c8c8c]'}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9L7.076 21.337z"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">PayPal</span>
                    </button>
                    <button onClick={() => setPaymentMethod('apple')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'apple' ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] hover:bg-white/[0.02] text-[#8c8c8c]'}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.04c-.062 1.312-.663 2.505-1.579 3.328-.865.77-1.996 1.258-3.093 1.258-.066-1.32.617-2.607 1.543-3.418.887-.775 2.083-1.255 3.129-1.168zM17.842 12c0 2.871 2.253 4.205 2.284 4.22-.016.059-.36 1.258-1.196 2.493-1.077 1.594-2.203 3.187-3.957 3.203-1.718.016-2.277-1.031-4.228-1.031-1.921 0-2.548 1.015-4.214 1.047-1.782.031-3.082-1.765-4.174-3.36C.123 15.342-1.026 10.372 1.011 6.825c.983-1.718 2.766-2.827 4.704-2.843 1.688-.016 3.292 1.155 4.341 1.155 1.048 0 2.946-1.389 5.011-1.187 1.017.047 3.864.405 5.679 3.092-.156.11-3.419 1.95-3.419 4.908l1.515.05h-.984z"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Apple Pay</span>
                    </button>
                    <button onClick={() => setPaymentMethod('google')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'google' ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] hover:bg-white/[0.02] text-[#8c8c8c]'}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#4285F4"/><path d="M21.144 12c0-.825-.078-1.62-.216-2.385H12v4.512h5.122c-.22 1.464-.897 2.705-1.996 3.44l3.228 2.502C20.245 18.336 21.144 15.42 21.144 12z" fill="#fff" opacity=".8"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Google Pay</span>
                    </button>
                     <button onClick={() => setPaymentMethod('more')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'more' ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] hover:bg-white/[0.02] text-[#8c8c8c]'}`}>
                      <MoreHorizontal className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">More</span>
                    </button>
                  </div>

                  <h3 className="text-lg font-bold mb-6">2. Payment Details</h3>

                  {paymentMethod === 'card' ? (
                    <div className="space-y-6">
                      {/* Card Preview */}
                      <div className="w-full max-w-[340px] h-[200px] mx-auto bg-gradient-to-br from-[#0F172A] to-[#020617] rounded-3xl p-6 shadow-2xl border border-white/[0.08] relative overflow-hidden mb-6">
                         <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#00A3FF] blur-[100px] opacity-30" />
                         <div className="flex justify-between items-start mb-8 relative z-10">
                           <div className="font-bold tracking-[0.2em] text-[#00A3FF]">ETERNA</div>
                           <div className="font-bold italic text-xl uppercase">{cardNetwork === 'amex' ? 'AMEX' : cardNetwork}</div>
                         </div>
                         <div className="text-xl md:text-2xl font-mono tracking-widest mb-6 relative z-10 opacity-90">{getFormatCardPreview()}</div>
                         <div className="flex justify-between items-end relative z-10 font-mono text-[10px] uppercase text-[#8c8c8c]">
                           <div className="tracking-widest">{form.name || 'JOHN DOE'}</div>
                           <div className="text-right">
                             <div className="text-[7px] mb-0.5 opacity-60">VALID THRU</div>
                             <div className="tracking-widest text-white/90">{form.mmYy || '12/28'}</div>
                           </div>
                         </div>
                      </div>

                      {/* Floating Label Inputs */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(['visa', 'mastercard', 'amex'] as const).map(network => (
                          <button key={network} onClick={() => setCardNetwork(network)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${cardNetwork === network ? 'border-[#00A3FF] bg-[#00A3FF]/10 text-[#00A3FF]' : 'border-white/[0.08] text-[#8c8c8c]'}`}>
                            {network === 'amex' ? 'American Express' : network}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-5">
                        <div className="relative group">
                          <input type="text" id="name" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="peer w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm outline-none focus:border-[#00A3FF] transition-colors placeholder-transparent focus:placeholder-[#8c8c8c]" placeholder="John Doe" />
                          <label htmlFor="name" className="absolute left-0 top-3 text-sm text-[#8c8c8c] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#8c8c8c]">Name on Card</label>
                        </div>
                        
                        <div className="relative group">
                          <input type="text" id="cardNumber" required value={form.cardNum} onChange={e=>setForm({...form, cardNum: e.target.value})} className="peer w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm outline-none focus:border-[#00A3FF] transition-colors placeholder-transparent focus:placeholder-[#8c8c8c]" placeholder="4580 0000 0000 0000" />
                          <label htmlFor="cardNumber" className="absolute left-0 top-3 text-sm text-[#8c8c8c] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#8c8c8c]">Card Number</label>
                          <div className="absolute right-0 top-2 scale-75 opacity-50"><CreditCard className="w-6 h-6"/></div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                          <div className="relative group">
                            <input type="text" id="expiryDate" required value={form.mmYy} onChange={e=>setForm({...form, mmYy: e.target.value})} className="peer w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm outline-none focus:border-[#00A3FF] transition-colors placeholder-transparent focus:placeholder-[#8c8c8c]" placeholder="12 / 28" />
                            <label htmlFor="expiryDate" className="absolute left-0 top-3 text-sm text-[#8c8c8c] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#8c8c8c]">Expiry Date</label>
                          </div>
                          <div className="relative group">
                            <input type="text" id="cvc" required value={form.cvc} onChange={e=>setForm({...form, cvc: e.target.value})} className="peer w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm outline-none focus:border-[#00A3FF] transition-colors placeholder-transparent focus:placeholder-[#8c8c8c]" placeholder="123" />
                            <label htmlFor="cvc" className="absolute left-0 top-3 text-sm text-[#8c8c8c] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#8c8c8c]">CVC</label>
                            <div className="absolute right-0 top-2 scale-75 opacity-50"><Lock className="w-5 h-5"/></div>
                          </div>
                        </div>

                        <div className="relative group">
                          <input type="text" id="zip" required value={form.zip} onChange={e=>setForm({...form, zip: e.target.value})} className="peer w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm outline-none focus:border-[#00A3FF] transition-colors placeholder-transparent focus:placeholder-[#8c8c8c]" placeholder="10001" />
                          <label htmlFor="zip" className="absolute left-0 top-3 text-sm text-[#8c8c8c] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#00A3FF] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#8c8c8c]">Billing ZIP / Postal Code</label>
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'more' ? (
                     <div className="py-8 border border-white/[0.08] rounded-2xl text-center mb-6">
                        <p className="text-white/60 mb-6 text-sm px-4">Supported local payment networks for Africa</p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <button onClick={() => setLocalPayment('mtn')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none ${localPayment === 'mtn' ? 'bg-[#FFCC00] text-black shadow-[0_0_15px_rgba(255,204,0,0.4)]' : 'bg-[#FFCC00]/10 border border-[#FFCC00]/20 text-[#FFCC00] hover:bg-[#FFCC00]/20'}`}>MTN MoMo</button>
                          <button onClick={() => setLocalPayment('airtel')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none ${localPayment === 'airtel' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20'}`}>Airtel Money</button>
                          <button onClick={() => setLocalPayment('orange')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none ${localPayment === 'orange' ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.4)]' : 'bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] hover:bg-[#FF6600]/20'}`}>Orange Money</button>
                          <button onClick={() => setLocalPayment('mpesa')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none ${localPayment === 'mpesa' ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20'}`}>M-Pesa</button>
                        </div>
                        <p className="text-[#8c8c8c] text-xs mt-6">You will be redirected to the secure portal for the selected operator.</p>
                     </div>
                  ) : (
                    <div className="p-10 border border-white/[0.08] rounded-2xl text-center mb-6 bg-white/[0.02]">
                      <div className="w-16 h-16 bg-[#1A1A1A] rounded-full mx-auto flex items-center justify-center mb-4 border border-white/5 shadow-xl">
                        <Lock className="w-6 h-6 text-[#00A3FF]" />
                      </div>
                      <p className="text-[#8c8c8c] text-sm">You will be redirected to complete your <span className="text-white font-bold capitalize">{paymentMethod}</span> payment securely.</p>
                    </div>
                  )}

                  {err && <div className="text-red-400 text-sm mt-6 p-4 border border-red-500/30 bg-red-500/10 rounded-xl">{err}</div>}

                  <div className="mt-8">
                    <button 
                      onClick={handleProcessPayment} 
                      disabled={isProcessing} 
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00A3FF] to-[#4F46E5] text-white py-[18px] rounded-2xl font-bold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)]"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                      <div className="flex items-center justify-center sm:justify-between px-2 sm:px-6 relative z-10 w-full space-x-2">
                        <span className="flex items-center gap-2 m-auto sm:m-0">
                          {isProcessing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Lock className="w-4 h-4" />}
                          Upgrade to Premium
                        </span>
                        <span className="items-center gap-2 hidden sm:flex">
                          <span className="mr-4 inline-block w-px h-4 bg-white/30" />
                          {billingCycle === 'monthly' ? '$29 / month' : '$290 / year'} →
                        </span>
                      </div>
                    </button>
                  </div>
                  
                  {/* Security Block */}
                  <div className="flex flex-wrap justify-between items-center gap-y-4 gap-x-2 mt-8 text-[10px] uppercase font-bold tracking-widest text-[#8c8c8c]">
                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> PCI DSS Compliant</div>
                    <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-green-400" /> 256-bit SSL Encrypted</div>
                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Fraud Protection</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(0,163,255,0.1)] text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#00A3FF] to-[#4F46E5] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,163,255,0.3)]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">Payment Successful</h2>
              <p className="text-[#8c8c8c] mb-10">Welcome to Eterna Premium. Your account has been upgraded.</p>
              
              <div className="w-full space-y-4">
                <button onClick={() => go('home')} className="w-full bg-[#00A3FF] hover:bg-[#0090FF] text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                  Go To Home
                </button>
                <button onClick={() => go('home')} className="w-full bg-white/[0.05] hover:bg-white/[0.1] text-white py-4 rounded-xl font-bold transition-all border border-white/[0.05]">
                  Explore Features
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        <div className="mt-16 text-center relative z-10 w-full mb-8">
           <div className="text-[10px] font-bold uppercase tracking-widest text-[#8c8c8c] mb-8">Trusted by thousands of users worldwide</div>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="font-bold text-2xl italic tracking-tighter">VISA</div>
             <div className="flex gap-1 relative">
                <div className="w-7 h-7 rounded-full bg-[#ff5f00] relative z-10"></div>
                <div className="w-7 h-7 rounded-full bg-[#eb001b] -ml-4 relative z-0"></div>
             </div>
             <div className="font-bold text-xl font-serif italic text-[#003087]">PayPal</div>
             <div className="font-bold text-xl flex items-center gap-1.5"><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2c-.066 1.4-.707 2.673-1.684 3.55C9.393 6.37 8.188 6.89 7.017 6.89c-.07-1.408.658-2.782 1.646-3.646.946-.827 2.222-1.339 3.337-1.244zm6.231 10.667c0 3.062 2.404 4.485 2.436 4.502-.017.062-.384 1.341-1.275 2.659-1.149 1.7-2.35 3.4-4.22 3.416-1.833.018-2.429-1.1-4.51-1.1-2.05 0-2.718 1.083-4.495 1.117-1.9.033-3.287-1.883-4.452-3.584-2.39-3.51-4.004-9.924-1.572-14.372 1.178-2.146 3.4-3.504 5.819-3.525 1.79-.02 3.511 1.233 4.63 1.233 1.118 0 3.142-1.482 5.344-1.266 1.085.05 4.122.432 6.058 3.298-.166.117-3.647 2.08-3.647 5.236l1.616.053h-1.05z"/></svg> Pay</div>
             <div className="font-bold text-xl flex items-center gap-1.5"><span className="text-[#4285F4] text-2xl leading-none font-sans mr-0.5">G</span> Pay</div>
             <div className="font-bold text-xl text-[#635BFF] tracking-tighter">stripe</div>
           </div>
        </div>
      </div>
    </div>
  );
}
