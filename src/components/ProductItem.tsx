import { Card, CardContent, Typography, Box } from "@mui/material";
import type { Product } from "../model/Product";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2">x{product.amount}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Exp: {product.expirationDate.toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
