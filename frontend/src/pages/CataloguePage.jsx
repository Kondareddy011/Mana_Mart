import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function CataloguePage({ products, categories, activeCategory, setActiveCategory }) {
  const { language, t, getCategoryTitle } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
    return ['ALL', ...list];
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory && activeCategory !== 'all') {
      const cat = categories.find(c => c.slug === activeCategory);
      if (cat) {
        result = result.filter(p => p.category_id === cat.id);
      }
    }

    // Brand filter
    if (selectedBrand !== 'ALL') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.telugu_name && p.telugu_name.toLowerCase().includes(q)) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.hub_price - b.hub_price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.hub_price - a.hub_price);
    } else if (sortBy === 'savings') {
      result.sort((a, b) => (b.mrp - b.hub_price) - (a.mrp - a.hub_price));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured
      result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return result;
  }, [products, categories, activeCategory, selectedBrand, searchTerm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
          {t('catalogueHeaderTag')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
          {t('catalogueHeaderTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('catalogueHeaderSub')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="ALL">{t('allBrands')}</option>
              {brands.filter(b => b !== 'ALL').map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price_asc">{t('sortPriceAsc')}</option>
              <option value="price_desc">{t('sortPriceDesc')}</option>
              <option value="savings">{t('sortSavings')}</option>
              <option value="name">{t('sortName')}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              !activeCategory || activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t('allProductsLabel')} ({products.length})
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>
                  {cat.slug.includes('rice') ? '🌾' :
                   cat.slug.includes('dal') ? '🥣' :
                   cat.slug.includes('oil') ? '🫒' :
                   cat.slug.includes('spice') ? '🌶️' :
                   cat.slug.includes('flour') ? '🍞' :
                   cat.slug.includes('dry') ? '🥜' : '🧼'}
                </span>
                <span>{getCategoryTitle(cat)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          {t('showingItemsCount', { count: filteredProducts.length })}
        </div>
        {(activeCategory !== 'all' || selectedBrand !== 'ALL' || searchTerm) && (
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedBrand('ALL');
              setSearchTerm('');
            }}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline"
          >
            {t('clearAllFilters')}
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-500">
            🔍
          </div>
          <h3 className="font-bold text-slate-800 text-base font-heading">
            {t('noProductsFound')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('tryAdjustingSearch')}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedBrand('ALL');
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
          >
            {t('resetFiltersBtn')}
          </button>
        </div>
      )}
    </div>
  );
}
