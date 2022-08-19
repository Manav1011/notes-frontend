import React from 'react'
import NotesCard from '../assets/NotesCard'
import { useState, useEffect } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const HomeComponent = ({darkMode}) => {  
  const [token,setToken]=useState(localStorage.getItem('Token'))
    let navigate = useNavigate();
    useEffect(() => {
        if (!token){
        $('.navigation').addClass('d-none')
         navigate("/login")         
        }
    },[])
  return (
    <>    
    {token?<div className={`mt-4 mx-2 rounded`}>    
      <NotesCard darkMode={darkMode}/>
    </div>:null}
    </>
  )
}

export default HomeComponent