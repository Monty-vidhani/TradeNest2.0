import React from 'react'
import { IndianRupee, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useState } from 'react';
import { useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';


const DashBoardNav = () => {
  const navigate = useNavigate();
 
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchUserData = async () => {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setDbUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [isLoaded, getToken]);

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50  text-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button className="flex  items-center space-x-2"
           onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 " />
            </div>
            <span className="text-xl font-bold">TradeNest</span>
          </button>
          
         <div className="flex items-center space-x-4">
           {!dbUser?<p className='flex flex-row font-semibold text-xl items-center'><IndianRupee className='h-5 w-5'/><span className='text-lg animate-pulse'>Loading....</span></p>:<p className='flex flex-row font-semibold text-xl items-center'><IndianRupee className='h-5 w-5'/><span className='text-lg'>{dbUser.cashBalance}</span></p>}
            <UserButton/>
          </div>
        </div>
      </nav>
  )
}

export default DashBoardNav