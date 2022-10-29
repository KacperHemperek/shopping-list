import { useContext } from "react";
import { UserContext } from "../components/CurrentUserProvider";
const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
