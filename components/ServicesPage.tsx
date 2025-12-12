import React from 'react';
import { SERVICES } from '../constants';

interface ServicesPageProps {
  onBookNow: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBookNow }) => {
  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          Comprehensive cleaning solutions tailored to your needs. From routine maintenance to heavy-duty deep cleaning.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-16">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <img src={service.image} alt={service.title} className="rounded-xl shadow-lg w-full h-80 object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                <p className="text-slate-600 text-lg mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-slate-800 mb-2">What's Included:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <i className="fas fa-check-circle text-green-500"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-2xl font-bold text-green-700">₦{service.basePrice.toLocaleString()}</div>
                   <button 
                    onClick={onBookNow}
                    className="bg-green-600 text-white px-6 py-3 rounded-md font-bold hover:bg-green-700 transition-colors shadow-lg"
                   >
                     Book This Service
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Process Section */}
        <div className="mt-24 border-t pt-16">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Simple steps to a cleaner home</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
             <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-lg mb-2">Select Service</h3>
                <p className="text-slate-500 text-sm">Choose the package that fits your home's needs.</p>
             </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-lg mb-2">Schedule</h3>
                <p className="text-slate-500 text-sm">Pick a date and time slot that works for you.</p>
             </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-lg mb-2">We Clean</h3>
                <p className="text-slate-500 text-sm">Our expert team arrives fully equipped and gets to work.</p>
             </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-bold text-lg mb-2">Relax</h3>
                <p className="text-slate-500 text-sm">Enjoy your spotless home and free time.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;