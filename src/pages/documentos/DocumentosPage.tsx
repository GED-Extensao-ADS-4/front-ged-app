import React from "react";
import { Table, Button, Form, InputGroup, Pagination } from "react-bootstrap";

/**
 * @description Página dos documentos.
 * @uses components/layout/Layout.tsx
 * @since 06/12/2024
 * @author Douglas <@Douglas-z>
 */
const DocumentosPage = (): ReactElement => {
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Documentos</h1>
        <div>
          <Button variant="primary" className="me-2">
            Cadastrar
          </Button>
          <Button variant="warning" className="me-2">
            Editar
          </Button>
          <Button variant="danger">Excluir</Button>
        </div>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Pesquisar..."
          aria-label="Pesquisar"
          aria-describedby="search-button"
        />
        <Button variant="outline-secondary" id="search-button">
          <i className="bi bi-funnel"></i>
        </Button>
      </InputGroup>

      {/* Table */}
      <Table bordered hover>
        <thead className="table-primary">
          <tr>
            <th>
              <Form.Check type="checkbox" />
            </th>
            <th>Nome do Documento</th>
            <th>Descrição</th>
            <th>Data de Upload</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td>
                <Form.Check type="checkbox" />
              </td>
              <td>Documento {index + 1}</td>
              <td>Descrição do documento {index + 1}</td>
              <td>2024-12-06</td>
              <td>Categoria {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="justify-content-end">
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </div>
  );
};

export default DocumentosPage;
