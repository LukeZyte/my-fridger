import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useProducts } from "../store/ProductsContext";
import ProductItem from "../components/ProductItem";
import { Button } from "@mui/material";

type FridgeView = "available" | "needed" | "expired";

export default function Fridge() {
  const { products, removeAllUsedProducts } = useProducts();
  const [currentView, setCurrentView] = useState<FridgeView>("available");

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const availableProducts = products.filter((product) => {
    if (product.amount === 0) {
      return false;
    }

    if (!product.expirationDate) {
      return true;
    }

    return product.expirationDate >= today;
  });

  const neededProducts = products.filter((product) => product.amount === 0);
  const expiredProducts = products.filter(
    (product) =>
      product.amount > 0 &&
      product.expirationDate !== null &&
      product.expirationDate < today,
  );

  const listConfig: Record<
    FridgeView,
    {
      title: string;
      emptyText: string;
      items: typeof products;
    }
  > = {
    available: {
      title: "Produkty w lodówce",
      emptyText: "Lista produktów w lodówce jest pusta",
      items: availableProducts,
    },
    needed: {
      title: "Do kupienia ponownie",
      emptyText: "Brak produktów do ponownego zakupu",
      items: neededProducts,
    },
    expired: {
      title: "Produkty przeterminowane",
      emptyText: "Brak przeterminowanych produktów",
      items: expiredProducts,
    },
  };

  const currentList = listConfig[currentView];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Moja lodówka
      </Typography>

      <Tabs
        value={currentView}
        onChange={(_, value: FridgeView) => setCurrentView(value)}
        sx={{ mb: 3 }}
      >
        <Tab
          value="available"
          label={`W lodówce (${availableProducts.length})`}
        />
        <Tab value="needed" label={`Brakuje (${neededProducts.length})`} />
        <Tab
          value="expired"
          label={`Przeterminowane (${expiredProducts.length})`}
        />
      </Tabs>

      <Typography variant="h5" sx={{ mb: 2 }}>
        {currentList.title}
      </Typography>

      {currentView === "needed" && neededProducts.length > 0 && (
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={removeAllUsedProducts}
        >
          Usuń wszystkie zużyte
        </Button>
      )}

      {currentList.items.length === 0 ? (
        <Typography color="text.secondary">{currentList.emptyText}</Typography>
      ) : (
        currentList.items.map((product) => (
          <ProductItem key={product.id} product={product} listType={currentView} />
        ))
      )}
    </Box>
  );
}
