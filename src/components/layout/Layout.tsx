import { ReactElement } from 'react'
import { Container, Row } from 'react-bootstrap'
import BarreiraContraErros from './BarreiraContraErros';
import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * @description Layout do App. Contém a estrutura base da pág.
 * @see https://react-bootstrap.github.io/docs/layout/grid
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 */
const Layout = (): ReactElement => (
    <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossOrigin="anonymous" />

        <Header />
        <Container className="bg-light" fluid>
            <Row>
                <BarreiraContraErros>
                    <Outlet />
                </BarreiraContraErros>
            </Row>
        </Container>
    </>
);

export default Layout;
