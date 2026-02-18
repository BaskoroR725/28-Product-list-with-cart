import { motion, type Variants } from "framer-motion";
import { useCartStore } from "../store/useCartStore";

export interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((item) => item.name === product.name);
  const isInCart = !!cartItem;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      {/* image */}
      <div className="relative">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className={`rounded-xl border-2 transition-colors ${
              isInCart ? "border-red" : "border-transparent"
            }`}
          />
        </picture>
        {isInCart ? (
          <div className="absolute -bottom-5 left-1/2 flex w-[160px] -translate-x-1/2 items-center justify-between rounded-full bg-red px-3 py-3 font-semibold text-white">
            <button
              onClick={() => updateQuantity(product.name, -1)}
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-white transition-colors hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
                className="fill-white group-hover:fill-red"
              >
                <path d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span className="text-sm">{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(product.name, 1)}
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-white transition-colors hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
                className="fill-white group-hover:fill-red"
              >
                <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="absolute -bottom-5 left-1/2 flex w-[160px] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-rose-400 bg-white py-3 font-semibold transition-all duration-300 hover:border-red hover:text-red"
          >
            <img
              src="./assets/images/icon-add-to-cart.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-5"
            />
            <span className="text-sm">Add to Cart</span>
          </button>
        )}
      </div>

      {/* Details Products */}
      <div className="mt-4 flex flex-col items-start gap-1">
        <span className="text-sm text-rose-500">{product.category}</span>
        <h2 className="line-clamp-2 min-h-12 text-lg font-bold text-rose-900">
          {product.name}
        </h2>
        <p className="font-bold text-red">${product.price.toFixed(2)}</p>
      </div>
    </motion.article>
  );
}

export default ProductCard;
