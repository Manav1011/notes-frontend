import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = ({darkMode}) => {
    const [token,setToken]=useState(localStorage.getItem('Token'))
    let navigate = useNavigate();
    useEffect(() => {
        if (!token){
         navigate("/login")
        }    
    },[token])
    const Logout= ()=>{  
        localStorage.removeItem('Token')
        setToken(null) 
    }   
  return (
    <>
    <button className="btn btn-danger" onClick={Logout}>Logout</button>
    <div className={darkMode?'text-light': 'text-dark'}>HomeComponent</div>
    </>
  )
}

export default HomeComponent