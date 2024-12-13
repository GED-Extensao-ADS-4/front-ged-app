import { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import api from '../../services/api'
import Documentos from '../../models/Documentos'


type Props = {
    nome: string
    controlId: string
    className?: string
    idAluno: number
    onChange: () => void
}

const SelectDocumentos = (props: Props) => {

    const [documentos, setDocumentos] = useState<Documentos[]>([]);

    const fetchDocumentos = async () => {
        const response = await api.get<Documentos[]>(`/documentos/list?id=${props.idAluno}`)

        setDocumentos(response.data);
    }

    useEffect(() => {
        fetchDocumentos();
    })

    return (
        <Form.Group controlId={props.controlId} as={Col} className={props.className} >
            <Form.Label>Documento que pode ser vinculado</Form.Label>
            <Form.Control as="select" name={props.nome} onChange={props.onChange}>
                <option value={0}>Nenhum documento a ser Vinculado</option>
                {documentos.map(documento => {
                    return <option key={documento.id} value={documento.id}>{documento.nome}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectDocumentos