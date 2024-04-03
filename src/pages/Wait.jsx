import React, { useEffect } from "react";
import CustomizedProgressBars from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetch";
const Wait = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.split("=")[1];

  const { user, loading } = useFetchUser(id);

  //   useEffect(() => {
  //     const user = localStorage.getItem("user");
  //     if (!user) {
  //       navigate("/login");
  //     }
  //   }, [user]);

  console.log(user);
  if (user) {
    navigate("/profile", { state: user });
  }

  if (loading) {
    return <CustomizedProgressBars />;
  }
};

export default Wait;
