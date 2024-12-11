import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Alert, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import Axios from "axios";
import '../../assets/css/pages/documentos.css'

interface Document {
  id: number;
  titulo: string;
  path: string;
  dataUpload: string;
  dataDownload?: string;
  dataUpdate?: string;
  tipoDocumento: string;
  tipoArquivo: string;
  aluno: { id: number; nome: string };
  downloadedBy?: { id: number; username: string };
  uploadedBy: { id: number; username: string };
  prevVersion?: { id: number; titulo: string };
  isLast: boolean;
}


const DocumentosPage = (): React.ReactElement => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await Axios.get<{ content: Document[] }>('http://localhost:8080/api/documentos'); // Altere para a URL do seu backend
      setDocuments(response.data.content || []);
      setFilteredDocuments(response.data.content || []);
    } catch (err) {
      setError('Erro ao carregar documentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = documents.filter(document =>
      document.nome.toLowerCase().includes(term) ||
      document.descricao.toLowerCase().includes(term) ||
      document.categoria.toLowerCase().includes(term)
    );
    setFilteredDocuments(filtered);
  };

  const handleDelete = async () => {
    if (!window.confirm('Deseja realmente excluir os documentos selecionados?')) return;
    setLoading(true);
    try {
      await Promise.all(selectedDocuments.map(id =>
        Axios.delete(`http://localhost:8080/api/documentos/${id}`)
      ));
      fetchDocuments(); // Recarrega a lista de documentos
    } catch (err) {
      setError('Erro ao excluir documentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDocument = (id: number) => {
    setSelectedDocuments(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Documentos</h1>
        <div>
          <Button variant="primary" className="me-2 button-blue">
            <FaPlusCircle className="me-1" /> Cadastrar
          </Button>
          <Button variant="primary" className="me-2 button-blue">
            <FaEdit className="me-1" /> Editar
          </Button>
          <Button variant="primary" onClick={handleDelete} disabled={selectedDocuments.length === 0}>
            <FaTrash className="me-1 button-blue" /> Excluir
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Pesquisar"
          aria-describedby="search-button"
        />
        <Button variant="outline-secondary" id="search-button">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Table */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check type="checkbox" />
              </th>
              <th>Título</th>
              <th>Tipo de Documento</th>
              <th>Data de Upload</th>
              <th>Categoria</th>
              <th>Aluno</th>
              <th>Enviado por</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document) => (
              <tr key={document.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleSelectDocument(document.id)}
                    checked={selectedDocuments.includes(document.id)}
                  />
                </td>
                <td>{document.titulo}</td>
                <td>{document.tipoDocumento}</td>
                <td>{document.dataUpload}</td>
                <td>{document.tipoArquivo}</td>
                <td>{document.aluno?.nome || "Não informado"}</td>
                <td>{document.uploadedBy?.username || "Não informado"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      <Pagination className="justify-content-end">
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default DocumentosPage;
