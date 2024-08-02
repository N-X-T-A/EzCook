import React from "react";
import { useCounter } from "../context/CounterContext";
import data from "../data/data.json";
import { useNavigate } from "react-router-dom";
import "../css/pages/cartDetail.css";

export default function CartDetail() {
  const {
    count,
    productCounts,
    productTotals,
    totalAmount,
    handleAddClick,
    handleSubClick,
    handleRemove,
  } = useCounter();
  const productData = data.products;

  const products = productData.flatMap((category) =>
    category.items.filter((item) => productCounts[item.id] !== undefined)
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-full">
        <p style={{ fontSize: "20px" }}>
          <b>Cart</b> ({count} items)
        </p>
        {count > 0 ? (
          <div className="flex flex-wrap mx-[-0.5rem] flex-row">
            <div className="flex-none w-3/4 px-2">
              <div className="cart-container">
                <div className="cart-header">
                  <h3 className="cart-header-title">My Cart</h3>
                </div>
                <div className="cart-body">
                  <ul className="cart-list">
                    {products.map((product) => (
                      <li key={product.id} className="cart-item  px-4 py-4">
                        <div className="flex">
                          <img
                            className="cart-item-image"
                            src={product.imageSrc[0]}
                            alt={product.title}
                          />

                          <div className="cart-item-info">
                            <div className="cart-item-title">
                              {product.title}
                            </div>

                            <div className="font-extralight">
                              ${product.price}
                            </div>
                          </div>
                          <div className="cart-item-totalprice">
                            ${productTotals[product.id].toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="mx-2"
                            onClick={(e) => handleRemove(e, product.id)}
                          >
                            <span className="underline text-sm">Remove</span>
                          </button>

                          <div className="cart-item-quantity">
                            <button
                              className="btnSub"
                              onClick={(e) =>
                                handleSubClick(e, product.price, product.id)
                              }
                            >
                              -
                            </button>
                            <span className="quantity">
                              {productCounts[product.id]}
                            </span>
                            <button
                              className="btnAdd"
                              onClick={(e) =>
                                handleAddClick(e, product.price, product.id)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex-none w-1/4 px-2">
              <div className="checkout-container sticky top-32">
                <button className="btn-checkout">Continute to checkout</button>
                <div className="line"></div>
                <div className="w-full flex items-center h-16 justify-between px-4">
                  <span className="font-medium mx-2">Total</span>
                  <span className="px-2">
                    <b>${totalAmount.toFixed(2)}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img src="./images/empty-cart.svg" alt="" />
            <h2>Sign in to see your saved items.</h2>
            <button className="btnSignIn" onClick={() => navigate("/login")}>
              Sign In
            </button>

            {/* Fill it up with savings from these
            popular departments. */}
          </div>
        )}
      </div>
    </>
  );
}
