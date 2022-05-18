// a component ot handle all the routes of the application with react-router-dom
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from '../components/register_user';

import {MainLayout} from '../pages/main_layout';


function RoutesConfig() {
  //router for the application for differet pages
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<MainLayout />} />
        <Route  path="/users" element={<RegisterUser/>} />
      </Routes>
    </Router>
  );
}
export default RoutesConfig;
