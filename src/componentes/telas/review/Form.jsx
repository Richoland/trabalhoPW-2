import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ReviewContext from "./ReviewContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaSeries } =
        useContext(ReviewContext);

    return (
        <Dialogo id="modalEdicao" titulo="Review"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNota" label="Nota"
                tipo="numeric" name="nota" value={objeto.nota}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={4}
                msgvalido="Nota OK"
                msginvalido="Informe o Nota" />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={objeto.descricao}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={400}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <div class="mb-3">
                <label htmlFor="selectSerie"
                    className="form-label">Série</label>
                <select className="form-control"
                    required
                    value={objeto.serie}
                    name="serie" onChange={handleChange}>
                    <option disabled="true" value="">
                        Selecione a série
                    </option>
                    {
                        listaSeries.map((serie) => (
                            <option key={serie.codigo} value={serie.codigo}>
                                {serie.nome}
                            </option>
                        ))
                    }
                </select>
                <div class="valid-feedback">
                    Série OK
                </div>
                <div class="invalid-feedback">
                    Informe a série
                </div>
            </div>
        </Dialogo>
    )

}

export default Form;