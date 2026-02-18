import { motion } from "framer-motion";
import "./App.css";
import data from "../data.json";
import ProductCard from "./components/ProductCard";

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
                Your Cart (0)
              </h2>
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
            </div>
          </aside>
        </div>

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
