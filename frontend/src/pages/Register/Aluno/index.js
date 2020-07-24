import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { signUpRequest } from '../../../store/modules/authaluno/action';
import inicio from '../../../assets/inicio.png';
import { Container, Navigation } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email().required('O email é obrigatório!'),
  matricula_aluno: Yup.number().required('Matricula é obrigatório'),
  cpf: Yup.number().required('CPF é obrigatório'),
  rg: Yup.number().required('RG é obrigatório'),
  rua: Yup.string().required('Rua é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatório'),
  estado: Yup.string().required('Estado é obrigatório'),
  pais: Yup.string().required('País é obrigatório'),
  telefone: Yup.number().required('Telefone principal é obrigatório'),
  password: Yup.string()
    .required('Senha de no minímo 6 caracteres, obrigatória!')
    .min(6),
});

export default function Aluno() {
  const dispatch = useDispatch();

  function handleSubmit({
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
  }) {
    dispatch(
      signUpRequest(
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
      )
    );
  }

  return (
    <Container>
      <Navigation>
        <img src={inicio} alt="SIGACADEMY" />
        <h1>SIGACADEMY</h1>
        <Link to="/">Menu Administrador</Link>
        <Link to="/loginprofessor">Menu Professor</Link>
        <h2>Menu Cadastro Aluno</h2>
        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="divisoria">
            <Input name="name" placeholder="Nome Completo" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="matricula_aluno" placeholder="Matricula" />
            <Input name="cpf" placeholder="CPF" />
            <Input name="rg" placeholder="RG" />
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
          <button type="submit">Criar conta</button>
          <Link to="/loginalunos">Já tenho conta</Link>
        </Form>
      </Navigation>
    </Container>
  );
}
