import { useContext } from "react";
import ReviewContext from "./ReviewContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {
  const {
    alerta,
    setAlerta,
    listaObjetos,
    remover,
    setEditar,
    setObjeto,
    recuperar,
    recuperarComentarios,
  } = useContext(ReviewContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviews</h1>
      <Alerta alerta={alerta} />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalEdicao"
        onClick={() => {
          setEditar(false);
          setAlerta({ status: "", message: "" });
          setObjeto({
            codigo: 0,
            nota: "",
            descricao: "",
            serie: "",
          });
        }}
      >
        Novo
      </button>
      {listaObjetos.length === 0 && <h1>Nenhum review encontrado</h1>}
      {listaObjetos.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Ações
                </th>
                <th scope="col">Código</th>
                <th scope="col">Nota</th>
                <th scope="col">Descrição</th>
                <th scope="col">Série</th>
              </tr>
            </thead>
            <tbody>
              {listaObjetos.map((objeto) => (
                <tr key={objeto.codigo}>
                  <td align="center">
                    <button
                      className="btn btn-info"
                      title="Editar"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEdicao"
                      onClick={() => {
                        recuperar(objeto.codigo);
                        setEditar(true);
                        setAlerta({ status: "", message: "" });
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      title="Remover"
                      onClick={() => remover(objeto)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn btn-success"
                      title="Comentarios"
                      onClick={() => {
                        recuperarComentarios(objeto.codigo);
                        setAlerta({ status: "", message: "" });
                      }}
                    >
                      <i class="bi bi-bookmark-star"></i>
                    </button>
                  </td>
                  <th scope="row">{objeto.codigo}</th>
                  <td>{objeto.numero}</td>
                  <td>{objeto.descricao}</td>
                  <td>{objeto.nomeserie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Tabela;
