import React from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/atoms";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import PostBlock from "../components/PostBlock";
const Profile = () => {
  const location = useLocation();
  console.log(location.state);
  const user = useRecoilValue(UserAtom);
  console.log(user);

  return (
    <>
      <div>
        <div className="upper p-3 flex w-full  justify-between gap-2 sm:gap-7">
          <div className="profile-image flex-2 flex justify-center items-center flex-col">
            <img
              src={user?.DPurl}
              className="h-[75px] sm:h-[150px] md:[250px] w-[75px] sm:w-[150px] md:w-[250px] rounded-full"
              alt="Profile"
            />
            <h1 className=" sm:font-bold">{user?.name}</h1>
            <p className="text-gray-400 text-[10px]">{user?.email}</p>
            {/* bio */}
            <p className="text-gray-400">{user?.bio}</p>
          </div>
          <div className="profile-info w-full border border-gray-400 flex flex-col justify-center items-center">
            <div className="upper flex justify-around pt-2 w-full">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px] xs:text-[14px]">Posts</h1>
                <p>{user?.posts?.length}</p>
              </div>
              {/* Followers */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px] xs:text-[14px]">Followers</h1>
                <p>{user?.followers?.length}</p>
              </div>
              {/* Following */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px] xs:text-[14px]">Following</h1>
                <p>{user?.following?.length}</p>
              </div>
            </div>
            <div className="w-[95%] flex justify-center items-center mt-2 h-[1px] bg-gray-700"></div>
            <div className="bottom flex justify-center items-center">
              {/* Edit Profile */}
              <button className="p-[3px] text-[10px] xs:text-[14px] xs:p-[10px] text-center py-1 rounded-lg bg-gray-800 text-white mt-2">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* Line */}
        <div className="w-full h-[1px] bg-gray-700"></div>
        {/* Posts */}
        <PostBlock id={user?._id}/>
        {/* <div className="posts">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-gray-400 text-[10px] xs:text-[14px] mt-2">
              Posts
            </h1>
            <div className="w-[95%] h-[1px] bg-gray-700"></div>
          </div>
          <PostCard/>
          <div className="posts-container">
            {user?.posts?.map((post) => (
              <PostCard />
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Profile;
