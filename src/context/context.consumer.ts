import { useContext } from "react";
import { ContextCreator } from "./Context";

export const useContextStore = () => {
  return useContext(ContextCreator);
};
