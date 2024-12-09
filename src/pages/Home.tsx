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
  
      <Row >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <Card titulo="Documentos" icone={<i class="fa-solid fa-folder-open icones"></i>} link="documentos">
        </Card>
        <Card titulo="Digitalização" icone={<i class="fa-solid fa-file icones"></i>} link="digitalizacao"></Card>
        <Card titulo="Relatórios" icone={<i class="fa-solid fa-rectangle-list icones"></i>} link="relatorios"></Card>
        <Card titulo="Alunos" icone={<i class="fa-solid fa-address-book icones"></i>} link="alunos"></Card>
        <Card titulo="Configurações" icone={<i class="fa-solid fa-gears icones"></i>} link="configuracoes"></Card>
        <Card titulo="Histórico" icone={<i class="fa-solid fa-clock-rotate-left icones"></i>} link="Histórico"></Card>
     
    </Row>
);

export default Home;
