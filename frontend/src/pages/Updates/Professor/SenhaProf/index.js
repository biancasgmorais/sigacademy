/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '../../../../store/modules/prof/action';
import { signOut } from '../../../../store/modules/authprofessor/action';
import { Menu, Container, Content } from './styles';
import api from '../../../../services/api';

import voltar from '../../../../assets/voltar.png';

const schema = Yup.object().shape({
  matricula_prof: Yup.number().integer(),
  oldPassword: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required() : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});

export default function SenhaProf() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.prof.profile);
  const [professors, setProfessor] = useState([]);
  const [itens, setItens] = useState([]);
  const [banco, setBanco] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('updateprof');
      const listItems = response.data.endereco.map((endereco) => (
        <ul>{endereco}</ul>
      ));
      const listBanco = response.data.bancodados.map((endereco) => (
        <ul>{endereco}</ul>
      ));
      setItens(listItems);
      setBanco(listBanco);
      setProfessor(response.data);
    };
    loadDados();
  }, []);

  const handleSubmit = (data) => {
    dispatch(updateProfileRequest(data));
  };

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm(`Confirma a exclusão do seu perfil?`)) {
        await api.delete(`professors/${professors.id}`);

        toast.success(`Perfil apagado com sucesso!`);

        dispatch(signOut());
      }
    } catch (error) {
      toast.error(
        `Erro ao deletar perfil, verifique os dados ou tente novamente`
      );
    }
  };

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <Menu>
        <div className="dropdown">
          <button className="dropbtn">
            <RiMenu4Line color="#ffff" size={15} /> MENU
          </button>
          <div className="dropdown-content">
            <a href="/modulesprofessor">Disciplinas</a>
            <a href="/listnotas">Notas</a>
            <a href="/listuploads">Uploads</a>
            <a href="/updatesenhaprof">Meu perfil</a>
            <button type="button" onClick={handleSignOut}>
              <MdExitToApp color="#6a5acd" size={15} />
              Sair
            </button>
          </div>
        </div>
        <div className="usuario">
          <strong>Bem-vind@, Professor(a) {professors.name}</strong>
        </div>
      </Menu>
      <Container>
        <Content>
          <h1>Meus dados</h1>
          <h2>Dados atuais</h2>
          <h2>Nome: {professors.name}</h2>
          <h2>Matricula: {professors.matricula_prof} </h2>
          <h2>Endereço (Cidade, Estado, País): {itens}</h2>
          <h2>
            Escolaridade: {professors.escolaridade} | Formação:{' '}
            {professors.formacao}{' '}
          </h2>
          <h2>Dados bancários (Agencia, Conta): {banco} </h2>
          <div className="divisaosenha">
            <h1>Senha</h1>
            <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
              <Input
                name="matricula_prof"
                type="number"
                placeholder="Matricula"
              />
              <Input name="password" type="password" placeholder="Senha Nova" />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirme a Senha Nova"
              />
              <Input
                name="oldPassword"
                type="password"
                placeholder="Senha Antiga"
              />
              <div className="botoes">
                <button type="submit">Atualizar senha</button>
              </div>
            </Form>
          </div>
          <div className="apagar">
            <button type="button" onClick={() => handleDelete()}>
              Apagar Conta{' '}
            </button>
          </div>
          <div className="back">
            <Link to="/modulesprofessor">
              <img src={voltar} alt="voltar" />
            </Link>
          </div>
        </Content>
      </Container>
    </>
  );
}
