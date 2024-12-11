import { useState } from "react";
import * as axios from "axios";
import ModalGenerico from "./ModalGenerico"; 

interface InativarAlunoModalProps {
  alunoId: number;
  visivel: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const InativarAlunoModal: React.FC<InativarAlunoModalProps> = ({
  alunoId,
  visivel,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmar = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      
      await axios.patch(`/api/alunos/${alunoId}/inativar`);
      
      onSuccess();
      onClose();
    } catch (error) {
      setErrorMessage("Erro ao inativar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalGenerico
      visivel={visivel}
      titulo="Confirmar Inativação"
      mensagem="Tem certeza que deseja inativar este aluno?"
      textoConfirmar={loading ? "Processando..." : "Confirmar"}
      textoCancelar="Cancelar"
      aoConfirmar={handleConfirmar}
      aoCancelar={onClose}
      esconderBotaoFechar={loading} // Evita fechamento enquanto processa
    >
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </ModalGenerico>
  );
};

export default InativarAlunoModal;
