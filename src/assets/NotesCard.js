import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate,Link } from "react-router-dom";

const NotesCard = ({ darkMode }) => {
  const [NotesList, getNotes] = useState([]);
  const [AuthToken, GetToken] = useState(localStorage.getItem("Token"));
  let navigate = useNavigate();

  
  const GetNotes = () => {
    fetch("https://personalnotes-backend.herokuapp.com/Notes", {
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
        getNotes(json);
        if (NotesList.length == 0){
        document.getElementById('NotesCard').textContent='No Notes Yet!!'
        }
      })
      .catch((err) => console.log(err));
  };

  const CreateNote =() =>{
    fetch(`https://personalnotes-backend.herokuapp.com/Notes/CreateNote/`, {
        // Adding method type
        method: "POST",       
        body: JSON.stringify({
          title: '',
          content:''
        }), 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          authtoken: AuthToken,
        },
      })
        // Converting to JSON
        .then((response) => {
            return response.json()
        })
        .then((json)=>{
            navigate(`/notes/${json}`)
        })
        .catch((err) => console.log(err));
  }

  const ShowDetail =(id) =>{
    navigate(`/notes/${id}`)
  }

  useEffect(() => {
    document.getElementById('NotesCard').textContent='Fetching Notes....'
    GetNotes();
  }, []);
  return (
    <>
      {NotesList.length == 0 ? (
        <Card body className={`${darkMode ? "text-bg-dark" : "text-bg-light"}`}>
          <span className="card-title" id="NotesCard"></span>
        </Card>
      ) : (
        NotesList.map((note) => (
          <Card
            className={`mb-2 ${darkMode ? "text-bg-dark" : "text-bg-light"}`}
            key={note.id}
            onClick={() => {ShowDetail(note.id)}}
          >
            <Card.Header>{note.title}</Card.Header>
            <Card.Body>{note.content.substring(0, 50)} <Link to={`/notes/${note.id}`}>read more...</Link></Card.Body>
            <Card.Footer>
              <small className="text-muted">Last Updated: {note.updated}</small>
            </Card.Footer>
          </Card>
        ))
      )}
      <Button
        className={`${darkMode ? "text-bg-dark" : "text-bg-light"}`}
        style={{ position: "fixed", bottom: "10vh", right: "5vh" }}
        onClick={() => {CreateNote()}}
      >
        <i className="bi bi-plus-lg" style={{ fontSize: "1.5rem" }}></i>
      </Button>
    </>
  );
};

export default NotesCard;
