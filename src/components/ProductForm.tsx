import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import type { Product } from "../model/Product";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Product) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function ProductForm({
  initialProduct,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    amount: initialProduct?.amount || 1,
    expirationDate: initialProduct
      ? initialProduct.expirationDate.toISOString().split("T")[0]
      : "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nazwa produktu jest wymagana";
    }

    if (formData.amount < 1) {
      newErrors.amount = "Ilość musi być większa niż 0";
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = "Data ważności jest wymagana";
    } else {
      const selectedDate = new Date(formData.expirationDate);
      if (selectedDate < new Date()) {
        newErrors.expirationDate = "Data ważności musi być w przyszłości";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newProduct: Product = {
      id: initialProduct?.id || Date.now().toString(),
      name: formData.name,
      amount: formData.amount,
      expirationDate: new Date(formData.expirationDate),
    };

    onSubmit(newProduct);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {isEditing ? "Edytuj produkt" : "Dodaj nowy produkt"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nazwa produktu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Ilość"
            type="number"
            value={formData.amount}
            onChange={(e) => {
              const amount = Number.parseInt(e.target.value, 10);
              setFormData({
                ...formData,
                amount: Number.isNaN(amount) ? 0 : amount,
              });
            }}
            error={!!errors.amount}
            helperText={errors.amount}
            margin="normal"
            variant="outlined"
            slotProps={{ htmlInput: { min: 1 } }}
          />

          <TextField
            fullWidth
            label="Data ważności"
            type="date"
            value={formData.expirationDate}
            onChange={(e) =>
              setFormData({ ...formData, expirationDate: e.target.value })
            }
            error={!!errors.expirationDate}
            helperText={errors.expirationDate}
            margin="normal"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ flex: 1 }}
            >
              {isEditing ? "Zaktualizuj" : "Dodaj produkt"}
            </Button>
            {onCancel && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={onCancel}
                sx={{ flex: 1 }}
              >
                Anuluj
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
