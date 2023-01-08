import { FormEvent, useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { addContadoresRegressivos, resetContadoresRegressivos } from "../../utilidades/funcoes-de-armazenamento";
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
        data: !!data,
        tempo: !!tempo,
        titulo: !!titulo
      });
      
      return;
    }
    
    const [ano, mes, dia] = data.split('-').map(valor=>Number(valor));
    const [hora, minuto] = tempo.split(":").map(valor => Number(valor));
    
    const dataParaSalvar = new Date(ano, mes-1, dia, hora, minuto);

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
              Cadastro de um novo contador regressivo 👌
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
                onChange={(event) => {

                  contadorRegressivo.data = event.target.value;

                  setContadorRegressivo({ ...contadorRegressivo });
                }}
              />
              <Form.Control
                className="input"
                type="time"
                value={contadorRegressivo.tempo}
                onChange={(event) => {

                  contadorRegressivo.tempo = event.target.value;

                  setContadorRegressivo({ ...contadorRegressivo });
                }}
              />
            </Col>
            <Col className="containerInputs" lg={8}>
              <FloatingLabel className="inputTitulo" label="Titulo">
                <Form.Control
                  value={contadorRegressivo.titulo}
                  onChange={(event) => {

                    contadorRegressivo.titulo = event.target.value;

                    setContadorRegressivo({ ...contadorRegressivo });
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

  return (
    <>
      <FormularioContadorRegressivo
        ativo={formsContadorRegressivoAtivo}
        quandoFechar={() => { setFormsContadorRegressivoAtivo(false) }}
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

        <Button className="botao" variant="btn">
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