// import { useState } from "react";

import { useState } from "react";

const useGoogle = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendRequest = async () => {
    window.open("http://localhost:4000/auth/apiv1/google", "_self");
  };

  return sendRequest;
};

export default useGoogle;
