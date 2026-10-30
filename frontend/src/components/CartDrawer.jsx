import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, MapPin, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function CartDrawer({ onCheckout, onOpenApartmentModal }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalMrp,
    totalSavings,
    totalWeightKg,
    savingsPercent,
    selectedApartment
  } = useCart();
  const { language, t, getProductTitle } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-heading">{t('basketDrawerTitle')}</h3>
                <p className="text-xs text-slate-400">
                  {t('bulkLoadLabel', { count: cartItems.length, weight: totalWeightKg.toFixed(1) })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Selected Apartment Banner */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-emerald-900 font-semibold truncate">
                {selectedApartment ? selectedApartment.name : t('noAptSelected')}
              </span>
            </div>
            <button
              onClick={onOpenApartmentModal}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline"
            >
              {t('changeBtn')}
            </button>
          </div>

          {/* Savings Milestone Banner */}
          {totalSavings > 0 && (
            <div className="bg-amber-500 text-white px-6 py-2 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                {t('wholesaleSavingsBanner', { savings: Math.round(totalSavings), percent: savingsPercent })}
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                {t('mandiRatesBadge')}
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800 font-heading">{t('basketEmptyTitle')}</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {t('basketEmptyDesc')}
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemTitle = language === 'te' && item.telugu_name ? item.telugu_name : item.name;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 items-center group"
                  >
                    <img
                      src={item.image_url}
                      alt={itemTitle}
                      className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate font-heading">
                        {itemTitle}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                          {item.pack_size}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          ₹{Math.round(item.hub_price)}
                        </span>
                        {item.mrp > item.hub_price && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{Math.round(item.mrp)}
                          </span>
                        )}
                      </div>

                      {/* Stepper & Line Total */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            ₹{Math.round(item.hub_price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t('retailMarketMrpValue')}</span>
                  <span className="line-through text-slate-400">₹{Math.round(totalMrp)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>{t('commSavingsLabel', { percent: savingsPercent })}</span>
                  <span>- ₹{Math.round(totalSavings)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t('aptDeliveryLabel')}</span>
                  <span className="text-emerald-700 font-semibold">{t('freeConsolidated')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900 font-heading">
                    {t('totalPayable')}
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-heading">
                    ₹{Math.round(subtotal)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('paymentNoteBadge')}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                {t('proceedToCheckoutBtn')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
