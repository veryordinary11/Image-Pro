import { useContext } from "react";
import { AuthContext } from "../context/auth";

// Custom hook to get the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
