import { ReactElement } from "react";
import "../assets/css/pages/home.css"
import { Row } from "react-bootstrap";
import Card from "../components/Home/Card";
import { BsFileText } from "react-icons/bs";


/**
 * @description Página inicial.
 * @uses components/layout/Layout.tsx
 * @since 31/10/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
const Home = (): ReactElement => (
    <div className="fundo"> 
    <Row>
        <Card titulo="Documentos" icone="folder-fill" link="documentos"></Card>
        <Card titulo="Digitalização" icone="folder-fill" link="digitalizacao"></Card>
        <Card titulo="Relatórios" icone={<BsFileText />} link="relatorios"></Card>
        <Card titulo="Alunos" icone="folder-fill" link="alunos"></Card>
        <Card titulo="Configurações" icone="engine" link="configuracoes"></Card>
        <Card titulo="Histórico" icone="history" link="Histórico"></Card>
    </Row>
    </div>
);

export default Home;
