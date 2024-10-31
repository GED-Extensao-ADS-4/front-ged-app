import { ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

/**
 * @description Rotas da App.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 */
const Rotas = (): ReactElement => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />

            //TODO: add rotas privadas

            <Route path="*" element={<h1>Eita, não encontramos esta página...</h1>} />
        </Routes>
    </BrowserRouter>
);

export default Rotas;