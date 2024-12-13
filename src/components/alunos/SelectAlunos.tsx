import { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import Aluno from '../../models/Aluno'
import api from '../../services/api'


type Props = {
    nome: string
    controlId: string
    className?: string //vou deixar, qualquer coisa tiramos depois
    onChange: () => void
}

const SelectAlunos = (props: Props) => {

    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const fetchAlunos = async () => {
        const response = await api.get<Aluno[]>(`/alunos/all`)

        setAlunos(response.data);
    }

    useEffect(() => {
        fetchAlunos();
    }, [])

    return (
        <Form.Group controlId={props.controlId} as={Col} className={props.className}>
            <Form.Label>Alunos</Form.Label>
            <Form.Control as="select" required={true} name={props.nome} onChange={props.onChange}>
                <option disabled value={0}>Selecione um Aluno</option>
                {alunos.map(aluno => {
                    return <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectAlunos