import React from 'react';
import { ShoppingBag, Users, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function MonthlyBundleCard({ bundle, allProducts }) {
  const { addBundle } = useCart();
  const { language, t } = useLanguage();

  const handleAddBundle = () => {
    // Match bundle product items with real product objects
    const itemsToAdd = bundle.itemIds.map(itemSpec => {
      const prod = allProducts.find(p => p.id === itemSpec.id);
      return prod ? { product: prod, quantity: itemSpec.qty } : null;
    }).filter(Boolean);

    if (itemsToAdd.length > 0) {
      addBundle(itemsToAdd);
    }
  };

  const title = language === 'te' ? bundle.titleTe : bundle.titleEn;
  const subtitle = language === 'te' ? bundle.subtitleTe : bundle.subtitleEn;
  const targetFamily = language === 'te' ? bundle.targetFamilyTe : bundle.targetFamilyEn;
  const itemsList = language === 'te' ? bundle.itemsListTe : bundle.itemsListEn;

  return (
    <div className="glass-card rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 transition-all bg-white relative overflow-hidden group">
      {/* Popular Badge */}
      {bundle.isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-white" /> {t('mostPopularBadge')}
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-3">
          <Users className="w-3.5 h-3.5" />
          {targetFamily}
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {subtitle}
        </p>

        {/* Item checklist */}
        <div className="space-y-2 mb-6">
          {itemsList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-heading">
              ₹{bundle.bundlePrice}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{bundle.retailPrice}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            {t('saveVsMrp', { savings: bundle.retailPrice - bundle.bundlePrice })}
          </span>
        </div>

        <button
          onClick={handleAddBundle}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> {t('oneClickBasketBtn')}
        </button>
      </div>
    </div>
  );
}
