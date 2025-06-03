import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom";

//import {Logout, MessageSquare, Settings, User} from "lucide-react"; 
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return <div>Navbar</div>;
};
export default Navbar;