import LoginForm from "./components/LoginForm";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [darkMode, changeTheme] = useState(true);
  return (
    <div
      className="{darkMode ? 'bg-dark' : 'bg-light'} App"
    >
      <LoginForm darkMode={darkMode} />
    </div>
  );
}

export default App;
