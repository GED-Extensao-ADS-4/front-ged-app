import { ReactElement } from "react";
import { Modal } from "react-bootstrap";

interface ModalProps {
    item: string,
}

const ModalDelecaoConfirmacao = (props: ModalProps): ReactElement => (
    <div className="modal show">
        <Modal.Dialog>
            <Modal.Body>
                <p>{props.item} deletado com sucesso</p>
            </Modal.Body>
        </Modal.Dialog>
    </div>
);

export default ModalDelecaoConfirmacao;