/* eslint-disable react/button-has-type */
import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateAlunoRequest } from '../../../store/modules/aluno/action';

import inicio from '../../../assets/inicio.png';
import { Container, Navigation } from './styles';

const schema = Yup.object().shape({
  matricula_aluno: Yup.number().required('Número de matricula obrigatório'),
  email: Yup.string().email().required('O email é requerido!'),
  name: Yup.string().required('Nome é obrigatório'),
  rua: Yup.string().required('Rua é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatório'),
  estado: Yup.string().required('Estado é obrigatório'),
  pais: Yup.string().required('País é obrigatório'),
  telefone: Yup.number().required('Telefone principal é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Aluno() {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(updateAlunoRequest(data));
  };

  return (
    <Container>
      <Navigation>
        <img src={inicio} alt="SIGACADEMY" />
        <h1>SIGACADEMY</h1>
        <Link to="/">Menu Administrador</Link>
        <Link to="/loginprofessor">Menu Professor</Link>

        <h2>Meus dados</h2>

        <Form onSubmit={handleSubmit} schema={schema} autoComplete="off">
          <div className="divisoria">
            <Input name="matricula_aluno" placeholder="Matricula" />
            <Input name="email" type="email" placeholder="email" />
            <Input name="name" placeholder="Nome Completo" />
            <Input name="rua" placeholder="Rua" />
            <Input name="cidade" placeholder="Cidade" />
            <Input name="estado" placeholder="Estado" />
            <Input name="pais" placeholder="País" />
            <Input
              name="telefone"
              type="tel"
              placeholder="Telefone Principal"
            />
            <Input name="password" type="password" placeholder="Senha" />
          </div>
          <div className="botoes">
            <button type="submit">Atualizar dados</button>
          </div>
        </Form>
        <Link to="/loginalunos">Já tenho conta</Link>
      </Navigation>
    </Container>
  );
}
