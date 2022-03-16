import Head from 'next/head'

import React, { useState } from "react";

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return(
    <div className="flex flex-col items-center bg-gray-100 h-screen max-h-screen w-screen">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login with google" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container max-w-md lg:my-8 bg-white p-10 lg:p-16 flex flex-col items-center space-y-4 rounded-xl shadow-xl">
        <div className="text-lg text-gray-500 font-bold">Login</div>
        <label className="block w-full">
          <span className="block text-sm font-medium text-gray-400">Username</span>
          <input type="text"
                 placeholder="Username"
                 className="w-full block mt-1 px-3 py-2 bg-white rounded-md text-sm shadow-sm
                            border-gray-200 border rounded-xl
                            focus:outline-none focus:border-sky-500 focus:border
                 "
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="w-full">
          <span className="wblock text-sm font-medium text-gray-400">Password</span>
          <input type="password"
                 placeholder="Password"
                 className="w-full block mt-1 px-3 py-2 bg-white rounded-md text-sm shadow-sm
                            border-gray-200 border rounded-xl
                            focus:outline-none focus:border-sky-500 focus:border
                 "
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="py-1">{" "}</div>
        <div onClick={(e) => console.log("Logging in...")}
             className="py-2 text-gray-500 rounded-xl border-0 text-sm bg-blue-100 w-full
                        hover:bg-blue-200 hover:text-gray-800 cursor-pointer ease-in-out duration-300
                        cursor-pointer text-center
             "
        >Login
        </div>
      </div>
    </div>
  );
}

export default Login
