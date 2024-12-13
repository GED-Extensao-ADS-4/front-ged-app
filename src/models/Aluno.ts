/**
 * @description Interface de Aluno.
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
interface Aluno {
    id?: number;
    nome: string;
    dataNascimento: string;
    cpf: string;
    cpfResponsavel: string;
    isAtivo?: boolean;
    telefone: string;
    sexo: string;
    deficiencia: string;
    dataEntrada?: string;
    observacoes: string;
    endereco: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
    cep: string;
}

export default Aluno;