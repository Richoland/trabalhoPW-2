import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./ReviewContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormComentario() {

    const { comentario, handleChangeComentario,
        acaoCadastrarComentario, alerta } = useContext(SalaContext);

    return (
        <Dialogo id="modalEdicaoComentario" titulo="Comentario"
            acaoCadastrar={acaoCadastrarComentario}
            idform="formularioComentario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={comentario.codigo}
                onchange={handleChangeComentario} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={comentario.descricao}
                onchange={handleChangeComentario} requerido={true}
                readonly={false} maxlength={400}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" /> 
        </Dialogo>
    )

}

export default FormComentario;