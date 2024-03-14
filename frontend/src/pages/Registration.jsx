import { useRef, useEffect, useState, useContext } from "react";
// import { useNavigate } from "@tanstack/router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { GlobalContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  // const navigate = useNavigate();
  const global_context = useContext(GlobalContext)
  const navigate = useNavigate();

  const user_password = useRef(null);
  const user_repassword = useRef(null);
  const user_email = useRef(null);
  const user_name = useRef(null);

  const [loginErrorMsg, setLoginErrorMessage] = useState("");

  const {mutate:userRegistration, isPending:isPending} = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!user_email.current || !user_password.current || !user_repassword.current) return;
  
      const email = user_email.current.value;
      const password = user_password.current.value;
      const repassword = user_repassword.current.value;
      const name = user_name.current.value;
      const authInputSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        repassword: z.string().min(6),
        name: z.string()
      }).refine((data) => data.password === data.repassword, {
        message: "Passwords don't match",
        path: ["confirm"],
      });
  
      authInputSchema.parse({
        email,
        password,
        repassword,
        name
      });

      register(email, name, password, repassword);
    },
    onError: (error) => {
      console.error(error)
      setLoginErrorMessage(error.errors[0].message) 
    },
  })

  const register=async(email, name, password, repassword)=>{
    global_context.setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BASE}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, name: name, password: password, repassword: repassword }),
    });
    global_context.setLoading(false);
    if (!response.ok) {
      // pop msg registration fail
      global_context.toast(`Registration fail`)
    } else {
      // pop msg registration success
      global_context.toast("Registration success, redirecting to login page...")
      setTimeout(()=>{
        navigate("/login");
      }, 3000)
    }
    response.json().then((response_JSON)=>{
      global_context.toast(response_JSON?.message)
    })
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="login-container w-96 p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Registration
        </h1>
        <form onSubmit={(e)=>void userRegistration(e)}>
          <p className="text-red-500">{loginErrorMsg}</p>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={user_email}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              ref={user_name}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={user_password}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              ref={user_repassword}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg ${isPending ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isPending}
          >Register</button>
        </form>
      </div>
    </div>
  );
};
