import { ReactElement, useEffect, useState } from "react";
import { Col, Container, Form, InputGroupProps, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ModelAluno from "../../models/Aluno";
import InputMask from "react-input-mask";
import SelectEstados from "../../components/alunos/SelectEstados";
import Botao from "../../components/common/Botao";

/**
 * @description Página de Cadastro de Alunos.
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot> & Manuella <@manuela.sventnickas>
 */
const Aluno = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState<boolean>(false);
  const [formData, setFormData] = useState<ModelAluno>({
    nome: '',
    dataNascimento: '',
    cpf: '',
    cpfResponsavel: '',
    isAtivo: true,
    telefone: '',
    sexo: '',
    deficiencia: '',
    observacoes: '',
    endereco: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: 0,
    complemento: '',
  });

  useEffect(() => {
    if (id) {
      fetchAluno();
    }
  }, [id]);

  const fetchAluno = async () => {
    setCarregando(true);

    try {
      const response = await api.get<{ content: ModelAluno }>(`/alunos/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error('Erro ao realizar GET em aulas:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = id ? `/alunos/${id}` : '/alunos/create';
      const method = id ? "put" : "post";

      const response = await api[method](endpoint, formData);

      if ([200, 201].includes(response.status)) {
        alert(`Aluno ${id ? "editado" : "cadastrado"} com sucesso!`);
        navigate("/alunos");
      }
    } catch (err) {
      console.error("Erro ao realizar POST/PUT em aluno:", err);
    }
  };

  return (
    <Container>
      <h1 className="my-4">{ id ? "Editar" : "Cadastrar" } Aluno</h1>

      {carregando ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <Row className="gap-2 p-0 m-0 row-cols-1">
            <Form.Group controlId="nome" as={Col}>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" minLength={3} value={formData.nome} onChange={handleChange} required placeholder="Digite o nome" />
            </Form.Group>

            <Form.Group controlId="dataNascimento" as={Col}>
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} max={new Date().toISOString().split("T")[0]} required />
            </Form.Group>

            <Form.Group controlId="cpf" as={Col}>
              <Form.Label>CPF</Form.Label>
              <InputMask mask="999.999.999-99" value={formData.cpf} onChange={handleChange} >
                {(inputProps: InputGroupProps) => (
                  <Form.Control {...inputProps} type="text" name="cpf" placeholder="Digite o CPF" required />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group controlId="cpfResponsavel" as={Col}>
              <Form.Label>CPF do Responsável</Form.Label>
              <InputMask mask="999.999.999-99" value={formData.cpfResponsavel} onChange={handleChange} >
                {(inputProps: InputGroupProps) => (
                  <Form.Control {...inputProps} type="text" name="cpfResponsavel" placeholder="Digite o CPF do responsável" required />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group controlId="telefone" as={Col}>
              <Form.Label>Telefone</Form.Label>
              <InputMask mask="(99) 99999-9999" value={formData.telefone} onChange={handleChange} >
                {(inputProps: InputGroupProps) => (
                  <Form.Control {...inputProps} type="text" name="telefone" placeholder="Digite o telefone" required />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group controlId="sexo" as={Col}>
              <Form.Label>Sexo</Form.Label>
              <Form.Select name="sexo" value={formData.sexo} onChange={handleChange} required >
                <option selected disabled value="">Selecione o sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="deficiencia" as={Col}>
              <Form.Label>Deficiência</Form.Label>
              <Form.Control type="text" name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Digite a deficiência" />
            </Form.Group>

            <Form.Group controlId="observacoes" as={Col}>
              <Form.Label>Observações</Form.Label>
              <Form.Control as="textarea" name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Adicione observações" rows={3} />
            </Form.Group>

            <Form.Group controlId="endereco" as={Col}>
              <Form.Label>Endereço</Form.Label>
              <Row className="gap-2">
                <Col sm={6}>
                  <SelectEstados controlId="estado" value={formData.estado} onChange={handleChange} />
                </Col>

                <Col>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" name="cidade" value={formData.cidade} onChange={handleChange} required placeholder="Digite a cidade" />
                </Col>

                <Col>
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control type="text" name="bairro" value={formData.bairro} onChange={handleChange} required placeholder="Digite o bairro" />
                </Col>
              </Row>
              <Row className="gap-2">
                <Col>
                  <Form.Label>Rua</Form.Label>
                  <Form.Control type="text" name="rua" value={formData.rua} onChange={handleChange} required placeholder="Digite a rua" />
                </Col>

                <Col>
                  <Form.Label>Número</Form.Label>
                  <Form.Control type="number" name="numero" value={formData.numero} onChange={handleChange} required min={1} placeholder="Digite o número" />
                </Col>

                <Col>
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Digite o complemento" />
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <div className="d-flex justify-content-center gap-2">
            <Botao texto="Salvar" icone={<></>} type="submit" className="btn-md" />
            <Botao texto="Cancelar" icone={<></>} type="button" variant="secondary" onClick={() => navigate("alunos")} className="btn-md" />
          </div>
        </Form>
      )}
    </Container>
  );
};

export default Aluno;
