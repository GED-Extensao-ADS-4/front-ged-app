import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Pagination, Alert, Spinner } from "react-bootstrap";
import { FaPlusCircle, FaRecycle } from "react-icons/fa";
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
  const [error, setError] = useState<string | null>(null);
  
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await api.get<{ content: Document[] }>('/documentos/list');
      setDocuments(response.data || []);
      setFilteredDocuments(response.data || []); 

      console.log(response);
      
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar documentos.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);    
    const  response = await api.get<{ content: Document[] }>(`/documentos/list?aluno=${term}`);
    setFilteredDocuments(response.data);
  };

  const handleDownload = async (id: number, nome: string) => {
    try {
      const response = await api.get(`http://localhost:8080/documentos/download/${id}`, {
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nome);
  
      document.body.appendChild(link);
  
      link.click();
  
      link.parentNode?.removeChild(link);
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
    }

    fetchDocuments();
  }

  const handleRedirectToCadastro = () => {    
    window.location.assign('/cadastrar')
  }

  const handleDocumentById = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get<{ content: Document[] }>(`/documentos/${id}`);
      setDocuments(response.data || []);
      setFilteredDocuments(response.data || []); 

      console.log(response);
      
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar documentos.');
    } finally {
      setLoading(false);
    }
  }

  return ( 
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Documentos</h1>
        <div>
          <Button variant="primary" className="me-2 button-blue" onClick={handleRedirectToCadastro} >
            <FaPlusCircle className="me-1" /> Cadastrar
          </Button>
          <Button variant="primary" className="me-2 button-blue" onClick={fetchDocuments} >
            <FaRecycle className="me-1" /> Recarregar
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
              <tr key={document.id} onClick={() => handleDocumentById(document.id)} >
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
                <td><Button variant="secondary" onClick={() => handleDownload(document.id, document.nome)}>Baixar</Button></td>
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
