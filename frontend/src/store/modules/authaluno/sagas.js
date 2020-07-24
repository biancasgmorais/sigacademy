import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSucess, signFailure } from './action';

export function* signIn({ payload }) {
  try {
    const { matricula_aluno, password } = payload;

    const response = yield call(api.post, 'sessionsaluno', {
      matricula_aluno,
      password,
    });

    const { token, aluno } = response.data;

    if (!aluno.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, aluno));

    history.push('/modulesaluno');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const {
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
    } = payload;
    yield call(api.post, 'alunos', {
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
      provider: true,
    });

    history.push('/loginalunos');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.authaluno;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/loginalunos');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@authaluno/SIGN_IN_REQUEST', signIn),
  takeLatest('@authaluno/SIGN_UP_REQUEST', signUp),
  takeLatest('@authaluno/SIGN_OUT', signOut),
]);
