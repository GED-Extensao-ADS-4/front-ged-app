/**
 * @description Chave para o token JWT.
 * @author Lucas Ronchi <@lucas0headshot>
 * @since 25/11/2024
 * @see https://blog.rocketseat.com.br/reactjs-autenticacao/
 */
export const TOKEN_KEY: string = "@ged-apae-token";


/**
 * @description Retorna o token do localStorage.
 * @author Lucas Ronchi <@lucas0headshot>
 * @see https://blog.rocketseat.com.br/reactjs-autenticacao/
 * @return {string|null} 
 */
export const getToken = (): string|null => localStorage.getItem(TOKEN_KEY);


/**
 * @description Retorna se o usuário está autenticado.
 * @since 25/11/2024
 * @author Lucas Ronchi <@lucas0headshot>
 * @see https://blog.rocketseat.com.br/reactjs-autenticacao/
 * @return {boolean}
 */
export const estaAutenticado = (): boolean => getToken() !== null;


/**
 * @description Seta o token no localStorage.
 * @author Lucas Ronchi <@lucas0headshot>
 * @see https://blog.rocketseat.com.br/reactjs-autenticacao/
 * @since 25/11/2024
 * @param {string} token
 * @return {void} 
 */
export const login = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const cadastro = (token: string): void => localStorage.setItem(TOKEN_KEY, token);


/**
 * @description Remove o token do localStorage.
 * @author Lucas Ronchi <@lucas0headshot>
 * @see https://blog.rocketseat.com.br/reactjs-autenticacao/
 * @since 25/11/2024
 * @return {void}
 */
export const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};