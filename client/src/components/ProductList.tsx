import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/productList.css";
import { useCounter } from "../context/CounterContext";

interface Item {
  id: number;
  imageSrc: string;
  price: number;
  title: string;
  rating: number[];
  isBestSeller: boolean;
}

interface ProductListProps {
  products: {
    title: string;
    items: Item[];
  }[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();
  const { increment, subtract, productCounts, handleAddClick, handleSubClick } =
    useCounter();

  const [startIndexArray, setStartIndexArray] = useState<number[]>(() =>
    products.map(() => 0)
  );

  const totalItemsArray = products.map((category) => category.items.length);

  const onNextClick = (index: number) => {
    if (startIndexArray[index] + 6 < totalItemsArray[index]) {
      setStartIndexArray((prev) => {
        const newArray = [...prev];
        newArray[index] += 6;
        return newArray;
      });
    }
  };

  const onPrevClick = (index: number) => {
    if (startIndexArray[index] - 6 >= 0) {
      setStartIndexArray((prev) => {
        const newArray = [...prev];
        newArray[index] -= 6;
        return newArray;
      });
    }
  };

  return (
    <section className="products-section">
      {products.map((category, index) => (
        <div key={category.title} className="product-list-container">
          <h2 className="product-list-title">{category.title}</h2>
          <ul className="product-list">
            {category.items
              .slice(startIndexArray[index], startIndexArray[index] + 6)
              .map((product) => (
                <li
                  key={product.id}
                  className="product-item"
                  onClick={() => navigate("/product")}
                >
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={product.imageSrc}
                      alt="Product"
                    />
                    {product.isBestSeller && (
                      <div className="product-badge">
                        <span className="product-bestseller">Best seller</span>
                      </div>
                    )}
                    <div className="product-add-button-container">
                      {productCounts[product.id] > 0 ? (
                        <div className="btn-add btn-inactive">
                          <button
                            className="btn_Subtract"
                            onClick={(e) =>
                              handleSubClick(e, product.price, product.id)
                            }
                          >
                            -
                          </button>
                          <div className="total">
                            {productCounts[product.id]}
                          </div>
                          <button
                            className="btn_Increment"
                            onClick={(e) =>
                              handleAddClick(e, product.price, product.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn-add"
                          onClick={(e) =>
                            handleAddClick(e, product.price, product.id)
                          }
                        >
                          + Add
                        </button>
                      )}
                    </div>

                    <div className="product-fav-button-container">
                      <button className="btn-fav">
                        <img
                          className="icon-fav"
                          src="/icons/inactive_heart.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-price">${product.price}</div>
                    <span className="product-title">{product.title}</span>
                    <div className="product-rating">
                      {product.rating.map((rate, index) => (
                        <img
                          key={index}
                          className="icon-rate"
                          src={`/icons/star${
                            rate === 0.5 ? "-half" : rate === 1 ? "-full" : ""
                          }.png`}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div
            className="line"
            style={{ marginTop: "0px", marginBottom: "15px" }}
          ></div>
          {startIndexArray[index] > 0 && (
            <button
              className="btn-arrow-left"
              onClick={() => onPrevClick(index)}
            >
              <img className="icon-arrow" src="./icons/left-arrow.png" alt="" />
            </button>
          )}
          {startIndexArray[index] + 6 < totalItemsArray[index] && (
            <button
              className="btn-arrow-right"
              onClick={() => onNextClick(index)}
            >
              <img
                className="icon-arrow"
                src="./icons/right-arrow.png"
                alt=""
              />
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ProductList;
