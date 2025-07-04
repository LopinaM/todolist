import { SxProps } from "@mui/material";

export const getListItemSx = (isDone: boolean): SxProps => ({
  justifyContent: "space-between",
  opacity: isDone ? 0.5 : 1,
  padding: "4px 8px",
});
