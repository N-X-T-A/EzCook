import React from "react";
import Header from "../components/Header";
import CartDetail from "../components/CartDetail";
import { CounterProvider } from "../context/CounterContext";

export default function Cart() {
  return (
    <CounterProvider>
      <div className="flex-column min-h-screen shadow-2 transform">
        <Header />
        <div className="flex flex-column flex-auto relative z-0">
          <div className="flex-auto relative">
            <div className="mx-auto w-90">
              <div>
                <main className="py-6">
                  <div className="flex-column h-full">
                    <div className="h-full relative">
                      <div className="flex flex-wrap mx-[-0.5rem] flex-row">
                        <CartDetail />
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CounterProvider>
  );
}
