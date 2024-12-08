import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Axios from 'axios';
import { Button, Container, Table, Card, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';


interface Student {
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

const initialFormData: Student = {
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

const Students: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formData, setFormData] = useState<Student>(initialFormData);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await Axios.get<{ content: Student[] }>('http://localhost:8080/api/alunos');
            setStudents(response.data.content || []);
            setFilteredStudents(response.data.content || []); 
        } catch (err) {
            setError('Erro ao buscar alunos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!window.confirm('Deseja realmente excluir os alunos selecionados?')) return;
        setLoading(true);
        try {
            await Promise.all(selectedStudents.map(id => 
                Axios.delete(`http://localhost:8080/api/alunos/${id}`)
            ));
            fetchData();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Erro ao excluir alunos.');
        } finally {
            setLoading(false);
        }
    };

    const handleShow = () => {
        setFormData(initialFormData); // **Limpa o formulário ao abrir o modal**
        setShowModal(true); 
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectStudent = (id: number) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = students.filter(student => 
            student.nome.toLowerCase().includes(searchTerm) || 
            student.sobrenome.toLowerCase().includes(searchTerm) ||
            student.cpf.includes(searchTerm)
        );
        setFilteredStudents(filtered);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (formData.id) {
                await Axios.put(`http://localhost:8080/api/alunos/${formData.id}`, formData);
            } else {
                await Axios.post('http://localhost:8080/api/alunos', formData);
            }
            handleClose();
            fetchData();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Erro ao salvar aluno.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Lista de Alunos</h2>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={handleDelete} disabled={selectedStudents.length === 0}>
                        <FaTrash className="me-2" /> Apagar Selecionados
                    </Button>
                    <Button variant="primary" onClick={handleShow}>
                        <FaPlusCircle className="me-2" /> Cadastrar Aluno
                    </Button>
                </div>
            </div>

            <Form.Control 
                type="text" 
                placeholder="Pesquisar por nome, sobrenome ou CPF..." 
                value={searchTerm} 
                onChange={handleSearch} 
                className="mb-3"
            />

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Operação realizada com sucesso!</Alert>}

            {loading ? (
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
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.nome}</td>
                                    <td>{student.sobrenome}</td>
                                    <td>{student.dataNascimento}</td>
                                    <td>{student.cpf}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Editar Aluno' : 'Cadastrar Aluno'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nome" 
                                value={formData.nome} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="sobrenome" className="mb-3">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="sobrenome" 
                                value={formData.sobrenome} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="cpf" className="mb-3">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="cpf" 
                                value={formData.cpf} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="rg" className="mb-3">
                            <Form.Label>RG</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="rg" 
                                value={formData.rg} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="dataNascimento" className="mb-3">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="dataNascimento" 
                                value={formData.dataNascimento} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="responsavelLegal" className="mb-3">
                            <Form.Label>Responsável Legal</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="responsavelLegal" 
                                value={formData.responsavelLegal} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="endereco" className="mb-3">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="endereco" 
                                value={formData.endereco} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Salvar'}
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Students;
