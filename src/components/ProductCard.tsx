function ProductCard() {
  return (
    <article className="flex flex-col gap-4">
      {/* image */}
      <div className="relative">
        <picture>
          <img
            src=""
            alt=""
            className="rounded-xl border-2 border-transparent transition-colors"
          />
        </picture>
        <button className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-rose-400 bg-white px-7 py-3 font-semibold transition-colors hover:border-red hover:text-red">
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt=""
            aria-hidden="true"
          />
          Add to Cart
        </button>
      </div>

      {/* Details Products */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-sm text-rose-500">Category Placeholder</span>
        <h2 className="text-lg font-bold text-rose-900">
          Product Name Placeholder
        </h2>
        <p className="font-bold text-red">$0.00</p>
      </div>
    </article>
  );
}

export default ProductCard;
