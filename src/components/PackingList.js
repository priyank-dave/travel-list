// PackingList.js
import { useState, useContext } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import Item from "./Item";
import { deleteItem, toggleItem } from "../data/api";
import { AuthContext } from "../context/AuthContext";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onRefreshList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const { token } = useContext(AuthContext);

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(token, id);
      onDeleteItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
      // If API call fails, refresh the whole list to ensure consistency
      onRefreshList();
    }
  };

  const handleToggleItem = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item) {
        // Optimistically update UI
        onUpdateItem(id, { packed: !item.packed });
        // Update backend
        await toggleItem(token, id, !item.packed);
      }
    } catch (error) {
      console.error("Error toggling item:", error);
      // If API call fails, refresh the whole list to ensure consistency
      onRefreshList();
    }
  };

  let sortedItems = [...items];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Packing List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
        >
          <MenuItem value="input">Sort by input order</MenuItem>
          <MenuItem value="description">Sort by description</MenuItem>
          <MenuItem value="packed">Sort by packed status</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </Box>
    </Box>
  );
}
