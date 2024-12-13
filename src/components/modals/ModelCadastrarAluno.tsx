import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalGenerico, { ModalGenericoProps } from "./ModalGenerico";

interface ModalCadastrarAlunoProps extends Omit<ModalGenericoProps, "conteudo" | "titulo" | "textoConfirmar" | "aoConfirmar"> {
  onSubmit: (
    nome: string, 
    sobrenome: string, 
    dataNascimento: string, 
    cpf: string, 
    isAtivo: boolean, 
    sexo: string, 
    telefone: string, 
    cpfResponsavel: string, 
    deficiencia: string, 
    dataEntrada: string, 
    observacoes: string,
    estado: string, 
    cidade: string, 
    bairro: string, 
    rua: string, 
    numero: number, 
    complemento: string, 
    cep: number
  ) => void;
}

const ModalCadastrarAluno = ({
  visivel,
  aoCancelar,
  onSubmit,
}: ModalCadastrarAlunoProps) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [isAtivo, setIsAtivo] = useState(false);
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfResponsavel, setCpfResponsavel] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState(0);

  const handleConfirmar = () => {
    onSubmit(
      nome, 
      sobrenome, 
      dataNascimento, 
      cpf, 
      isAtivo, 
      sexo, 
      telefone, 
      cpfResponsavel, 
      deficiencia, 
      dataEntrada, 
      observacoes, 
      estado, 
      cidade, 
      bairro, 
      rua, 
      numero, 
      complemento, 
      cep
    );
  };

  return (
    <ModalGenerico
      visivel={visivel}
      titulo="Cadastrar Aluno"
      textoConfirmar="Cadastrar"
      aoConfirmar={handleConfirmar}
      aoCancelar={aoCancelar}
    >
      <Form>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formIsAtivo">
          <Form.Check
            type="checkbox"
            label="Ativo"
            checked={isAtivo}
            onChange={(e) => setIsAtivo(e.target.checked)}
          />
        </Form.Group>

        <Form.Group controlId="formSexo">
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCpfResponsavel">
          <Form.Label>CPF do Responsável</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do responsável"
            value={cpfResponsavel}
            onChange={(e) => setCpfResponsavel(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDeficiencia">
          <Form.Label>Deficiência</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a deficiência (se houver)"
            value={deficiencia}
            onChange={(e) => setDeficiencia(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDataEntrada">
          <Form.Label>Data de Entrada</Form.Label>
          <Form.Control
            type="date"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formObservacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite observações"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </Form.Group>

        <h5>Endereço</h5>

        <Form.Group controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRua">
          <Form.Label>Rua</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNumero">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o número"
            value={numero}
            onChange={(e) => setNumero(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="formComplemento">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o complemento (se houver)"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCep">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(Number(e.target.value))}
          />
        </Form.Group>
      </Form>
    </ModalGenerico>
  );
};

export default ModalCadastrarAluno;
