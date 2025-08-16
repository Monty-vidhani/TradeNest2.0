import React from 'react'
import { TrendingUp, Shield, Zap, Target, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
// import { useAuth0 } from "@auth0/auth0-react";

const LandingNavbar = () => {
  const navigate = useNavigate();
  //  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="border-b backdrop-blur-sm sticky top-0 z-50  text-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 " />
            </div>
            <span className="text-xl font-bold">TradeNest</span>
          </div>
          
         <div className="flex items-center space-x-4">
            {/* <button className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg'
            onClick={() => loginWithRedirect()}
            >Sign In</button> */}
           <SignedIn><button onClick={()=>{navigate('/dashboard')}} className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg'>Go to Dashboard</button></SignedIn>
          <SignedOut> <SignInButton  className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg' mode='modal' forceRedirectUrl="/dashboard"/></SignedOut>
            {/* <button className='bg-blue-500 p-2 rounded-lg'
               onClick={() => navigate("/dashboard")}
            >
              Get Started
            </button> */}
          </div>
        </div>
      </nav>
  )
}

export default LandingNavbar