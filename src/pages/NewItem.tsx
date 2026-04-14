import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import type { Product } from "../model/Product";
import { useProducts } from "../store/ProductsContext";

export default function NewItem() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const handleSubmit = (product: Product) => {
    addProduct(product);
    navigate("/fridge");
  };

  const handleCancel = () => {
    navigate("/fridge");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Box>
  );
}
