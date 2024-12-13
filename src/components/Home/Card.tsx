import { ReactElement } from "react";
import { Card as CardBootstrap } from "react-bootstrap";

interface CardProps {
    titulo: string,
    icone: ReactElement,
    link: string
}

/**
 * @description Card usado na pág Home.
 * @since 25/11/2024
 * @see https://react-bootstrap.netlify.app/docs/components/cards/
 */
const Card = (props: CardProps): ReactElement => (
    <CardBootstrap className="card-blue">
        <CardBootstrap.Body className="w-100 d-flex justify-content-center align-items-center flex-column">
            <CardBootstrap.Link className="stretched-link" href={`/${props.link}`} />
            {props.icone}
            <CardBootstrap.Title className="text-yellow fs-2 ">{props.titulo}</CardBootstrap.Title>
        </CardBootstrap.Body>
    </CardBootstrap>
);



export default Card;