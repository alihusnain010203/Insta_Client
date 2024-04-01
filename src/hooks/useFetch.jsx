//hook to fetch user
import { useState, useEffect } from "react";
import axios from "axios"; // Add the import statement for 'axios' package
import { useSetRecoilState, useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/atoms";

const useFetchUser = (id) => {
  const [user, setUser] = useState(null);
  const setRecoilUser = useSetRecoilState(UserAtom);
  const userValue = useRecoilValue(UserAtom);

  const [loading, setLoading] = useState(true);

  const fetchUser = async (id) => {
    try {
      const res = await axios.post("http://localhost:4000/auth/apiv1/getUser", {
        id,
      });
      console.log("res:", res.data);
      setUser(res.data.data);

      localStorage.setItem("user", JSON.stringify(res.data));
      setRecoilUser(res.data.data);
      console.log("user:", userValue);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return { user, loading };
};

export default useFetchUser;
