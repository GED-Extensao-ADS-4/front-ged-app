import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Pagina404 from "./pages/404";

/**
 * @description Rotas da App.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 */
const Rotas = (): ReactElement => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="*" element={<Pagina404 />} />
            </Route>

            //TODO: add rotas privadas
        </Routes>
    </BrowserRouter>
);

export default Rotas;