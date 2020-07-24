import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSucess, signFailure } from './action';

export function* signIn({ payload }) {
  try {
    const { matricula_prof, password } = payload;

    const response = yield call(api.post, 'sessionsprof', {
      matricula_prof,
      password,
    });

    const { token, prof } = response.data;

    if (!prof.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, prof));

    history.push('/modulesprofessor');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const {
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
    } = payload;
    yield call(api.post, 'professors', {
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
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.authprofessor;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@authprofessor/SIGN_IN_REQUEST', signIn),
  takeLatest('@authprofessor/SIGN_UP_REQUEST', signUp),
  takeLatest('@authprofessor/SIGN_OUT', signOut),
]);
