import { useState, useEffect } from "react";
import SerieContext from "./SerieContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import {
  getSeriesAPI,
  getSeriePorCodigoAPI,
  deleteSeriePorCodigoAPI,
  cadastraSeriesAPI,
} from "../../servicos/SerieServico";
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

  const recuperar = async (codigo) => {
    try {
      setObjeto(await getSeriePorCodigoAPI(codigo));
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraSeriesAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      console.log(err);
      window.location.reload();
      navigate("/login", { replace: true });
    }
    recuperaSeries();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaSeries = async () => {
    try {
      setCarrengando(true);
      setListaObjetos(await getSeriesAPI());
      setCarrengando(false);
    } catch (err) {
      window.location.reload();
      navigate("/login", { replace: true });
    }
  };

  const remover = async (objeto) => {
    if (window.confirm("Deseja remover este objeto?")) {
      try {
        let retornoAPI = await deleteSeriePorCodigoAPI(objeto.codigo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      } catch (err) {
        window.location.reload();
        navigate("/login", { replace: true });
      }
    }
    recuperaSeries();
  };

  useEffect(() => {
    recuperaSeries();
  }, []);

  return (
    <SerieContext.Provider
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
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Form />
    </SerieContext.Provider>
  );
}

export default WithAuth(Serie);
