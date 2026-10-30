import React, { useEffect } from 'react';
import { CheckCircle2, Share2, Printer, ArrowRight, MessageCircle, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export function OrderSuccessModal({ order, isOpen, onClose, onTrackOrder }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const handleShareWhatsApp = () => {
    const text = `🛒 *Mana Grocery Hub - Vijayawada*\n\n` +
      `Our flat (*${order.flat_number}, ${order.apartment?.name || 'Apartment'}*) just joined the Monthly Bulk Grocery Batch!\n` +
      `*Order ID:* ${order.order_code}\n` +
      `*Total Saved:* ₹${Math.round(order.savings_amount)} (Direct Mandi Rate)\n` +
      `*Total Weight:* ${order.items?.reduce((s, i) => s + (i.total_weight_kg || 0), 0).toFixed(1)} kg\n\n` +
      `Place your monthly grocery order together to get wholesale prices!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
            Order Submitted Successfully!
          </span>
          <h3 className="text-2xl font-extrabold font-heading">
            {order.order_code}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            {order.apartment?.name} • Flat {order.flat_number} ({order.resident_name})
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Timeline preview */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              What Happens Next:
            </div>
            <ul className="space-y-1.5 text-slate-600 pl-6 list-disc">
              <li>Our hub team verifies your payment details & consolidates demand.</li>
              <li>Wholesale bulk procurement takes place directly from Kurnool & Guntur mills.</li>
              <li>Your order is packed family-wise and delivered to your apartment lobby on Batch Day.</li>
            </ul>
          </div>

          {/* Order Summary Brief */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-2 bg-white">
            <div className="flex justify-between font-bold text-slate-800 pb-2 border-b border-slate-100">
              <span>Items ({order.items?.length || 0})</span>
              <span>₹{Math.round(order.total_amount)}</span>
            </div>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-500">
                <span>{item.quantity}x {item.product_name} ({item.pack_size})</span>
                <span className="font-semibold text-slate-800">₹{Math.round(item.line_total)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex justify-between text-emerald-700 font-bold">
              <span>Total Community Savings:</span>
              <span>₹{Math.round(order.savings_amount)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
            >
              <Share2 className="w-4 h-4 text-emerald-600" /> Share on WhatsApp
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" /> Print Receipt
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.order_code);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            Track Order Status <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
