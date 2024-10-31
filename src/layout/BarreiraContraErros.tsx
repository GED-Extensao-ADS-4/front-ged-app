import React, { Component, ErrorInfo, ReactElement } from 'react'
import { Button } from 'react-bootstrap';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * @description Barreira contra erros.
 * @see https://pt-br.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 * @since 31/10/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
class BarreiraContraErros extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Barreira capturou um erro: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <FallbackUI />;
        }

        return this.props.children;
    }
};


/**
 * @description UI de fallback.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 31/10/2024
 */
const FallbackUI = (): ReactElement => (
    <div>
        <h1>Erro inesperado</h1>
        <p>Desculpe, ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
        <Button variant='primary' onClick={() => {location.reload()}}>Tentar novamente</Button>
    </div>
);

export default BarreiraContraErros;
