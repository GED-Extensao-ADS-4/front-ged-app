import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/layout/Layout";
import HomeAlunos from "../pages/alunos/HomeAlunos";
import HomeDocumentos from "../pages/documentos/HomeDocumentos";
import DocumentosPage from "../pages/documentos/DocumentosPage";
import DocumentosCadastro from "../pages/documentos/DocumentosCadastro";
import DetalhesUsuario from "../pages/usuario/DetalhesUsuario";

/**
 * @description Rotas privadas da App.
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 * @see https://dev.to/franklin030601/route-protection-with-react-router-dom-12gm
 */
const RotasPrivadas = (): ReactElement => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="alunos" element={<HomeAlunos />} />
            <Route path="documentos" element={<DocumentosPage />} />
            <Route path="/cadastrar" element={<DocumentosCadastro />} />

            <Route path="usuario" element={<DetalhesUsuario />} />


        </Route>
    </Routes>
);

export default RotasPrivadas;