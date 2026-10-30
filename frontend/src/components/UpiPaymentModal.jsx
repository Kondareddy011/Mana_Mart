import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ArrowRight, ShieldCheck, Smartphone, Banknote } from 'lucide-react';

export function UpiPaymentModal({ isOpen, onClose, totalAmount, orderCode, onConfirmPayment }) {
  const [copied, setCopied] = useState(false);
  const [upiRef, setUpiRef] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('UPI_QR'); // 'UPI_QR' or 'COD'
  const upiId = "managroceryhub@icici";

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (selectedMethod === 'UPI_QR' && !upiRef.trim()) {
      alert('Please enter your UPI Reference / UTR Number (from Google Pay, PhonePe, or Paytm) to verify payment.');
      return;
    }
    onConfirmPayment({
      method: selectedMethod === 'UPI_QR' ? 'UPI_VERIFIED' : 'CASH_ON_DELIVERY',
      upi_reference: selectedMethod === 'UPI_QR' ? upiRef.trim() : null
    });
  };

  // UPI deep link
  const upiUri = `upi://pay?pa=${upiId}&pn=Mana%20Grocery%20Hub%20Vijayawada&am=${totalAmount}&tn=Order_${orderCode}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-heading">Payment for Order {orderCode}</h3>
              <p className="text-[11px] text-slate-400">Total Due: ₹{Math.round(totalAmount)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Method selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedMethod('UPI_QR')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedMethod === 'UPI_QR'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <div className="text-xs">Scan UPI QR</div>
              <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</div>
            </button>

            <button
              onClick={() => setSelectedMethod('COD')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedMethod === 'COD'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <div className="text-xs">Pay on Delivery</div>
              <div className="text-[10px] text-slate-400">Cash / UPI at Lobby</div>
            </button>
          </div>

          {selectedMethod === 'UPI_QR' ? (
            <div className="space-y-4">
              {/* QR Code Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                <div className="w-44 h-44 bg-white p-2 rounded-xl shadow-xs border border-slate-200 mb-2">
                  <img
                    src={qrUrl}
                    alt="Scan UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Scan using Google Pay, PhonePe, Paytm or BHIM
                </span>

                {/* Copy UPI ID */}
                <div className="mt-2.5 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span>UPI ID: <strong>{upiId}</strong></span>
                  <button
                    onClick={handleCopyUpi}
                    className="text-emerald-700 hover:text-emerald-800 p-1"
                    title="Copy UPI ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* UTR Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  12-Digit UPI Transaction ID / UTR *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 428901239912 or GPay Ref #"
                  value={upiRef}
                  onChange={(e) => setUpiRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Found on your payment app receipt under 'UPI Ref No' or 'UTR'.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pay on Batch Delivery Day
              </div>
              <p className="text-emerald-800">
                You can pay ₹{Math.round(totalAmount)} via Cash or direct UPI scan to our delivery coordinator at your apartment clubhouse when your family carton arrives.
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {selectedMethod === 'UPI_QR' ? 'Submit Verified UPI Payment' : 'Confirm Order (Pay on Delivery)'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
