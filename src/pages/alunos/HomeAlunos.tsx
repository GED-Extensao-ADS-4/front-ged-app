import { ReactElement } from "react";

/**
 * @description Página dos Alunos.
 * @uses components/layout/Layout.tsx
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
const HomeAlunos = (): ReactElement => (
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('/api/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      alert("Erro ao carregar a lista de alunos.");
    }
  };

  const inativarAluno = async (alunoId: number) => {
    if (!window.confirm("Tem certeza que deseja inativar este aluno?")) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`/api/alunos/${alunoId}/inativar`);
      alert("Aluno inativado com sucesso!");
      // Atualizar a lista após inativação
      setAlunos((prevAlunos) =>
        prevAlunos.map((aluno) =>
          aluno.id === alunoId ? { ...aluno, ativo: false } : aluno
        )
      );
    } catch (error) {
      console.error("Erro ao inativar aluno:", error);
      alert("Erro ao inativar. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div>
      <h1>Lista de Alunos</h1>
      {isLoading && <p>Carregando...</p>}
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.nome} - {aluno.ativo ? "Ativo" : "Inativo"}
            {aluno.ativo && (
              <button onClick={() => inativarAluno(aluno.id)}>Inativar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

export default HomeAlunos;
