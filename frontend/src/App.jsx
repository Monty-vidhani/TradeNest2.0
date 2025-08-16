import React, { useEffect } from 'react'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom";
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import { RedirectToSignIn, RedirectToTask, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import NotFound from './components/pages/NotFound';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route index element={<Landing/>}  />
    <Route path='/dashboard' element={
     <>
     <SignedIn>
      <Dashboard/>
     </SignedIn>
     <SignedOut>
      <NotFound/>
     </SignedOut>
     </> 
    }/>
    <Route path='*' element={<NotFound/>}/>
    </>
  )
)

const App = () => {

  return (
    <>
    <RouterProvider router={router} />
    </>
   
  )
}

export default App