import React from "react";
import { useCounter } from "../context/CounterContext";
import data from "../data/data.json";
import { useNavigate } from "react-router-dom";
export default function CartContent() {
  const {
    count,
    productCounts,
    productTotals,
    totalAmount,
    handleAddClick,
    handleSubClick,
  } = useCounter();
  const productData = data.products;

  const products = productData.flatMap((category) =>
    category.items.filter((item) => productCounts[item.id] !== undefined)
  );

  const navigate = useNavigate();

  return (
    <div className="container-flex">
      <div className="main-container flex-start col mg20">
        <p style={{ fontSize: "20px" }}>
          <b>Cart</b> ({count} items)
        </p>
        {count > 0 ? (
          <div className="flex">
            <section className="leftSection">
              <div className="cart-container">
                <div className="cart-header">
                  <h3 className="cart-header-title">My Cart</h3>
                </div>
                <div className="cart-body">
                  <ul className="cart-list">
                    {products.map((product) => (
                      <li key={product.id} className="cart-item">
                        <div className="cart-item-image-container">
                          <img
                            className="cart-item-image"
                            src={product.imageSrc}
                            alt={product.title}
                          />
                        </div>
                        <div className="cart-item-info">
                          <div className="cart-item-title">{product.title}</div>

                          <div className="cart-item-price">
                            ${product.price}
                          </div>
                        </div>

                        <div className="cart-item-totalprice">
                          ${productTotals[product.id].toFixed(2)}
                        </div>

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
                        <div></div>
                        <div></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            <section className="rightSection">
              <div className="checkout-container">
                <button className="btn-checkout">Continute to checkout</button>
                <div className="line"></div>
                <div className="total-price">
                  <span style={{ fontWeight: "500" }}>Total</span>
                  <span>
                    <b>${totalAmount.toFixed(2)}</b>
                  </span>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col justify-center align-center">
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
    </div>
  );
}
