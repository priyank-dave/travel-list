import { useState, useContext } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { addItem as apiAddItem } from "../data/api";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const newItem = { description, quantity, packed: false };
      const response = await apiAddItem(token, newItem);

      // Add the item with the ID from the response
      onAddItem(response.data);

      // Reset form
      setDescription("");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        p: 3,
        backgroundColor: "white",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" textAlign="center">
        What do you need for your trip?
      </Typography>
      <TextField
        select
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
        disabled={isSubmitting}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add"}
      </Button>
    </Box>
  );
}
