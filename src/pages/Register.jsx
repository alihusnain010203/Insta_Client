import React, { useState, useEffect } from "react";
import Img from "../assets/screenshot2.png";
import Login_Register_Footer from "../components/Login_Register_Footer";

import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useRef } from "react";
import { UserAtom } from "../store/atoms/atoms";
import useGoogle from "../hooks/useGoogle";
import zod from "zod";
import useAuth from "../hooks/useAuth";
import { useUpload } from "../hooks/useUpload";

const Register = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const fileRef = useRef(null);
  const { uploadFile, url, progress, error: errorUpload } = useUpload();
  const setUser = useSetRecoilState(UserAtom);
  const { register, loading, error } = useAuth();
  const Google = useGoogle();
  const schema = zod.object({
    email: zod.string().email().min(5).max(255),
    name: zod.string(),
    password: zod.string().min(5),
    username: zod.string(),
    DPurl: zod.string(),
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    DPurl: url||"https://via.placeholder.com/150",
  });

  console.log(url);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { data, error } = schema.safeParse(formData);
    if (error) {
      alert("Please enter valid email and password (min 5 characters)");
      return;
    }
    setFormData(data);
    const __user = register(data);
    localStorage.setItem("user", JSON.stringify(__user));
    setUser(__user);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="sm:flex overflow-x-hidden min-h-[100vh] w-[100vw]  justify-center items-center gap-[200px] flex-col md:flex-row">
        <div className="hidden  img h-[80%] w-1/2 md:flex justify-end items-center">
          <img src={Img} className="h-full" alt="" />
        </div>
        <div className="w-full  flex sm:justify-start justify-center items-center sm:w-1/2 p-6">
          <div className="w-[90%] flex flex-col gap-5 md:w-[80%]">
            <div className="border justify-center items-center border-gray-400 mt-3 p-4 flex flex-col">
              <h1 className="text-2xl text-center font-extrabold">
                <i>Register</i>
              </h1>
              <p className="text-gray-600 font-semibold text-center">
                Sign up to see photos and videos <br /> from your friends.
              </p>

              <button
                onClick={() => {
                  Google();
                }}
                className="bg-blue-500 rounded-lg pt-1 pb-2 pl-4 pr-4 text-white font-bold"
              >
                <GoogleIcon className="mr-2" />
                Login with Google
              </button>

              {/* OR with line */}
              <div className="flex w-full justify-center items-center mt-4">
                <span className="h-[1px] flex-[2] bg-gray-500 "></span>
                <p className="text-gray-400 flex-1 font-semibold text-center">
                  OR
                </p>
                <span className="h-[1px] flex-[2] bg-gray-500 "></span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mt-4 w-full justify-center items-center">
                  <input
                    type="file"
                    // only accept image files
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFile(file);
                        setImgUrl(URL.createObjectURL(file));
                        uploadFile(file);
                      setFormData((prevData) => ({
                        ...prevData,
                        DPurl: url||"https://via.placeholder.com/150",
                      }));
                      }
                    }}
                    hidden
                    ref={fileRef}
                  />
                  <img
                    src={imgUrl ? imgUrl : "https://via.placeholder.com/150"}
                    alt="preview"
                    className={`h-[100px] w-[100px] object-cover rounded-md`} 
                  />
                  <button
                    gradientDuoTone="purpleToPink"
                    outline
                    onClick={(e) => {
                      e.preventDefault();
                      fileRef.current.click();
                    }}
                  >
                    Choose Profile Picture
                  </button>
                  {
                    errorUpload && <p className="text-red-500 text-center">{errorUpload}</p>

                  }
                  
                  {
                    progress ? <p className="text-green-500 text-center border border-1 border-green-700 p-2">{progress}%</p> : null
                  }
                  
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="p-2 bg-gray-100  w-[90%] outline-none border border-gray-200"
                  />
                </div>

                <p className="text-center pt-2 text-gray-500 text-sm">
                  People who use our service may have uploaded your contact
                  information to Instagram.
                  <span className="text-blue-300">Learn More</span>
                </p>
                <p className="text-center pt-2 text-gray-500 text-[12px]">
                  By signing up, you agree to our{" "}
                  <span className="text-blue-300">
                    Terms , Privacy Policy and Cookies Policy
                  </span>
                </p>
                <button
                  type="submit"
                  className="bg-blue-500 rounded-lg pt-1 mt-3 w-[90%] pb-2 pl-4 pr-4 text-white font-bold"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            </div>

            <div className="border justify-center items-center border-gray-400 p-4 flex flex-col">
              <p className="text-gray-600 font-semibold text-center">
                Have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
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

export default Register;
