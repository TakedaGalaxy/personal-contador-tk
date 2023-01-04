import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./listagem-contador-regressivo.scss";

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Septembro", "Outubro", "Novembro", "Dezembro"];

export function CardContadorRegressivo(
  {
    titulo,
    dataAtual,
    dataMeta
  }: {
    titulo: string,
    dataAtual: Date,
    dataMeta: Date
  }
) {

  const dias = (dataMeta.getTime() - dataAtual.getTime()) / 1000 / 60 / 60 / 24;
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
          <AiOutlineClose className="icone" />
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
          {`${dataMeta.getDate()} de ${meses[dataMeta.getMonth()]} as ` +
            `${dataMeta.getHours()} : ${dataMeta.getMinutes()} : ${dataMeta.getSeconds()} (${dataMeta.getFullYear()})`}
        </p>
      </div>
    </div>
  )
}

export default function ComponenteListagemContadorRegressivo() {

  const [dataATual, setDataAtual] = useState<Date>(new Date())

  useEffect(() => {

    setInterval(() => {
      setDataAtual(new Date());
    }, 1000);

  }, []);

  return (
    <section id="ListagemContadorRegressivo">
      <Container>
        <Row>
          <Col>
            <h1>
              Contadores Regressivos
            </h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CardContadorRegressivo
              titulo="Volta as aulas"
              dataAtual={dataATual}
              dataMeta={new Date(2023, 2, 2, 12, 0, 0)}
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}