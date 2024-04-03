import React from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AccountCircleOutlined,
  SearchOutlined,
} from "@mui/icons-material";
const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center">
      {/* Home Icon */}

    <div className="w-[90%] border-t-2 border-gray-500 flex justify-around shadow-md shadow-gray-500 rounded-lg mb-1">
    <Link to="/">
        <HomeOutlined className="text-gray-400" />
        <p>Home</p>
      </Link>

      {/* Search Icon */}
      <Link to="/search">
        <SearchOutlined className="text-gray-400" />
        <p>Search</p>
      </Link>

      {/* Profile Icon */}
      <Link to="/profile">
        <AccountCircleOutlined className="text-gray-400" />
        <p>Profile</p>
      </Link>
    </div>
    </div>
  );
};

export default Footer;
