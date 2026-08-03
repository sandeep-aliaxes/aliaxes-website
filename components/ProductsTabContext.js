"use client";

import { createContext, useContext, useState } from 'react';

const ProductsTabContext = createContext(null);

export function ProductsTabProvider({ children }) {
  const [activeTab, setActiveTab] = useState('embedded');
  return (
    <ProductsTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProductsTabContext.Provider>
  );
}

export function useProductsTab() {
  const ctx = useContext(ProductsTabContext);
  if (!ctx) throw new Error('useProductsTab must be used within ProductsTabProvider');
  return ctx;
}