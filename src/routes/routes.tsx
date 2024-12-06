import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import RotasPrivadas from "./RotasPrivadas";
import { estaAutenticado } from "../services/auth";
import Cadastro from "../pages/Cadastro";

/**
 * @description Rotas da App.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 * @see https://dev.to/franklin030601/route-protection-with-react-router-dom-12gm
 */
const Rotas = (): ReactElement => (
    <BrowserRouter>
        <Routes>
            {
                estaAutenticado()
                    ? <Route path="/*" element={<RotasPrivadas />} />
                    : <Route path="/entrar" element={<Login />} />
            }

            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<Navigate to="/entrar" />} />
        </Routes>
    </BrowserRouter>
);

export default Rotas;