import React, { useState } from "react";
import "../css/components/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCounter } from "../context/CounterContext";

export default function Header() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const btnSignIn = () => {
    setOpenDialog(!openDialog);
  };
  const { count, totalAmount } = useCounter();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearClick = () => {
    setSearchValue("");
  };

  return (
    <>
      <div className="header-container">
        <div
          className="logo-area"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="logo-image"
            src="/images/walmart-logo-blue-gold.png"
          />
        </div>

        <form action="" className="search-area">
          <input
            className="search-input"
            placeholder="Search"
            value={searchValue}
            onChange={handleInputChange}
          />
          {searchValue && (
            <button className="clear-button" onClick={handleClearClick}>
              <img className="close-icon" src="/icons/close.png" />
            </button>
          )}
          <button type="submit" className="search-button">
            <img className="search-icon" src="/icons/searchIcon.png" />
          </button>
        </form>

        <nav aria-label="Account and Cart">
          <ul className="account-cart-area">
            <li className="user-account-area">
              <li className="user-account">
                <FontAwesomeIcon icon={faHeart} className="user-icon" />
                <div className="my-items">
                  <div className="reorder">Reorder</div>
                  <div className="account-text">My items</div>
                </div>
              </li>
            </li>
            <li className="user-account-area">
              <li className="user-account" onClick={btnSignIn}>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                <div className="user-info">
                  <div className="sign-in">Sign In</div>
                  <div className="account-text">Account</div>
                </div>
              </li>
            </li>
            <li
              className="shopping-cart-area"
              onClick={() => navigate("/cart")}
            >
              <li className="shopping-cart">
                <img className="cart-icon" src="/icons/cart.png" />
                <span className="cart-count">{count}</span>
              </li>
              <span className="cart-total-amount">
                ${totalAmount.toFixed(2)}
              </span>
            </li>
          </ul>
        </nav>
      </div>
      {openDialog && (
        <div className="dialog-overlay" onClick={btnSignIn}>
          <div className="sign-in-dialog">
            <button
              className="sign-in-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in or create account
            </button>
            <span className="line"></span>
            <div className="purchase-history">
              <img className="history-icon" src="/icons/history.png" alt="" />
              Purchase History
            </div>
          </div>
        </div>
      )}
    </>
  );
}
