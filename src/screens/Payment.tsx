import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { CreditCard, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Mail, Lock, User, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EternaPaymentService } from '../lib/api';

export function PaymentScreen() {
  const { go, user, signIn } = useAppStore();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'mobile_money'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    cardNum: '', mmYy: '', cvc: '',
    mobileNum: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleProcessPayment = async () => {
    if (paymentMethod === 'card' && (!form.cardNum || !form.mmYy || !form.cvc)) return alert('Please fill in card details');
    if (paymentMethod === 'mobile_money' && !form.mobileNum) return alert('Please enter your mobile number');
    
    setIsProcessing(true);
    
    try {
      const res = await EternaPaymentService.processPayment({
        method: paymentMethod,
        planId: 'Premium',
        amount: 12.99,
        details: form
      });
      
      if (res.success) {
        // Update user instantly
        const currentUser = user || { name: form.name || 'Alex Rivera', email: form.email || 'user@eterna.com', plan: 'Basic', initials: (form.name || 'A')[0].toUpperCase() };
        signIn({ ...currentUser, plan: res.subscriptionLevel });
        
        setIsProcessing(false);
        setShowSuccessModal(true);
      }
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-eterna-bg text-eterna-text flex flex-col pt-20 relative">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex flex-col justify-center">
        
        <div className="mb-8 flex justify-center items-center">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-eterna-gold text-black' : 'bg-white/10 text-white/40'}`}>
                  {s + 1}
                </div>
                {s < 2 && <div className={`w-12 h-1 transition-colors ${step > s ? 'bg-eterna-gold' : 'bg-white/10'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black mb-2">Create Account</h2>
                  <p className="text-white/60">Step 1: Sign up to continue</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="text" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                </div>

                <div className="pt-6">
                  <button onClick={handleNext} className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors flex justify-center items-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-white/40 mt-4">Already have an account? <span className="text-eterna-gold cursor-pointer hover:underline">Log In</span></p>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black mb-2">Billing Details</h2>
                  <p className="text-white/60">Step 2: Enter your personal information</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="text" placeholder="Street Address" className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                    <input type="text" placeholder="Postal Code" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                  <input type="text" placeholder="Country" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                </div>

                <div className="pt-6 flex gap-4">
                  <button onClick={() => setStep(0)} className="w-1/3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-colors flex justify-center items-center">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button onClick={handleNext} className="w-2/3 bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors flex justify-center items-center gap-2">
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-black mb-2">Secure Payment</h2>
                  <p className="text-white/60">Step 3: Choose payment method</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'card' ? 'bg-eterna-gold/10 border-eterna-gold text-eterna-gold' : 'bg-black/50 border-white/10 text-white/60'}`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="font-bold text-xs uppercase tracking-widest">Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'paypal' ? 'bg-eterna-gold/10 border-eterna-gold text-eterna-gold' : 'bg-black/50 border-white/10 text-white/60'}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center font-bold text-xl italic leading-none">P</div>
                    <span className="font-bold text-xs uppercase tracking-widest">PayPal</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${paymentMethod === 'mobile_money' ? 'bg-eterna-gold/10 border-eterna-gold text-eterna-gold' : 'bg-black/50 border-white/10 text-white/60'}`}
                  >
                    <Smartphone className="w-6 h-6" />
                    <span className="font-bold text-xs uppercase tracking-widest">Mobile</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input type="text" placeholder="Card Number" value={form.cardNum} onChange={e=>setForm({...form,cardNum:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono tracking-widest text-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" value={form.mmYy} onChange={e=>setForm({...form,mmYy:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono tracking-widest text-lg text-center" />
                      <input type="text" placeholder="CVC" value={form.cvc} onChange={e=>setForm({...form,cvc:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono tracking-widest text-lg text-center" />
                    </div>
                    <input type="text" placeholder="Cardholder Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono" />
                  </div>
                )}
                
                {paymentMethod === 'mobile_money' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input type="text" placeholder="Mobile Money Number" value={form.mobileNum} onChange={e=>setForm({...form,mobileNum:e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-eterna-gold transition-colors font-mono tracking-widest text-lg" />
                    </div>
                    <p className="text-white/50 text-sm text-center">We will send a prompt to your device to authorize the payment.</p>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center animate-in fade-in slide-in-from-top-2">
                    <p className="text-white/70 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                  </div>
                )}

                <div className="pt-6 flex gap-4">
                  <button onClick={() => setStep(1)} className="w-1/4 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-colors flex justify-center items-center">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button onClick={handleProcessPayment} disabled={isProcessing} className="w-3/4 bg-eterna-gold hover:bg-eterna-gold/80 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(245,176,65,0.3)] flex justify-center items-center gap-2">
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" /> Subscribe Now
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-xs text-white/40 mt-4 flex justify-center items-center gap-1">
                  <Lock className="w-3 h-3" /> Encrypted and Secure Payment
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/10 max-w-md w-full p-8 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eterna-gold flex-eterna-rose to-eterna-teal" />
              
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black mb-2 text-center">Welcome to Eterna</h2>
              <p className="text-center text-eterna-gold font-mono uppercase tracking-widest text-sm mb-6 font-bold">Payment Successful</p>
              
              <div className="bg-white/5 rounded-xl block p-4 mb-8">
                <p className="text-white/70 text-sm mb-4 leading-relaxed text-center">
                  Your account has been instantly updated to the <span className="text-white font-bold">{user?.plan || 'Premium'}</span> level. You now have access to:
                </p>
                <ul className="space-y-3 text-sm text-white/80 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-eterna-gold" /> Ad-free content streaming</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-eterna-gold" /> 4K Ultra HD & Dolby Atmos</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-eterna-gold" /> Offline downloads</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-eterna-gold" /> Exclusive Creator Meet & Greets</li>
                </ul>
              </div>

              <button onClick={() => { setShowSuccessModal(false); go('home'); }} className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Start Watching
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
