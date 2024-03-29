import React from "react";
import Img from "../assets/screenshot4.png";
import Login_Register_Footer from "../components/Login_Register_Footer";
import { UserAtom } from "../store/atoms/atoms";
import zod from "zod";

import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import useGoogle from "../hooks/useGoogle";
import useAuth from "../hooks/useAuth";
import { useSetRecoilState, useRecoilValue } from "recoil";

const Login = () => {
  const { login } = useAuth();

  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
  });

  const Google = useGoogle();

  const setgetUser = useSetRecoilState(UserAtom);
  const Getuser = useRecoilValue(UserAtom);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { data, error } = schema.safeParse(user);
    if (error) {
      alert("Please enter valid email and password (min 5 characters) ");
      return;
    }
    setUser(data);

    const __user = login(data);

    localStorage.setItem("user", JSON.stringify(__user));

    setgetUser(localStorage.getItem("user"));
  };

  return (
    <div className="overflow-x-hidden">
      <div className=" sm:flex overflow-x-hidden min-h-[100vh] w-[100vw]  justify-center items-center gap-[200px] flex-col md:flex-row">
        <div className="hidden  img h-[80%] w-1/2 md:flex justify-end items-center">
          <img src={Img} className="h-full" alt="" />
        </div>
        <div className="w-full  flex sm:justify-start justify-center items-center sm:w-1/2 p-6">
          <div className="w-[90%] flex flex-col gap-5 md:w-[80%]">
            <div className="border justify-center items-center border-gray-400 mt-3 p-4 flex flex-col">
              <h1 className="text-2xl text-center font-extrabold">
                <i>Log In</i>
              </h1>
              <div className="flex flex-col gap-2 mt-4 w-full justify-center items-center">
                <input
                  type="email"
                  name="email"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Email"
                  className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                />
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                />
              </div>
              <button
                className="bg-blue-500 rounded-lg pt-1 mt-3 w-[90%] pb-2 pl-4 pr-4 text-white font-bold"
                onClick={handleSubmit}
              >
                Login
              </button>
              <div className="flex w-full justify-center items-center mt-4">
                <span className="h-[1px] flex-[2] bg-gray-500 "></span>
                <p className="text-gray-400 flex-1 font-semibold text-center">
                  OR
                </p>
                <span className="h-[1px] flex-[2] bg-gray-500 "></span>
              </div>

              <button
                onClick={() => {
                  Google();
                }}
                className="bg-blue-500 rounded-lg pt-1 pb-2 pl-4 pr-4 text-white font-bold"
              >
                <GoogleIcon className="mr-2" />
                Login with Google
              </button>

              {/* Forgot Password */}
              <Link to="/find" className="text-blue-500 text-[12px] mt-4">Forgot Password?</Link>
            </div>
            <div className="border justify-center items-center border-gray-400 p-4 flex flex-col">
              <p className="text-gray-600 font-semibold text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Login_Register_Footer />
    </div>
  );
};

export default Login;
