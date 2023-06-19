import Autenticacao from "../seg/Autenticacao";

export const getComentariosDaReviewAPI = async codigoreview => {
    const response =
        await
            fetch(`${process.env.REACT_APP_ENDERECO_API}/comentarios/review/${codigoreview}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                });
    const data = await response.json();
    return data;
}

export const getComentarioPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/comentarios/${codigo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const deleteComentarioPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/comentarios/${codigo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const cadastraComentariosAPI = async (objeto, metodo) => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/comentarios`,
            {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                },
                body: JSON.stringify(objeto)
            });
    const data = await response.json();
    return data;
}
