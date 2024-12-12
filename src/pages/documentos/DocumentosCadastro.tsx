import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Documento = {
  nome: string;
  tipoDocumento: string;
  tipoArquivo: string;
  prevVersion?: number;
  file: File | null;
};

const DocumentosCadastro: React.FC = () => {
  const navigate = useNavigate();
  const [documento, setDocumento] = useState<Documento>({
    nome: "",
    tipoDocumento: "",
    tipoArquivo: "",
    prevVersion: undefined,
    file: null,
  });

  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDocumento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumento((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documento.file) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", documento.nome);
    formData.append("tipoDocumento", documento.tipoDocumento);
    formData.append("tipoArquivo", documento.tipoArquivo);
    if (documento.prevVersion) {
      formData.append("prevVersion", documento.prevVersion.toString());
    }
    formData.append("file", documento.file);

    try {
      const response = await axios.post(
        "http://localhost:8080/documentos/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setDocumentos((prev) => [...prev, response.data]);
      setDocumento({
        nome: "",
        tipoDocumento: "",
        tipoArquivo: "",
        prevVersion: undefined,
        file: null,
      });
    } catch (error) {
      console.error("Erro ao enviar o documento:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Cadastro de Documentos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            value={documento.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tipoDocumento" className="form-label">
            Tipo de Documento
          </label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            className="form-select"
            value={documento.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="HISTORICO_ESCOLAR">HISTÓRICO ESCOLAR</option>
            <option value="CERTIFICADO_CONCLUSAO">
              CERTIFICADO DE CONCLUSÃO
            </option>
            <option value="TRABALHO_ACADEMICO">TRABALHO ACADÊMICO</option>
            <option value="PLANO_ENSINO">PLANO DE ENSINO</option>
            <option value="ATESTADO_MATRICULA">ATESTADO DE MATRÍCULA</option>
            <option value="COMPROVANTE_ENDERECO">
              COMPROVANTE DE ENDEREÇO
            </option>
            <option value="REQUERIMENTO_ALUNO">REQUERIMENTO DO ALUNO</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="tipoArquivo" className="form-label">
            Tipo de Arquivo
          </label>
          <select
            id="tipoArquivo"
            name="tipoArquivo"
            className="form-select"
            value={documento.tipoArquivo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="TXT">TXT</option>
            <option value="PPTX">PPTX</option>
            <option value="ZIP">ZIP</option>
            <option value="RAR">RAR</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Arquivo
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>

        <button onClick={() => navigate("/documentos")} type="submit" className="btn btn-primary">
          Enviar
        </button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate("/documentos")}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default DocumentosCadastro;
