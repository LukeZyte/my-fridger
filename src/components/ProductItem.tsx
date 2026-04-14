import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../model/Product";
import { useProducts } from "../store/ProductsContext";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const navigate = useNavigate();
  const { removeProduct } = useProducts();

  const handleEdit = () => {
    navigate(`/edititem?id=${product.id}`);
  };

  const handleDelete = () => {
    if (confirm(`Czy na pewno chcesz usunąć "${product.name}"?`)) {
      removeProduct(product.id);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Data ważności:{" "}
                {product.expirationDate
                  ? product.expirationDate.toLocaleDateString()
                  : "nie dotyczy"}
              </Typography>
              <Typography color="primary">{`Ilość: ${product.amount}`}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={handleEdit}
              aria-label={`Edytuj produkt ${product.name}`}
              title="Edytuj"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={handleDelete}
              aria-label={`Usuń produkt ${product.name}`}
              title="Usuń"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
