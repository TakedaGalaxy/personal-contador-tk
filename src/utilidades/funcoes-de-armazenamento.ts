export type ContadorRegressivoType = {
  titulo: string
  data: Date
}

export function getContadoresRegressivos() {
  return JSON.parse(localStorage.getItem("contadoresRegressivos")) as Array<ContadorRegressivoType>;
}

export function addContadoresRegressivos(contador: ContadorRegressivoType) {

  const paraSalvarUnico = JSON.stringify([contador]);
  const paraComparar = JSON.parse(JSON.stringify(contador)) as ContadorRegressivoType;

  const listaAtual = getContadoresRegressivos();

  if (!listaAtual) {
    localStorage.setItem('contadoresRegressivos', paraSalvarUnico);
    return true;
  }

  const existe = listaAtual.filter(contadorLista => contadorLista.data === paraComparar.data && contadorLista.titulo === paraComparar.titulo);

  if (existe.at(0)) return false;

  listaAtual.unshift(contador);

  localStorage.setItem('contadoresRegressivos', JSON.stringify(listaAtual));

  return true;
}

export function resetContadoresRegressivos() {
  localStorage.setItem('contadoresRegressivos', null);
}

export function deletarContadorRegressivo(index: number) {

  const listaAtual = getContadoresRegressivos();

  listaAtual.splice(index, 1);

  localStorage.setItem('contadoresRegressivos', JSON.stringify(listaAtual));

}


export type ContadorProgressivoType = {
  titulo: string,
  data: Date,
  restarts: number
}

export function getContadoresProgressivos() {
  return JSON.parse(localStorage.getItem("contadoresProgressivos")) as Array<ContadorProgressivoType>;
}

export function addContadoresProgressivos(contador: ContadorProgressivoType) {

  const paraSalvarUnico = JSON.stringify([contador]);
  const paraComparar = JSON.parse(JSON.stringify(contador)) as ContadorProgressivoType;

  const listaAtual = getContadoresProgressivos();

  if (!listaAtual) {
    localStorage.setItem('contadoresProgressivos', paraSalvarUnico);
    return true;
  }

  const existe = listaAtual.filter(contadorLista => contadorLista.titulo === paraComparar.titulo);

  if (existe.at(0)) return false;

  listaAtual.unshift(contador);

  localStorage.setItem('contadoresProgressivos', JSON.stringify(listaAtual));

  return true;
}

export function resetContadoresProgressivos() {
  localStorage.setItem('contadoresProgressivos', null);
}

export function deletarContadorProgressivos(index: number) {

  const listaAtual = getContadoresProgressivos();

  listaAtual.splice(index, 1);

  localStorage.setItem('contadoresProgressivos', JSON.stringify(listaAtual));

}

const armazenamento = {
  getContadoresRegressivos,
  addContadoresRegressivos,
  resetContadoresRegressivos,
  deletarContadorRegressivo,
  getContadoresProgressivos,
  addContadoresProgressivos,
  resetContadoresProgressivos,
  deletarContadorProgressivos
}

export default armazenamento;