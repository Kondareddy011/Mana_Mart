import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ApartmentSelectorModal } from './components/ApartmentSelectorModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';

function MainApp() {
  const [activeView, setActiveView] = useState('home');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(null);
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');

  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);
  const [upiModalOrder, setUpiModalOrder] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);
  const [trackInitialCode, setTrackInitialCode] = useState('');

  const { clearCart, selectedApartment, setSelectedApartment } = useCart();

  const loadData = async () => {
    try {
      const [prods, cats, apts, bts, curBatch] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getApartments(),
        api.getBatches(),
        api.getCurrentBatch(),
      ]);
      setProducts(prods);
      setCategories(cats);
      setApartments(apts);
      setBatches(bts);
      setCurrentBatch(curBatch);

      if (!selectedApartment && apts.length > 0) {
        setSelectedApartment(apts[0]);
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCheckout = () => {
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categorySlug) => {
    setActiveCategorySlug(categorySlug);
    setActiveView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order) => {
    clearCart();
    setSuccessOrder(order);
  };

  const handleOpenUpiModal = (order) => {
    setUpiModalOrder(order);
  };

  const handleConfirmUpiPayment = async ({ method, upi_reference }) => {
    if (!upiModalOrder) return;
    try {
      const updated = await api.updatePaymentStatus(
        upiModalOrder.id,
        method === 'UPI_VERIFIED' ? 'VERIFIED' : 'PENDING_VERIFICATION',
        upi_reference
      );
      setUpiModalOrder(null);
      handleOrderSuccess(updated);
    } catch (err) {
      alert('Could not update payment: ' + err.message);
    }
  };

  const handleTrackFromSuccess = (orderCode) => {
    setSuccessOrder(null);
    setTrackInitialCode(orderCode);
    setActiveView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        onOpenApartmentModal={() => setIsApartmentModalOpen(true)}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomePage
            products={products}
            categories={categories}
            onExploreCatalogue={() => {
              setActiveCategorySlug('all');
              setActiveView('catalogue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenApartmentModal={() => setIsApartmentModalOpen(true)}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeView === 'catalogue' && (
          <CataloguePage
            products={products}
            categories={categories}
            activeCategory={activeCategorySlug}
            setActiveCategory={setActiveCategorySlug}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutPage
            apartments={apartments}
            currentBatch={currentBatch}
            onOrderSuccess={handleOrderSuccess}
            onOpenUpiModal={handleOpenUpiModal}
            onBackToCatalogue={() => setActiveView('catalogue')}
          />
        )}

        {activeView === 'track' && (
          <OrderTrackingPage initialCode={trackInitialCode} />
        )}
      </main>

      {/* Customer Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onCheckout={handleOpenCheckout}
        onOpenApartmentModal={() => setIsApartmentModalOpen(true)}
      />

      {/* Apartment Selector Modal */}
      <ApartmentSelectorModal
        isOpen={isApartmentModalOpen}
        onClose={() => setIsApartmentModalOpen(false)}
      />

      {/* UPI Payment Modal */}
      {upiModalOrder && (
        <UpiPaymentModal
          isOpen={true}
          orderCode={upiModalOrder.order_code}
          totalAmount={upiModalOrder.total_amount}
          onClose={() => setUpiModalOrder(null)}
          onConfirmPayment={handleConfirmUpiPayment}
        />
      )}

      {/* Order Celebration Success Modal */}
      {successOrder && (
        <OrderSuccessModal
          isOpen={true}
          order={successOrder}
          onClose={() => setSuccessOrder(null)}
          onTrackOrder={handleTrackFromSuccess}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
