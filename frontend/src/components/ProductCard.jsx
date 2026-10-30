import React from 'react';
import { Plus, Minus, Check, Sparkles, Scale } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { activeTheme } = useTheme();
  const { language, getProductTitle, t } = useLanguage();

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const savings = Math.max(0, product.mrp - product.hub_price);
  const savingsPercent = product.mrp > 0 ? Math.round((savings / product.mrp) * 100) : 0;

  const displayTitle = getProductTitle(product);
  const secondaryTitle = language === 'te' ? product.name : product.telugu_name;

  return (
    <div className={`glass-card rounded-3xl border ${activeTheme.cardBorder} overflow-hidden flex flex-col justify-between group transition-all duration-300 bg-white`}>
      {/* Image & Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image_url}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Savings Pill */}
        {savingsPercent > 0 && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse-subtle">
            <Sparkles className="w-3 h-3 fill-white" />
            {language === 'te' 
              ? `₹${Math.round(savings)} ఆదా (${savingsPercent}% తగ్గింపు)` 
              : `Save ₹${Math.round(savings)} (${savingsPercent}% OFF)`}
          </div>
        )}

        {/* Pack Size Pill */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
          <Scale className="w-3 h-3 text-emerald-400" />
          {product.pack_size}
        </div>

        {/* Brand Tag */}
        <div className="absolute bottom-2.5 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 tracking-wide uppercase">
          {product.brand}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Main Title based on selected Language */}
          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 font-heading group-hover:text-emerald-700 transition-colors">
            {displayTitle}
          </h4>

          {/* Secondary Title (Subtle subtitle) */}
          {secondaryTitle && (
            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {secondaryTitle}
            </div>
          )}

          {/* Description snippet */}
          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-1 mt-1">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                ₹{Math.round(product.hub_price)}
              </span>
              {product.mrp > product.hub_price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{Math.round(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              {t('mandiBulkRateLabel')}
            </span>
          </div>

          {/* Quantity Stepper / Add Button */}
          <div>
            {quantityInCart > 0 ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                  className="w-7 h-7 rounded-lg bg-white text-emerald-800 flex items-center justify-center font-bold hover:bg-emerald-600 hover:text-white transition-colors shadow-xs active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-extrabold text-sm text-emerald-950 w-5 text-center">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 transition-colors shadow-xs active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> {t('addBtn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
