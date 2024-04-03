import { useState } from "react";
import axios from "axios";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const getPost = async (id, userId) => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:4000/post/apiv1/getallPost";

    if (id) {
      url += `?id=${id}`;
    } else if (userId) {
      url += `?userId=${userId}`;
    }

    try {
      const res = await axios.post(url);
      console.log(res.data);
      setPosts(res.data.data);
      setLoading(false);
      return posts;
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : "An error occurred");
      return null;
    }
  };

  return { getPost, loading, error, posts };
};

export default usePost;

