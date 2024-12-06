import { ReactNode } from "react";
import { ReactElement } from "react";
import { Modal, Button } from "react-bootstrap";

export interface ModalGenericoProps {
  visivel: boolean;
  titulo?: string;
  mensagem?: string;
  conteudo?: ReactNode;
  textoConfirmar?: string;
  textoCancelar?: string;
  esconderBotaoFechar?: boolean;
  aoConfirmar?: () => void;
  aoCancelar?: () => void;
}

const ModalGenerico = ({
  visivel,
  titulo,
  mensagem,
  conteudo,
  textoConfirmar,
  textoCancelar,
  esconderBotaoFechar,
  aoConfirmar,
  aoCancelar,
}: ModalGenericoProps): ReactElement => (
  <Modal show={visivel} onHide={aoCancelar} centered>
    {titulo && (
      <Modal.Header closeButton={!esconderBotaoFechar}>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
    )}

    <Modal.Body>
      {mensagem && <p>{mensagem}</p>}
      {conteudo}
    </Modal.Body>
    
    <Modal.Footer>
      {aoCancelar && (
        <Button variant="secondary" onClick={aoCancelar}>
          {textoCancelar}
        </Button>
      )}
      
      {aoConfirmar && (
        <Button variant="primary" onClick={aoConfirmar}>
          {textoConfirmar}
        </Button>
      )}
    </Modal.Footer>
  </Modal>
);

export default ModalGenerico;
