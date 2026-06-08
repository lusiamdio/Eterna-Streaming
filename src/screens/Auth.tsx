import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppStore } from "../lib/store";
import { BottomNav } from "../components/Navigation";
import { supabase } from "../lib/supabase";

export function AuthScreen() {
  const { go, signIn, showToast } = useAppStore();
  const [tab, setTab] = useState<'si'|'su'>('si');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [plan, setPlan] = useState<'basic'|'std'|'prem'>('std');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card'|'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const planPrices = {
    basic: '$8.99/mo',
    std: '$13.99/mo',
    prem: '$17.99/mo'
  };

  const doSignIn = async () => {
    if (!email || !pw || !email.includes('@')) {
      setErr('Invalid email or password.');
      return;
    }
    setErr('');

    if (supabase) {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password: pw });
      setLoading(false);
      if (error) {
        setErr(error.message);
        return;
      }

      let role = 'normal';
      if (data.session) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.session.user.id).single();
        if (profile && profile.role) role = profile.role;
      }

      showToast('Welcome back!');
      if (role === 'super_admin') {
        go('admin');
      } else if (role === 'partner') {
        go('partner');
      } else {
        go('home');
      }
      return;
    } else {
      const parsedName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User';
      signIn({
        name: parsedName,
        initials: parsedName[0].toUpperCase(),
        email,
        plan: 'Premium'
      });
    }

    showToast('Welcome back!');
    go('home');
  };

  const doSignUp = async () => {
    if (!name || !email || !email.includes('@') || pw.length < 6) {
      setErr('Please fill all fields correctly.');
      return;
    }
    if (!showPayment) {
      setErr('Please choose a plan to proceed.');
      return;
    }
    setErr('');

    if (supabase) {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password: pw,
        options: {
          data: { full_name: name, plan }
        }
      });
      setLoading(false);
      if (error) {
        setErr(error.message);
        return;
      }

      showToast('Account created. Please complete payment.');
      go('payment');
      return;
    } else {
      signIn({
        name,
        initials: name[0].toUpperCase(),
        email,
        plan: plan === 'prem' ? 'Premium' : plan === 'std' ? 'Standard' : 'Basic'
      });
    }

    showToast('Account created. Please complete payment.');
    go('payment');
  };

  const doSocial = (provider: string) => {
    showToast(`Connecting to ${provider}...`);
    setTimeout(() => {
      signIn({
        name: `${provider} User`,
        initials: 'U',
        email: `user@${provider.toLowerCase()}.com`,
        plan: 'Premium'
      });
      showToast('Welcome back!');
      go('home');
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg">
      <div className="flex-1 flex flex-col items-center justify-center p-[24px] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hidden sm:block">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_small.jpg" className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>

        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="text-eterna-red font-bold text-4xl tracking-tighter cursor-pointer" onClick={() => go('landing')}>Eterna</div>
        </div>

        <div className="bg-black/80 sm:bg-black/75 sm:border sm:border-white/10 rounded-[4px] p-[60px_68px] w-full max-w-[450px] relative z-10 min-h-[500px]">
          <h1 className="text-white text-[32px] font-bold mb-[28px]">{tab === 'si' ? 'Sign In' : 'Sign Up'}</h1>
          
          <div className="flex gap-[3px] mb-[28px]">
            <div 
              className={`flex-1 text-[16px] font-medium cursor-pointer transition-all ${tab === 'si' ? 'text-white border-b-2 border-eterna-red pb-1' : 'text-eterna-muted pb-1'}`}
              onClick={() => { setTab('si'); setErr(''); }}
            >
              Sign In
            </div>
            <div 
              className={`flex-1 text-[16px] font-medium cursor-pointer transition-all ${tab === 'su' ? 'text-white border-b-2 border-eterna-red pb-1' : 'text-eterna-muted pb-1'}`}
              onClick={() => { setTab('su'); setErr(''); }}
            >
              Sign Up
            </div>
          </div>

          {tab === 'si' ? (
            <div>
              <div className="mb-[16px]">
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email or phone number" className="w-full p-[16px] bg-[#333] rounded-[4px] text-white text-[15px] outline-none focus:bg-[#454545] transition-colors placeholder-[#8c8c8c]" />
              </div>
              <div className="mb-[24px]">
                <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="w-full p-[16px] bg-[#333] rounded-[4px] text-white text-[15px] outline-none focus:bg-[#454545] transition-colors placeholder-[#8c8c8c]" />
              </div>

              {err && <div className="text-eterna-red text-[13px] mb-[16px] p-[10px_12px] bg-[#e87c03]/10 rounded-[4px]">{err}</div>}

              <button disabled={loading} className="w-full flex items-center justify-center gap-[7px] p-[14px] rounded-[4px] font-bold text-[16px] bg-eterna-red text-white hover:bg-eterna-rose transition-colors mb-3 disabled:opacity-50" onClick={doSignIn}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <p className="text-center text-[13px] text-eterna-muted cursor-pointer hover:underline mb-12" onClick={() => showToast('Password reset email sent!')}>
                Forgot password?
              </p>

              <div className="text-[#8c8c8c] text-[16px] mb-2">
                New to Eterna? <span className="text-white hover:underline cursor-pointer" onClick={() => setTab('su')}>Sign up now.</span>
              </div>
              <p className="text-[#8c8c8c] text-[13px]">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-[16px]">
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-[16px] bg-[#333] rounded-[4px] text-white text-[15px] outline-none focus:bg-[#454545] transition-colors placeholder-[#8c8c8c]" />
              </div>
              <div className="mb-[16px]">
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full p-[16px] bg-[#333] rounded-[4px] text-white text-[15px] outline-none focus:bg-[#454545] transition-colors placeholder-[#8c8c8c]" />
              </div>
              <div className="mb-[24px]">
                <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Add a password" className="w-full p-[16px] bg-[#333] rounded-[4px] text-white text-[15px] outline-none focus:bg-[#454545] transition-colors placeholder-[#8c8c8c]" />
              </div>

              <div className="text-[13px] text-white mb-[8px]">Choose Your Plan</div>
              <div className="grid grid-cols-3 gap-[10px] mb-[24px]">
                {(['basic','std','prem'] as const).map(p => (
                  <div 
                    key={p} 
                    className={`border rounded-[4px] p-[12px_8px] text-center cursor-pointer transition-all ${plan === p ? 'border-eterna-red bg-eterna-red/10' : 'border-[#8c8c8c]/40'}`}
                    onClick={() => { setPlan(p); setShowPayment(true); }}
                  >
                    <div className="text-[14px] font-semibold text-white">{p === 'basic' ? 'Basic' : p === 'std' ? 'Standard' : 'Premium'}</div>
                    <div className="text-[12px] text-[#8c8c8c] mt-1">{planPrices[p]}</div>
                  </div>
                ))}
              </div>

              {showPayment && (
                <div className="mb-[24px] p-[16px] bg-[#222] border border-[#444] rounded-[4px] animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="text-[14px] font-bold text-white mb-[8px]">Billing Information Required</div>
                  <p className="text-[13px] text-[#8c8c8c] mb-[12px]">You've selected the {plan === 'prem' ? 'Premium' : plan === 'std' ? 'Standard' : 'Basic'} plan. To finalize your upgrade and access premium content, you will be redirected to our secure billing portal after creating your account.</p>
                  <div className="flex gap-2">
                     <span className="text-[12px] bg-[#333] text-[#aaa] px-2 py-1 rounded">Visa</span>
                     <span className="text-[12px] bg-[#333] text-[#aaa] px-2 py-1 rounded">Mastercard</span>
                     <span className="text-[12px] bg-[#333] text-[#aaa] px-2 py-1 rounded">PayPal</span>
                     <span className="text-[12px] bg-[#333] text-[#aaa] px-2 py-1 rounded">Stripe</span>
                  </div>
                </div>
              )}

              {err && <div className="text-eterna-red text-[13px] mb-[16px] p-[10px_12px] bg-[#e87c03]/10 rounded-[4px]">{err}</div>}

              <button disabled={loading} className="w-full flex items-center justify-center gap-[7px] p-[14px] rounded-[4px] font-bold text-[16px] bg-eterna-red text-white hover:bg-eterna-rose transition-colors disabled:opacity-50" onClick={doSignUp}>
                {loading ? 'Creating Account...' : 'Continue to Billing'}
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
