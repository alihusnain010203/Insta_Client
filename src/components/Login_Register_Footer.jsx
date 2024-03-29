import React from 'react'
const footerLinks = [
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Top Accounts",
    "Hashtags",
    "Locations",
    "Instagram Lite",
    ];
const Login_Register_Footer = () => {
  return (
    <> <div className="w-[95vw] overflow-x-hidden flex justify-center items-center gap-4 p-5 flex-wrap">
    {
           footerLinks.map((link, index) => (
             <p key={index} className="text-gray-500 text-[12px]">{link}</p>
           ))
    }

    {/* Copyrigth */}
   
 </div>
 <p className="text-gray-500 text-center text-[12px]">&copy; 2021 Instagram from Facebook</p>
 </>
   
  )
}

export default Login_Register_Footer