// Item.js
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { X } from "lucide-react";

export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Checkbox
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
        color="primary"
      />
      <Typography
        sx={{
          flexGrow: 1,
          textDecoration: item.packed ? "line-through" : "none",
        }}
      >
        {item.quantity} {item.description}
      </Typography>
      <IconButton
        onClick={() => onDeleteItem(item.id)}
        size="small"
        color="error"
      >
        <X size={16} />
      </IconButton>
    </Box>
  );
}
