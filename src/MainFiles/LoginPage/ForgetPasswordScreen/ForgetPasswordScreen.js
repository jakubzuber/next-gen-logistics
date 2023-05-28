import { useNavigate } from "react-router-dom";
import { Form, Container, Title, Button, Input } from "../styled";

const ForgetPasswordScreen = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Form>
        <Title>Jak odzyskać hasło?</Title>
        <p>Skontaktu się ze mną!</p>
        <Button
        onClick={() => navigate(-1)}
        >Powrót</Button>
      </Form>
    </Container>
  );
};

export default ForgetPasswordScreen;