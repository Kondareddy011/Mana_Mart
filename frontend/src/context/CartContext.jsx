import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cgh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedApartment, setSelectedApartment] = useState(() => {
    try {
      const saved = localStorage.getItem('cgh_apartment');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      const saved = localStorage.getItem('cgh_city');
      return saved || 'All Cities';
    } catch {
      return 'All Cities';
    }
  });

  const [residentDetails, setResidentDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('cgh_resident');
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        tower_block: '',
        flat_number: '',
        email: ''
      };
    } catch {
      return { name: '', phone: '', tower_block: '', flat_number: '', email: '' };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cgh_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (selectedApartment) {
      localStorage.setItem('cgh_apartment', JSON.stringify(selectedApartment));
    }
  }, [selectedApartment]);

  useEffect(() => {
    localStorage.setItem('cgh_resident', JSON.stringify(residentDetails));
  }, [residentDetails]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        telugu_name: product.telugu_name,
        brand: product.brand,
        pack_size: product.pack_size,
        hub_price: product.hub_price,
        mrp: product.mrp,
        unit_weight_kg: product.unit_weight_kg || 1.0,
        image_url: product.image_url,
        quantity: quantity
      }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addBundle = (items) => {
    items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
    setIsCartOpen(true);
  };

  // Calculations
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.hub_price * item.quantity), 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalSavings = Math.max(0, totalMrp - subtotal);
  const totalWeightKg = cartItems.reduce((sum, item) => sum + ((item.unit_weight_kg || 1) * item.quantity), 0);
  const savingsPercent = totalMrp > 0 ? Math.round((totalSavings / totalMrp) * 100) : 0;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      addBundle,
      itemCount,
      subtotal,
      totalMrp,
      totalSavings,
      totalWeightKg,
      savingsPercent,
      selectedApartment,
      setSelectedApartment,
      selectedCity,
      setSelectedCity,
      residentDetails,
      setResidentDetails,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
