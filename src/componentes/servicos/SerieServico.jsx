import Autenticacao from "../seg/Autenticacao";

export const getSeriesAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/series`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": Autenticacao.pegaAutenticacao().token,
    },
  });
  const data = await response.json();
  return data;
};

export const getSeriePorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/series/${codigo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Autenticacao.pegaAutenticacao().token,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const deleteSeriePorCodigoAPI = async (codigo) => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDERECO_API}/series/${codigo}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Autenticacao.pegaAutenticacao().token,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const cadastraSeriesAPI = async (objeto, metodo) => {
  const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/series`, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": Autenticacao.pegaAutenticacao().token,
    },
    body: JSON.stringify(objeto),
  });
  const data = await response.json();
  return data;
};
