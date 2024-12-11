import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Alert, Dropdown } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

/**
 * @description Página de Edição de Documento.
 * @since 09/12/2024
 * @author Renan <@Renan>
 */

const DocumentosEditar = (): JSX.Element => {
  const { id } = useParams(); // Pega o ID do documento da URL
  const navigate = useNavigate();

  // Estado para os dados do documento
  const [documento, setDocumento] = useState({
    nome: "",
    tipoDocumento: "",
    tipoArquivo: "",
    prevVersion: "",
    file: null as File | null,
  });

  // Estado para mensagens de erro ou sucesso
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Simulando a obtenção de um documento
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Aqui você faria uma requisição para pegar os dados reais do documento
      // Exemplo fictício, simulando uma requisição com setTimeout
      setTimeout(() => {
        setDocumento({
          nome: `Documento ${id}`,
          tipoDocumento: "PDF", // Exemplo de tipo
          tipoArquivo: "Texto", // Exemplo de tipo
          prevVersion: `Versão anterior do documento ${id}`,
          file: null,
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleSave = () => {
    if (!documento.nome || !documento.tipoDocumento || !documento.tipoArquivo || !documento.file) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    setError(null); // Limpar erros anteriores
    setLoading(true);
    // Aqui você faria a requisição para salvar as alterações
    console.log("Documento editado:", documento);

    setTimeout(() => {
      setLoading(false);
      // Simulando um redirecionamento para a página de documentos após salvar
      navigate("/documentos");
    }, 1000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocumento({ ...documento, file: event.target.files[0] });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Editar Documento</h1>

      {/* Exibindo mensagem de erro, se houver */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Documento</Form.Label>
          <Form.Control
            type="text"
            value={documento.nome}
            onChange={(e) =>
              setDocumento({ ...documento, nome: e.target.value })
            }
            placeholder="Digite o nome do documento"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Documento</Form.Label>
          <Form.Control
            as="select"
            value={documento.tipoDocumento}
            onChange={(e) =>
              setDocumento({ ...documento, tipoDocumento: e.target.value })
            }
          >
            <option value="">Selecione um tipo</option>
            <option value="HISTORICO_ESCOLAR">HISTÓRICO ESCOLAR</option>
            <option value="CERTIFICADO_CONCLUSAO">CERTIFICADO CONCLUSÃO</option>
            <option value="TRABALHO_ACADEMICO">TRABALHO ACADÊMICO</option>
            <option value="PLANO_ENSINO">PLANO ENSINO</option>
            <option value="ATESTADO_MATRICULA">ATESTADO MATRÍCULA</option>
            <option value="COMPROVANTE_ENDERECO">COMPROVANTE ENDERECO</option>
            <option value="REQUERIMENTO_ALUNO">REQUERIMENTO ALUNO</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Arquivo</Form.Label>
          <Form.Control
            as="select"
            value={documento.tipoArquivo}
            onChange={(e) =>
              setDocumento({ ...documento, tipoArquivo: e.target.value })
            }
          >
            <option value="">Selecione um tipo</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="TXT">TXT</option>
            <option value="PPTX">PPTX</option>
            <option value="ZIP">ZIP</option>
            <option value="RAR">RAR</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Versão Anterior</Form.Label>
          <Form.Control
            type="text"
            value={documento.prevVersion}
            onChange={(e) =>
              setDocumento({ ...documento, prevVersion: e.target.value })
            }
            placeholder="Digite a versão anterior do documento"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arquivo</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="application/pdf, application/msword, image/*"
          />
        </Form.Group>

        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={loading}  // Desabilita o botão durante o carregamento
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate("/documentos")}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default DocumentosEditar;