import React from "react";
import { useCounter } from "../context/CounterContext";

export default function CartContent() {
  const { count } = useCounter();

  return (
    <div className="container-flex ">
      <div className="main-container flex-start">
        <p>
          <b>Cart</b> ({count} items)
        </p>
      </div>
    </div>
  );
}
