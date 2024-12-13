import { ReactElement } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa"; // Ícone personalizado
import { logout } from "../../services/auth";
import "../../assets/css/pages/header.css"

const Header = (): ReactElement => (
    <Navbar expand="md" className="bg-primary">
        <Container>
           
            <Navbar.Toggle
                aria-controls="offcanvasNavbar"
                className="text-white border-0"
            >
                <FaBars size={24} />
            </Navbar.Toggle>
            <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="me-auto">
                        <Nav.Link href="alunos" className="AMARELO">ALUNOS</Nav.Link>
                        <Nav.Link href="documentos" className="AMARELO">DOCUMENTOS</Nav.Link>
                        <Nav.Link href="#" onClick={()=> logout()} className="AMARELO">SAIR</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
);

export default Header;
