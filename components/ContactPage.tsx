import React, { useState } from 'react';
import { api } from '../services/api';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.submitContactMessage(formData);
      if (response.success) {
        setSubmitted(true);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          We'd love to hear from you. Reach out for quotes, questions, or partnerships.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office Address</h3>
                  <p className="text-slate-600">
                    Plot 104, GRA Phase 2,<br />
                    Port Harcourt, Rivers State,<br />
                    Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone & WhatsApp</h3>
                  <p className="text-slate-600 mb-1">0800-PH-CLEAN</p>
                  <p className="text-slate-500 text-sm">Mon-Sat: 8am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-slate-600">hello@phcleaning.ng</p>
                  <p className="text-slate-600">support@phcleaning.ng</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
              <p className="text-slate-500 flex items-center gap-2">
                <i className="fas fa-map text-2xl"></i>
                <span>Google Maps Embed Would Go Here</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-green-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    type="text" 
                    required 
                    className="w-full border-slate-300 rounded-md p-3 border focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    placeholder="Your name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    type="email" 
                    required 
                    className="w-full border-slate-300 rounded-md p-3 border focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    placeholder="you@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border-slate-300 rounded-md p-3 border focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option>General Inquiry</option>
                    <option>Service Quote</option>
                    <option>Complaint</option>
                    <option>Job Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    rows={4} 
                    className="w-full border-slate-300 rounded-md p-3 border focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;