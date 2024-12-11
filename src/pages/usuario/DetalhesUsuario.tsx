import { Row, Col, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import perfil from '../../assets/css/perfil.png';

function DetalhesUsuario() {
    return (
        <Row className="d-flex justify-content-center align-items-center w-100 h-100" style={{ minHeight: '100vh' }}>
            <Col xs={6} md={4} className="mx-3">
                <Image src={perfil} rounded className="img-fluid" />
            </Col>

            <Col className="mx-3">
                <Button variant="primary" className="mb-3">Informações</Button>
                <Table striped bordered hover responsive>
                    <tbody>
                        <tr>
                            <th>Nome</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Data de Nascimento</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>CPF</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Endereço</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Nome da Mãe</th>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Col>

            <Col className="mx-3">
                <Button variant="primary" className="mb-3">Últimos Arquivos</Button>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Arquivo</th>
                            <th>Data</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                </Table>
            </Col>
        </Row>
    );
}

export default DetalhesUsuario;
