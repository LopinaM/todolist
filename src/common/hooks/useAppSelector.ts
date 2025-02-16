import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
// import type { RootState } from "@/app/store";

export const useAppSelector = useSelector.withTypes<RootState>();
