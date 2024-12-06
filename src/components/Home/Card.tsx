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
    <CardBootstrap className="card-blue rounded">
        <CardBootstrap.Body>
            <CardBootstrap.Link href={`/${props.link}`}>
                <CardBootstrap.Text>
                    <i className={`bi bi-${props.icone}`}></i>
                </CardBootstrap.Text>
                <CardBootstrap.Title>{props.titulo}</CardBootstrap.Title>
            </CardBootstrap.Link>
        </CardBootstrap.Body>
    </CardBootstrap>
);

export default Card;