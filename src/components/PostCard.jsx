import React from "react";
import { ThumbUpAltOutlined,MessageOutlined } from "@mui/icons-material";
const PostCard = ({img,title,caption}) => {
  return (
    <div className="flex flex-col rounded-md shadow-md  shadow-gray-500 h-[70vh] xs:h-fit w-[250px] xs:w-[300px] p-2 justify-center items-center">
      <img
        src={img}
        alt=""
      />

      <div className=" self-start">
       <h1 className=" font-semibold">{title}</h1>
       <p className=" text-gray-500 text-sm">{caption}</p>
      </div>

      <div className="flex justify-between p-1 w-full">
        <div className="flex items-center">
          <ThumbUpAltOutlined />
          <p>Like</p>
        </div>
       
        <div className="flex items-center">
            <MessageOutlined />
            <p>Comment</p>
            </div>
      </div>
    </div>
  );
};

export default PostCard;
