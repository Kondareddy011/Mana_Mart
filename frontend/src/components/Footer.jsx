import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-xl shadow-md">
                🌾
              </div>
              <span className="text-xl font-extrabold text-white font-heading">
                {language === 'te' ? (
                  <>మన<span className="text-emerald-400">గ్రోసరీ</span>హబ్</>
                ) : (
                  <>Mana<span className="text-emerald-400">Grocery</span>Hub</>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/60 w-fit">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t('footerTrustBadge')}</span>
            </div>
          </div>

          {/* Col 2: Contact & Helpline */}
          <div className="space-y-3 min-w-[260px]">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              {t('footerHelplineTitle')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerHelplinePhone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerWhatsAppGroup')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('footerFacility')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 {language === 'te' ? 'మన గ్రోసరీ హబ్ (అపార్ట్‌మెంట్ కమ్యూనిటీ కామర్స్).' : 'Mana Grocery Hub (Apartment Community Commerce).'} All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {language === 'te' ? 'అపార్ట్‌మెంట్ కుటుంబాల కోసం' : 'for Apartment Families Across Communities'}
          </div>
        </div>
      </div>
    </footer>
  );
}
