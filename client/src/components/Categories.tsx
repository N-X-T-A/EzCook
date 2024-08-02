import React, { useState } from "react";

type Item = string;

interface Category {
  categories: {
    title: string;
    items: Item[];
  }[];
}

export const Categories: React.FC<Category> = ({ categories }) => {
  const [openCategories, setOpenCategories] = useState<boolean[]>(
    categories.map(() => false)
  );

  const toggleCategory = (index: number) => {
    const updatedCategories = openCategories.map((isOpen, i) =>
      i === index ? !isOpen : isOpen
    );
    setOpenCategories(updatedCategories);
  };
  return (
    <div className="flex-column h-full">
      <div className="h-full relative">
        <section>
          <h2 className="categories">Categories</h2>
          {categories.map((category, index) => (
            <ul className="pl-0 mt0 list ml4 mr3">
              <li>
                <button
                  className="flex category-btn b--near-white pt-4 pb-4 pl-0 pr-0 items-center w-full btn"
                  key={index}
                  onClick={() => toggleCategory(index)}
                >
                  <img
                    loading="lazy"
                    src="./images/category1.webp"
                    className="self-center"
                    alt=""
                  />
                  <span className="category-title dark-gray  w-90 flex-auto ml3">
                    {category.title}
                  </span>
                  {!openCategories[index] ? (
                    <img src="./icons/down-arrow.png" className="icon" alt="" />
                  ) : (
                    <img src="./icons/up-arrow.png" className="icon" alt="" />
                  )}
                </button>
                {openCategories[index] && (
                  <ul className="pl-0">
                    {category.items.map((item) => (
                      <li className="category-items pt-0 pb-0 black underline-hover pb-2 mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          ))}
        </section>
      </div>
    </div>
  );
};
