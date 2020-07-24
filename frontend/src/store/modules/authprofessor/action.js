export function signInRequest(matricula_prof, password) {
  return {
    type: '@authprofessor/SIGN_IN_REQUEST',
    payload: { matricula_prof, password },
  };
}

export function signInSucess(token, prof) {
  return {
    type: '@authprofessor/SIGN_IN_SUCCESS',
    payload: { token, prof },
  };
}

export function signUpRequest(
  name,
  matricula_prof,
  email,
  cpf,
  rg,
  rua,
  cidade,
  estado,
  pais,
  telefone,
  formacao,
  escolaridade,
  agencia,
  conta,
  tipoconta,
  banco,
  password
) {
  return {
    type: '@authprofessor/SIGN_UP_REQUEST',
    payload: {
      name,
      matricula_prof,
      email,
      cpf,
      rg,
      rua,
      cidade,
      estado,
      pais,
      telefone,
      formacao,
      escolaridade,
      agencia,
      conta,
      tipoconta,
      banco,
      password,
    },
  };
}
export function signFailure() {
  return { type: '@authprofessor/SIGN_FAILURE' };
}

export function signOut() {
  return {
    type: '@authprofessor/SIGN_OUT',
  };
}
