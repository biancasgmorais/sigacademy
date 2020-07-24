import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/action';

import inicio from '../../assets/inicio.png';

const schema = Yup.object().shape({
  registration: Yup.number().required('Número de matricula obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ registration, password }) {
    dispatch(signInRequest(registration, password));
  }

  return (
    <>
      <img src={inicio} alt="SIGACADEMY" />
      <h1>SIGACADEMY</h1>
      <Link to="/loginalunos">Menu Aluno</Link>
      <Link to="/loginprofessor">Menu Professor</Link>
      <h2>Menu Administrador</h2>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="registration" placeholder="Matricula" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando..' : 'Entrar'}</button>
      </Form>
      <h3>Plataforma de Ensino e Comunicação EAD - Sistema Academico</h3>
      <h3>Dúvidas, problemas ou elogios contatar: sigacademy@gmail.com</h3>
    </>
  );
}
