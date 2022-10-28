import { useContext } from "react";
import { UserContext } from "../components/CurrentUserProvider";
const useCurrentUser = () => {
  return useContext(UserContext);
};

export default useCurrentUser;
