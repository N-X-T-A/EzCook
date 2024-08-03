import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/productList.css";
import { useCounter } from "../context/CounterContext";
import { useMediaQuery } from "react-responsive";

interface Item {
  id: number;
  imageSrc: string[];
  price: number;
  title: string;
  rating: number[];
  isBestSeller: boolean;
  sale: number;
}

interface ProductListProps {
  title: string;
  products: Item[];
  items?: number;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  items,
}) => {
  const { productCounts, handleAddClick, handleSubClick } = useCounter();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 1050px)" });
  const number = isMobile ? 3 : items !== undefined ? items : 6;
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + number, products.length - number)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - number, 0));
  };

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const scrollAmount =
        listRef.current.clientWidth * (currentIndex / number);
      listRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="ml-4 border-b-0 b--near-white pt-4 pb-4">
      <section>
        <header>
          <h2 className="leading-5 m-0 title">{title}</h2>
        </header>
        <div className="flex-column justify-center relative">
          <button
            className={`btnLeft ${currentIndex === 0 ? "dn" : ""}`}
            onClick={handlePrev}
          >
            <img className="icon" src="/icons/left-arrow.png" alt="" />
          </button>
          <ul
            className={`m-0 pl-0 productList hidesb relative ${items === 4 ? "carousel-4-l" : "carousel-6-l"} carousel-3-m overflow-y-hidden`}
            ref={listRef}
          >
            {products.map((item, index) => (
              <li
                key={item.id}
                className={`flex-column items-center pa1 pr2 pb-2 hover:cursor-pointer ${index % number === 0 ? "snap-start" : ""}`}
                onClick={() => navigate(`/product/${item.title}/${item.id}`)}
              >
                <div className="mid-gray relative flex-column w-100 h-full hide-child-opacity">
                  <div className="h2 relative mv2">
                    {item.isBestSeller && (
                      <span className="text-xs best-seller px-1 py-1 rounded-md font-medium">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center relative">
                    <div className="relative overflow-hidden product-info">
                      <span>
                        <button
                          className="bg-white pointer pa0 black bn mt1 mr1 pa1 br4 absolute top-0 right-0 z-2 flex justify-center items-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <img
                            className="icon"
                            src="/icons/inactive_heart.png"
                            alt=""
                          />
                        </button>
                      </span>
                      <img
                        className="absolute top-0 left-0"
                        loading="lazy"
                        src={item.imageSrc[0]}
                        alt=""
                      />
                    </div>
                    <div className="z-2 absolute bottom--1 w-full">
                      <div
                        className="relative dib w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {productCounts[item.id] > 0 ? (
                          <div className="btn-product-container">
                            <button
                              className="btn-Add"
                              onClick={(e) =>
                                handleSubClick(e, item.price, item.id)
                              }
                            >
                              <span>-</span>
                            </button>
                            <div className="total hover:cursor-text">
                              {productCounts[item.id]}
                            </div>
                            <button
                              className="btn-Sub"
                              onClick={(e) =>
                                handleAddClick(e, item.price, item.id)
                              }
                            >
                              <span>+</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn-Add-product b pl-2 pr-2 flex items-center justify-center w-auto shadow-1"
                            onClick={(e) =>
                              handleAddClick(e, item.price, item.id)
                            }
                          >
                            <span>+ Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="product-sale">
                    {item.sale > 0 &&
                      `$${(item.price - item.sale / 100).toFixed(2)}`}
                  </div>
                  <div className="flex flex-wrap justify-start items-center leading-5 mb-1">
                    <div
                      className={`mr1 mr2-xl b black lh-copy f4-l product-price ${
                        item.sale > 0 && item.price - item.sale / 100
                          ? "strike "
                          : ""
                      }`}
                      aria-hidden="true"
                    >
                      ${item.price}
                    </div>
                  </div>
                  <span>
                    <span>
                      <span className="dark-gray mb-0 mt-1 leading-5 product-title">
                        {item.title}
                      </span>
                    </span>
                  </span>
                  <div className="flex items-center mt-2">
                    <span className="flex">
                      {item.rating.map((rate, index) => (
                        <img
                          key={index}
                          className="icon-star"
                          src={`/icons/star${rate === 0.5 ? "-half" : rate === 1 ? "-full" : ""}.png`}
                          alt=""
                        />
                      ))}
                    </span>
                    <span
                      className="text-sm pl-1 text-slate-500"
                      aria-hidden="true"
                      data-testid="product-reviews"
                      data-value="1"
                    >
                      100
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className={`btnRight ${currentIndex >= products.length - number ? "dn" : ""}`}
            onClick={handleNext}
          >
            <img className="icon" src="/icons/right-arrow.png" alt="" />
          </button>
        </div>
        <div className="line"></div>
      </section>
    </div>
  );
};

export default ProductList;
