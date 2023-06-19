import { useState, useEffect } from "react";
import ReviewContext from "./ReviewContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getSeriesAPI } from "../../servicos/SerieServico";
import {
  getReviewsAPI,
  getReviewPorCodigoAPI,
  deleteReviewPorCodigoAPI,
  cadastraReviewsAPI,
} from "../../servicos/ReviewServico";
import {
  getComentariosDaReviewAPI,
  getComentarioPorCodigoAPI,
  deleteComentarioPorCodigoAPI,
  cadastraComentariosAPI,
} from "../../servicos/ComentarioServico";
import FormComentario from "./FormComentario";
import TabelaComentarios from "./TabelaComentarios";
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Serie() {
  let navigate = useNavigate();

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });
  const [carregando, setCarrengando] = useState(true);
  const [listaSeries, setListaSeries] = useState([]);
  const [editarComentario, setEditarComentario] = useState(false);
  const [comentario, setComentario] = useState({
    codigo: "",
    descricao: "",
    numero: "",
    review: "",
  });
  const [listaComentarios, setListaComentarios] = useState([]);
  const [exibirComentarios, setExibirComentarios] = useState(false);

  const recuperarComentarios = async (codigoreview) => {
    try {
      setObjeto(await getReviewPorCodigoAPI(codigoreview));
      setListaComentarios(await getComentariosDaReviewAPI(codigoreview));
      setExibirComentarios(true);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const recuperarComentario = async (codigo) => {
    try {
      setComentario(await getComentarioPorCodigoAPI(codigo));
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const removerComentario = async (comentario) => {
    if (window.confirm("Deseja remover este comentario?")) {
      let retornoAPI = await deleteComentarioPorCodigoAPI(comentario.codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setListaComentarios(await getComentariosDaReviewAPI(objeto.codigo));
    }
  };

  const acaoCadastrarComentario = async (e) => {
    e.preventDefault();
    const metodo = editarComentario ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraComentariosAPI(comentario, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editarComentario) {
        setEditarComentario(true);
      }
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
    recuperarComentarios(objeto.codigo);
  };

  const handleChangeComentario = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setComentario({ ...comentario, [name]: value });
  };

  const recuperar = async (codigo) => {
    try {
      setObjeto(await getReviewPorCodigoAPI(codigo));
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraReviewsAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
    recuperaReviews();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaReviews = async () => {
    try {
      setCarrengando(true);
      setListaObjetos(await getReviewsAPI());
      setCarrengando(false);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const recuperaSeries = async () => {
    setListaSeries(await getSeriesAPI());
  };

  const remover = async (objeto) => {
    if (window.confirm("Deseja remover este objeto?")) {
      try {
        let retornoAPI = await deleteReviewPorCodigoAPI(objeto.codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      } catch (err) {
        console.log(err);
        window.location.reload();
        navigate("/login", { replace: true });
      }
    }
    recuperaReviews();
  };

  useEffect(() => {
    recuperaReviews();
    recuperaSeries();
  }, []);

  return (
    <ReviewContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        setListaObjetos,
        recuperaSeries,
        remover,
        objeto,
        setObjeto,
        editar,
        setEditar,
        recuperar,
        acaoCadastrar,
        handleChange,
        listaSeries,
        listaComentarios,
        comentario,
        setComentario,
        handleChangeComentario,
        removerComentario,
        recuperarComentario,
        acaoCadastrarComentario,
        setEditarComentario,
        editarComentario,
        recuperarComentarios,
        setExibirComentarios,
      }}
    >
      <Carregando carregando={carregando}>
        {!exibirComentarios ? <Tabela /> : <TabelaComentarios />}
      </Carregando>
      <Form />
      <FormComentario />
    </ReviewContext.Provider>
  );
}

export default WithAuth(Serie);
