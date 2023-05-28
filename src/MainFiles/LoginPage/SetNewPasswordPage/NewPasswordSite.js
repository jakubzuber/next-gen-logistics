import ReactJsAlert from "reactjs-alert";
import { useState } from "react";
import { Form, Container, Title, Button, Input } from "../styled";
import { useLocation, useNavigate } from "react-router-dom";

const NewPasswordSite = () => {
    const navigate = useNavigate();
    const location = useLocation();

    
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordx2, setNewPasswordx2] = useState('')

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    const sendNewPassword = async(newDetails) => {
        await fetch('http://192.168.0.191:5000/valideLogIn/newPasswrod', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                USERNAME: newDetails.username,
                PASSWORD: newDetails.password
                })
            })
        };

        const onSubmit = async() => {
            if (location.state.password === oldPassword) {
                if ((oldPassword === newPassword) || (oldPassword === newPasswordx2)) {
                    setStatus(true)
                    setType("error")
                    setTitle("Nowe hasło jest takie same jak stare")
                } else {
                    if (newPassword === newPasswordx2) {
                        sendNewPassword({password: newPassword, username: location.state.username})
                        setStatus(true)
                        setType("error")
                        setTitle("Hasło zostało zaaktualizowane")
                       
                        setTimeout(() => {
                            navigate(-1)
                        }, 3000)
                        
                     
                    } else {
                        setStatus(true)
                        setType("error")
                        setTitle("Nowe hasła się nie zgadzają")
                    }
                }
            } else {
                    setStatus(true)
                    setType("error")
                    setTitle("Stare hasło jest nieprawidłowe")
                }}

    return (
        <Container>
          <Form>
            <Title>Podaj nowe dane do logowania</Title>
            <Input
              placeholder={'Stare hasło'}
              name="login"
              type="text"
              onChange={({ target }) => setOldPassword(target.value)}
            />
            <Input
              placeholder={'Hasło'}
              type="password"
              onChange={({ target }) => setNewPassword(target.value)}
            />
            <Input
              placeholder={'Powtórz nowe hasło'}
              type="password"
              onChange={({ target }) => setNewPasswordx2(target.value)}
            />
            <Button
            onClick={() => onSubmit()}
            >
              Potwierdź
            </Button>
            <Button
              title="Potwierdz"
              onClick={() => navigate(-1)}
              >
              Wróc do strony logowania 
            </Button>
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

export default NewPasswordSite;