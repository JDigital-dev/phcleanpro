import React from 'react';
import { REVIEWS } from '../constants';

const ReviewsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          Don't just take our word for it. Here is what our neighbors in Port Harcourt are saying.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-slate-50 p-8 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-slate-300'}`}></i>
                ))}
              </div>
              <p className="text-slate-700 text-lg italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-slate-500 text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-green-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Have you used our service?</h2>
          <p className="text-green-100 mb-8">We value your feedback. Help us serve Port Harcourt better.</p>
          <button className="bg-white text-green-900 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition-colors">
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;