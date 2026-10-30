import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, Truck, Package, Box, ShieldCheck, MapPin, Phone, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export function OrderTrackingPage({ initialCode = '' }) {
  const { language, t } = useLanguage();
  const [searchInput, setSearchInput] = useState(initialCode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const ORDER_STAGES = [
    { key: 'ORDER_PLACED', label: t('stage_ORDER_PLACED'), desc: t('stage_ORDER_PLACED_desc') },
    { key: 'PAYMENT_CONFIRMED', label: t('stage_PAYMENT_CONFIRMED'), desc: t('stage_PAYMENT_CONFIRMED_desc') },
    { key: 'SUPPLIER_ORDER_FINALIZED', label: t('stage_SUPPLIER_ORDER_FINALIZED'), desc: t('stage_SUPPLIER_ORDER_FINALIZED_desc') },
    { key: 'HUB_PACKED', label: t('stage_HUB_PACKED'), desc: t('stage_HUB_PACKED_desc') },
    { key: 'DELIVERED', label: t('stage_DELIVERED'), desc: t('stage_DELIVERED_desc') },
  ];

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (query = searchInput) => {
    if (!query.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setSearched(true);
    try {
      const results = await api.trackOrder(query.trim());
      setOrders(results);
      if (results.length === 0) {
        setErrorMsg(language === 'te' 
          ? 'ఆ ఆర్డర్ కోడ్ లేదా ఫోన్ నంబర్‌తో ఆర్డర్లు ఏవీ కనుగొనబడలేదు.' 
          : 'No orders found with that Order ID or phone number.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error tracking order.');
    } finally {
      setLoading(false);
    }
  };

  const getStageIndex = (status) => {
    switch (status) {
      case 'ORDER_PLACED': return 0;
      case 'PAYMENT_CONFIRMED': return 1;
      case 'SUPPLIER_ORDER_FINALIZED': return 2;
      case 'HUB_PACKED': return 3;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
          {t('trackPageTag')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
          {t('trackPageTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('trackPageSub')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder={t('searchOrderInputPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            {loading ? '...' : t('trackOrderBtn')}
          </button>
        </form>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Results List */}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStageIndex = getStageIndex(order.order_status);

            return (
              <div key={order.id} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white space-y-6 shadow-md">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-extrabold text-slate-900 font-heading">
                        {order.order_code}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {order.order_status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>{order.apartment?.name || 'Apartment'}</strong> • {order.tower_block}, Flat {order.flat_number}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-lg font-extrabold text-slate-900 font-heading">
                      ₹{Math.round(order.total_amount)}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold">
                      {language === 'te' 
                        ? `₹${Math.round(order.savings_amount)} ఆదా (మండి రేటు)` 
                        : `Saved ₹${Math.round(order.savings_amount)} (Mandi Rate)`}
                    </div>
                  </div>
                </div>

                {/* 5-Stage Visual Workflow Tracker */}
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-4">
                    {t('timelineTitle')}
                  </div>

                  <div className="relative">
                    {/* Background line */}
                    <div className="absolute top-5 left-5 right-5 h-1 bg-slate-200 -z-0 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                      {ORDER_STAGES.map((stage, idx) => {
                        const isDone = idx <= currentStageIndex;
                        const isCurrent = idx === currentStageIndex;

                        return (
                          <div key={stage.key} className="flex md:flex-col items-center gap-3 md:gap-2 text-left md:text-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-100'
                                : 'bg-slate-100 text-slate-400 border border-slate-300'
                            }`}>
                              {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                            <div>
                              <div className={`text-xs font-bold ${isCurrent ? 'text-emerald-700 font-extrabold' : 'text-slate-800'}`}>
                                {stage.label}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {stage.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Batch & Payment Info */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('deliveryBatchLabel')}</span>
                    <span className="font-bold text-slate-800">{order.batch?.name || 'Current Batch'}</span>
                    <span className="text-emerald-700 font-semibold block text-[11px] mt-0.5">
                      {order.batch?.delivery_date || 'Sunday batch'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('paymentStatusLabel')}</span>
                    <span className="font-bold text-slate-800">{order.payment_status}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      {order.payment_method.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('residentContactLabel')}</span>
                    <span className="font-bold text-slate-800">{order.resident_name}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      {order.phone}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  <div className="font-bold text-xs text-slate-800">
                    {t('groceriesInPackage', { count: order.items?.length || 0 })}
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-2 flex justify-between items-center">
                        <span className="text-slate-700">
                          <strong>{item.quantity}x</strong> {item.product_name} ({item.pack_size})
                        </span>
                        <span className="font-bold text-slate-900">
                          ₹{Math.round(item.line_total)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
