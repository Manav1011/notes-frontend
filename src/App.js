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
                <style>{darkMode? 'body { background-color: black; }':'body { background-color: white; }'}</style>
            </Helmet>
    <NavigationBar darkMode={darkMode} changeTheme={changeTheme}/>
    <div
      className="{darkMode ? 'bg-dark' : 'bg-light'} App"
    >
      
      <Routes>
      <Route path='/' exact element={<HomeComponent darkMode={darkMode}/>}/>
      <Route path='/login' element={<LoginForm darkMode={darkMode} />}/>
      <Route path='/notes/:id' element={<NoteDetails darkMode={darkMode} />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
