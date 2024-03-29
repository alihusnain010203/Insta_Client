import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Profile } from "./export";
import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wait from "./pages/Wait";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "./store/atoms/atoms";
import FindAccount from "./pages/FindAccount";

function App() {
  // Implement logic if user not found in local storage then redirect to login page
 const userSet=useSetRecoilState(UserAtom);
   const user=localStorage.getItem('user');
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     navigate("/login");
  //   }

  // }, []);

  useEffect(()=>{
    if(user){
      userSet(JSON.parse(user));
    }
  },[])


  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wait" element={<Wait />} />
      <Route path="/find" element={<FindAccount/>}/>
    </Routes>
  );
}

export default App;
