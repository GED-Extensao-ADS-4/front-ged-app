/**
 * @author Lucas Ronchi <@lucas0headshot>
 * @description Formata uma data para o padrão BR.
 * @since 27/11/2024
 */
const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString();
}

export default formatarData;