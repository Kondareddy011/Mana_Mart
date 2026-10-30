import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Sparkles, Clock, Calculator, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function HeroBanner({ onExploreCatalogue, onOpenApartmentModal }) {
  const { activeTheme } = useTheme();
  const { selectedApartment } = useCart();
  const { language, t } = useLanguage();
  const [monthlySpend, setMonthlySpend] = useState(8000);

  const monthlySavings = Math.round(monthlySpend * 0.22);
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-8 pb-16 border-b border-slate-200">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Community Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              {t('communityPill')}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
              {t('heroTitlePart1')} <span className="text-emerald-700">{t('heroTitleHighlight')}</span> {t('heroTitlePart2')}
            </h1>

            {/* Slogan Quote */}
            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50/80 border-l-4 border-emerald-500 pl-3 py-1 rounded-r-lg">
              {t('heroQuote')}
            </p>

            {/* Subtext */}
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              {t('heroDesc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalogue}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 active:scale-95 transition-all group"
              >
                <ShoppingBag className="w-4 h-4" />
                {t('browseMonthlyCatalogue')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenApartmentModal}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs flex items-center gap-2 transition-all"
              >
                <span>📍 {selectedApartment ? selectedApartment.name : t('selectApartment')}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-xs">
              <div className="space-y-0.5">
                <div className="font-extrabold text-slate-900 text-lg font-heading">20 - 25%</div>
                <div className="text-slate-500 text-[11px]">{t('directMandiSavings')}</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-slate-900 text-lg font-heading">₹0 Fee</div>
                <div className="text-slate-500 text-[11px]">{t('freeSocietyDrop')}</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-slate-900 text-lg font-heading">18-Mo Aged</div>
                <div className="text-slate-500 text-[11px]">{t('agedRiceBadge')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Savings Calculator Card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl bg-white relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-heading">{t('calculatorTitle')}</h3>
                    <p className="text-[11px] text-slate-500">{t('calculatorSubtitle')}</p>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-800 font-extrabold text-xs px-2.5 py-1 rounded-full">
                  {t('cheaperBadge')}
                </span>
              </div>

              {/* Slider */}
              <div className="space-y-3 py-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600">{t('currentMonthlySpend')}</span>
                  <span className="text-lg font-extrabold text-slate-900 font-heading">
                    ₹{monthlySpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="20000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{t('coupleSpend')}</span>
                  <span>{t('familySpend')}</span>
                  <span>{t('jointSpend')}</span>
                </div>
              </div>

              {/* Savings Results Callout */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-4 text-white text-center shadow-md">
                <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block">
                  {t('familySavesMonth')}
                </span>
                <div className="text-3xl font-extrabold tracking-tight font-heading my-1">
                  ₹{monthlySavings.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-100 font-medium bg-white/20 py-1 px-3 rounded-full inline-block mt-1">
                  🎉 {t('yearlySavingsCallout', { amount: `₹${yearlySavings.toLocaleString()}` })}
                </div>
              </div>

              {/* Delivery Batch Info */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{t('nextDeliveryBatch')}</span>
                </div>
                <button
                  onClick={onExploreCatalogue}
                  className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 group"
                >
                  {t('orderNow')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
