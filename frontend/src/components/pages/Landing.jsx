import React from 'react'
import { TrendingUp, Shield, Zap, Target, BarChart3, Users } from 'lucide-react';
import Navbar from "../ui/LandingNavbar.jsx"
import heroImage from "../../assets/heroImage.webp" ;
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';



const Landing = () => {
  const navigate = useNavigate() ; 
      const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Virtual Trading",
      description: "Practice trading with virtual points. Learn without risk."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk-Free Learning",
      description: "Master trading strategies in a safe environment."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Data",
      description: "Access live market data and real trading scenarios."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Task-Based Rewards",
      description: "Complete challenges and earn points to grow your portfolio."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Portfolio Analytics",
      description: "Track your performance with detailed analytics."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Learn from other traders and share strategies."
    }
  ];
  return (
    <div className='landing text-black bg-white min-h-screen'>
      <Navbar/>
      {/* hero section */}
       <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master Trading with
              <span className="block text-white">
                Virtual Points
              </span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Learn, practice, and excel in trading without financial risk. 
              Earn points through tasks and build your dream portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
             <SignedIn><button onClick={()=>{navigate('/dashboard')}} className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg'>Go to Dashboard</button></SignedIn>
          <SignedOut> <SignInButton  className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg' mode='modal' forceRedirectUrl="/dashboard"/></SignedOut>
              
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose TradeNest?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most advanced virtual trading platform designed for learners and experts alike.
            </p>
          </div>
          {/* features section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
            <div className="border-0 shadow-soft hover:shadow-strong transition-all duration-300 bg-gradient-card">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">{feature.icon}</div>
                <div className="text-xl text-black">{feature.title}</div>
                <div className='text-black'>{feature.description}</div>
            </div>
            ))}
          </div>
        </div>
      </section>

{/* Cta Section */}

       <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Trading Journey?
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
             Join community of new traders who are learning with TradeNest's virtual trading platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
            <SignedIn><button onClick={()=>{navigate('/dashboard')}} className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg'>Go to Dashboard</button></SignedIn>
          <SignedOut> <SignInButton  className='hover:bg-blue-500 bg-blue-400 text-white font-semibold p-2 rounded-lg' mode='modal' forceRedirectUrl="/dashboard"/></SignedOut>

            </div>
          </div>
        </div>
      </section>
{/* footer */}
       <footer className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold">TradeNest</span>
          </div>
          <p className="text-center text-muted-foreground">
            © 2025 TradeNest. All rights reserved. Virtual trading platform for educational purposes.
          </p>
        </div>
      </footer>
      
    </div>
  )
}

export default Landing