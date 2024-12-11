import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';

interface Coluna {
    chave: string;
    nome: string;
}

interface Filtro {
    chave: string;
    nome: string;
    opcoes: unknown[];
}

interface Acao {
    nome: string;
    onClick: (item: unknown) => void;
    icone: ReactElement;
}

interface CrudContextProps {
    dados: unknown[];

    colunas: Coluna[];

    filtros: Filtro[];

    parametroBusca: string;
    filtroSelecionado: string | null;
    carregando: boolean;
    erro: boolean;
    acoes: Acao[];

    setParametroBusca: (query: string) => void;
    setFiltroSelecionado: (filtro: string | null) => void;
    carregarDados: () => void;
    setFuncaoCarregarDados: (funcao: FuncaoCarregarDados) => void;
}

type FuncaoCarregarDados = (parametroBusca: string, filtroSelecionado: string | null) => Promise<unknown[]>;

const CrudContext = createContext<CrudContextProps | undefined>(undefined);

/**
 * @description Provedor de contexto para CRUD.
 * @author Lucas Ronchi <@lucas0headshot> & Gabriel Zomer
 * @since 11/12/2024
 * @throws {Error} Se a função de carregar dados não for informada.
 */
export const CrudProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dados, setDados] = useState<unknown[]>([]);

    /**
     * @description Colunas da tabela. Setado dinamicamente ao usar o Contexto.
     */
    const [colunas, setColunas] = useState<Coluna[]>([]);

    /**
     * @description Filtros da tabela. Setado dinamicamente ao usar o Contexto.
     */
    const [filtros, setFiltros] = useState<Filtro[]>([]);

    const [parametroBusca, setParametroBusca] = useState<string>("");
    const [filtroSelecionado, setFiltroSelecionado] = useState<string | null>(null);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [erro, setErro] = useState<boolean>(false);

    /**
     * @description Ações da tabela. Setado dinamicamente ao usar o Contexto.
     */
    const [acoes, setAcoes] = useState<Acao[]>([]);

    const [funcaoCarregarDados, setFuncaoCarregarDados] = useState<FuncaoCarregarDados | null>(null);

    const carregarDados = async () => {
        if (!funcaoCarregarDados) {
            setErro(true);
            throw new Error("CrudProvider: Nenhuma função de p/ recuperar dados foi informada");
        }

        setCarregando(true);
        try {
            const dados = await funcaoCarregarDados(parametroBusca, filtroSelecionado);
            setDados(dados);
        } catch (error) {
            setErro(true);
            console.error("Erro ao buscar dados:", error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <CrudContext.Provider
            value={{
                dados,
                colunas,
                filtros,
                parametroBusca,
                filtroSelecionado,
                carregando,
                erro,
                acoes,
                setParametroBusca,
                setFiltroSelecionado,
                carregarDados,
                setFuncaoCarregarDados,
            }}
        >
            {children}
        </CrudContext.Provider>
    );
};



/**
 * @description Hook para usar o CrudContext.
 * @author Lucas Ronchi <@lucas0headshot> & Gabriel Zomer
 * @since 11/12/2024
 * @throws {Error} Se o hook for usado fora do CrudProvider.
 */
export const useCrud = () => {
    const context = useContext(CrudContext);
    if (!context)
        throw new Error("useCrud: deve ser usado com o CrudProvider");

    return context;
};
