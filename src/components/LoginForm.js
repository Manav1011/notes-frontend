import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';

const LoginForm = ({darkMode}) => {    
  return (
    <div className="{darkMode ? 'bg-dark' : 'bg-light'}container card  border shadow-lg rounded bg-gradient me-5 ms-5" style={{marginTop:'30vh'}}>
      <Card>
        <Card.Body className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
          <Card.Title>Login Form</Card.Title>          
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form>          
          <Button variant="primary" type="submit">
                Submit
              </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
