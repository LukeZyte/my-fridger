import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../model/Product";
import { useProducts } from "../store/ProductsContext";

interface Props {
  product: Product;
  listType: "available" | "needed" | "expired";
}

export default function ProductItem({ product, listType }: Props) {
  const navigate = useNavigate();
  const {
    removeProduct,
    setProductAmount,
    incrementProductAmount,
    decrementProductAmount,
  } = useProducts();

  const handleEdit = () => {
    navigate(`/edititem?id=${product.id}`);
  };

  const handleDelete = () => {
    if (confirm(`Czy na pewno chcesz usunąć "${product.name}"?`)) {
      removeProduct(product.id);
    }
  };

  const handleMarkAsMissing = () => {
    setProductAmount(product.id, 0);
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Data ważności:{" "}
                {product.expirationDate
                  ? product.expirationDate.toLocaleDateString()
                  : "nie dotyczy"}
              </Typography>
              <Typography color="primary">{`Ilość: ${product.amount}`}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              ml: 2,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => decrementProductAmount(product.id)}
              disabled={product.amount === 0}
              aria-label={`Zmniejsz ilość produktu ${product.name}`}
            >
              -
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => incrementProductAmount(product.id)}
              aria-label={`Zwiększ ilość produktu ${product.name}`}
            >
              +
            </Button>
            {listType === "needed" ? (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={handleDelete}
                aria-label={`Usuń produkt ${product.name}`}
              >
                Usuń
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={handleMarkAsMissing}
                disabled={product.amount === 0}
                aria-label={`Ustaw brak produktu ${product.name}`}
              >
                Brak
              </Button>
            )}
            <Button
              size="small"
              variant="text"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              aria-label={`Edytuj produkt ${product.name}`}
            >
              Edytuj
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
