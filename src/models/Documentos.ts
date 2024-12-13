interface Documentos {
    id: number;
    nome: string;
    dataUpload: string;
    dataDownload?: string;
    dataUpdate?: string;
    tipoDocumento: string;
    tipoArquivo: string;
    aluno: { id: number; nome: string, cpf: string, deficiencia: string };
    downloadedBy: { id: number; nome: string };
    uploadedBy: { id: number; nome: string };
    prevVersion: { id: number; titulo: string };
    isLast: boolean;
}

export default Documentos