import React from "react";
import Header from "../components/Header";
import "../css/pages/home.css";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json";
import ProductList from "../components/ProductList";
import { CounterProvider } from "../context/CounterContext";
import { Categories } from "../components/Categories";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <CounterProvider>
      <div className="flex-column min-h-screen shadow-2 transform">
        <Header />
        <div className="flex flex-column flex-auto relative z-0">
          <div className="flex-auto relative">
            <div className="main-content">
              <div>
                <main className="px-6">
                  <div className="flex-column h-full">
                    <div className="h-full relative">
                      <div className="flex flex-wrap mx-[-0.5rem] flex-row">
                        <div className="flex-none w-1/4 px-2">
                          <Categories categories={data.categories} />
                        </div>
                        <div className="flex-none w-3/4 px-2">
                          <div className="flex flex-col h-full">
                            {data.products.map((product) => (
                              <ProductList
                                key={product.title}
                                title={product.title}
                                products={product.items}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CounterProvider>
  );
}
