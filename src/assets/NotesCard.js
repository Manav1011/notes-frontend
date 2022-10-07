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
    <div className="content-wrapper">
      {NotesList.length == 0 ? (
        <Card body className={`w-100 ${darkMode ? "text-bg-dark" : "text-bg-light"}`}>
          <span className="card-title" id="NotesCard"></span>
        </Card>
      ) : (
        NotesList.map((note) => (
          <Card
            className={`m-3 news-card ${darkMode ? "text-bg-dark" : "text-bg-light"}`}
            key={note.id}
            onClick={() => {ShowDetail(note.id)}}            
          >
            <Card.Header className='news-card__title'>{note.title}</Card.Header>
            <Card.Body class='fw-bold news-card__post-date p-3'>{note.content.substring(0, 50)} <Link to={`/notes/${note.id}`}>read more...</Link></Card.Body>
            <Card.Footer class="news-card__details-wrapper">
              <small className="fs-smaller news-card__excerpt p-4" style={{fontSize:"0.8rem"}}>Last Updated: {note.updated}</small>
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
    </div>
  );
};

export default NotesCard;
