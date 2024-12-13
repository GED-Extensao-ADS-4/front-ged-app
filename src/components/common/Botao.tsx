import { ReactElement } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface BotaoProps extends ButtonProps {
    icone: ReactElement;
    texto?: string;
}

/**
 * @description Botão padrão.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 28/11/2024
 */
const Botao = (props: BotaoProps): ReactElement => {
    return (
        <Button className="rounded" {...props}>
            {props.texto}
            {props.icone}
        </Button>
    );
};

export default Botao;