import React, { useEffect, useState } from "react";
import { useCounter } from "../context/CounterContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import data from "../data/data.json";
import ImageSlider from "./ImageSlider";
import "../css/pages/productDetail.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import ProductList from "./ProductList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const productData = data.products;

interface Product {
  id: number;
  imageSrc: string[];
  price: number;
  title: string;
  rating: number[];
  isBestSeller: boolean;
  sale: number;
}

export default function ProductDetail() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const productId = parseInt(id ?? "", 10);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAddClick, handleSubClick, productCounts } = useCounter();

  // State to manage loading state and product data
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      const newProduct = productData
        .flatMap((category) => category.items)
        .find((item) => item.title === slug);
      setProduct(newProduct);
      setLoading(false);
    }, 1500);
  }, [slug, location.key]);

  if (loading || !product) {
    return (
      <div className="flex h-full relative">
        <div className="flex-none w-4/6 px-2">
          <Skeleton height={500} />
          <Skeleton height={400} />
          <Skeleton height={300} />
          <Skeleton height={500} />
        </div>
        <div className="flex-none w-2/6 px-2">
          <div className="sticky top-24">
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={60} />
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    );
  }

  const comments = [
    {
      author: "Alex",
      date: "12/7/2000",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint?",
      rate: 3.5,
    },
    {
      author: "bob10",
      date: "14/7/2000",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint?",
      rate: 5,
    },
    {
      author: "Victoria",
      date: "17/7/2000",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint?",
      rate: 4.5,
    },
    {
      author: "Athena",
      date: "20/7/2000",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nesciunt eligendi eveniet ex tempora optio illo? Sit ab, eaque possimus blanditiis itaque accusantium recusandae repellat accusamus facere sed! Deserunt, sint?",
      rate: 5,
    },
  ];

  return (
    <>
      <div className="flex h-full relative">
        <div className="flex-none w-4/6 px-2">
          <ImageSlider images={product.imageSrc} />
          <div className="line"></div>
          <ProductList
            title="Products you may also like"
            products={data.products[0].items}
            items={4}
          />
          <div className="py-2">
            <div className="h2 relative my-2 flex items-center px-2">
              <span className="text-xl dark-gray">
                Customer ratings & reviews
              </span>
            </div>
            <div className="w-full flex flex-row">
              <div className="flex-none w-1/2 px-2">
                <div className="my-4 flex flex-col">
                  <span className="text-4xl font-semibold">5 out of 5</span>
                  <div className="flex items-center my-2">
                    <span className="flex my-2">
                      {product.rating.map((rate, index) => (
                        <img
                          key={index}
                          className="icon-star"
                          src={`/icons/star${
                            rate === 0.5 ? "-half" : rate === 1 ? "-full" : ""
                          }.png`}
                          alt=""
                        />
                      ))}
                    </span>
                    <span className="text-xs px-2">(2 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <button className="border-solid border-2 border-black rounded-full text-sm ml-0 w-40 h-10 flex items-center justify-center">
                    View all reviews
                  </button>
                  <button className="rounded-full text-sm ml-0 text-white blue w-40 h-10 flex items-center justify-center mx-2">
                    Write a review
                  </button>
                </div>
              </div>
              <div className="flex-none w-1/2  px-2">
                <ul className="flex flex-col justify-center h-full">
                  <li className="flex items-center w-full">
                    <span className="flex w-1/5 text-sm">5 stars</span>
                    <ProgressBar now={100} className="w-4/5 h-2" />
                  </li>
                  <li className="flex items-center w-full">
                    <span className="flex w-1/5 text-sm">4 stars</span>
                    <ProgressBar now={0} className="w-4/5 h-2" />
                  </li>
                  <li className="flex items-center w-full">
                    <span className="flex w-1/5 text-sm">3 stars</span>
                    <ProgressBar now={0} className="w-4/5 h-2" />
                  </li>
                  <li className="flex items-center w-full">
                    <span className="flex w-1/5 text-sm">2 stars</span>
                    <ProgressBar now={0} className="w-4/5 h-2" />
                  </li>
                  <li className="flex items-center w-full">
                    <span className="flex w-1/5 text-sm">1 star</span>
                    <ProgressBar now={0} className="w-4/5 h-2" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="py-2">
            <div className="h2 relative my-2 flex items-center px-2">
              <span className="text-base dark-gray">Most relevant</span>
            </div>
            <ul className="w-full columns-2 gap-6">
              {comments.map((comment) => (
                <li className=" w-full h-full border-solid border-2 border-gray-300 rounded-lg flex-col min-h-40 px-2.5 py-2.5 my-2 inline-block">
                  <div className="flex items-center my-2  justify-between">
                    <span className="flex my-2">
                      {product.rating.map((rate, index) => (
                        <img
                          key={index}
                          className="icon-star"
                          src={`/icons/star${
                            rate === 0.5 ? "-half" : rate === 1 ? "-full" : ""
                          }.png`}
                          alt=""
                        />
                      ))}
                    </span>
                    <span className="text-sm">{comment.date}</span>
                  </div>
                  <div>
                    <div className="text-base font-semibold py-1">Title</div>
                    <p className="text-sm py-2">{comment.comment}</p>
                  </div>
                  <div className="py-2">
                    <span className="text-slate-500 text-sm">
                      {comment.author}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-none w-2/6 px-2">
          <div className="sticky top-24">
            <div className="h2 relative my-2 flex items-center">
              {product.isBestSeller && (
                <span className="text-xs best-seller px-2 py-1 rounded-md font-medium">
                  Best Seller
                </span>
              )}
            </div>
            <span className="product-detail-title">{product.title}</span>
            <div className="flex items-center mb-2">
              <span className="flex my-2">
                {product.rating.map((rate, index) => (
                  <img
                    key={index}
                    className="icon-star"
                    src={`/icons/star${
                      rate === 0.5 ? "-half" : rate === 1 ? "-full" : ""
                    }.png`}
                    alt=""
                  />
                ))}
              </span>
              {/* <span
                        className="gray f7"
                        aria-hidden="true"
                        data-testid="product-reviews"
                        data-value="1"
                      >
                        1
                      </span>
                      <span className="w_iUH7">
                        5 out of 5 Stars. 1 reviews
                      </span> */}
            </div>
            <div className="my-3">
              {product.sale > 0 ? (
                <>
                  <div className="h-6 relative my-2 flex items-center">
                    <span className="product-detail-price green">
                      $
                      {(
                        product.price -
                        product.price * (product.sale / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="product-detail-price strike px-3">
                      ${product.price}
                    </span>
                  </div>
                  <div className="h-6 relative my-3 flex items-center font-medium">
                    <span className="text-xs save green px-2 py-1 mr-1 rounded-md font-medium">
                      You save
                    </span>
                    <span className="green text-sm">
                      ${(product.price * (product.sale / 100)).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <span className="product-detail-price">${product.price}</span>
              )}
            </div>
            <div
              className="relative dib w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              {productCounts[product.id] > 0 ? (
                <div className="btn-product-container">
                  <button
                    className="btn-Add"
                    onClick={(e) =>
                      handleSubClick(e, product.price, product.id)
                    }
                  >
                    <span>-</span>
                  </button>
                  <div className="total hover:cursor-text">
                    {productCounts[product.id]}
                  </div>
                  <button
                    className="btn-Sub"
                    onClick={(e) =>
                      handleAddClick(e, product.price, product.id)
                    }
                  >
                    <span>+</span>
                  </button>
                </div>
              ) : (
                <button
                  className="btn-Add-product b pl-2 pr-2 flex items-center justify-center w-auto shadow-1"
                  onClick={(e) => handleAddClick(e, product.price, product.id)}
                >
                  <span>+ Add</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
