import { MessageCircle } from "lucide-react";

// Simple SVG components for brand icons Lucide no longer carries
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.8A8.38 8.38 0 0 1 21 11.5Z"></path><path d="M16.5 16.5 13.5 13.5"></path></svg>
);

export default function Footer() {
  return (
    <footer className="bg-white px-16 pt-24 pb-10 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold text-[#1a2b49] mb-8">PropertyPro</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            PropertyPro is a <span className="font-bold text-[#1a2b49]">property and house renting agent</span> that provides satisfaction to clients who come from anywhere.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-[#1a2b49] mb-8">Features</h4>
          <ul className="space-y-4 text-sm font-semibold text-gray-500">
            <li className="hover:text-orange-500 cursor-pointer">How it work</li>
            <li className="hover:text-orange-500 cursor-pointer">For Team</li>
            <li className="hover:text-orange-500 cursor-pointer">Category</li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-[#1a2b49] mb-8">Category</h4>
          <ul className="space-y-4 text-sm font-semibold text-gray-500">
            <li className="hover:text-orange-500 cursor-pointer">House Property</li>
            <li className="hover:text-orange-500 cursor-pointer">Sell Property</li>
            <li className="hover:text-orange-500 cursor-pointer">Apartment</li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="font-bold text-[#1a2b49] mb-8">Subscribe to follow</h4>
          <div className="flex bg-gray-50 rounded-full p-1 mb-8">
            <input 
              type="email" 
              placeholder="Your email....." 
              className="bg-transparent border-none focus:ring-0 px-6 py-3 text-sm flex-1 outline-none text-gray-400" 
            />
            <button className="bg-[#0a1629] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
              Subscribe
            </button>
          </div>
          <div className="flex gap-6 text-[#1a2b49]">
            <InstagramIcon className="hover:text-orange-500 cursor-pointer transition-colors" />
            <WhatsappIcon className="hover:text-orange-500 cursor-pointer transition-colors" />
            <LinkedinIcon className="hover:text-orange-500 cursor-pointer transition-colors" />
            <TwitterIcon className="hover:text-orange-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100">
        <p className="text-[11px] font-bold text-[#1a2b49] opacity-80">
          © 2026 PROPERTPRO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}