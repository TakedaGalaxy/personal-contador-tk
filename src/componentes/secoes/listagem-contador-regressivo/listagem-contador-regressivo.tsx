import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import SubComponenteNaoCadastrado from "../../../componentes/sub-componentes/nao-cadastrado/nao-cadastrado";
import { ContadorRegressivoType, deletarContadorRegressivo, getContadoresRegressivos } from "../../../utilidades/funcoes-de-armazenamento";
import "./listagem-contador-regressivo.scss";

export const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function CardContadorRegressivo(
  {
    titulo,
    dataAtual,
    dataMeta,
    aoDeletar
  }: {
    titulo: string,
    dataAtual: Date,
    dataMeta: Date,
    aoDeletar: () => void
  }
) {

  const conta = (dataMeta.getTime() - dataAtual.getTime()) / 1000 / 60 / 60 / 24

  const dias = conta < 0 ? 0 : conta;
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
          {`${dataMeta.getDate()} de ${meses[dataMeta.getMonth()]} as ` +
            `${dataMeta.getHours()} : ${dataMeta.getMinutes()} : ${dataMeta.getSeconds()} (${dataMeta.getFullYear()})`}
        </p>
      </div>
    </div>
  )
}

export default function SecaoListagemContadorRegressivo() {

  const [dataATual, setDataAtual] = useState<Date>(new Date())
  const [contadores, setContadores] = useState<Array<ContadorRegressivoType>>(getContadoresRegressivos());

  useEffect(() => {

    setInterval(() => {
      setDataAtual(new Date());
      setContadores(getContadoresRegressivos());
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
          </Col>
        </Row>
        <hr />
        <Row>
          {contadores.map((contador, index) => {
            return (
              <Col lg={6} key={index}>
                <CardContadorRegressivo
                  titulo={contador.titulo}
                  dataMeta={new Date(contador.data)}
                  dataAtual={dataATual}
                  aoDeletar={() => {
                    deletarContadorRegressivo(index);
                    setContadores(getContadoresRegressivos());
                  }}
                />
              </Col>
            )
          })}
          {!contadores.length &&
            <Col>
              <SubComponenteNaoCadastrado />
            </Col>
          }
        </Row>
      </Container>
    </section>
  )
}