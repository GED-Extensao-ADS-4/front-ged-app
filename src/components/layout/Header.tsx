import { ReactElement } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa"; // Ícone personalizado
import { logout } from "../../services/auth";
import "../../assets/css/pages/header.css"
import Icone from "../common/Icone";

const Header = (): ReactElement => {
    const handleSair = () => {
        if (window.confirm("Deseja realmente sair?")) {
            logout();
            location.reload();
        }
    };

    return (
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
                            <Nav.Link href="alunos" className="AMARELO"><Icone nome="address-book" texto="ALUNOS" /></Nav.Link>
                            <Nav.Link href="documentos" className="AMARELO"><Icone nome="folder-open" texto="DOCUMENTOS" /></Nav.Link>
                            <Nav.Link href="#" onClick={handleSair} className="AMARELO"><Icone nome="sign-out" texto="SAIR" /></Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
