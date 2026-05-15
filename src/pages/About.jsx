import React from 'react';
import { ShieldCheck, Truck, Globe, Award, Users, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { label: 'Active Users', value: '2M+', icon: Users },
    { label: 'Countries', value: '190+', icon: Globe },
    { label: 'Quality Awards', value: '50+', icon: Award },
    { label: 'Fast Delivery', value: '24h', icon: Truck }
  ];

  const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Sarah Chen', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Michael Smith', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Revolutionizing<br/>Global Trade</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            We connect millions of buyers and suppliers around the world, making it easy to do business anywhere.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 max-w-6xl -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 max-w-5xl mb-32">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Founded in 2023, our platform has grown to become the world's leading B2B marketplace. Our mission is to make it easy to do business anywhere. We do this by giving suppliers the tools necessary to reach a global audience for their products, and by helping buyers find products and suppliers quickly and efficiently.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-700">Verified Suppliers Only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-700">Global Logistics Support</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071823991-b1ae5e3a7c8e?w=800" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <p className="text-blue-600 font-black text-2xl mb-1">10+ Years</p>
              <p className="text-gray-400 text-xs font-bold uppercase">Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-32 mb-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Leadership Team</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">Meet the visionaries behind the world's most innovative B2B platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                     <p className="text-white font-black text-xl">{member.name}</p>
                     <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <div className="text-center group-hover:translate-y-2 transition-transform">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 max-w-6xl mb-32">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
           <div className="flex-1 bg-blue-600 p-12 text-white">
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-100 mb-1">Email us</p>
                    <p className="text-lg font-bold">contact@brand.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-100 mb-1">Call us</p>
                    <p className="text-lg font-bold">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-100 mb-1">Visit us</p>
                    <p className="text-lg font-bold">123 Market St, San Francisco, CA</p>
                  </div>
                </div>
              </div>
           </div>
           <div className="flex-[1.5] p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subject</label>
                  <input type="text" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea rows="4" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" placeholder="Write your message here..."></textarea>
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  Send Message
                </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
