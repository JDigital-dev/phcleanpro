
import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About PH Cleaning Pro</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          Port Harcourt's most trusted cleaning service, dedicated to bringing sparkle to every home and office in the Garden City.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 2020, PH Cleaning Pro started with a simple mission: to provide reliable, high-quality cleaning services that busy professionals in Port Harcourt can trust. 
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We understand the unique challenges of our city – from the humidity to the harmattan dust. That's why we've developed specialized cleaning protocols tailored specifically for this environment.
            </p>
            <p className="text-slate-600 font-medium">
              We are not just cleaners; we are home care specialists committed to your peace of mind.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-green-100 rounded-lg transform -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
              alt="Professional Team Meeting" 
              className="relative rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                  <p className="text-green-600 text-sm font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Join Our Growing Family</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            We are always looking for dedicated individuals to join our team. If you have a passion for excellence, get in touch.
          </p>
          <button className="border-2 border-green-600 text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-600 hover:text-white transition-colors">
            Contact for Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
