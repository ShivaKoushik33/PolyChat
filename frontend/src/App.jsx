import React from 'react'
import { Routes,Route, useActionData, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CallPage from './pages/CallPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import toast,{Toaster} from 'react-hot-toast';
import {
  useQuery,
  QueryClient
} from '@tanstack/react-query';
import axios from "axios";
import { axiosInstance } from './lib/axios.js';
import PageLoader from './components/PageLoader.jsx';
import { getAuthUser } from './lib/api.js';
import useAuthUser from './hooks/useAuthUser.js';

import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.jsx';

const App = () => {
  const {isLoading,authUser}=useAuthUser();
  const isAuthenticated=Boolean(authUser);
  const isOnboarded=authUser?.isOnboarded
  const {theme,setTheme}=useThemeStore();
  
  if(isLoading) return <PageLoader/>
  return (
    <div className=' h-screen ' data-theme={theme}> 
      <button onClick={()=>setTheme("night")}></button>



  <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? 
          (
          <Layout showSidebar={true}>
          <HomePage />
          </Layout>
        ) 
          :
          (<Navigate to={!isAuthenticated? "/login" : "/onboarding" }/>
              )
              } 
        />




    <Route path="/signup" element={!isAuthenticated?<SignUpPage/>:<Navigate to={isOnboarded ? "/" : "/onboarding"}/>} />



    <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
    />

    <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />


   <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

    <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        
        
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />


    
  </Routes>
    <Toaster/>

    </div>
  )
}
export default App;
