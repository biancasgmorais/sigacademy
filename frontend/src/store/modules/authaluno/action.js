export function signInRequest(matricula_aluno, password) {
  return {
    type: '@authaluno/SIGN_IN_REQUEST',
    payload: { matricula_aluno, password },
  };
}

export function signInSucess(token, aluno) {
  return {
    type: '@authaluno/SIGN_IN_SUCCESS',
    payload: { token, aluno },
  };
}

export function signUpRequest(
  name,
  matricula_aluno,
  email,
  cpf,
  rg,
  rua,
  cidade,
  estado,
  pais,
  telefone,
  password
) {
  return {
    type: '@authaluno/SIGN_UP_REQUEST',
    payload: {
      name,
      matricula_aluno,
      email,
      cpf,
      rg,
      rua,
      cidade,
      estado,
      pais,
      telefone,
      password,
    },
  };
}
export function signFailure() {
  return { type: '@authaluno/SIGN_FAILURE' };
}

export function signOut() {
  return {
    type: '@authaluno/SIGN_OUT',
  };
}
