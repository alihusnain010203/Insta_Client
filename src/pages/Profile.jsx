import React from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/atoms";
const Profile = () => {
  const user = useRecoilValue(UserAtom);
  console.log(user);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
