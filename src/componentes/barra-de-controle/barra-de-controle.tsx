import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { addContadoresProgressivos, addContadoresRegressivos, resetContadoresRegressivos } from "../../utilidades/funcoes-de-armazenamento";
import "./barra-de-controle.scss";

function FormularioContadorRegressivo({
  ativo,
  quandoFechar
}: {
  ativo: boolean,
  quandoFechar: () => void
}) {

  const [contadorRegressivo, setContadorRegressivo] = useState<{
    data: string,
    tempo: string,
    titulo: string
  }>({
    data: "",
    tempo: "",
    titulo: ""
  });

  const [contadorRegressivoErro, setContadorRegressivoErro] = useState<{
    data: boolean,
    tempo: boolean,
    titulo: boolean
  }>({
    data: false,
    tempo: false,
    titulo: false
  });

  const [alert, setAlert] = useState<{
    ativo: boolean,
    mensagem: string,
    variante: string
  }>({
    ativo: false,
    mensagem: "",
    variante: ""
  });

  function salvarContadorRegressivo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { data, tempo, titulo } = contadorRegressivo;

    const salvar = !!data && !!tempo && !!titulo;

    if (!salvar) {

      setContadorRegressivoErro({
        data: !data,
        tempo: !tempo,
        titulo: !titulo
      });

      return;
    }

    const [ano, mes, dia] = data.split('-').map(valor => Number(valor));
    const [hora, minuto] = tempo.split(":").map(valor => Number(valor));

    const dataParaSalvar = new Date(ano, mes - 1, dia, hora, minuto);

    const resultado = addContadoresRegressivos({
      data: dataParaSalvar,
      titulo: titulo
    });

    setAlert(resultado ?
      {
        ativo: true,
        mensagem: "Salvo com sucesso",
        variante: "success"
      } : {
        ativo: true,
        mensagem: "Contador já existente !",
        variante: "danger"
      }
    );

  }

  return (
    <section id="Formulario" style={ativo ? {} : { display: "none" }}>
      <Container className="container">
        <Button className="botaoFechar" variant="btn" onClick={() => {
          setAlert({
            ativo: false,
            mensagem: "",
            variante: "",
          });
          setContadorRegressivo({
            data: "",
            tempo: "",
            titulo: ""
          });
          setContadorRegressivoErro({
            data: false,
            tempo: false,
            titulo: false
          });
          quandoFechar()
        }}>
          <AiOutlineClose className="icone" />
        </Button>
        <Row>
          <Col>
            <h1>
              Cadastro de um novo contador regressivo ⏱️
            </h1>
            <hr />
          </Col>
        </Row>
        <Form onSubmit={salvarContadorRegressivo}>
          <Row>
            <Col className="containerInputs" lg={4}>
              <Form.Control
                className="input"
                type="date"
                value={contadorRegressivo.data ?? ""}
                isInvalid={contadorRegressivoErro.data}
                isValid={!!contadorRegressivo.data}
                onChange={(event) => {

                  contadorRegressivo.data = event.target.value;
                  contadorRegressivoErro.data = false;

                  setContadorRegressivo({ ...contadorRegressivo });
                  setContadorRegressivoErro({ ...contadorRegressivoErro })
                }}
              />
              <Form.Control
                className="input"
                type="time"
                value={contadorRegressivo.tempo}
                isInvalid={contadorRegressivoErro.tempo}
                isValid={!!contadorRegressivo.tempo}
                onChange={(event) => {

                  contadorRegressivo.tempo = event.target.value;
                  contadorRegressivoErro.tempo = false;

                  setContadorRegressivo({ ...contadorRegressivo });
                  setContadorRegressivoErro({ ...contadorRegressivoErro })
                }}
              />
            </Col>
            <Col className="containerInputs" lg={8}>
              <FloatingLabel className="inputTitulo" label="Titulo">
                <Form.Control
                  value={contadorRegressivo.titulo}
                  isInvalid={contadorRegressivoErro.titulo}
                  isValid={!!contadorRegressivo.titulo}
                  onChange={(event) => {

                    contadorRegressivo.titulo = event.target.value;
                    contadorRegressivoErro.titulo = false;

                    setContadorRegressivo({ ...contadorRegressivo });
                    setContadorRegressivoErro({ ...contadorRegressivoErro })
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Alert
                style={alert.ativo ? {} : { display: "none" }}
                variant={alert.variante}
              >
                {alert.mensagem}
              </Alert>
            </Col>
            <Col className="containerSalvar">
              <Button className="botao" variant="btn" type="submit">
                <span className="escrita">
                  Salvar
                </span>
                <div className="containerIcone">
                  <AiOutlineCheck className="icone" />
                </div>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  )
}

function FormularioContadorProgressivo(
  {
    ativo,
    quandoFechar
  }: {
    ativo: boolean,
    quandoFechar: () => void
  }
) {

  const [alert, setAlert] = useState<{
    ativo: boolean,
    mensagem: string,
    variante: string
  }>({
    ativo: false,
    mensagem: "",
    variante: ""
  })

  const [dataAtual, setDataAtual] = useState<Date>(new Date());

  const [formsContadorProgressivo, setFormsContadorProgressivo] = useState<{
    titulo: string,
  }>({
    titulo: ""
  })

  const [formsContadorProgressivoErro, setFormsContadorProgressivoErro] = useState<{
    titulo: boolean,
  }>({
    titulo: false
  })

  function salvarContadorProgressivo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { titulo } = formsContadorProgressivo;

    const enviar = !!titulo;

    if (!enviar) {

      setFormsContadorProgressivoErro({
        titulo: !titulo
      });

      return;
    }

    const resultado = addContadoresProgressivos({
      data: dataAtual,
      titulo: titulo,
      restarts: 0
    });

    setAlert(resultado ?
      {
        ativo: true,
        mensagem: "Salvo com sucesso",
        variante: "success"
      } : {
        ativo: true,
        mensagem: "Contador já existente !",
        variante: "danger"
      }
    );

  }

  useEffect(() => {

    setInterval(() => {
      setDataAtual(new Date());
    }, 1000);

  }, []);

  return (
    <section id="Formulario" style={ativo ? {} : { display: "none" }}>
      <Container className="container">
        <Button className="botaoFechar" variant="btn" onClick={() => {
          
          setAlert({
            ativo: false,
            mensagem: "",
            variante: "",
          });

          setFormsContadorProgressivo({
            titulo:""
          });
          
          setFormsContadorProgressivoErro({
            titulo:false
          });
          quandoFechar()
        }}>
          <AiOutlineClose className="icone" />
        </Button>
        <Row>
          <Col>
            <h1>
              Cadastro de um novo contador progressivo ⏱️
            </h1>
            <hr />
          </Col>
        </Row>
        <Form onSubmit={salvarContadorProgressivo}>
          <Row>
            <Col className="containerInputs" lg={4}>
              <h3 className="dataAtual">
                <strong>
                  Data :
                </strong>
                <span>
                  {`${dataAtual.getDate()} / ${dataAtual.getMonth() + 1} / ${dataAtual.getFullYear()}`}
                </span>
              </h3>
              <h3 className="dataAtual">
                <strong>
                  Horario :
                </strong>
                <span>
                  {`${dataAtual.getHours()} : ${dataAtual.getMinutes()} : ${dataAtual.getSeconds()}`}
                </span>
              </h3>
            </Col>
            <Col className="containerInputs" lg={8}>
              <FloatingLabel className="inputTitulo" label="Titulo">
                <Form.Control
                  value={formsContadorProgressivo.titulo}
                  isValid={!!formsContadorProgressivo.titulo}
                  isInvalid={formsContadorProgressivoErro.titulo}
                  onChange={(event) => {

                    formsContadorProgressivo.titulo = event.target.value;
                    formsContadorProgressivoErro.titulo = false;

                    setFormsContadorProgressivo({ ...formsContadorProgressivo });
                    setFormsContadorProgressivoErro({ ...formsContadorProgressivoErro })
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Alert
                style={alert.ativo ? {} : { display: "none" }}
                variant={alert.variante}
              >
                {alert.mensagem}
              </Alert>
            </Col>
            <Col className="containerSalvar">
              <Button className="botao" variant="btn" type="submit">
                <span className="escrita">
                  Salvar
                </span>
                <div className="containerIcone">
                  <AiOutlineCheck className="icone" />
                </div>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  )
}

export default function ComponenteBarraControle() {

  const [formsContadorRegressivoAtivo, setFormsContadorRegressivoAtivo] = useState<boolean>(false);
  const [formsContadorProgressivoAtivo, setFormsContadorProgressivoAtivo] = useState<boolean>(false);

  return (
    <>
      <FormularioContadorRegressivo
        ativo={formsContadorRegressivoAtivo}
        quandoFechar={() => { setFormsContadorRegressivoAtivo(false) }}
      />
      <FormularioContadorProgressivo
        ativo={formsContadorProgressivoAtivo}
        quandoFechar={() => { setFormsContadorProgressivoAtivo(false) }}
      />
      <section id="BarraDeControle">

        <div className="formulario">

        </div>

        <Button className="botao" variant="btn" onClick={() => { setFormsContadorRegressivoAtivo(true) }}>
          <div className="containerIcone">
            <AiOutlinePlus className="icone" />
          </div>
          <span className="escrita">
            Contador Regressivo
          </span>
        </Button>

        <Button className="botao" variant="btn" onClick={() => { setFormsContadorProgressivoAtivo(true) }}>
          <div className="containerIcone">
            <AiOutlinePlus className="icone" />
          </div>
          <span className="escrita">
            Contador Progressivo
          </span>
        </Button>
      </section>
    </>
  )
}