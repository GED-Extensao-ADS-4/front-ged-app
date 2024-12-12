import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Button, CardLink, Col, Container, Form, Image, Row } from "react-bootstrap";
import { login } from "../services/auth";
import api from "../services/api";

/**
 * @description Página de login.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 25/11/2024
 */

interface User {
  email: string,
  password: string
}

interface Response {
  token: string
}


const Login = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Email:", email);
    console.info("Senha:", senha);

    const user: User = {
      email: email,
      password: senha
    }

    const response = await api.post<Response>('/user/login', user)

    console.log(response.data);
    
    const { token } = response.data;

    login(token);

    alert("Logado com sucesso!");
    window.location.assign("/home")
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={8} className="d-flex flex-column justify-content-center align-items-center bg-light">
          <Image src="/img/mapa.png" alt="Mapa do Brasil" className="mapa" />
          <h1 className="fs-1 text-blue">APAE CRICIÚMA</h1>
        </Col>

        <Col md={4} className="d-flex flex-column justify-content-center align-items-center bg-blue">
          <Form onSubmit={handleSubmit}>
            <div className="logo-wrapper">
              <Image src="/img/logo.png" alt="Logo da APAE" className="logo text-center" />
            </div>

            <h2 className="text-center mb-4">ENTRAR</h2>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleEmailChange} type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" onChange={handleSenhaChange} placeholder="Digite sua senha" />
              <CardLink href="/esqueci-senha" className="text-white link-underline-opacity-0">Esqueceu a senha?</CardLink>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 btn-white">Entrar</Button>

            <hr/>

            <Button variant="outline-light" className="w-100">Criar conta</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
