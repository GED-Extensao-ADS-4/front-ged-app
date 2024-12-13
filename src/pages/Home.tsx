import { ReactElement } from "react";
import "../assets/css/pages/home.css"
import { Row } from "react-bootstrap";
import Card from "../components/Home/Card";


/**
 * @description Página inicial.
 * @uses components/layout/Layout.tsx
 * @since 31/10/2024
 * @author Lucas Ronchi <@lucas0headshot> & Bruno Jucoski <@brunojucoski>
 */
const Home = (): ReactElement => (
  <>
    <Card titulo="Documentos" icone={<i className="fa-solid fa-folder-open icones"></i>} link="documentos"></Card>
    <Card titulo="Alunos" icone={<i className="fa-solid fa-address-book icones"></i>} link="alunos"></Card>
  </>
);

export default Home;
