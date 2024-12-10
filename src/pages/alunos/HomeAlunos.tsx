import { ReactElement, useState } from "react";
import "./HomeAlunos.css";
import "./aluno.css";

/**
 * @description Página de Cadastro de Alunos.
 * @uses API /api/alunos
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
const HomeAlunos = (): ReactElement => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    cpf: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    cep: "",
    cpfResponsavel: "",
    sexo: "",
    telefone: "",
    deficiencia: "",
    dataEntrada: "",
    observacoes: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Atualiza os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Valida os campos obrigatórios
  const validateForm = (): string | null => {
    const requiredFields = [
      "nome",
      "sobrenome",
      "dataNascimento",
      "cpf",
      "estado",
      "cidade",
      "bairro",
      "rua",
      "numero",
      "cep",
      "cpfResponsavel",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return `O campo "${field}" é obrigatório.`;
      }
    }

    return null;
  };

  // Submete o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage(null);
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao salvar aluno.");
      }

      setSuccessMessage("Aluno cadastrado com sucesso!");
      setFormData({
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        cpf: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        complemento: "",
        cep: "",
        cpfResponsavel: "",
        sexo: "",
        telefone: "",
        deficiencia: "",
        dataEntrada: "",
        observacoes: "",
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao salvar aluno. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Aluno</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos do Formulário */}
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Sobrenome", name: "sobrenome", type: "text" },
          { label: "Data de Nascimento", name: "dataNascimento", type: "date" },
          { label: "CPF", name: "cpf", type: "text" },
          { label: "Estado", name: "estado", type: "text" },
          { label: "Cidade", name: "cidade", type: "text" },
          { label: "Bairro", name: "bairro", type: "text" },
          { label: "Rua", name: "rua", type: "text" },
          { label: "Número", name: "numero", type: "text" },
          { label: "Complemento", name: "complemento", type: "text" },
          { label: "CEP", name: "cep", type: "text" },
          { label: "CPF do Responsável", name: "cpfResponsavel", type: "text" },
          { label: "Sexo", name: "sexo", type: "select", options: ["Masculino", "Feminino", "Outro"] },
          { label: "Telefone", name: "telefone", type: "text" },
          { label: "Deficiência", name: "deficiencia", type: "text" },
          { label: "Data de Entrada", name: "dataEntrada", type: "date" },
          { label: "Observações", name: "observacoes", type: "text" },
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label>{field.label}:</label>
            {field.type === "select" ? (
              <select name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange}>
                <option value="">Selecione</option>
                {field.options!.map((option, idx) => (
                  <option value={option} key={idx}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input type={field.type} name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange} />
            )}
          </div>
        ))}

        {/* Exibição de Erros e Sucessos */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        {/* Botões */}
        <div className="buttons">
          <button type="reset" onClick={() => setFormData({ ...formData, nome: "", sobrenome: "", cpf: "", ... })}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeAlunos;

