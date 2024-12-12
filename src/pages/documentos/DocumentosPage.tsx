import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Alert, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import '../../assets/css/pages/documentos.css'
import api from "../../services/api";

interface Document {
  id: number;
  nome: string;
  dataUpload: string;
  dataDownload?: string;
  dataUpdate?: string;
  tipoDocumento: string;
  tipoArquivo: string;
  aluno: { id: number; nome: string, cpf: string, deficiencia: string };
  downloadedBy: { id: number; nome: string };
  uploadedBy: { id: number; nome: string };
  prevVersion: { id: number; titulo: string };
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
      const response = await api.get<{ content: Document[] }>('/documentos/list');
      setDocuments(response.data || []);
      setFilteredDocuments(response.data || []); 

      console.log(response);
      
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
      document.nome.toLowerCase().includes(term)
    );
    setFilteredDocuments(filtered);
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Documentos</h1>
        <div>
          <Button variant="primary" className="me-2 button-blue">
            <FaPlusCircle className="me-1" /> Cadastrar
          </Button>
          <Button variant="primary" className="me-2 button-blue">
            <FaEdit className="me-1" /> Editar
          </Button>
        </div>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Pesquisar"
          aria-describedby="search-button"
        />
        <Button variant="outline-secondary" id="search-button">
          <i className="search"></i>
        </Button>
      </InputGroup>

      {error && <Alert variant="danger">{error}</Alert>}

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
              <th>Tipo de Arquivo</th>
              <th>Data de Upload</th>
              <th>Data Download</th>
              <th>Categoria</th>
              <th>Baixado por</th>
              <th>Enviado por</th>
              <th>Nome do Aluno</th>
              <th>Cpf do Aluno</th>
              <th>Deficiencia do Aluno</th>
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
                <td>{document.nome}</td>
                <td>{document.tipoDocumento}</td>
                <td>{document.tipoArquivo}</td>
                <td>{document.dataUpload}</td>
                <td>{document.dataDownload || 'Sem data'}</td>
                <td>{document.tipoArquivo}</td>
                <td>{document.downloadedBy?.nome || 'Sem nome'}</td>
                <td>{document.uploadedBy?.nome || "Não informado"}</td>
                <td>{document.aluno?.nome || "Não informado"}</td>
                <td>{document.aluno?.cpf || "Não informado"}</td>
                <td>{document.aluno?.deficiencia || "Não informado"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Pagination className="justify-content-end">
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default DocumentosPage;
