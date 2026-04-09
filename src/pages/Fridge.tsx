import { Typography, Box } from "@mui/material";
import { useProducts } from "../store/ProductsContext";
import ProductItem from "../components/ProductItem";
export default function Fridge() {
  const { products } = useProducts();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Lista produktów w lodówce
      </Typography>

      {products.length === 0 ? (
        <Typography color="text.secondary">
          Lista produktów jest pusta
        </Typography>
      ) : (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}
    </Box>
  );
}
