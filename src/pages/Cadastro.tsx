import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { cadastro } from "../services/auth";
import { useNavigate } from "react-router-dom";


const Cadastro = (): ReactElement => {
  const [nome,  setNome ] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confSenha, setConfSenha] = useState<string>("");
  const navigate = useNavigate();

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };
  
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  }

  const handleConfSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfSenha(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Nome:", nome)
    console.info("Email:", email);
    console.info("Senha:", senha);
    console.info("confSenha:", confSenha);

    cadastro(nome + email + senha + confSenha);

    alert("Cadastrado com sucesso!");
    navigate("/entrar");
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

            <h2 className="text-center mb-4">CADASTRO</h2>

            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control onChange={handleNomeChange} type="nome" placeholder="Digite seu nome" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleEmailChange} type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" onChange={handleSenhaChange} placeholder="Digite sua senha" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" onChange={handleConfSenhaChange} placeholder="Confirme sua senha" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 btn-white">Criar conta</Button>

            <hr/>

            <Button variant="outline-light" className="w-100">Entrar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;
