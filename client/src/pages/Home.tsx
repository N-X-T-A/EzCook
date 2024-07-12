import React from "react";
import Header from "../components/Header";
import "../css/pages/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json";
import ProductList from "../components/ProductList";
import { CounterProvider } from "../context/CounterContext";

export default function Home() {
  const [openCategories, setOpenCategories] = useState<boolean[]>(
    data.categories.map(() => false)
  );

  const toggleCategory = (index: number) => {
    const updatedCategories = openCategories.map((isOpen, i) =>
      i === index ? !isOpen : isOpen
    );
    setOpenCategories(updatedCategories);
  };

  return (
    <CounterProvider>
      <Header />
      <div className="container-flex">
        <div className="main-container">
          <section className="category-section">
            <h3 className="section-title">Categories</h3>
            <div className="line"></div>
            <div>
              {data.categories.map((category, index) => (
                <ul
                  className="category-list"
                  key={index}
                  onClick={() => toggleCategory(index)}
                >
                  <div className="category-item">
                    <img src={`./images/category${index + 1}.webp`} alt="" />
                    <p className="category-title">{category.title}</p>
                    {!openCategories[index] ? (
                      <img
                        className="icon-arrow"
                        src="./icons/down-arrow.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className="icon-arrow"
                        src="./icons/up-arrow.png"
                        alt=""
                      />
                    )}
                  </div>
                  {openCategories[index] && (
                    <div>
                      {category.items.map((item, itemIndex) => (
                        <li className="subcategory-item" key={itemIndex}>
                          {item}
                        </li>
                      ))}
                    </div>
                  )}
                </ul>
              ))}
            </div>
          </section>
          <ProductList products={data.products} />
        </div>
      </div>
    </CounterProvider>
  );
}
