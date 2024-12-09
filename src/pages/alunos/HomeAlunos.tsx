import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Axios from 'axios';
import { Button, Container, Table, Card, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';


interface Aluno {
    id?: number;
    nome: string;
    sobrenome: string;
    dataNascimento: string; 
    cpf: string;
    rg: string;
    isAtivo: boolean;
    endereco: string;
    responsavelLegal: string;
}

const dadosFormularioIniciais: Aluno = {
    id: undefined,
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    isAtivo: true,
    endereco: '',
    responsavelLegal: ''
};

const Alunos: React.FC = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunosFiltrados, setAlunosFiltrados] = useState<Aluno[]>([]);
    const [termoBusca, setTermoBusca] = useState<string>(''); 
    const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<boolean>(false);
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [dadosFormulario, setDadosFormulario] = useState<Aluno>(dadosFormularioIniciais);
    const navegar = useNavigate();

    const buscarDados = async () => {
        setCarregando(true);
        try {
            const resposta = await Axios.get<{ content: Aluno[] }>('http://localhost:8080/api/alunos');
            setAlunos(resposta.data.content || []);
            setAlunosFiltrados(resposta.data.content || []); 
        } catch (err) {
            setErro('Erro ao buscar alunos.');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    const handleExcluir = async () => {
        if (!window.confirm('Deseja realmente excluir os alunos selecionados?')) return;
        setCarregando(true);
        try {
            await Promise.all(alunosSelecionados.map(id => 
                Axios.delete(`http://localhost:8080/api/alunos/${id}`)
            ));
            buscarDados();
            setSucesso(true);
            setTimeout(() => setSucesso(false), 3000);
        } catch (err) {
            setErro('Erro ao excluir alunos.');
        } finally {
            setCarregando(false);
        }
    };

    const handleMostrar = () => {
        setDadosFormulario(dadosFormularioIniciais); 
        setMostrarModal(true); 
    };

    const handleFechar = () => setMostrarModal(false);

    const handleAlterar = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDadosFormulario((dadosAntigos) => ({ ...dadosAntigos, [name]: value }));
    };

    const handleSelecionarAluno = (id: number) => {
        setAlunosSelecionados((alunosSelecionadosAntigos) =>
            alunosSelecionadosAntigos.includes(id)
                ? alunosSelecionadosAntigos.filter((idSelecionado) => idSelecionado !== id)
                : [...alunosSelecionadosAntigos, id]
        );
    };

    const handleBuscar = (e: ChangeEvent<HTMLInputElement>) => {
        const termoBusca = e.target.value.toLowerCase();
        setTermoBusca(termoBusca);
        const alunosFiltrados = alunos.filter(aluno => 
            aluno.nome.toLowerCase().includes(termoBusca) || 
            aluno.sobrenome.toLowerCase().includes(termoBusca) ||
            aluno.cpf.includes(termoBusca)
        );
        setAlunosFiltrados(alunosFiltrados);
    };

    const handleSubmeter = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCarregando(true);
        try {
            if (dadosFormulario.id) {
                await Axios.put(`http://localhost:8080/api/alunos/${dadosFormulario.id}`, dadosFormulario);
            } else {
                await Axios.post('http://localhost:8080/api/alunos', dadosFormulario);
            }
            handleFechar();
            buscarDados();
            setSucesso(true);
            setTimeout(() => setSucesso(false), 3000);
        } catch (err) {
            setErro('Erro ao salvar aluno.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Lista de Alunos</h2>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={handleExcluir} disabled={alunosSelecionados.length === 0}>
                        <FaTrash className="me-2" /> Apagar Selecionados
                    </Button>
                    <Button variant="primary" onClick={handleMostrar}>
                        <FaPlusCircle className="me-2" /> Cadastrar Aluno
                    </Button>
                </div>
            </div>

            <Form.Control 
                type="text" 
                placeholder="Pesquisar por nome, sobrenome ou CPF..." 
                value={termoBusca} 
                onChange={handleBuscar} 
                className="mb-3"
            />

            {erro && <Alert variant="danger">{erro}</Alert>}
            {sucesso && <Alert variant="success">Operação realizada com sucesso!</Alert>}

            {carregando ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Card className="shadow-sm p-3 mb-5 bg-body rounded">
                    <Table striped bordered hover responsive>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Data de Nascimento</th>
                                <th>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunosFiltrados.map((aluno) => (
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.sobrenome}</td>
                                    <td>{aluno.dataNascimento}</td>
                                    <td>{aluno.cpf}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            <Modal show={mostrarModal} onHide={handleFechar}>
                <Modal.Header closeButton>
                    <Modal.Title>{dadosFormulario.id ? 'Editar Aluno' : 'Cadastrar Aluno'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmeter}>
                        <Form.Group controlId="nome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nome" 
                                value={dadosFormulario.nome} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="sobrenome" className="mb-3">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="sobrenome" 
                                value={dadosFormulario.sobrenome} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="cpf" className="mb-3">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="cpf" 
                                value={dadosFormulario.cpf} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="rg" className="mb-3">
                            <Form.Label>RG</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="rg" 
                                value={dadosFormulario.rg} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="dataNascimento" className="mb-3">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="dataNascimento" 
                                value={dadosFormulario.dataNascimento} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="responsavelLegal" className="mb-3">
                            <Form.Label>Responsável Legal</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="responsavelLegal" 
                                value={dadosFormulario.responsavelLegal} 
                                onChange={handleAlterar} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="endereco" className="mb-3">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="endereco" 
                                value={dadosFormulario.endereco} 
                                onChange={handleAlterar} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={carregando}>
                            {carregando ? <Spinner animation="border" size="sm" /> : 'Salvar'}
                        </Button>
                        <Button variant="secondary" onClick={handleFechar}>
                            Cancelar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Alunos;
