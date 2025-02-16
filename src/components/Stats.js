import { Box, Typography } from "@mui/material";

export default function Stats({ items }) {
  if (!items?.length) {
    return (
      <Box
        sx={{
          backgroundColor: "primary.main",
          p: 3,
          textAlign: "center",
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Typography variant="h6" color="white">
          Start adding some items to your packing list! 🚀
        </Typography>
      </Box>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Typography variant="h6" color="white">
        {numPacked === numItems ? (
          "Ready to go! ✈️"
        ) : (
          <>
            You have {numItems} {numItems === 1 ? "item" : "items"} on your
            list, and you already packed {numPacked} ({percentage}%)
          </>
        )}
      </Typography>
    </Box>
  );
}
