import Autenticacao from "../seg/Autenticacao";

export const getReviewsAPI = async () => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/reviews`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const getReviewPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/reviews/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const deleteReviewPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/reviews/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraReviewsAPI = async (objeto, metodo) => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/reviews`,
        {
            method : metodo,
            headers : {"Content-Type" : "application/json",
            "x-access-token": Autenticacao.pegaAutenticacao().token},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}
