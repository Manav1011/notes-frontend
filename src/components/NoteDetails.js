import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";


const NoteDetails = ({darkMode}) => {  
    const [AuthToken, GetToken] = useState(localStorage.getItem("Token"));
    const [Title,SetTitle]=useState('Null')
    const [Content,SetContent]=useState('Null')
    const [Note,GetNote]=useState([])
    let navigate = useNavigate();


    let url=window.location.href
    const lastSegment = url.split("/").pop();

    const saveNote = () => {
        fetch(`https://personalnotes-backend.herokuapp.com/Notes/GetDeleteUpdateNotes/${lastSegment}`, {
            // Adding method type
            method: "PATCH",
            body: JSON.stringify({
                title: Title,
                content:Content
              }),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              authtoken: AuthToken,
            },
          })
            // Converting to JSON
            .then((response) => {
              navigate("/")
            })
            .catch((err) => console.log(err));
    }

    const DeleteNote = () => {
        fetch(`https://personalnotes-backend.herokuapp.com/Notes/GetDeleteUpdateNotes/${lastSegment}`, {
            // Adding method type
            method: "DELETE",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              authtoken: AuthToken,
            },
          })
            // Converting to JSON
            .then((response) => {
              navigate("/")
            })
            .catch((err) => console.log(err));
    }


    const getNote=() => {
        fetch(`https://personalnotes-backend.herokuapp.com/Notes/GetDeleteUpdateNotes/${lastSegment}`, {
      // Adding method type
      method: "GET",
      // Adding body or contents to send
      // Adding headers to the request
      headers: {
        authtoken: AuthToken,
      },
    })
      // Converting to JSON
      .then((response) => {
        return response.json();
      })
      // Displaying results to console
      .then((json) => {
        GetNote(json);
        SetTitle(json.title)
        SetContent(json.content)
      })      
      .catch((err) => console.log(err));
    }

    const FormSubmit = (event) =>{
        event.preventDefault();
        saveNote()
    }

    useEffect(() => {
        var el=document.getElementById('bodycontent')
    var yPositionOfNewElement = el.offsetTop;
    var bodyheight=$(document).height()-60
    $('#bodycontent').height(bodyheight-yPositionOfNewElement)
        getNote()        
    },[])

    useEffect(() => {
      saveNote()
    },[Title,Content])

  return (
    <div className={`m-3 p-3`}>
        <button className='mb-4 float-start btn btn-outline-primary'  onClick={() => {saveNote()}}>Go Back</button>
        <button className='mb-4 float-end btn btn-outline-danger' onClick={() => {DeleteNote()}}>Delete</button>
        <Form onSubmit ={FormSubmit}>
         <InputGroup className="mb-3">        
        <Form.Control
          placeholder=""
          aria-label="Username"
          className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
          aria-describedby="basic-addon1"
          value={Title}
          onChange={(e) => SetTitle(e.target.value)}
        />
      </InputGroup>      
      <InputGroup id="bodycontent">
        <Form.Control value={Content}
          onChange={(e) => SetContent(e.target.value)} as="textarea" aria-label="With textarea"  className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}/>
      </InputGroup>
      </Form>
      <button className='mb-4 form-control mt-2 btn btn-outline-success' onClick={() => {saveNote()}}>Save</button>
    </div>
  )
}


export default NoteDetails