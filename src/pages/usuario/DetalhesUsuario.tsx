import { Container, Row, Col, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import perfil from '../../assets/css/perfil.png';

function DetalhesUsuario() {
    return (
        <Container>
           <Row>
                <Col xs={6} md={4}>
                    <Image src={perfil} rounded />
                </Col>

                
            
                <Col>
                <Button variant="primary">Primary</Button>
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
    

                <Col>
                <Button variant="primary">Últimos Arquivos</Button>

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
        </Container>
    );
}

export default DetalhesUsuario;
