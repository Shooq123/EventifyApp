import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
  Form,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addUser, deleteUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const emailFromStore = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!emailFromStore) {
      navigate("/login");
    }
  }, [emailFromStore, navigate]);

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    dispatch(addUser(userData));
    alert("User updated.");
    navigate("/"); // Redirect after updating
  };

  const handleDelete = () => {
    dispatch(deleteUser(email));
    alert("User deleted.");
  };

  return (
    <Container>
      <h1>Update User</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <label>Name</label>
            <Input
              type="text"
              {...register("name", { onChange: (e) => setName(e.target.value) })}
            />
            <p className="error">{errors.name?.message}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>Email</label>
            <Input
              type="email"
              {...register("email", { onChange: (e) => setEmail(e.target.value) })}
            />
            <p className="error">{errors.email?.message}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>Password</label>
            <Input
              type="password"
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
            />
            <p className="error">{errors.password?.message}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>Confirm Password</label>
            <Input
              type="password"
              {...register("confirmPassword", { onChange: (e) => setConfirmPassword(e.target.value) })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button type="submit">Update User</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUser;