import { Row, Col, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import perfil from '../../assets/css/perfil.png';

function DetalhesUsuario() {
    return (
        <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Col
                className="mx-3 d-flex flex-column align-items-center" 
                style={{ minHeight: '50vh', flexGrow: 1 }}
            >
                <Image src={perfil} width={350} rounded className="img-fluid" />
            </Col>

            <Col 
                className="mx-3 d-flex flex-column" 
                style={{ minHeight: '50vh', flexGrow: 1 }}
            >
                <Button variant="primary" className="mb-3">Informações</Button>
                <Table striped bordered hover responsive className='flex-fill'>
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

            <Col 
                className="mx-3 d-flex flex-column" 
                style={{ minHeight: '50vh', flexGrow: 1 }}
            >
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
