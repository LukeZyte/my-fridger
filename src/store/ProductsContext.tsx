import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../model/Product";

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Product) => void;
  setProductAmount: (id: string, amount: number) => void;
  incrementProductAmount: (id: string) => void;
  decrementProductAmount: (id: string) => void;
  removeAllUsedProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "fridge_products";

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Mleko",
    amount: 1,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Chleb",
    amount: 2,
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Jajka",
    amount: 12,
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
];

const loadProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return sampleProducts;
  }

  try {
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      return sampleProducts;
    }

    return parsed.map((p: Product) => ({
      ...p,
      expirationDate: p.expirationDate ? new Date(p.expirationDate) : null,
    }));
  } catch {
    return sampleProducts;
  }
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
  };

  const setProductAmount = (id: string, amount: number) => {
    const nextAmount = Math.max(0, amount);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, amount: nextAmount } : p)),
    );
  };

  const incrementProductAmount = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, amount: p.amount + 1 } : p)),
    );
  };

  const decrementProductAmount = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, amount: Math.max(0, p.amount - 1) } : p,
      ),
    );
  };

  const removeAllUsedProducts = () => {
    setProducts((prev) => prev.filter((p) => p.amount > 0));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProduct,
        setProductAmount,
        incrementProductAmount,
        decrementProductAmount,
        removeAllUsedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};
