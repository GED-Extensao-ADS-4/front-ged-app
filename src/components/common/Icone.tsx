import { ReactElement } from "react";

interface IconeProps {
    nome: string;
    texto?: string;
}

/**
 * @description Ícone usando FontAwesome 4.7
 * @see https://fontawesome.com/v4/icons/
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 30/11/2024
 */
const Icone = (props: IconeProps): ReactElement => {
    return (
        <>
            <i className={`fa fa-${props.nome} mx-1`}></i>
            {props.texto}
        </>
    )
};

export default Icone;