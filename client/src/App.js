import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap"; // استيراد مكونات Reactstrap
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Events from "./Components/Events";
import UpdateUser from "./Components/UpdateUser";
import { useSelector } from "react-redux";

const App = () => {
  const email = useSelector((state) => state.users.user.email); // الحصول على البريد الإلكتروني من الحالة

  return (
    <Container fluid>
      <Router>
        <Row>
          {email && <Header />} {/* عرض الشريط العلوي إذا كان المستخدم مسجلاً الدخول */}
        </Row>

        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/update/:email" element={<UpdateUser />} />
          </Routes>
        </Row>

        <Row>
          {email && <Footer />} {/* عرض الشريط السفلي إذا كان المستخدم مسجلاً الدخول */}
        </Row>
      </Router>
    </Container>
  );
};

export default App;