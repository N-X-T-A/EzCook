import React from "react";
import Header from "../components/Header";
import CartContent from "../components/CartContent";
import { CounterProvider } from "../context/CounterContext";
import "../css/pages/cart.css";

export default function Cart() {
  return (
    <CounterProvider>
      <Header />
      <CartContent />
    </CounterProvider>
  );
}
