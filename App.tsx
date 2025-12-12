
import React, { useState } from 'react';
import BookingWizard from './components/BookingWizard';
import AdminPanel from './components/AdminPanel';
import SmartAssistant from './components/SmartAssistant';
import { SERVICES, REVIEWS, FAQS, RECENT_WORKS } from './constants';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import ReviewsPage from './components/ReviewsPage';

type ViewType = 'home' | 'booking' | 'admin' | 'success' | 'about' | 'contact' | 'services' | 'pricing' | 'reviews';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Simple Router Logic
  const navigate = (target: ViewType) => {
    setView(target);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (view === 'admin') {
    return <AdminPanel onExit={() => navigate('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                <i className="fas fa-broom"></i>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">PH Cleaning</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button onClick={() => navigate('home')} className={`hover:text-green-600 transition ${view === 'home' ? 'text-green-600 font-bold' : ''}`}>Home</button>
              <button onClick={() => navigate('services')} className={`hover:text-green-600 transition ${view === 'services' ? 'text-green-600 font-bold' : ''}`}>Services</button>
              <button onClick={() => navigate('pricing')} className={`hover:text-green-600 transition ${view === 'pricing' ? 'text-green-600 font-bold' : ''}`}>Pricing</button>
              <button onClick={() => navigate('reviews')} className={`hover:text-green-600 transition ${view === 'reviews' ? 'text-green-600 font-bold' : ''}`}>Reviews</button>
              <button onClick={() => navigate('about')} className={`hover:text-green-600 transition ${view === 'about' ? 'text-green-600 font-bold' : ''}`}>About</button>
              <button onClick={() => navigate('contact')} className={`hover:text-green-600 transition ${view === 'contact' ? 'text-green-600 font-bold' : ''}`}>Contact</button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => navigate('admin')} className="text-slate-400 hover:text-slate-600" title="Admin Login">
                <i className="fas fa-lock"></i>
              </button>
              <button 
                onClick={() => navigate('booking')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-600 text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg">
             <div className="flex flex-col p-4 space-y-4">
                <button onClick={() => navigate('home')} className="text-left font-medium text-slate-700 hover:text-green-600">Home</button>
                <button onClick={() => navigate('services')} className="text-left font-medium text-slate-700 hover:text-green-600">Services</button>
                <button onClick={() => navigate('pricing')} className="text-left font-medium text-slate-700 hover:text-green-600">Pricing</button>
                <button onClick={() => navigate('reviews')} className="text-left font-medium text-slate-700 hover:text-green-600">Reviews</button>
                <button onClick={() => navigate('about')} className="text-left font-medium text-slate-700 hover:text-green-600">About Us</button>
                <button onClick={() => navigate('contact')} className="text-left font-medium text-slate-700 hover:text-green-600">Contact</button>
                <button onClick={() => navigate('booking')} className="bg-green-600 text-white py-3 rounded-md font-bold text-center">Book Now</button>
                <button onClick={() => navigate('admin')} className="text-left text-sm text-slate-400">Admin Panel</button>
             </div>
           </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'success' && (
          <div className="max-w-3xl mx-auto mt-20 text-center px-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fas fa-check"></i>
            </div>
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for choosing PH Cleaning. We have sent a confirmation email to you. 
              Our team will arrive at your location in Port Harcourt as scheduled.
            </p>
            <button 
              onClick={() => navigate('home')}
              className="bg-slate-800 text-white px-8 py-3 rounded-md hover:bg-slate-700"
            >
              Return Home
            </button>
          </div>
        )}

        {view === 'booking' && (
          <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
              <button onClick={() => navigate('home')} className="mb-6 text-slate-500 hover:text-green-600 flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Back to Home
              </button>
              <BookingWizard onSuccess={() => setView('success')} />
            </div>
          </div>
        )}

        {/* New Pages */}
        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactPage />}
        {view === 'services' && <ServicesPage onBookNow={() => navigate('booking')} />}
        {view === 'pricing' && <PricingPage onBookNow={() => navigate('booking')} />}
        {view === 'reviews' && <ReviewsPage />}

        {/* Landing Page */}
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
              {/* Brighter Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/20 z-10"></div>
              {/* Brighter Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="Bright Living Room" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="inline-block bg-green-500/20 text-green-300 font-semibold px-4 py-1 rounded-full mb-6 border border-green-500/30 backdrop-blur-sm">
                    #1 Cleaning Service in Port Harcourt
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight drop-shadow-md">
                    Experience the Joy of a <span className="text-green-400">Spotless Home</span>
                  </h1>
                  
                  {/* New Subheading Emphasizing Speed */}
                  <div className="mb-8">
                     <p className="text-2xl text-white font-medium mb-2 drop-shadow-sm flex items-center gap-3">
                       <i className="fas fa-stopwatch text-green-400"></i>
                       Skip the hassle. Book in <span className="text-green-400 font-bold border-b-2 border-green-400">60 seconds</span>.
                     </p>
                     <p className="text-slate-300 text-lg">
                       Instant confirmation. Vetted professionals. Next-day availability.
                     </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => navigate('booking')}
                      className="bg-green-600 hover:bg-green-500 text-white text-lg px-8 py-4 rounded-md font-bold transition-all shadow-xl hover:translate-y-[-2px]"
                    >
                      Book Now - From ₦15k
                    </button>
                    <a 
                      href="https://wa.me/2348000000000" 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-white/10 hover:bg-white/20 backdrop-blur text-white text-lg px-8 py-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp Us
                    </a>
                  </div>
                  <div className="mt-12 flex gap-8 text-slate-300 text-sm font-medium">
                    <span className="flex items-center gap-2"><i className="fas fa-shield-alt text-green-400"></i> Fully Insured</span>
                    <span className="flex items-center gap-2"><i className="fas fa-user-check text-green-400"></i> Vetted Staff</span>
                  </div>
                </div>
                {/* Hero Image - Cleaning Activity */}
                <div className="w-full md:w-1/2 hidden md:block relative">
                   <div className="absolute -inset-4 bg-green-500/20 rounded-2xl transform rotate-3 blur-lg"></div>
                   <img 
                    src="https://images.unsplash.com/photo-1581578731117-104f2a8d467e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Professional Cleaning Activity" 
                    className="relative rounded-2xl shadow-2xl border-4 border-white/10 transform -rotate-2 hover:rotate-0 transition duration-700 ease-out object-cover h-[500px] w-full"
                   />
                   <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-lg shadow-xl text-slate-900 hidden lg:block">
                      <div className="flex items-center gap-3">
                         <div className="bg-green-100 p-2 rounded-full text-green-600">
                           <i className="fas fa-check-circle text-xl"></i>
                         </div>
                         <div>
                           <p className="font-bold">Verified Professional</p>
                           <p className="text-xs text-slate-500">ID: PH-2045</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Premium Services</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Whether you need a quick touch-up or a deep dive, our Port Harcourt team has the equipment and expertise.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {SERVICES.slice(0, 3).map((service) => (
                    <div key={service.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="h-48 overflow-hidden relative">
                         <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                         <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                        <p className="text-slate-600 mb-6">{service.description}</p>
                        <div className="flex items-center justify-between border-t pt-6">
                           <span className="text-lg font-bold text-slate-900">₦{service.basePrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/start</span></span>
                           <button 
                             onClick={() => navigate('services')}
                             className="text-green-600 font-bold hover:text-green-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                            >
                             Learn More <i className="fas fa-arrow-right text-xs"></i>
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button onClick={() => navigate('services')} className="text-slate-600 font-medium hover:text-green-600 underline">View all services and details</button>
                </div>
              </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 bg-slate-50">
               <div className="max-w-7xl mx-auto px-4">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Why Port Harcourt Trusts Us</h2>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                             <i className="fas fa-map-marker-alt"></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">Locally Owned & Operated</h3>
                            <p className="text-slate-600">We understand the unique needs of PH homes. From harmattan dust to humidity control, we know how to clean specifically for this climate.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                             <i className="fas fa-fingerprint"></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">Safety First</h3>
                            <p className="text-slate-600">Every staff member undergoes rigorous background checks and ID verification. We bring our own supplies so you don't have to worry.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                             <i className="fas fa-undo"></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">100% Satisfaction Guarantee</h3>
                            <p className="text-slate-600">If you're not happy with any area we've cleaned, call us within 24 hours and we'll come back and re-clean it for free.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                         <button onClick={() => navigate('about')} className="text-green-700 font-bold hover:underline">Read more about our team</button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-green-200 rounded-lg transform rotate-3"></div>
                      <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Detail cleaning" className="relative rounded-lg shadow-xl w-full h-96 object-cover" />
                    </div>
                 </div>
               </div>
            </section>
            
            {/* Recent Work Section */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-4">Our Recent Work</h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    See the difference we make in homes and offices across Port Harcourt.
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  {RECENT_WORKS.map((work) => (
                    <div key={work.id} className="group relative overflow-hidden rounded-xl shadow-lg h-64 cursor-pointer border border-slate-800">
                      <img 
                        src={work.image} 
                        alt={work.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                      <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">{work.location}</p>
                        <h3 className="font-bold text-lg leading-tight">{work.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Reviews Preview (Loved by Locals) */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold mb-12 text-white">Loved by Locals</h2>
                 <div className="grid md:grid-cols-3 gap-8 mb-10">
                    {REVIEWS.slice(0, 3).map(review => (
                       <div key={review.id} className="bg-slate-800 p-6 rounded-lg text-left shadow-sm border border-slate-700">
                          <div className="flex text-yellow-400 mb-3 text-sm">
                             {[...Array(5)].map((_,i) => <i key={i} className="fas fa-star"></i>)}
                          </div>
                          <p className="text-slate-300 italic mb-4 text-sm">"{review.text}"</p>
                          <div className="font-bold text-white text-sm">- {review.name}, {review.location}</div>
                       </div>
                    ))}
                 </div>
                 <button onClick={() => navigate('reviews')} className="border-2 border-slate-600 text-slate-300 px-6 py-2 rounded-full font-bold hover:border-white hover:bg-white hover:text-slate-900 transition-all">Read All Reviews</button>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
               <div className="max-w-3xl mx-auto px-4">
                  <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                     <p className="text-slate-600 mt-2">Everything you need to know about our service</p>
                  </div>
                  
                  <div className="space-y-4">
                     {FAQS.slice(0, 6).map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transition-all duration-200">
                           <button 
                              onClick={() => toggleFaq(index)}
                              className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none"
                           >
                              <span>{faq.question}</span>
                              <span className={`transform transition-transform duration-300 text-green-600 ${openFaq === index ? 'rotate-180' : ''}`}>
                                 <i className="fas fa-chevron-down"></i>
                              </span>
                           </button>
                           <div 
                              className={`px-5 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                           >
                              {faq.answer}
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="text-center mt-8">
                     <button onClick={() => navigate('contact')} className="text-green-600 font-bold hover:underline">Still have questions? Contact us</button>
                  </div>
               </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-green-900 text-white text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Cleaner Home?</h2>
                <p className="text-green-100 text-lg mb-10">
                  Join hundreds of happy customers in Port Harcourt. Slots fill up fast!
                </p>
                <button 
                   onClick={() => navigate('booking')}
                   className="bg-white text-green-900 text-lg px-10 py-4 rounded-full font-bold hover:bg-green-50 transition-colors shadow-2xl"
                >
                  Book Your Clean Now
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer - same for all pages */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">PH Cleaning Pro</h4>
            <p className="text-sm leading-relaxed">
              Premium residential and commercial cleaning services tailored for Port Harcourt, Nigeria.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('services')} className="hover:text-white">Standard Cleaning</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-white">Deep Cleaning</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-white">Move-In/Out</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-white">Office Cleaning</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><i className="fas fa-phone mr-2"></i> 0800-PH-CLEAN</li>
              <li><i className="fas fa-envelope mr-2"></i> hello@phcleaning.ng</li>
              <li><i className="fas fa-map-marker-alt mr-2"></i> GRA Phase 2, Port Harcourt</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} PH Cleaning Service. All rights reserved.
        </div>
      </footer>
      
      {/* AI Assistant Chatbot - persistent across pages */}
      <SmartAssistant />
    </div>
  );
};

export default App;
