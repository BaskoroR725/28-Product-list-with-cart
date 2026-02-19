import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./useCartStore";

const mockProduct = {
  name: "Waffle with Strawberries",
  category: "waffle",
  price: 6.5,
  image: {
    thumbnail: "",
    mobile: "",
    tablet: "",
    desktop: "",
  },
};

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.getState().resetCart();
  });

  it("harus mulai dengan keranjang kosong", () => {
    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });

  it("harus bisa menambah item ke keranjang", () => {
    const { addItem } = useCartStore.getState();

    addItem(mockProduct);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe(mockProduct.name);
    expect(state.items[0].quantity).toBe(1);
  });

  it("harus bisa update kuantitas item", () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    addItem(mockProduct);
    updateQuantity(mockProduct.name, 1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("harus bisa menghapus item dari keranjang", () => {
    const { addItem, removeItem } = useCartStore.getState();

    addItem(mockProduct);
    removeItem(mockProduct.name);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });

  it("harus menghapus item jika kuantitas dikurangi sampai 0", () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    addItem(mockProduct);
    updateQuantity(mockProduct.name, -1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });

  it("harus bisa mengosongkan seluruh keranjang (resetCart)", () => {
    const { addItem, resetCart } = useCartStore.getState();

    addItem(mockProduct);
    resetCart();

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });

  it("harus menghitung total harga dengan benar", () => {
    const { addItem, updateQuantity } = useCartStore.getState();

    
    addItem(mockProduct);

    addItem({ ...mockProduct, name: "Vanilla Bean Crème Brûlée", price: 7.0 });

    updateQuantity(mockProduct.name, 1);

    const state = useCartStore.getState();

    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    expect(totalPrice).toBe(20.0);
  });
});
