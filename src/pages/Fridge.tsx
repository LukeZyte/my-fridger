import { Typography, Box } from "@mui/material";
import { useProducts } from "../store/ProductsContext";
import ProductItem from "../components/ProductItem";
export default function Fridge() {
  const { products } = useProducts();
  const availableProducts = products.filter((product) => product.amount > 0);
  const neededProducts = products.filter((product) => product.amount === 0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Lista produktów w lodówce
      </Typography>

      {availableProducts.length === 0 ? (
        <Typography color="text.secondary">
          Lista produktów jest pusta
        </Typography>
      ) : (
        availableProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}

      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Do kupienia ponownie
      </Typography>

      {neededProducts.length === 0 ? (
        <Typography color="text.secondary">
          Brak produktów do ponownego zakupu
        </Typography>
      ) : (
        neededProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}
    </Box>
  );
}
