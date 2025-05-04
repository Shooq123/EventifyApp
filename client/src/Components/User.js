import user from "../Images/user.png";
import { useSelector } from "react-redux";

const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  return (
    <div className="user-container">
      <h1>User Profile</h1>
      <img src={user} alt="User" className="userImage" />
      <p>
        <strong>Name:</strong> {name}
        <br />
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
};

export default User;