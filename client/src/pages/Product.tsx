import React from "react";
import Header from "../components/Header";
import { CounterProvider } from "../context/CounterContext";
import ProductDetail from "../components/ProductDetail";

export default function Product() {
  return (
    <div>
      <CounterProvider>
        <div className="flex-column min-h-screen shadow-2 transform">
          <Header />
          <div className="flex flex-column flex-auto relative z-0">
            <div className="flex-auto relative">
              <div className="mx-auto w-90">
                <div>
                  <main className="py-6">
                    <div className="flex-column h-full">
                      <ProductDetail />
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CounterProvider>
    </div>
  );
}
