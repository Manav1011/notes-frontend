import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const NotesCard = ({ darkMode }) => {
  const [NotesList, getNotes] = useState([]);
  const [AuthToken, GetToken] = useState(localStorage.getItem("Token"));
  const GetNotes = () => {
    fetch("http://127.0.0.1:8000/Notes", {
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
        console.log(json);
        getNotes(json);
      })
      .catch((err) => console.log(err));
  };

  const CreateNote =() =>{
    
  }

  useEffect(() => {
    GetNotes();
  }, []);
  return (
    <>
      {NotesList.length == 0 ? (
        <Card body className={`${darkMode ? "text-bg-dark" : "text-bg-light"}`}>
          No Notes Yet
        </Card>
      ) : (
        NotesList.map((note) => (
          <Card
            className={`mb-2 ${darkMode ? "text-bg-dark" : "text-bg-light"}`}
            key={note.id}
            onClick={() => {}}
          >
            <Card.Header>{note.title}</Card.Header>
            <Card.Body>{note.content}</Card.Body>
            <Card.Footer>
              <small className="text-muted">Last Updated: {note.updated}</small>
            </Card.Footer>
          </Card>
        ))
      )}
      <Button
        className={`${darkMode ? "text-bg-dark" : "text-bg-light"}`}
        style={{ position: "fixed", bottom: "10vh", right: "8vh" }}
      >
        <i className="bi bi-plus-lg" style={{ fontSize: "1.5rem" }}></i>
      </Button>
    </>
  );
};

export default NotesCard;
