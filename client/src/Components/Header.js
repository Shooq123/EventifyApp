import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo1.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };

  return (
    
    <Navbar className="header" light expand="md">
   
    <Nav className="ml-auto navbar-items" navbar>
      <NavItem>
        <img src={logo} alt="Eventify Logo" className="logo" />
      </NavItem>
      <h1>Make Every Moment Special with Eventify</h1>  
      <NavItem>
        <NavLink tag={Link} to="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/profile">Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
  );
};

export default Header;