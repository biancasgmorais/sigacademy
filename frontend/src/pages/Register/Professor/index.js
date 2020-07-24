import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { signUpRequest } from '../../../store/modules/authprofessor/action';
import inicio from '../../../assets/inicio.png';
import { Container, Navigation } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  matricula_prof: Yup.number().required('Matricula é obrigatório'),
  email: Yup.string().email().required('O email é obrigatório!'),
  cpf: Yup.number().required('CPF é obrigatório'),
  rg: Yup.number().required('RG é obrigatório'),
  rua: Yup.string().required('Rua é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatório'),
  estado: Yup.string().required('Estado é obrigatório'),
  pais: Yup.string().required('País é obrigatório'),
  telefone: Yup.number().required('Telefone principal é obrigatório'),
  formacao: Yup.string().required('Formação é obrigatório'),
  escolaridade: Yup.string().required(
    'Campo obrigatório: Graduação / Mestrado / Doutorado'
  ),
  agencia: Yup.string().required('Agência é obrigatório'),
  conta: Yup.string().required('Conta é obrigatório'),
  tipoconta: Yup.string().required('Tipo da conta é obrigatório'),
  banco: Yup.string().required('O banco é obrigatório'),
  password: Yup.string()
    .required('Senha de no minímo 6 caracteres, obrigatória!')
    .min(6),
});

export default function Professor() {
  const dispatch = useDispatch();

  function handleSubmit({
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
  }) {
    dispatch(
      signUpRequest(
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
      )
    );
  }
  const options = [
    { id: 'Poupança', title: 'Poupança' },
    { id: 'Corrente', title: 'Corrente' },
  ];

  const options2 = [
    { id: 'Graduação', title: 'Graduação' },
    { id: 'Mestrado', title: 'Mestrado' },
    { id: 'Doutorado', title: 'Doutorado' },
  ];

  return (
    <Container>
      <Navigation>
        <img src={inicio} alt="SIGACADEMY" />
        <h1>SIGACADEMY</h1>
        <Link to="/">Menu Administrador</Link>
        <Link to="/loginalunos">Menu Aluno</Link>
        <h2>Menu Cadastro Professor</h2>
        <Form schema={schema} onSubmit={handleSubmit} autoComplete="off">
          <div className="divisoria">
            <Input name="name" placeholder="Nome Completo" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="matricula_prof" placeholder="Matricula" />
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
            <Input name="formacao" placeholder="Formação" />
            <Select
              name="escolaridade"
              options={options2}
              placeholder="Escolaridade"
            />
            <Input name="agencia" placeholder="Agência Bancária" />
            <Input name="conta" placeholder="Conta Bancária" />
            <Select
              name="tipoconta"
              options={options}
              placeholder="Tipo da Conta"
            />
            <Input name="banco" placeholder="Banco" />
            <Input name="password" type="password" placeholder="Senha" />
          </div>
          <button type="submit">Criar conta</button>
          <Link to="/loginprofessor">Já tenho conta</Link>
        </Form>
      </Navigation>
    </Container>
  );
}
