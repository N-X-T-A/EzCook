import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CounterContextType {
  count: number;
  totalAmount: number;
  productCounts: { [productId: string]: number };
  productTotals: { [productId: string]: number };
  increment: (productId: number, price: number) => void;
  subtract: (productId: number, price: number) => void;
  handleAddClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    productId: number
  ) => void;
  handleSubClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    productId: number
  ) => void;
  handleRemove: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: number
  ) => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  const [totalAmount, setTotalAmount] = useState<number>(() => {
    const savedTotalAmount = localStorage.getItem("totalAmount");
    return savedTotalAmount ? JSON.parse(savedTotalAmount) : 0;
  });

  const [productCounts, setProductCounts] = useState<{
    [productId: number]: number;
  }>(() => {
    const savedProductCounts = localStorage.getItem("productCounts");
    return savedProductCounts ? JSON.parse(savedProductCounts) : {};
  });

  const [productTotals, setProductTotals] = useState<{
    [productId: number]: number;
  }>(() => {
    const savedProductTotals = localStorage.getItem("productTotals");
    return savedProductTotals ? JSON.parse(savedProductTotals) : {};
  });

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  }, [totalAmount]);

  useEffect(() => {
    localStorage.setItem("productCounts", JSON.stringify(productCounts));
  }, [productCounts]);

  useEffect(() => {
    localStorage.setItem("productTotals", JSON.stringify(productTotals));
  }, [productTotals]);

  const increment = (productId: number, price: number) => {
    setCount((prev) => prev + 1);
    setTotalAmount((prev) => prev + price);

    setProductCounts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));

    setProductTotals((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + price,
    }));
  };

  const subtract = (productId: number, price: number) => {
    if (totalAmount > 0 && count > 0) {
      setCount((prev) => prev - 1);
      setTotalAmount((prev) => Math.max(prev - price, 0));

      setProductCounts((prev) => {
        const newCount = (prev[productId] || 0) - 1;
        if (newCount <= 0) {
          const { [productId]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [productId]: newCount,
        };
      });

      setProductTotals((prev) => {
        const newTotal = (prev[productId] || 0) - price;
        if (newTotal <= 0) {
          const { [productId]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [productId]: newTotal,
        };
      });
    }
  };

  const remove = (productId: number) => {
    if (productCounts[productId] > 0) {
      const countToRemove = productCounts[productId];
      const totalToRemove = productTotals[productId];

      setCount((prev) => prev - countToRemove);
      setTotalAmount((prev) => Math.max(prev - totalToRemove, 0));

      setProductCounts((prev) => {
        const { [productId]: _, ...rest } = prev;
        return rest;
      });

      setProductTotals((prev) => {
        const { [productId]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    productId: number
  ) => {
    e.stopPropagation();
    increment(productId, price);
  };

  const handleSubClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    productId: number
  ) => {
    e.stopPropagation();
    subtract(productId, price);
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: number
  ) => {
    e.stopPropagation();
    remove(productId);
  };

  return (
    <CounterContext.Provider
      value={{
        count,
        totalAmount,
        productCounts,
        productTotals,
        increment,
        subtract,
        handleAddClick,
        handleSubClick,
        handleRemove,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
