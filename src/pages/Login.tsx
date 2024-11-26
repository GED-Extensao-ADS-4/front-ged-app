import { ReactElement } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

/**
 * @description Página de login.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 25/11/2024
 */
const Login = (): ReactElement => {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={8} className="d-flex flex-column justify-content-center align-items-center bg-light">
          <Image src="/img/mapa.png" alt="Mapa do Brasil" className="mapa" />
          <h1 className="fs-1 text-blue">APAE CRICIÚMA</h1>
        </Col>

        <Col md={4} className="d-flex flex-column justify-content-center align-items-center bg-blue">
          <Form>
            <div className="logo-wrapper">
              <Image src="/img/logo.png" alt="Logo da APAE" className="logo text-center" />
            </div>

            <h2 className="text-center mb-4">ENTRAR</h2>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Entrar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
