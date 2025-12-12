import React, { useState, useEffect } from 'react';
import { SERVICES, PH_NEIGHBORHOODS, ADDONS, TIME_SLOTS } from '../constants';
import { api } from '../services/api';

interface BookingWizardProps {
  onSuccess: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [location, setLocation] = useState({ address: '', neighborhood: PH_NEIGHBORHOODS[0].name });
  const [schedule, setSchedule] = useState({ date: '', time: '' });
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [totalPrice, setTotalPrice] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Price Calculation Logic
  useEffect(() => {
    let total = 0;
    const service = SERVICES.find(s => s.id === selectedServiceId);
    if (service) {
      total += service.basePrice;
    }
    
    selectedAddons.forEach(addonId => {
      const addon = ADDONS.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });

    const neighborhood = PH_NEIGHBORHOODS.find(n => n.name === location.neighborhood);
    if (neighborhood) total += neighborhood.surcharge;

    setTotalPrice(total);
  }, [selectedServiceId, selectedAddons, location.neighborhood]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const bookingData = {
      serviceId: selectedServiceId,
      addons: selectedAddons,
      location,
      schedule,
      contact
    };

    try {
      const response = await api.submitBooking(bookingData);
      
      if (response.success) {
        onSuccess();
      } else {
        setErrorMsg(response.message || "Booking failed.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-slate-800 font-semibold animate-pulse">Processing Booking...</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="font-bold text-slate-700">Book Service</h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-green-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100 flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            {errorMsg}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Select a Service Package</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {SERVICES.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${selectedServiceId === service.id ? 'border-green-600 bg-green-50' : 'border-slate-200 hover:border-green-300'}`}
                >
                  <img src={service.image} alt={service.title} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h4 className="font-bold text-slate-800">{service.title}</h4>
                  <p className="text-green-700 font-bold mt-1">₦{service.basePrice.toLocaleString()}</p>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleNext} 
                disabled={!selectedServiceId}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Add-ons
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Customize Your Clean</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {ADDONS.map(addon => (
                <label key={addon.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedAddons([...selectedAddons, addon.id]);
                      else setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                    }}
                  />
                  <div className="ml-3 flex-1">
                    <span className="block font-medium text-slate-700">{addon.name}</span>
                    <span className="block text-sm text-slate-500">+ ₦{addon.price.toLocaleString()}</span>
                  </div>
                </label>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Neighborhood</label>
                  <select 
                    className="w-full border-slate-300 rounded-md p-2 border"
                    value={location.neighborhood}
                    onChange={(e) => setLocation({...location, neighborhood: e.target.value})}
                  >
                    {PH_NEIGHBORHOODS.map(n => (
                      <option key={n.name} value={n.name}>{n.name} {n.surcharge > 0 ? `(+₦${n.surcharge})` : ''}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    className="w-full border-slate-300 rounded-md p-2 border"
                    placeholder="e.g., 12 Aba Road"
                    value={location.address}
                    onChange={(e) => setLocation({...location, address: e.target.value})}
                  />
               </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800">Back</button>
              <button 
                onClick={handleNext}
                disabled={!location.address}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                Next: Schedule
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Choose Date & Time</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
              <input 
                type="date" 
                className="w-full md:w-1/2 border-slate-300 rounded-md p-3 border"
                min={new Date().toISOString().split('T')[0]}
                value={schedule.date}
                onChange={(e) => setSchedule({...schedule, date: e.target.value})}
              />
            </div>
            
            <label className="block text-sm font-medium text-slate-700 mb-3">Available Slots</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSchedule({...schedule, time: slot})}
                  className={`py-3 px-4 rounded-md text-sm font-medium border transition-all ${
                    schedule.time === slot 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-slate-600 border-slate-300 hover:border-green-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800">Back</button>
              <button 
                onClick={handleNext}
                disabled={!schedule.date || !schedule.time}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                Next: Details
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Final Details</h3>
            
            <div className="bg-slate-50 p-6 rounded-lg mb-8 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Service:</span>
                  <span className="font-medium">{selectedService?.title}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Add-ons:</span>
                    <span className="font-medium">{selectedAddons.length} items</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Location:</span>
                  <span className="font-medium">{location.neighborhood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date/Time:</span>
                  <span className="font-medium">{schedule.date} at {schedule.time}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-green-700 pt-2 border-t mt-2">
                  <span>Total Estimate:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full border p-3 rounded-md"
                  value={contact.name}
                  onChange={e => setContact({...contact, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border p-3 rounded-md"
                  value={contact.email}
                  onChange={e => setContact({...contact, email: e.target.value})}
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number (e.g. 080...)" 
                className="w-full border p-3 rounded-md"
                value={contact.phone}
                onChange={e => setContact({...contact, phone: e.target.value})}
              />
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800">Back</button>
              <button 
                onClick={handleSubmit}
                disabled={!contact.name || !contact.email || !contact.phone || isSubmitting}
                className="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 shadow-lg shadow-green-200 disabled:opacity-50 transition-all hover:scale-105"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;