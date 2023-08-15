import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";

export const useAppSelector = useSelector<RootState>
export const useAppDispatch = ()=>useDispatch<AppDispatch>()