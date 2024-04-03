import React from "react";
import { LockOpenOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import zod, { set } from "zod";
const FindAccount = () => {
  const { find, loading, error, user, getOtp, setPassword } = useAuth();
  const [requestOtP, setRequestOtP] = React.useState(false);
  const [otpData, setOtpData] = React.useState({
    otp: "",
    password: "",
  });

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [email, setEmail] = React.useState("");
  const schema = zod.object({
    email: zod.string().email(),
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data, error } = schema.safeParse({ email });
    if (error) {
      alert("Please enter valid email");
      return;
    }
    setEmail(data.email);
    find(data);
  
  };


  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      {!user && (
        <div className="border justify-center w-[90%] md:w-[50%] gap-4 items-center border-gray-400 mt-3 p-4 flex flex-col">
          <form
            action=""
            className="flex justify-center md:w-full items-center flex-col gap-3"
          >
            <div className="border border-black rounded-full p-[20px]">
              <LockOpenOutlined className="text-[45px]" />
            </div>
            <h1 className="font-semibold">Trouble logging in ?</h1>
            <p className="text-gray-400 text-center">
              {" "}
              Enter your email we'll send you a link to get back into your
              account.
            </p>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="p-2 border border-gray-400 w-[90%] outline-none rounded"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Find Account"}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <div className="flex w-full justify-center items-center mt-4">
            <span className="h-[1px] flex-[2] bg-gray-500 "></span>
            <p className="text-gray-400 flex-1 font-semibold text-center">OR</p>
            <span className="h-[1px] flex-[2] bg-gray-500 "></span>
          </div>

          <div className=" justify-center items-center p-4 flex flex-col">
            <p className="text-gray-600 font-semibold text-center">
              <Link to="/register" className="">
                Create New Account
              </Link>
            </p>
          </div>
        </div>
      )}

      {user && (
        <div className="border justify-center w-[90%] md:w-[50%] gap-4 items-center border-gray-400 mt-3 p-4 flex flex-col">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden object-cover">
            <img src={user.data.DPurl} alt="" className="w-[100px] h-[100px]" />
          </div>

          <h1 className="font-semibold">{user.data.name}</h1>

          <p className="text-gray-400 text-center">
            if this is you, click on the button below to get OTP
          </p>

          {requestOtP ? (
            <p>OTP sent to your email</p>
          ) : (
            <button
              onClick={() => {
                getOtp({ email: email });
                setRequestOtP(true);
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {loading ? "Loading..." : "Get OTP"}
            </button>
          )}

          {requestOtP && (
            <div className="flex justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={otpData.otp}
                onChange={handleOtpChange}
                className="p-2 border border-gray-400 w-[90%] outline-none rounded"
              />
              {/* Write your new password */}
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                value={otpData.password}
                onChange={handleOtpChange}
                className="p-2 border border-gray-400 w-[90%] outline-none rounded"
              />
              <button
                onClick={() => {
                  if (otpData.otp.length < 6) {
                    alert("Please enter valid OTP");
                    return;
                  }
                  if (otpData.password.length < 5) {
                    alert("Please enter valid password");
                    return;
                  }

                  setPassword({
                    email: email,
                    otp: otpData.otp,
                    password: otpData.password,
                  });
                }}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindAccount;
