import { useContext } from "react";
import reviewContext from "./ReviewContext";
import Alerta from '../../comuns/Alerta'

function TabelaComentarios() {

    const { alerta, setAlerta, listaComentarios, removerComentario,
        objeto, setEditarComentario, setComentario, recuperarComentario,
        setExibirComentarios }
        = useContext(reviewContext);

    return (
        <div style={{ padding: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
                setExibirComentarios(false);
                setAlerta({ status: "", message: "" });
            }}>
               Voltar <i className="bi bi-backspace"></i>
            </button>
            <h1>Comentarios da review : {objeto.codigo}</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicaoComentario"
                onClick={() => {
                    setEditarComentario(false);
                    setAlerta({ status: "", message: "" });
                    setComentario({
                        codigo: 0,
                        descricao: "",
                        review: objeto.codigo
                    });
                }}>
                Novo
            </button>
            {listaComentarios.length === 0 &&
                <h1>Nenhum comentario encontrado</h1>}
            {listaComentarios.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaComentarios.map(comentario => (
                                <tr key={comentario.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicaoComentario"
                                            onClick={() => {
                                                recuperarComentario(comentario.codigo);
                                                setEditarComentario(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => removerComentario(comentario)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{comentario.codigo}</th>
                                    <td>{comentario.descricao}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default TabelaComentarios;