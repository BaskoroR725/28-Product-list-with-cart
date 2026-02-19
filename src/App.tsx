import "./App.css";

import data from "../data.json";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "./store/useCartStore";

import ProductCard from "./components/ProductCard";
import OrderModal from "./components/OrderModal";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

function App() {
  const { items, removeItem, resetCart } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    resetCart();
    setIsModalOpen(false);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-rose-50 p-4 py-8 md:p-10 lg:p-20 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          {/* main content */}
          <main className="lg:col-span-2">
            <h1 className="mb-8 text-left text-4xl font-bold text-rose-900">
              Desserts
            </h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </motion.div>
          </main>

          {/* aside section */}
          <aside className="self-start">
            <div className="rounded-xl bg-white p-6">
              <h2 className="mb-4 text-left text-2xl font-bold text-red">
                Your Cart ({totalItems})
              </h2>

              {items.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <img
                    src="./assets/images/illustration-empty-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm font-semibold text-rose-500">
                    Your added items will appear here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Cart Items List */}
                  <div className="flex flex-col">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between border-b border-rose-100 py-4 last:border-0"
                      >
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-bold text-rose-900">
                            {item.name}
                          </h3>
                          <div className="flex gap-2 text-sm">
                            <span className="font-bold text-red">
                              {item.quantity}x
                            </span>
                            <span className="text-rose-500">
                              @ ${item.price.toFixed(2)}
                            </span>
                            <span className="font-semibold text-rose-500">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="group flex h-5 w-5 items-center justify-center rounded-full border border-rose-400 transition-colors hover:border-rose-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="none"
                            viewBox="0 0 10 10"
                            className="fill-rose-400 group-hover:fill-rose-900"
                          >
                            <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-rose-900">Order Total</span>
                    <span className="text-2xl font-bold text-rose-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Carbon Neutral Note */}
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-rose-50 py-4">
                    <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
                    <p className="text-sm text-rose-900">
                      This is a{" "}
                      <span className="font-semibold">carbon-neutral</span>{" "}
                      delivery
                    </p>
                  </div>

                  {/* Confirm Order Button */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full rounded-full bg-red py-4 font-semibold text-white transition-colors hover:bg-rose-900"
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>

        <AnimatePresence>
          {isModalOpen && <OrderModal items={items} onReset={handleReset} />}
        </AnimatePresence>

        {/* Footer / Attribution */}
        <footer className="mt-20 text-center text-xs">
          <div className="attribution">
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              className="font-bold text-rose-500 hover:text-red transition-colors"
            >
              Frontend Mentor
            </a>
            . Coded by{" "}
            <a
              href="https://github.com/BaskoroR725"
              className="font-bold text-rose-500 hover:text-red transition-colors"
            >
              Baskoro Ramadhan
            </a>
            .
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
