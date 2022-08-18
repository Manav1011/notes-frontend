import LoginForm from "./components/LoginForm";
import React, { useState } from "react";
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, changeTheme] = useState(true);
  return (
    <BrowserRouter>
    <div
      className="{darkMode ? 'bg-dark' : 'bg-light'} App"
    >
      <Routes>
      <Route path='/' exact element={<HomeComponent darkMode={darkMode}/>}/>
      <Route path='/login' exact element={<LoginForm darkMode={darkMode} />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
