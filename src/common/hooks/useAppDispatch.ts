import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
// import type { AppDispatch } from "@/app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
