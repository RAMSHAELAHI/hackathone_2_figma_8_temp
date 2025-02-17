"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar"; // Import the NavBar component

interface CartItem {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  quantity: number;
  size: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Peacoke Velvet Sofa set",
      imgUrl: "/images/peacoke sofa.jpg",
      price: 15,
      quantity: 1,
      size: "L",
    },
    {
      id: 2,
      title: "Office Dinette Chair",
      imgUrl: "/images/office dinette chair.jpg",
      price: 9,
      quantity: 1,
      size: "L",
    },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Add NavBar here */}
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Comforty</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <h2 className="text-xl font-semibold">Your cart is empty.</h2>
            <p className="mt-2">Add some items to your cart to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section - Cart Items */}
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-4"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="font-bold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                    <p className="text-gray-800 font-semibold">MRP: ${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      aria-label="Decrease Quantity"
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      aria-label="Increase Quantity"
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    aria-label="Remove Item"
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Right Section - Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-semibold">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Estimated Delivery & Handling</span>
                <span className="text-gray-800 font-semibold">Free</span>
              </div>
              <div className="flex justify-between mt-4 border-t pt-4">
                <span className="text-gray-800 font-bold">Total</span>
                <span className="text-gray-800 font-bold">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Member Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
