import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai";
import { getContadoresProgressivos, ContadorProgressivoType, deletarContadorProgressivos } from "../../../utilidades/funcoes-de-armazenamento";
import { meses } from "../listagem-contador-regressivo/listagem-contador-regressivo";
import "./listagem-contador-progressivo.scss"

export function CardContadorProgressivo(
  {
    titulo,
    dataAtual,
    dataArmazenada,
    aoDeletar
  }: {
    titulo: string,
    dataAtual: Date,
    dataArmazenada: Date,
    aoDeletar: () => void
  }
) {

  const dias = (dataAtual.getTime() - dataArmazenada.getTime()) / 1000 / 60 / 60 / 24;
  const horas = (dias - Math.floor(dias)) * 24;
  const minutos = (horas - Math.floor(horas)) * 60;
  const segundos = (minutos - Math.floor(minutos)) * 60;

  return (
    <div className="containerCardContador">
      <div className="cardContador">
        <div className="header">
          <h2>
            {titulo}
          </h2>
          <AiOutlineClose className="icone" onClick={aoDeletar} />
        </div>
        <hr />
        <div className="containerContadorTempo">
          <div className="containerContadorTempoEscrita">
            <span className="numero">{Math.floor(dias)}</span>
            <span>DIAS</span>
          </div>
          <div className="containerContadorTempoEscrita">
            <span className="numero">{Math.floor(horas)}</span>
            <span>HORAS</span>
          </div>
          <div className="containerContadorTempoEscrita">
            <span className="numero">{Math.floor(minutos)}</span>
            <span>MINUTOS</span>
          </div>
          <div className="containerContadorTempoEscrita">
            <span className="numero">{Math.floor(segundos)}</span>
            <span>SEGUNDOS</span>
          </div>
        </div>
        <hr />
        <p className="dataMeta">
          {`${dataArmazenada.getDate()} de ${meses[dataArmazenada.getMonth()]} as ` +
            `${dataArmazenada.getHours()} : ${dataArmazenada.getMinutes()} : ${dataArmazenada.getSeconds()} (${dataArmazenada.getFullYear()})`}
        </p>
        <Button
          className="botao"
          variant="btn"
        >
          Resetar
        </Button>
      </div>
    </div>
  )
}

export default function SecaoListagemContadorProgressivo() {

  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [contadores, setContadores] = useState<Array<ContadorProgressivoType>>(getContadoresProgressivos());

  useEffect(() => {

    setInterval(() => {
      setContadores(getContadoresProgressivos());
      setDataAtual(new Date());
    }, 1000);

  }, [])

  return (
    <section id="ListagemContadorProgressivo">
      <Container>
        <Row>
          <Col>
            <h1>
              Contadores Progressivos
            </h1>
          </Col>
        </Row>
        <hr />
        <Row>
          {contadores.map((contador, index) => {
            return (
              <Col key={index} lg={6}>
                <CardContadorProgressivo
                  titulo={contador.titulo}
                  dataAtual={dataAtual}
                  dataArmazenada={new Date(contador.data)}
                  aoDeletar={() => {
                    deletarContadorProgressivos(index);
                    setContadores(getContadoresProgressivos());
                  }}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}