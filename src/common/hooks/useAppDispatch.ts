import { useDispatch } from "react-redux";
import type { AppDispatch } from "src/app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
