import { useState, useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/atoms";
import { useNavigate } from "react-router-dom";
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUserAtom = useSetRecoilState(UserAtom);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/authSimple/apiv1/login",
        data
      );
      const __user = response.data;
      setUser(__user.data);
      setUserAtom(__user.data);
      localStorage.setItem("user", JSON.stringify(__user));

      navigate("/profile",{state:__user.data});

      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);

      setError(error.response.data.error);
      console.error("Error:", error);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/authSimple/apiv1/register",
        data
      );
      const __user = response.data;
      setUser(__user.data);
      setUserAtom(__user.data);
      localStorage.setItem("user", JSON.stringify(__user));
      setLoading(false);
      navigate("/profile",{state:__user.data});
      return user;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.error("Error:", error);
    }
  };

  const find=async(data)=>{
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/authSimple/apiv1/find",
        data
      );
      const __user = response.data;
      setUser(__user);
      
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.error("Error:", error);
    }
  }

  const getOtp=async(data)=>{
    try {
     (data,"OTP");
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/authSimple/apiv1/getotp",
        data
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.error("Error:", error);
    }
  }

  const setPassword=async(data)=>{
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/authSimple/apiv1/setpassword",
        data
      );
      setLoading(false);
      navigate("/login");
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.error("Error:", error);
    }
  }
  return { login, register,find,getOtp, user, loading, error,setPassword };
}
