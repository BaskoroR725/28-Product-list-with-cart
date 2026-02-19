import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";

interface OrderModalProps {
  onReset: () => void;
}

function OrderModal({ onReset }: OrderModalProps) {
  const { items } = useCartStore();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 md:max-w-[590px] md:rounded-2xl md:p-10"
      >
        <img
          src="./assets/images/icon-order-confirmed.svg"
          alt=""
          className="mb-6 h-12 w-12"
        />
        <h2 className="mb-2 text-left text-4xl font-bold leading-tight text-rose-900">
          Order Confirmed
        </h2>
        <p className="mb-8 text-left text-rose-500">
          We hope you enjoy your food!
        </p>

        <div className="mb-8 rounded-lg bg-rose-50 p-6">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border-b border-rose-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image.thumbnail}
                    alt=""
                    className="h-12 w-12 rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="line-clamp-1 text-sm font-bold text-rose-900">
                      {item.name}
                    </h3>
                    <div className="flex gap-2 text-sm">
                      <span className="font-bold text-red">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-rose-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-rose-100 pt-6">
            <span className="text-sm text-rose-900">Order Total</span>
            <span className="text-2xl font-bold text-rose-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="w-full rounded-full bg-red py-4 font-semibold text-white transition-colors hover:bg-rose-900"
        >
          Start New Order
        </button>
      </motion.div>
    </div>
  );
}

export default OrderModal;
