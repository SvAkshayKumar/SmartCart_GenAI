
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12">
            Have a question about our gadgets or need help with an order? Our team is here to assist you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <p className="text-slate-500">support@smartcart.tech</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Visit Studio</h4>
                <p className="text-slate-500">101 Innovation Way, Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
          <form action="https://formspree.io/f/mykdzvry" method="POST" className="space-y-6">
            <input type="hidden" name="_subject" value="SmartCart Contact Message" />
            
            <div className="space-y-2">
              <label className="text-sm font-bold">Your Name</label>
              <input 
                name="name" 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="Jane Smith"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Message</label>
              <textarea 
                name="message" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                rows={5}
                placeholder="How can we help you today?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
