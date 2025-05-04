import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Card, CardBody, CardTitle } from "reactstrap";

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  return (
    <Container className="mt-4">
      <Card>
        <CardBody>
          <CardTitle tag="h3">User Profile</CardTitle>
          <p>Email: {email}</p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Profile;