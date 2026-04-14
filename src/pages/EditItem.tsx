import { Box, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import type { Product } from "../model/Product";
import { useProducts } from "../store/ProductsContext";

export default function EditItem() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, updateProduct } = useProducts();

  const productId = searchParams.get("id");
  const product = products.find((p) => p.id === productId);

  if (!productId || !product) {
    return (
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
        <Typography color="error">Nie znaleziono produktu</Typography>
      </Box>
    );
  }

  const handleSubmit = (updatedProduct: Product) => {
    updateProduct(productId, updatedProduct);
    navigate("/fridge");
  };

  const handleCancel = () => {
    navigate("/fridge");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />
    </Box>
  );
}
