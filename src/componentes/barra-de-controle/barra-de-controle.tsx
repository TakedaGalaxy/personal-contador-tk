import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "./barra-de-controle.scss";


export default function ComponenteBarraControle() {
  return (
    <section id="BarraDeControle">
      <Button className="botao" variant="btn">
        <div className="containerIcone">
          <AiOutlinePlus className="icone" />
        </div>
        <span className="escrita">
          Contador Regressivo
        </span>
      </Button>
      <Button className="botao" variant="btn">
        <div className="containerIcone">
          <AiOutlinePlus className="icone" />
        </div>
        <span className="escrita">
          Contador Progressivo
        </span>
      </Button>
    </section>
  )
}