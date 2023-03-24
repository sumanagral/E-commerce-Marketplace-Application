import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import { Security, LoginCallback } from "@okta/okta-react";
import BuyerPage from "./pages/BuyerPage"
import Favorites from './pages/Favorites';
import SellerPage from './pages/SellerPage';
import AdsPage from './pages/Ads';
import DevPortal from "./pages/DevPortal";
import axios from "axios";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import {oktaConfig} from "./config";

const oktaAuth = new OktaAuth(oktaConfig);
console.log(oktaConfig)
function App() {
  const user = localStorage.getItem("user");
  // Request interceptors for API calls
  axios.interceptors.request.use(
      config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
  );
    const originalUri = async (_oktaAuth, originalUri) => {
        console.log(toRelativeUrl(originalUri || "/", window.location.origin+"/dev"))
        window.location.replace(
           "/dev"
        );
    };

  return (

    <div className="App">
      <BrowserRouter>
          <Security oktaAuth={oktaAuth} restoreOriginalUri={originalUri}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="buyer" exact element={!user ? <Home /> : <BuyerPage />} />
          <Route path="favorites" exact element={!user ? <Home /> : <Favorites />} />
          <Route path="seller" exact element={!user ? <Home /> : <SellerPage />} />
          <Route path="ads" exact element={!user ? <Home /> : <AdsPage />} />
          <Route path="dev" exact element={<DevPortal />} />
          <Route path="/dev/login/callback" exact element={<LoginCallback/>} />
        </Routes>
          </Security>
      </BrowserRouter>
    </div>
  );
}

export default App;
