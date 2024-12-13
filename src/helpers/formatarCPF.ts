/**
 * @description Formata um CPF para o padrão brasileiro
 * @since 27/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 */
const formatarCPF = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export default formatarCPF;