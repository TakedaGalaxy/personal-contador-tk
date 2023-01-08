import SecaoListagemContadorRegressivo from "../../componentes/secoes/listagem-contador-regressivo/listagem-contador-regressivo"
import SecaoListagemContadorProgressivo from "../../componentes/secoes/listagen-contador-progressivo/listagem-contador-progressivo"
import "./home.scss"

export default function PaginaHome() {
  return (
    <div id="PaginaHome">
      <SecaoListagemContadorRegressivo/>
      <SecaoListagemContadorProgressivo/>
    </div>
  )
}