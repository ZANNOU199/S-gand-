
import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen py-24 px-8 text-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Connect with us</span>
          <h1 className="text-6xl font-black tracking-tight mb-8">Personal <br/>Concierge</h1>
          <p className="text-sand/60 text-lg leading-relaxed mb-12 max-w-md">
            Our specialized team is available to assist you with bespoke requests, international shipping inquiries, or private collection viewings.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="text-primary" size={24} />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Email Support</p>
                <p className="text-sand/50">concierge@segande.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquare className="text-primary" size={24} />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">WhatsApp Business</p>
                <p className="text-sand/50">+234 (0) 123 456 789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-primary" size={24} />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Flagship Studio</p>
                <p className="text-sand/50">Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-charcoal p-10 rounded-2xl border border-white/5">
          <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sand/50">First Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-primary focus:border-primary outline-none" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-sand/50">Last Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-primary focus:border-primary outline-none" type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-sand/50">Email Address</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-primary focus:border-primary outline-none" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-sand/50">Message</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-primary focus:border-primary outline-none resize-none"></textarea>
            </div>
            <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-lg uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
