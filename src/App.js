import LoginForm from "./components/LoginForm";
import React, { useState } from "react";
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import {Helmet} from 'react-helmet';
import NoteDetails from "./components/NoteDetails";

function App() {
  const [darkMode, changeTheme] = useState(true);
  return (
    <BrowserRouter>
        <Helmet>
                <style>{darkMode? `body {-webkit-appearance: none; background: linear-gradient(to left, #070614, #0f0c29, #070614);}`:`body { background: #757F9A;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #D7DDE8, #757F9A);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #D7DDE8, #757F9A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}`}</style>
            </Helmet>
    <NavigationBar darkMode={darkMode} changeTheme={changeTheme}/>
    <div
      className="{darkMode ? 'bg-dark' : 'bg-light'} App"
    >
      
      <Routes>
      <Route path='/' exact element={<HomeComponent darkMode={darkMode}/>}/>
      <Route path='/login' exact element={<LoginForm darkMode={darkMode} />}/>
      <Route path='/notes/:id' element={<NoteDetails darkMode={darkMode} />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
