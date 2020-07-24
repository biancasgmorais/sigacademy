import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/authprofessor/action';
import inicio from '../../assets/inicio.png';

const schema = Yup.object().shape({
  matricula_prof: Yup.number().required('Número de matricula obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function LoginProfessor() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authprofessor.loading);

  function handleSubmit({ matricula_prof, password }) {
    dispatch(signInRequest(matricula_prof, password));
  }

  return (
    <>
      <img src={inicio} alt="SIGACADEMY" />
      <h1>SIGACADEMY</h1>
      <Link to="/">Menu Administrador</Link>
      <Link to="/loginalunos">Menu Aluno</Link>
      <h2>Menu Professor</h2>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="matricula_prof" placeholder="Matricula" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando..' : 'Entrar'}</button>
        <Link to="/registerprof">Criar conta</Link>
        <Link to="/updateprof">Atualizar dados</Link>
      </Form>
      <h3>Plataforma de Ensino e Comunicação EAD - Sistema Academico</h3>
      <h3>Dúvidas, problemas ou elogios contatar: sigacademy@gmail.com</h3>
    </>
  );
}
