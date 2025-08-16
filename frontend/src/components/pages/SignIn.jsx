import React, { useState } from 'react'
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Target, BarChart3, Users,Eye, EyeOff  } from 'lucide-react';



const SignIn = () => {
  const navigate = useNavigate() ;
  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
    alert("Please fill in all fields");
    return;
  }

  try {
    if (isLogin) {
      // LOGIN
      const res = await axios.post("http://localhost:3002/api/auth/login", {
        username: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      // alert(`Login successful! Welcome ${res.data.user.username}`);
      window.location.href = "http://localhost:3001"; // redirect to dashboard

    } else {
      // SIGNUP
      await axios.post("http://localhost:3002/api/auth/signup", {
        username: formData.email,
        password: formData.password,
        name: formData.name,
      }, { withCredentials: true });

      alert("Signup successful! Now login.");
      setIsLogin(true); // Switch to login view
    }
  } catch (error) {
    console.error("Auth Error:", error);
    alert(error.response?.data?.message || "Something went wrong!");
  }
};


  return (
    // <div className="container mt-5  p-4 bg-amber-400" style={{ maxWidth: "400px"}}>
    //   <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
    //   <form onSubmit={handleSubmit}>
    //     {!isLogin && (
    //       <div className="mb-3">
    //         <label className="form-label">Name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //         />
    //       </div>
    //     )}
    //     <div className="mb-3">
    //       <label className="form-label">Email address</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary w-100">
    //       {isLogin ? "Login" : "Sign Up"}
    //     </button>
    //   </form>
    //   <p className="mt-3 text-center">
    //     {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
    //     <button className="btn btn-link p-0" onClick={handleToggle}>
    //       {isLogin ? "Sign Up" : "Login"}
    //     </button>
    //   </p>
    // </div>
    <div className='min-h-screen bg-white'>
      {/* navbar */}
      <nav className="border-b backdrop-blur-sm sticky top-0 z-50  text-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={()=>navigate("/")}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center" >
              <TrendingUp className="h-5 w-5 " />
            </div>
            <span className="text-xl font-bold">TradeNest</span>
          </div>
          
         <div className="flex items-center space-x-4">
            <button className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg'
            onClick={()=>navigate("/")}>Home</button>
          </div>
        </div>
      </nav>
      {/* login form  */}
     <div
      className="
        w-[90%] max-w-md 
        text-black 
        rounded-lg shadow-2xl
        p-6
        absolute left-1/2 top-1/2 
        -translate-x-1/2 -translate-y-1/2
        bg-white
      "
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
          required
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
       <div className="relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
          required
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0.5 right-3 flex items-center text-black"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {/* Confirm Password only for Signup */}
         {!isLogin && (
          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
            required
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-black"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-400 py-2 rounded-md font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Toggle Link */}
        <p className="text-center text-sm mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </form>
    </div>
    
      

      

    </div>
  );
}

export default SignIn