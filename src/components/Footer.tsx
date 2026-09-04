import { ShieldCheck, CreditCard, HelpCircle, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="hidden lg:block bg-[#ebf5e9] dark:bg-slate-950 pt-12 pb-8 border-t border-slate-200 dark:border-slate-800 w-full mt-auto transition-colors duration-300">
      <div className="cmpad">
       
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="bg-[#dcf0d8]/50 dark:bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
            <div className="text-slate-700 dark:text-primary mt-1">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">100% Secure Payments</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Moving your card details to a much more secured place.</p>
            </div>
          </div>
          
          <div className="bg-[#dcf0d8]/50 dark:bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
            <div className="text-slate-700 dark:text-primary mt-1">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Trustpay</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">100% Payment Protection. Secured transaction from anywhere.</p>
            </div>
          </div>
          
          <div className="bg-[#dcf0d8]/50 dark:bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
            <div className="text-slate-700 dark:text-primary mt-1">
              <HelpCircle size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Help Center</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Got a question? Look no further. Submit your query here.</p>
            </div>
          </div>
          
          <div className="bg-[#dcf0d8]/50 dark:bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
            <div className="text-slate-700 dark:text-primary mt-1">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Great Value</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Download app and get exciting offers at your fingertips.</p>
            </div>
          </div>
        </div>

 
        <div className="grid grid-cols-12 gap-8">
    
          <div className="col-span-4 pr-8">
            <div className="mb-6 flex items-center">
              <img src="/logo-dark.svg" alt="Tirur Hypermarket" className="h-20 w-auto rounded-lg object-contain dark:hidden" />
              <img src="/logo-light.svg" alt="Tirur Hypermarket" className="h-20 w-auto rounded-lg object-contain hidden dark:block" />
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">Customer Support</h4>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <Phone size={16} className="text-primary" />
                <span>3146565431</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                <Mail size={16} className="text-primary" />
                <span>onlinhypermarket@gmail.com</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">Stay Connected</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 bg-[#3b5998] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-[#ff0000] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>
          </div>

  
          <div className="col-span-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Grocery & Kitchen</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Fresh Items</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Snacks & Drinks</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Personal Care</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Baby Care</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Household Essentials</Link></li>
            </ul>
          </div>

          
          <div className="col-span-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4">Brands</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Nestle</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Hindustan Unilever</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Kissan</Link></li>
            </ul>
          </div>

         
          <div className="col-span-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Refund and Cancellation</Link></li>
              <li><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
