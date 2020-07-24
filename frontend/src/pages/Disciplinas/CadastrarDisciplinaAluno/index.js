/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { createDisciplinaAlunoRequest } from '../../../store/modules/disciplinaluno/action';

import { signOut } from '../../../store/modules/authaluno/action';
import { Menu, Container, Content } from './styles';

import voltar from '../../../assets/voltar.png';

const schema = Yup.object().shape({
  matricula_aluno: Yup.number().required('O número da matricula é obrigatório'),
  codigodisc: Yup.number().required('O código da disciplina é obrigatório!'),
});

export default function CadastrarDisciplinaAluno({ location }) {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.aluno.profile);
  const { disciplinasLocated } = location.state || {};
  const [disciplina] = useState(disciplinasLocated);

  const handleSubmit = (data) => {
    dispatch(createDisciplinaAlunoRequest(data));
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
            <a href="/listdisciplinas">Cadastrar Disciplinas</a>
            <a href="/modulesaluno">Exibir disciplinas matriculadas</a>
            <a href="/listdownloads">Downloads</a>
            <a href="/pagamentos">Pagamentos</a>
            <a href="/updatesenhaaluno">Meu perfil</a>
            <button type="button" onClick={handleSignOut}>
              <MdExitToApp color="#6a5acd" size={15} />
              Sair
            </button>
          </div>
        </div>
        <div className="usuario">
          <strong>Bem-vind@, Alun@ {perfil.name}</strong>
        </div>
      </Menu>
      <Container>
        <Content>
          <h1>Cadastro de Disciplina</h1>
          <Form onSubmit={handleSubmit} schema={schema} autoComplete="off">
            <h2>Matricula do Aluno Solicitante</h2>
            <Input
              name="matricula_aluno"
              type="number"
              value={perfil.matricula_aluno}
            />
            <h2>Disciplina</h2>
            <Input name="codigodisc" value={disciplina.codigo} />
            <div className="botoes">
              <button type="submit">Cadastrar</button>
            </div>
          </Form>

          <div className="back">
            <Link to="/modulesaluno">
              <img src={voltar} alt="voltar" />
            </Link>
          </div>
        </Content>
      </Container>
    </>
  );
}

CadastrarDisciplinaAluno.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

CadastrarDisciplinaAluno.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};
