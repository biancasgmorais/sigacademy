import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/authaluno/action';

import inicio from '../../assets/inicio.png';

const schema = Yup.object().shape({
  matricula_aluno: Yup.number().required('Número de matricula obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function LoginAlunos() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authaluno.loading);

  function handleSubmit({ matricula_aluno, password }) {
    dispatch(signInRequest(matricula_aluno, password));
  }

  return (
    <>
      <img src={inicio} alt="SIGACADEMY" />
      <h1>SIGACADEMY</h1>
      <Link to="/">Menu Administrador</Link>
      <Link to="/loginprofessor">Menu Professor</Link>
      <h2>Menu Aluno</h2>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="matricula_aluno" placeholder="Matricula" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando..' : 'Entrar'}</button>
        <Link to="/registeraluno">Criar conta</Link>
        <Link to="/updatealuno">Atualizar dados</Link>
      </Form>
      <h3>Plataforma de Ensino e Comunicação EAD - Sistema Academico</h3>
      <h3>Dúvidas, problemas ou elogios contatar: sigacademy@gmail.com</h3>
    </>
  );
}
