import { ReactElement } from 'react'
import { Container, Row } from 'react-bootstrap'
import BarreiraContraErros from './BarreiraContraErros';
import { Outlet } from 'react-router-dom';

/**
 * @description Layout do App. Contém a estrutura base da pág.
 * @see https://react-bootstrap.github.io/docs/layout/grid
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 */
const Layout = (): ReactElement => (
    <>
        //TODO: add Header, Footer e etc
        <Container>
            <Row>
                <BarreiraContraErros>
                    <Outlet />
                </BarreiraContraErros>
            </Row>
        </Container>
    </>
);

export default Layout;
