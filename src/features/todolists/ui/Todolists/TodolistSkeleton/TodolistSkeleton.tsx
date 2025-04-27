import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import styles from "./TodolistSkeleton.module.css";
import { filterButtonsContainerSx } from "../TodolistItem/FilterButtons/FilterButtons.styles";

export const TodolistSkeleton = () => (
  <Paper elevation={3} className={styles.container}>
    <div className={styles.title}>
      <Skeleton width={150} height={50} />
      <Skeleton width={20} height={40} />
    </div>
    <div className={styles.createItemForm}>
      <Skeleton width={230} height={60} />
      <Skeleton width={20} height={40} />
    </div>
    {Array(4)
      .fill(null)
      .map((_, id) => (
        <Box key={id} sx={filterButtonsContainerSx}>
          <div className={styles.tasks}>
            <Skeleton width={20} height={40} />
            <Skeleton width={150} height={40} />
          </div>
          <Skeleton width={20} height={40} />
        </Box>
      ))}
    <Box sx={filterButtonsContainerSx}>
      {Array(3)
        .fill(null)
        .map((_, id) => (
          <Skeleton key={id} width={80} height={60} />
        ))}
    </Box>
  </Paper>
);
