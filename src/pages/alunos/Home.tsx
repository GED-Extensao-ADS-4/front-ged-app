import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Container, Form, Spinner, Table } from "react-bootstrap";
import Icone from "../../components/common/Icone";
import Botao from "../../components/common/Botao";
import api from "../../services/api";
import Aluno from "../../models/Aluno";
import formatarCPF from "../../helpers/formatarCPF";
import formatarData from "../../helpers/formatarData";
import "../../assets/css/pages/aluno.css";
import { useNavigate } from "react-router-dom";

/**
 * @description Pág dos Alunos.
 * @author Lucas Ronchi <@lucas0headshot>, Manuella <@manuela.sventnickas>, Leonardo <@ctrl-Leonardo> & Gabriel Zomer <@Carrerogabriel>
 * @since 25/11/2024
 */
const Home = (): ReactElement => {
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunosFiltrados, setAlunosFiltrados] = useState<Aluno[]>([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState<number | null>(null);

    const [termoBusca, setTermoBusca] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [erro, setErro] = useState<boolean>(false);

    const handleBuscar = (e: ChangeEvent<HTMLInputElement>) => {
        setTermoBusca(e.target.value.toLowerCase());
        setAlunosFiltrados(alunos.filter(aluno =>
            aluno.nome.toLowerCase().includes(termoBusca) ||
            aluno.cpf.includes(termoBusca)
        ));
    };

    const handleCadastrarAluno = () => {
        navigate("/alunos/cadastrar");
    };

    const handleEditarAluno = () => {
        if (!alunoSelecionado)
            throw new Error("handleEditarAluno: nenhum aluno selecionado");

        navigate(`/alunos/editar/${alunoSelecionado}`);
    };

    const handleSelecionarAluno = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlunoSelecionado(Number(e.target.value));
    };

    const buscarDados = async () => {
        setCarregando(true);

        try {
            const resposta = await api.get<{ content: Aluno[] }>('/alunos/all');
            setAlunos(resposta.data || []);
            setAlunosFiltrados(resposta.data || []);
        } catch (err) {
            setErro(true);
            console.error("Erro ao buscar alunos:", err);
        } finally {
            setCarregando(false);
        }
    };

    const handleInativarAluno = async () => {
        if (!alunoSelecionado)
            throw new Error("handleInativarAluno: nenhum aluno selecionado");

        if (window.confirm("Deseja realmente excluir o aluno?")) {
            const response = await api.delete(`/alunos/${alunoSelecionado}`);

            if (response.status === 200) {
                alert("Aluno excluído com sucesso!");
                buscarDados();
            } else
                alert("Erro ao excluir aluno!");
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="">
                    <h2 className="text-primary">Alunos</h2>
                    <Form.Control type="text" placeholder="Pesquisar..." value={termoBusca} onChange={handleBuscar} className="border border-primary rounded-1" />
                </div>

                <div className="d-flex gap-2">
                    <Botao variant="primary" icone={<Icone nome="plus-circle" />} onClick={handleCadastrarAluno}  texto="Cadastrar" />
                    <Botao variant="primary" icone={<Icone nome="pencil" />} onClick={handleEditarAluno} disabled={!alunoSelecionado}  texto="Editar" />
                    <Botao variant="primary" icone={<Icone nome="trash" />} onClick={handleInativarAluno} disabled={!alunoSelecionado} texto="Excluir" />
                </div>
            </div>

            {carregando ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table borderless={true} hover responsive>
                    <thead className="">
                        <tr className="thead-azul">
                            <th></th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Responsável Legal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {erro ? (
                            <tr className="border border-primary">
                                <td colSpan={5} className="text-center">Erro ao buscar alunos...</td>
                            </tr>
                        ) : (
                            alunosFiltrados.length === 0 ? (
                                <tr className="border border-primary">
                                    <td colSpan={5} className="text-center">Nenhum aluno encontrado...</td>
                                </tr>
                            )   :
                                    alunosFiltrados.map(aluno => (
                                        <tr key={aluno.id} className="border border-primary tr-azul">
                                            <td>
                                                <Form.Check type="radio" name="alunoSelecionado" checked={alunoSelecionado === aluno.id} value={aluno.id} onChange={handleSelecionarAluno} />
                                            </td>
                                            <td>{aluno.nome}</td>
                                            <td>{formatarCPF(aluno.cpf)}</td>
                                            <td>{formatarData(aluno.dataNascimento)}</td>
                                            <td>{formatarCPF(aluno.cpfResponsavel)}</td>
                                        </tr>
                                    ))
                            )
                        }
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Home;