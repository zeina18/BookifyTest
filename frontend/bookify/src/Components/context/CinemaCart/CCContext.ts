import { createContext, useContext } from "react";
import { CCItem } from "../../Types/CCItem";

interface CCContextType {
  cartItems: CCItem[];
  totalAmount: number;
  addItemToCart: (
    productId: string,
    quantity: string,
    city: string,
    cinema: string,
    date: string,
    showTime: string,
    seatNo: string
  ) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemInCart: (productId: string) => void;
  clearCart: () => void;
}

export const CCContext = createContext<CCContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CCContext);
