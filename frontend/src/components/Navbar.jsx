import React from 'react';
import { ShoppingCart, MapPin, Truck, Phone, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function Navbar({ onOpenApartmentModal, activeView, setActiveView }) {
  const { itemCount, subtotal, setIsCartOpen, selectedApartment } = useCart();
  const { activeTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className={`${activeTheme.headerBg} text-white py-2 px-4 text-xs font-medium transition-colors duration-300 border-b border-black/10`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Balancer (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] opacity-80 min-w-[200px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Direct Mill & Mandi Sourcing</span>
          </div>

          {/* Centered Announcement with balanced padding and spacing */}
          <div className="flex-1 flex items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 hover:bg-white/15 transition-colors">
              <Truck className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
              <span className="font-bold text-amber-200 tracking-wide shrink-0">
                {language === 'te' ? 'కమ్యూనిటీ గ్రోసరీ హబ్:' : 'Community Grocery Hub:'}
              </span>
              <span className="text-white/95 flex items-center flex-wrap justify-center">
                {t('announcement').split('•').map((part, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="opacity-50 mx-2.5 text-amber-300 font-bold">•</span>}
                    <span>{part.trim()}</span>
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>

          {/* Right Helpline */}
          <div className="hidden md:flex items-center justify-end gap-1.5 text-xs min-w-[200px] shrink-0">
            <Phone className="w-3 h-3 text-emerald-300" />
            <span className="opacity-90">{t('helpline')}:</span>
            <strong className="tracking-wide">+91 98480 22338</strong>
          </div>

        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="glass-nav bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveView('home')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                    {language === 'te' ? (
                      <>మన<span className="text-emerald-600">గ్రోసరీ</span>హబ్</>
                    ) : (
                      <>Mana<span className="text-emerald-600">Grocery</span>Hub</>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>

            {/* Middle: Apartment Selector Button */}
            <button
              onClick={onOpenApartmentModal}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block leading-tight">
                  {t('yourApartment')}
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  {selectedApartment ? selectedApartment.name : t('selectApartment')}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveView('home')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeView === 'home'
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('home')}
              </button>
              <button
                onClick={() => setActiveView('catalogue')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeView === 'catalogue'
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('catalogue')}
              </button>
              <button
                onClick={() => setActiveView('track')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeView === 'track'
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('trackOrder')}
              </button>
            </nav>

            {/* Right Side: Language Toggle & Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* LANGUAGE SELECTOR TOGGLE (English / తెలుగు) */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('te')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === 'te'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="తెలుగు భాషకు మారండి"
                >
                  తెలుగు
                </button>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">
                  {subtotal > 0 ? `₹${Math.round(subtotal)}` : t('cart')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
