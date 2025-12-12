import React from 'react';
import { SERVICES, ADDONS, FAQS } from '../constants';

interface PricingPageProps {
  onBookNow: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBookNow }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Transparent Pricing</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          No hidden fees. Pay for exactly what you need.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${index === 1 ? 'border-green-500 transform md:-translate-y-4' : 'border-transparent'}`}>
              {index === 1 && <div className="bg-green-500 text-white text-center py-1 text-sm font-bold uppercase tracking-wide">Most Popular</div>}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-slate-900">₦{service.basePrice.toLocaleString()}</span>
                  <span className="text-slate-500 ml-2">/ starting</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 min-h-[40px]">{service.description}</p>
                <button 
                  onClick={onBookNow}
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${index === 1 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                >
                  Book Now
                </button>
              </div>
              <div className="bg-slate-50 p-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Includes</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>Approx. {service.durationHours} Hours</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Optional Add-ons</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-slate-100">
                {ADDONS.map(addon => (
                  <tr key={addon.id} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-700 font-medium">{addon.name}</td>
                    <td className="p-4 text-right font-bold text-slate-900">+ ₦{addon.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;