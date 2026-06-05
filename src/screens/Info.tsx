import React from 'react';
import { useAppStore } from '../lib/store';
import { TopNav, BottomNav } from '../components/Navigation';

const ContactBlock = ({ title, email, reasons }: { title: string, email: string, reasons: string[] }) => (
  <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
    <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
    <a href={`mailto:${email}`} className="text-eterna-rose font-mono text-sm mb-3 block hover:underline">{email}</a>
    <div className="text-xs text-white/50 uppercase tracking-widest mb-2">For:</div>
    <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
      {reasons.map((r, i) => <li key={i}>{r}</li>)}
    </ul>
  </div>
);

const PricingBlock = ({ name, price, forWho, includes, revenueShare, extra }: { name: string, price: string, forWho: string[], includes: string[], revenueShare?: string[], extra?: string }) => {
  const { go } = useAppStore();
  
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-eterna-gold/50 transition-colors flex flex-col h-full">
      <h4 className="font-black text-white text-xl mb-1 text-eterna-gold">{name}</h4>
      <div className="text-2xl font-mono font-bold text-white mb-4">{price}</div>
      {extra && <p className="text-sm text-white/60 mb-4">{extra}</p>}
      <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold border-t border-white/10 pt-4">Ideal For:</div>
      <ul className="list-disc list-inside text-sm text-eterna-rose mb-4 font-medium">
        {forWho.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold border-t border-white/10 pt-4">Includes:</div>
      <ul className="list-disc list-inside text-sm text-white/80 space-y-1 mb-4 flex-1">
        {includes.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      {revenueShare && revenueShare.length > 0 && (
        <div className="mt-auto border-t border-white/10 pt-4 mb-6">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold">Revenue Share:</div>
          <div className="flex flex-col gap-1 text-sm bg-black/30 p-3 rounded-xl border border-white/5">
            {revenueShare.map((r, i) => (
              <div key={i} className="flex justify-between font-mono">
                <span className="text-white/60">{r.split(' ')[0]}</span>
                <span className="font-bold text-eterna-gold">{r.split(' ')[1] || 'Custom'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={revenueShare ? "mt-2" : "mt-auto"}>
        <button 
          onClick={() => go('payment')} 
          className="w-full bg-eterna-gold hover:bg-eterna-gold/80 text-black py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(245,176,65,0.2)] hover:shadow-[0_0_25px_rgba(245,176,65,0.4)]"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};

const INFO_CONTENT: Record<string, React.ReactNode> = {
  'Help Center': (
    <>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Eterna Help Center</h1>
      <h2 className="text-xl text-white/70 mb-6">How Can We Help You Today?</h2>
      <p className="mb-6 leading-relaxed text-white/80">The Eterna Help Center provides support for viewers, creators, filmmakers, broadcasters, educational institutions, ministries, distributors, and enterprise partners.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Popular Topics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-bold mb-2">Account & Billing</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Account setup</li>
            <li>Subscription plans</li>
            <li>Payment methods</li>
            <li>Billing inquiries</li>
            <li>Refund requests</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Streaming & Playback</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Video playback issues</li>
            <li>Live streaming support</li>
            <li>Device compatibility</li>
            <li>Download management</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Partner Support</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Content uploads</li>
            <li>Distribution support</li>
            <li>Revenue management</li>
            <li>Copyright claims</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Technical Support</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>App troubleshooting</li>
            <li>Connectivity issues</li>
            <li>Device settings</li>
          </ul>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Contact Support</h3>
      <p className="text-white/80">Access live chat, email support, and ticketing services 24/7.</p>
    </>
  ),
  'Account': (
    <>
      <h1 className="text-3xl font-bold mb-4">Manage Your Eterna Experience</h1>
      <h2 className="text-xl text-white/70 mb-6">Account Overview</h2>
      <p className="mb-6 leading-relaxed text-white/80">Manage all aspects of your Eterna account.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-bold mb-2">Personal Information</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Profile management</li>
            <li>Security settings</li>
            <li>Password management</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Subscription Management</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Upgrade plans</li>
            <li>Downgrade plans</li>
            <li>Cancel subscription</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Payment Methods</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Credit cards</li>
            <li>Digital wallets</li>
            <li>Mobile payments</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Viewing Preferences</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Language settings</li>
            <li>Accessibility preferences</li>
            <li>Content recommendations</li>
          </ul>
        </div>
      </div>
    </>
  ),
  'Media Center': (
    <>
      <h1 className="text-3xl font-bold mb-4">Newsroom & Press Resources</h1>
      <p className="mb-6 leading-relaxed text-white/80">The Eterna Media Center provides journalists, media houses, bloggers, and content creators with official company information.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Resources</h3>
      <div className="space-y-6 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white">Press Releases</h4>
          <p className="text-sm">Latest company announcements and updates.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Media Kits</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Logos</li>
            <li>Brand guidelines</li>
            <li>Executive profiles</li>
            <li>Corporate assets</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">News Coverage</h4>
          <p className="text-sm">Recent media appearances and interviews.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Press Inquiries</h4>
          <p className="text-sm">Dedicated media contact information.</p>
        </div>
      </div>
    </>
  ),
  'Investor Relations': (
    <>
      <h1 className="text-3xl font-bold mb-4">Building the Future of Global Streaming</h1>
      <p className="mb-6 leading-relaxed text-white/80">Eterna is developing the next-generation digital ecosystem for entertainment, education, faith, media, and creator economies.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Investor Resources</h3>
      <div className="space-y-6 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white">Company Overview</h4>
          <p className="text-sm">Business strategy and growth vision.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Financial Information</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Reports</li>
            <li>Statements</li>
            <li>Investor presentations</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Governance</h4>
          <p className="text-sm">Corporate governance framework and policies.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Shareholder Information</h4>
          <p className="text-sm">Investor communications and updates.</p>
        </div>
      </div>
    </>
  ),
  'Jobs': (
    <>
      <h1 className="text-3xl font-bold mb-4">Join the Future of Digital Media</h1>
      <p className="mb-6 leading-relaxed text-white/80">At Eterna, we are building technologies that empower creators, communities, and audiences worldwide.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Career Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white mb-2">Technology</h4>
          <ul className="list-disc list-inside text-sm">
            <li>Software Engineers</li>
            <li>AI Engineers</li>
            <li>Cloud Architects</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Content & Media</h4>
          <ul className="list-disc list-inside text-sm">
            <li>Content Managers</li>
            <li>Editorial Specialists</li>
            <li>Media Producers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">Business</h4>
          <ul className="list-disc list-inside text-sm">
            <li>Marketing & Sales</li>
            <li>Partnerships</li>
            <li>Operations</li>
            <li>Finance & HR</li>
          </ul>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Why Work at Eterna?</h3>
      <ul className="list-disc list-inside text-sm text-white/80 space-y-1 mb-8">
        <li>Global impact</li>
        <li>Innovation culture</li>
        <li>Career development</li>
        <li>Remote opportunities</li>
      </ul>
    </>
  ),
  'Redeem Gift Cards': (
    <>
      <h1 className="text-3xl font-bold mb-4">Redeem Your Eterna Gift Card</h1>
      <p className="mb-6 leading-relaxed text-white/80">Use your Eterna gift card to access premium subscriptions and services.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">How It Works</h3>
      <ol className="list-decimal list-inside text-white/80 space-y-2 mb-8">
        <li>Sign in to your account.</li>
        <li>Enter your gift card code.</li>
        <li>Confirm redemption.</li>
        <li>Enjoy premium access.</li>
      </ol>
      <p className="text-white/60 text-sm">Need Help? Visit the Help Center for support.</p>
    </>
  ),
  'Buy Gift Cards': (
    <>
      <h1 className="text-3xl font-bold mb-4">Give the Gift of Entertainment and Learning</h1>
      <p className="mb-6 leading-relaxed text-white/80">Purchase digital or physical Eterna Gift Cards for friends, family, colleagues, and organizations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-bold text-white mb-2 text-eterna-rose">Available Options</h4>
          <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
            <li>Monthly Subscription Gift Cards</li>
            <li>Annual Subscription Gift Cards</li>
            <li>Creator Support Cards</li>
            <li>Corporate Gift Packages</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2 text-eterna-rose">Delivery Options</h4>
          <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
            <li>Email Delivery</li>
            <li>Printable Gift Card</li>
            <li>Physical Gift Card</li>
          </ul>
        </div>
      </div>
    </>
  ),
  'Ways to Watch': (
    <>
      <h1 className="text-3xl font-bold mb-4">Watch Eterna Anywhere</h1>
      <p className="mb-6 leading-relaxed text-white/80">Enjoy content across multiple devices and platforms.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Supported Devices</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white">Mobile</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Android</li>
            <li>iPhone</li>
            <li>Tablets</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">TV</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Smart TVs</li>
            <li>Android TV</li>
            <li>Apple TV & Fire TV</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Computers</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Windows</li>
            <li>macOS</li>
            <li>Linux</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Gaming Consoles</h4>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>PlayStation</li>
            <li>Xbox</li>
          </ul>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Features</h3>
      <ul className="list-disc list-inside text-sm text-white/80 space-y-1">
        <li>Offline viewing</li>
        <li>Multi-device synchronization</li>
        <li>Adaptive streaming quality</li>
      </ul>
    </>
  ),
  'Terms of Use': (
    <>
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-6 leading-relaxed text-white/80">The Terms of Use govern your access and use of Eterna services.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Key Areas</h3>
      <ul className="list-disc list-inside text-white/80 space-y-2 mb-8">
        <li>User responsibilities</li>
        <li>Subscription terms</li>
        <li>Content usage rights</li>
        <li>Intellectual property</li>
        <li>Community standards</li>
        <li>Account termination</li>
      </ul>
      <p className="text-white/60 text-sm italic">By using Eterna services, you agree to comply with all applicable terms and policies.</p>
    </>
  ),
  'Privacy': (
    <>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 leading-relaxed text-white/80">Eterna is committed to protecting your privacy and personal information.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white mb-2 text-eterna-rose">Information We Collect</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Account information</li>
            <li>Payment details</li>
            <li>Usage analytics</li>
            <li>Device information</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2 text-eterna-rose">How We Use Information</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Service delivery</li>
            <li>Personalization</li>
            <li>Security enhancement</li>
            <li>Customer support</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-2 text-eterna-rose">Your Rights</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Access your data</li>
            <li>Update information</li>
            <li>Request deletion</li>
            <li>Manage consent choices</li>
          </ul>
        </div>
      </div>
    </>
  ),
  'Cookie Preferences': (
    <>
      <h1 className="text-3xl font-bold mb-4">Manage Your Cookie Settings</h1>
      <p className="mb-6 leading-relaxed text-white/80">Cookies help us improve your experience and platform performance.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Cookie Categories</h3>
      <div className="space-y-4 mb-8 text-white/80">
        <div>
          <h4 className="font-bold text-white">Essential Cookies</h4>
          <p className="text-sm">Required for platform functionality.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Performance Cookies</h4>
          <p className="text-sm">Help improve system performance.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Personalization Cookies</h4>
          <p className="text-sm">Support recommendations and preferences.</p>
        </div>
        <div>
          <h4 className="font-bold text-white">Marketing Cookies</h4>
          <p className="text-sm">Enable relevant promotions and campaigns.</p>
        </div>
      </div>
      <p className="text-white/60 text-sm">Manage Consent: Users can modify cookie settings at any time.</p>
    </>
  ),
  'Corporate Information': (
    <>
      <h1 className="text-3xl font-bold mb-4">About Eterna</h1>
      <h2 className="text-xl text-eterna-rose font-bold mb-2">Our Mission</h2>
      <p className="mb-6 leading-relaxed text-white/80">To build the world's most intelligent ecosystem for streaming, education, faith, entertainment, and creator empowerment.</p>
      
      <h2 className="text-xl text-eterna-rose font-bold mb-2">Our Vision</h2>
      <p className="mb-6 leading-relaxed text-white/80">To connect creators and audiences globally through technology, storytelling, knowledge, and community.</p>

      <h3 className="font-bold text-lg mb-4 text-white">Core Areas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-white/80 text-sm">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Streaming Services</div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Creator Economy</div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Educational Media</div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Faith & Community Content</div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Artificial Intelligence</div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">Global Distribution</div>
      </div>

      <div className="bg-black/40 p-6 rounded-xl border border-white/10 mt-8">
        <h3 className="font-bold text-white mb-2">About Eterna</h3>
        <p className="text-sm text-white/70 mb-4 tracking-wide leading-relaxed">
          Eterna is a next-generation global streaming, creator economy, educational media, and community engagement platform designed to empower filmmakers, broadcasters, educators, ministries, businesses, and audiences worldwide.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-eterna-rose mt-2">
          <span>Eterna Streaming</span> • <span>Eterna Partners</span> • <span>Eterna Intelligence</span> • <span>Eterna Treasury</span> • <span>Eterna Alliance</span> • <span>Eterna Live</span> • <span>Eterna Learning</span> • <span>Eterna Studios</span>
        </div>
      </div>
    </>
  ),
  'Contact Us': (
    <>
      <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
      <p className="mb-6 text-white/80">Select a department below to find the appropriate contact email for your inquiry.</p>

      <div className="space-y-12">
        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">General Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Customer Support" email="support@eterna.showtime" reasons={['Account issues', 'Billing support', 'Subscription assistance', 'Technical support']} />
            <ContactBlock title="Help Center" email="help@eterna.showtime" reasons={['General inquiries', 'Self-service support', 'Knowledge base assistance']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Account & Billing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Account Services" email="accounts@eterna.showtime" reasons={['Account management', 'Password recovery', 'Security concerns']} />
            <ContactBlock title="Billing & Payments" email="billing@eterna.showtime" reasons={['Subscription payments', 'Refund requests', 'Payment disputes']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Media & Press</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Media Relations" email="media@eterna.showtime" reasons={['Press inquiries', 'Interviews', 'Media partnerships']} />
            <ContactBlock title="Press Office" email="press@eterna.showtime" reasons={['Press releases', 'News announcements', 'Editorial requests']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Corporate & Investor Relations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Investor Relations" email="investors@eterna.showtime" reasons={['Investment opportunities', 'Shareholder communications', 'Corporate updates']} />
            <ContactBlock title="Corporate Finance" email="finance@eterna.showtime" reasons={['Financial inquiries', 'Corporate transactions', 'Funding discussions']} />
            <ContactBlock title="Corporate Affairs" email="corporate@eterna.showtime" reasons={['Corporate information requests', 'Company background inquiries']} />
            <ContactBlock title="Executive Office" email="executiveoffice@eterna.showtime" reasons={['Executive correspondence', 'Strategic communications']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Careers & HR</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Recruitment" email="careers@eterna.showtime" reasons={['Job applications', 'Career opportunities']} />
            <ContactBlock title="Human Resources" email="hr@eterna.showtime" reasons={['Employment verification', 'Employee relations']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Technical & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Device Support" email="devices@eterna.showtime" reasons={['Device compatibility', 'Streaming setup assistance']} />
            <ContactBlock title="Technical Operations" email="techsupport@eterna.showtime" reasons={['Platform troubleshooting', 'Service outages', 'Technical diagnostics']} />
            <ContactBlock title="Gift Card Support" email="giftcards@eterna.showtime" reasons={['Gift card redemption', 'Gift card purchases', 'Gift card issues']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Legal, Compliance & Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Legal Department" email="legal@eterna.showtime" reasons={['Legal notices', 'Regulatory matters', 'Contractual inquiries']} />
            <ContactBlock title="Privacy Office" email="privacy@eterna.showtime" reasons={['Data privacy requests', 'Personal information inquiries', 'GDPR/POPIA compliance']} />
            <ContactBlock title="Copyright & DMCA" email="copyright@eterna.showtime" reasons={['Copyright claims', 'Content infringement reports']} />
            <ContactBlock title="Compliance Office" email="compliance@eterna.showtime" reasons={['Regulatory compliance', 'Ethics and governance']} />
            <ContactBlock title="Security Operations" email="security@eterna.showtime" reasons={['Security incidents', 'Vulnerability reporting']} />
            <ContactBlock title="Trust & Safety" email="trust@eterna.showtime" reasons={['Community standards', 'User safety concerns']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Partners & Content (Eterna Partners Division)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Partner Success" email="partners@eterna.showtime" reasons={['Partner onboarding', 'Account management', 'Partner support']} />
            <ContactBlock title="Independent Filmmakers" email="filmmakers@eterna.showtime" reasons={['Film submissions', 'Creator support']} />
            <ContactBlock title="Production Companies" email="studios@eterna.showtime" reasons={['Studio partnerships', 'Content licensing']} />
            <ContactBlock title="Distributors" email="distribution@eterna.showtime" reasons={['Distribution agreements', 'Content aggregation']} />
            <ContactBlock title="TV Networks" email="broadcast@eterna.showtime" reasons={['Channel partnerships', 'Broadcast licensing']} />
            <ContactBlock title="Educational Institutions" email="education@eterna.showtime" reasons={['Educational content partnerships', 'Institutional subscriptions']} />
            <ContactBlock title="Faith-Based Organizations" email="faith@eterna.showtime" reasons={['Ministry partnerships', 'Faith content onboarding']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Alliances & Treasury</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Strategic Partnerships" email="alliances@eterna.showtime" reasons={['Strategic collaborations', 'Ecosystem partnerships']} />
            <ContactBlock title="Sponsorships" email="sponsorships@eterna.showtime" reasons={['Brand sponsorships', 'Advertising opportunities']} />
            <ContactBlock title="Events & Festivals" email="events@eterna.showtime" reasons={['Festivals', 'Conferences', 'Live event partnerships']} />
            <ContactBlock title="Revenue Operations" email="treasury@eterna.showtime" reasons={['Revenue management', 'Partner earnings']} />
            <ContactBlock title="Creator Payments" email="payouts@eterna.showtime" reasons={['Withdrawal requests', 'Revenue distribution']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Intelligence & Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactBlock title="Data & Analytics" email="intelligence@eterna.showtime" reasons={['Analytics support', 'Business intelligence inquiries']} />
            <ContactBlock title="Research & Insights" email="research@eterna.showtime" reasons={['Market research', 'Audience intelligence']} />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-eterna-gold border-b border-white/10 pb-2">Recommended Executive Emails</h3>
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Executive Officer</span>
              <a href="mailto:ceo@eterna.showtime" className="text-eterna-rose font-mono">ceo@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Operating Officer</span>
              <a href="mailto:coo@eterna.showtime" className="text-eterna-rose font-mono">coo@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Technology Officer</span>
              <a href="mailto:cto@eterna.showtime" className="text-eterna-rose font-mono">cto@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Financial Officer</span>
              <a href="mailto:cfo@eterna.showtime" className="text-eterna-rose font-mono">cfo@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Marketing Officer</span>
              <a href="mailto:cmo@eterna.showtime" className="text-eterna-rose font-mono">cmo@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white">Chief Partnerships Officer</span>
              <a href="mailto:partnerships@eterna.showtime" className="text-eterna-rose font-mono">partnerships@eterna.showtime</a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
              <span className="font-bold text-white">Chief Content Officer</span>
              <a href="mailto:content@eterna.showtime" className="text-eterna-rose font-mono">content@eterna.showtime</a>
            </div>
          </div>
        </div>
      </div>
    </>
  ),
  'Speed Test': (
    <>
      <h1 className="text-3xl font-bold mb-4">Test Your Connection</h1>
      <p className="mb-6 leading-relaxed text-white/80">Check your internet speed to ensure the best streaming experience.</p>
      
      <div className="bg-black/50 border border-white/10 rounded-2xl p-8 mb-8 text-center max-w-xl mx-auto">
         <div className="text-6xl font-black text-eterna-rose mb-2 font-mono">45<span className="text-2xl text-white/50">Mbps</span></div>
         <p className="text-green-400 font-bold mb-6">4K Ultra HD Ready</p>
         
         <div className="grid grid-cols-3 gap-4 text-sm text-white/70 mb-8 border-t border-white/10 pt-6">
            <div>
              <div className="mb-1 text-xs uppercase tracking-widest">Download</div>
              <div className="font-bold font-mono text-white text-lg">45 Mbps</div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-widest">Upload</div>
              <div className="font-bold font-mono text-white text-lg">18 Mbps</div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-widest">Latency</div>
              <div className="font-bold font-mono text-white text-lg">12 ms</div>
            </div>
         </div>
         
         <button className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full font-bold text-sm text-white w-full max-w-[200px]">
           Run Diagnostics Again
         </button>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-center mt-12 text-eterna-rose">Recommendations</h3>
      <p className="text-white/80 text-center text-sm">Receive personalized recommendations for HD, Full HD, 4K, and Live Streaming performance based on your network conditions.</p>
    </>
  ),
  'Legal Notices': (
    <>
      <h1 className="text-3xl font-bold mb-4">Legal Information</h1>
      <p className="mb-6 leading-relaxed text-white/80">This section contains important legal disclosures regarding Eterna products and services.</p>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Topics</h3>
      <ul className="list-disc list-inside text-white/80 space-y-2 mb-8">
        <li>Copyright notices</li>
        <li>Licensing information</li>
        <li>Trademark usage</li>
        <li>Compliance disclosures</li>
        <li>Regulatory requirements</li>
      </ul>

      <div className="mt-12 text-xs text-white/40 border-t border-white/10 pt-6">
        <p className="mb-2">© {new Date().getFullYear()} Eterna, Inc. All Rights Reserved.</p>
        <p>Eterna®, Eterna Partners™, Eterna Intelligence™, Eterna Treasury™, Eterna Alliance™, Eterna Live™, and associated logos are trademarks of Eterna, Inc. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
      </div>
    </>
  ),
  'Service Code': (
    <>
      <h1 className="text-3xl font-bold mb-4">Eterna Service Identification Code</h1>
      <p className="mb-6 leading-relaxed text-white/80">The Service Code helps our support team identify your service configuration and device setup when troubleshooting issues.</p>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center max-w-sm mx-auto mb-8">
        <div className="text-xs text-white/50 uppercase tracking-widest mb-2">Your Current Service Code</div>
        <div className="font-mono text-3xl font-bold text-eterna-gold tracking-[0.2em]">E-749-X2</div>
      </div>
      
      <h3 className="font-bold text-lg mb-4 text-eterna-rose">Use Cases</h3>
      <ul className="list-disc list-inside text-white/80 space-y-1 mb-8">
        <li>Technical support</li>
        <li>Device verification</li>
        <li>Service diagnostics</li>
        <li>Account assistance</li>
      </ul>

      <div className="bg-black/30 p-6 rounded-xl border border-white/5">
        <h3 className="font-bold text-white mb-2">Where to Find Your Service Code</h3>
        <p className="text-sm text-white/70 italic">Navigate to: Account → Settings → Device Information → Service Code</p>
      </div>
    </>
  ),
  'Partner Pricing': (
    <>
      <h1 className="text-3xl font-black mb-4">🚀 ETERNA PARTNERS</h1>
      <p className="mb-10 text-xl font-bold font-mono text-eterna-gold uppercase tracking-widest">Create. Distribute. Monetize. Scale.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PricingBlock 
          name="Creator Launch" price="Free"
          forWho={['Independent Filmmakers', 'New Creators']}
          includes={['5 Content Titles', 'Basic Analytics', 'Monetization Access', 'Community Access', 'Standard Support']}
          revenueShare={['Creator 80%', 'Eterna 20%']}
        />
        <PricingBlock 
          name="Creator Pro" price="$29/month"
          forWho={['Professional Creators', 'Documentary Producers', 'Content Entrepreneurs']}
          includes={['Unlimited Uploads', 'AI Content Tools', 'Advanced Analytics', 'Creator Portfolio', 'Monetization Marketplace']}
          revenueShare={['Creator 85%', 'Eterna 15%']}
        />
        <PricingBlock 
          name="Studio Plus" price="$99/month"
          forWho={['Production Companies', 'Media Studios']}
          includes={['Team Workspaces', 'Asset Libraries', 'Rights Management', 'Workflow Automation', 'Multi-Project Management']}
          revenueShare={['Studio 88%', 'Eterna 12%']}
        />
        <PricingBlock 
          name="Distribution Network" price="$299/month"
          forWho={['Content Distributors', 'Aggregators']}
          includes={['Bulk Uploads', 'Territory Rights Management', 'Licensing Marketplace', 'API Access', 'Regional Analytics']}
          revenueShare={['Distributor 90%', 'Eterna 10%']}
        />
        <PricingBlock 
          name="Broadcast Enterprise" price="$999/month"
          forWho={['TV Networks', 'Broadcasters']}
          includes={['Live TV Channels', 'Broadcast Scheduling', 'Advertising Management', 'EPG Management', 'Multi-Region Broadcasting']}
          revenueShare={['Custom']}
        />
        <PricingBlock 
          name="Education Pro" price="$199/month"
          forWho={['Universities', 'Colleges', 'Training Academies']}
          includes={['Learning Management System', 'Course Builder', 'Student Analytics', 'Certification Engine', 'Virtual Classrooms']}
          revenueShare={['Institution 90%', 'Eterna 10%']}
        />
        <PricingBlock 
          name="Ministry Plus" price="$99/month"
          forWho={['Churches', 'Ministries', 'Faith Networks']}
          includes={['Live Worship Streaming', 'Sermon Management', 'Donations', 'Prayer Requests', 'Community Groups']}
          revenueShare={['Ministry 90%', 'Eterna 10%']}
        />
        <PricingBlock 
          name="Sovereign Enterprise" price="Starting at $2,500/month"
          forWho={['Governments', 'Corporations', 'National Broadcasters', 'Large Institutions']}
          includes={['White-Label Streaming Platform', 'Custom Apps', 'Dedicated Infrastructure', 'Enterprise Security', 'API Integrations', 'AI Intelligence Suite']}
          revenueShare={['Custom']}
        />
      </div>
    </>
  ),
  'Pricing Plans': (
    <>
      <h1 className="text-3xl font-black mb-4">🎥 ETERNA VIEWERS</h1>
      <p className="mb-10 text-xl font-bold font-mono text-eterna-gold uppercase tracking-widest">Stream. Learn. Connect.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PricingBlock 
          name="Free Plan" price="$0/month"
          forWho={['New users', 'Students', 'Casual viewers']}
          includes={['Limited Movies & Series', 'Selected Live TV Channels', 'Community Access', 'Educational Samples', 'Faith Content Samples', 'Ads Supported', '720p Streaming']}
        />
        <PricingBlock 
          name="Essential" price="$4.99/month"
          forWho={['Individual viewers']}
          includes={['Unlimited Streaming', 'HD Quality', '1 Device', 'Movies & Series', 'Live TV Access', 'Music Content', 'Educational Content', 'Personalized Recommendations']}
        />
        <PricingBlock 
          name="Plus" price="$8.99/month"
          extra="Everything in Essential plus:"
          forWho={['Couples', 'Professionals']}
          includes={['2 Devices', 'Full HD Streaming', 'Offline Downloads', 'No Ads', 'Multiple Profiles', 'Priority Streaming']}
        />
        <PricingBlock 
          name="Premium" price="$12.99/month"
          extra="Everything in Plus plus:"
          forWho={['Families', 'Power users']}
          includes={['4 Devices', '4K Ultra HD', 'Dolby Audio', 'Premium Originals', 'Creator Exclusives', 'Certification Courses', 'Advanced AI Discovery']}
        />
        <PricingBlock 
          name="Family+" price="$16.99/month"
          extra="Everything in Premium plus:"
          forWho={['Large households']}
          includes={['8 Devices', 'Kids Profiles', 'Family Controls', 'Educational Hub', 'Faith Hub', 'Live Sports', 'Premium Music Channels']}
        />
        <PricingBlock 
          name="Ultra Elite" price="$24.99/month"
          extra="Everything in Family+ plus:"
          forWho={['Premium households', 'Entertainment enthusiasts']}
          includes={['12 Devices', '8K Streaming', 'VIP Content Access', 'Early Premieres', 'Virtual Events', 'Creator Meet & Greets', 'AI Personal Concierge']}
        />
      </div>
    </>
  )
};

// Fallback for an unmatched page
const FallbackContent = ({ page }: { page: string }) => (
  <>
    <h1 className="text-3xl font-bold mb-4">{page}</h1>
    <p className="text-white/70">Information for {page} will be available soon.</p>
  </>
);

export function InfoScreen() {
  const { currentInfoPage } = useAppStore();

  return (
    <div className="min-h-screen bg-eterna-bg text-eterna-text flex flex-col pt-20">
      <TopNav showBack title={currentInfoPage || "Information"} />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4">
         <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {INFO_CONTENT[currentInfoPage] || <FallbackContent page={currentInfoPage} />}
         </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
