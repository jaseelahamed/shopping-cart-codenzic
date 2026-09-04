import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate, Link } from 'react-router-dom';
import { shippingFormSchema, type ShippingFormValues } from '../types';
import { Check, ChevronLeft, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import { z } from 'zod';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Checkout = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();


  const total = getTotal();
  if (items.length === 0 || total < 10) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-slate-900 dark:text-white transition-colors duration-300">
        <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart doesn't meet checkout requirements</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Minimum checkout value is ₹800.00</p>
        <Link to="/" className="px-6 py-2 bg-[#aa3bff] text-white rounded-xl hover:bg-[#902be6] transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const formik = useFormik<ShippingFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      postalCode: '',
    },
    validationSchema: toFormikValidationSchema(shippingFormSchema),
    onSubmit: () => {
      setStep(3);
    },
  });

  const handlePlaceOrder = () => {

    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300 text-slate-900 dark:text-slate-100">
      {/* Stepper */}
      <div className="bg-slate-50 dark:bg-slate-800 p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center relative transition-colors duration-300">
        <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-slate-200 dark:bg-slate-700 -z-0 -translate-y-1/2"></div>
        
        {[
          { num: 1, label: 'Cart Review', icon: ShoppingBag },
          { num: 2, label: 'Shipping', icon: MapPin },
          { num: 3, label: 'Payment', icon: CreditCard }
        ].map((s) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
              step >= s.num ? 'bg-[#aa3bff] text-white ring-4 ring-white dark:ring-slate-800' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 ring-4 ring-white dark:ring-slate-800'
            }`}>
              {step > s.num ? <Check size={18} /> : s.num}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Review Your Cart</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-slate-50 dark:bg-slate-800 mix-blend-multiply dark:mix-blend-normal" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity} × ₹{(item.price * 80).toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-semibold dark:text-slate-100">₹{(item.price * item.quantity * 80).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <OrderSummary />

            <div className="mt-8 flex justify-between items-center">
              <Link to="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium">
                <ChevronLeft size={16} /> Back to Shop
              </Link>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-[#aa3bff] text-white font-medium rounded-xl hover:bg-[#902be6] transition-colors"
              >
                Continue to Shipping
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                  />
                  {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.city && formik.errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                  />
                  {formik.touched.city && formik.errors.city && <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.address && formik.errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                />
                {formik.touched.address && formik.errors.address && <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>}
              </div>

              <div className="space-y-1 md:w-1/2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border ${formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-[#aa3bff]'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-shadow`}
                />
                {formik.touched.postalCode && formik.errors.postalCode && <p className="text-red-500 text-xs mt-1">{formik.errors.postalCode}</p>}
              </div>

              <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-2 font-medium"
                >
                  <ChevronLeft size={16} /> Back to Cart
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#aa3bff] text-white font-medium rounded-xl hover:bg-[#902be6] transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <MapPin size={18} className="text-primary" />
                    Shipping Information
                  </h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p><strong className="text-slate-900 dark:text-white">Name:</strong> {formik.values.fullName}</p>
                    <p><strong className="text-slate-900 dark:text-white">Email:</strong> {formik.values.email}</p>
                    <p><strong className="text-slate-900 dark:text-white">Phone:</strong> {formik.values.phoneNumber}</p>
                    <p><strong className="text-slate-900 dark:text-white">Address:</strong> {formik.values.address}, {formik.values.city}, {formik.values.postalCode}</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <CreditCard size={18} className="text-primary" />
                    Payment Method
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Cash on Delivery / No Payment Gateway Required for this demo.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 h-fit">
                <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300 truncate pr-4">{item.quantity}x {item.title}</span>
                      <span className="font-medium whitespace-nowrap text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity * 80).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <OrderSummary />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-lg hover:shadow-xl"
                >
                  Place Order
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-start items-center">
              <button
                onClick={() => setStep(2)}
                className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium"
              >
                <ChevronLeft size={16} /> Edit Shipping Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderSummary = () => {
  const { getSubtotal, getTax, getDiscount, getTotal } = useCartStore();
  
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between text-slate-600 dark:text-slate-400">
        <span>Subtotal</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">₹{(getSubtotal() * 80).toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-slate-600 dark:text-slate-400">
        <span>Tax (5%)</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">₹{(getTax() * 80).toFixed(2)}</span>
      </div>
      {getDiscount() > 0 && (
        <div className="flex justify-between text-green-600 dark:text-green-400">
          <span>Discount (10% on {'>'}₹8000)</span>
          <span className="font-medium">-₹{(getDiscount() * 80).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-700">
        <span>Final Total</span>
        <span>₹{(getTotal() * 80).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Checkout;
