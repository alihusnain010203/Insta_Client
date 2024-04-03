import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Profile } from "./export";
import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wait from "./pages/Wait";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "./store/atoms/atoms";
import FindAccount from "./pages/FindAccount";
import Footer from "./components/Footer";

function App() {
  const userSet = useSetRecoilState(UserAtom);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      userSet(user?.data);
    }
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wait" element={<Wait />} />
      <Route path="/find" element={<FindAccount />} />
    </Routes>
    {/* Add the Footer component if user available */}
    {user && <Footer />}</>
  );
}

export default App;
