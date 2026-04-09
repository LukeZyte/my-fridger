import { Card, CardContent, Typography, Box } from "@mui/material";
import type { Product } from "../model/Product";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">{product.name}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Data ważności: {product.expirationDate.toLocaleDateString()}
          </Typography>
          <Typography color="primary">{`Ilość: ${product.amount}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
