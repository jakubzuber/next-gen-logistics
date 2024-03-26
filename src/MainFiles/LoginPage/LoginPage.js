import { useNavigate } from "react-router-dom";
import { Form, Container, Title, Button, Input } from "./styled";
import { useState } from "react";
import ReactJsAlert from "reactjs-alert"

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [status, setStatus] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate()

  const fetchLoginData = async (username) => {
   
    const returnedPassword = await fetch('/valideLogIn', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        USERNAME: username
      })
    })
      .then(res => res.json())
    return returnedPassword
  };

  const onSingInPress = async () => {
    const fetchedData = await fetchLoginData(username)
    const passwordFromDatabase = fetchedData[0].PASSWORD
    const newPasswordRequired = fetchedData[0].ONE_TIME_PASSWORD

    if (passwordFromDatabase === password) {
      if (newPasswordRequired === 1) {
        navigate('new-password', {state: {username: username, password: password}})
      } else {
        navigate("mainmenu")
      }
    } else {
      setStatus(true)
      setType("error")
      setTitle("Hasło jest nieprawidłowe")
    }
  };


  return (
    <Container>
      <Form>
        <Title>Witaj!</Title>
        <Input
          placeholder={'Login'}
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          required
        />
        <Input
          placeholder={'Hasło'}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          title="Zaloguj"
          onClick={() => onSingInPress()}>
          Zaloguj się
        </Button>
        <Button
        onClick={() => navigate('forget-password')}
        >Przypominj hasło</Button>
      </Form>
      <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        Close={() => setStatus(false)}
      />
    </Container>
  );
};

export default LoginPage;