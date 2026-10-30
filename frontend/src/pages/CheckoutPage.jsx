import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Building, MapPin, Phone, User, Calendar, ShieldCheck, ArrowRight, Sparkles, Check, ShoppingBag, ArrowLeft } from 'lucide-react';

export function CheckoutPage({
  apartments,
  currentBatch,
  onOrderSuccess,
  onOpenUpiModal,
  onBackToCatalogue
}) {
  const {
    cartItems,
    subtotal,
    totalMrp,
    totalSavings,
    totalWeightKg,
    savingsPercent,
    selectedApartment,
    setSelectedApartment,
    residentDetails,
    setResidentDetails,
    clearCart
  } = useCart();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    resident_name: residentDetails.name || '',
    phone: residentDetails.phone || '',
    tower_block: residentDetails.tower_block || 'Tower A',
    flat_number: residentDetails.flat_number || '',
    email: residentDetails.email || '',
    special_notes: '',
    payment_method: 'UPI_VERIFIED'
  });

  const [apartmentId, setApartmentId] = useState(selectedApartment?.id || (apartments[0]?.id || 1));
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedApartment) {
      setApartmentId(selectedApartment.id);
    }
  }, [selectedApartment]);

  const handleApartmentChange = (e) => {
    const id = parseInt(e.target.value);
    setApartmentId(id);
    const found = apartments.find(a => a.id === id);
    if (found) setSelectedApartment(found);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cartItems.length === 0) {
      setErrorMsg(language === 'te' 
        ? 'మీ బుట్ట ఖాళీగా ఉంది. దయచేసి ఆర్డర్ చేయడానికి ముందు సరుకులను జోడించండి.' 
        : 'Your basket is empty. Please add grocery products before checkout.');
      return;
    }

    if (!formData.resident_name.trim() || !formData.phone.trim() || !formData.flat_number.trim()) {
      setErrorMsg(language === 'te'
        ? 'దయచేసి మీ పేరు, మొబైల్ నంబర్ మరియు ఫ్లాట్ నంబర్ నమోదు చేయండి.'
        : 'Please fill in your name, phone number, and flat number.');
      return;
    }

    setResidentDetails({
      name: formData.resident_name,
      phone: formData.phone,
      tower_block: formData.tower_block,
      flat_number: formData.flat_number,
      email: formData.email
    });

    setSubmitting(true);

    try {
      const orderPayload = {
        batch_id: currentBatch?.id || 1,
        apartment_id: apartmentId,
        tower_block: formData.tower_block,
        flat_number: formData.flat_number,
        resident_name: formData.resident_name,
        phone: formData.phone,
        email: formData.email || null,
        payment_method: formData.payment_method,
        special_notes: formData.special_notes || null,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const createdOrder = await api.createOrder(orderPayload);

      if (formData.payment_method === 'UPI_VERIFIED') {
        onOpenUpiModal(createdOrder);
      } else {
        clearCart();
        onOrderSuccess(createdOrder);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to place order. Please check inputs and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeApt = apartments.find(a => a.id === apartmentId) || selectedApartment;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={onBackToCatalogue}
          className="text-xs font-bold text-slate-500 hover:text-emerald-700 flex items-center gap-1.5 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {t('backToCatalogue')}
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          {t('checkoutMainTitle')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {t('checkoutMainSub')}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Apartment & Resident Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-heading">
                    {t('step1Title')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {t('step1Sub')}
                  </p>
                </div>
              </div>

              {/* Apartment Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('aptSelectLabel')}
                </label>
                <select
                  value={apartmentId}
                  onChange={handleApartmentChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {apartments.map((apt) => (
                    <option key={apt.id} value={apt.id}>
                      {apt.name} ({apt.area}, {apt.city}) - {apt.registered_families || 25}+ {language === 'te' ? 'కుటుంబాలు' : 'Families'}
                    </option>
                  ))}
                </select>
                {activeApt && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    📍 {activeApt.delivery_slot_info}
                  </p>
                )}
              </div>

              {/* Tower & Flat */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('towerBlockLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tower A / Block 1"
                    value={formData.tower_block}
                    onChange={(e) => setFormData({ ...formData, tower_block: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('flatNumberLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 402, 1205"
                    value={formData.flat_number}
                    onChange={(e) => setFormData({ ...formData, flat_number: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Name & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('residentNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivasa Rao"
                    value={formData.resident_name}
                    onChange={(e) => setFormData({ ...formData, resident_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98480 22338"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {t('phoneHint')}
                  </p>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('deliveryNotesLabel')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please leave with security if doorbell not answered"
                  value={formData.special_notes}
                  onChange={(e) => setFormData({ ...formData, special_notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            {/* 2. Monthly Delivery Batch Schedule Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-heading">
                    {t('step2Title')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {t('step2Sub')}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('activeBatchLabel')}</span>
                  <span className="font-bold text-slate-800">{currentBatch?.name || 'November 2026 Batch'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('ordersCutoffLabel')}</span>
                  <span className="font-bold text-amber-700">{currentBatch?.cutoff_date || '30 Oct 2026'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('dispatchDeliveryLabel')}</span>
                  <span className="font-bold text-emerald-700">{currentBatch?.delivery_date || '02 Nov 2026'}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-600">
                  <span>{t('freeDropLabel')}</span>
                  <span className="font-bold text-emerald-800">FREE ₹0 ({language === 'te' ? 'ఉచితం' : 'No delivery fee'})</span>
                </div>
              </div>
            </div>

            {/* 3. Payment Method Choice */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-heading">
                    {t('step3Title')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {t('step3Sub')}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.payment_method === 'UPI_VERIFIED'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="UPI_VERIFIED"
                      checked={formData.payment_method === 'UPI_VERIFIED'}
                      onChange={() => setFormData({ ...formData, payment_method: 'UPI_VERIFIED' })}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('payUpiOptionTitle')}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {t('payUpiOptionSub')}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {t('recommendedBadge')}
                  </span>
                </label>

                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.payment_method === 'CASH_ON_DELIVERY'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="CASH_ON_DELIVERY"
                      checked={formData.payment_method === 'CASH_ON_DELIVERY'}
                      onChange={() => setFormData({ ...formData, payment_method: 'CASH_ON_DELIVERY' })}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('payCodOptionTitle')}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {t('payCodOptionSub')}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || cartItems.length === 0}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
            >
              {submitting ? t('submittingOrderBtn') : t('placeMonthlyOrderBtn', { amount: Math.round(subtotal) })}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right Column: Order Basket Summary Sticky Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm font-heading flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                {t('basketSummaryTitle')}
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {cartItems.length} {language === 'te' ? 'వస్తువులు' : 'Products'}
              </span>
            </div>

            {/* Item list brief */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
              {cartItems.map((item) => {
                const itemTitle = language === 'te' && item.telugu_name ? item.telugu_name : item.name;

                return (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">
                        {item.quantity}x {itemTitle}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.pack_size}
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900 whitespace-nowrap">
                      ₹{Math.round(item.hub_price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t('retailMarketMrpValue')}:</span>
                <span className="line-through">₹{Math.round(totalMrp)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded-lg">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-emerald-600" />
                  {language === 'te' ? 'కమ్యూనిటీ బల్క్ పొదుపు:' : 'Your Community Savings:'}
                </span>
                <span>- ₹{Math.round(totalSavings)} ({savingsPercent}% {language === 'te' ? 'తగ్గింపు' : 'OFF'})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'te' ? 'మొత్తం బల్క్ బరువు:' : 'Total Bulk Weight:'}</span>
                <span className="font-bold text-slate-800">{totalWeightKg.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'te' ? 'సొసైటీ ఉమ్మడి డెలివరీ:' : 'Consolidated Delivery:'}</span>
                <span className="text-emerald-700 font-bold">FREE ₹0</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-slate-900 font-heading">
                  {t('totalPayable')}:
                </span>
                <span className="text-2xl font-extrabold text-emerald-900 font-heading">
                  ₹{Math.round(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
