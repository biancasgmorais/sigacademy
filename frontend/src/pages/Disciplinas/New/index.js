/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { createDisciplinaRequest } from '../../../store/modules/disciplina/action';
import { signOut } from '../../../store/modules/auth/action';
import { Menu, Container, Content } from './styles';

import voltar from '../../../assets/voltar.png';

const schema = Yup.object().shape({
  codigo: Yup.number().required('O código da disciplina é necessário!'),
  nome: Yup.string().required('O nome da disciplina é obrigatório!'),
  carga_horaria: Yup.number().required('A carga horária é obrigatório'),
  professor_ass: Yup.number().required('A matricula do professor é necessária'),
  horario: Yup.string().required('o horário da disciplina é necessária'),
});

export default function New() {
  const dispatch = useDispatch();

  const handleSubmit = (data, { resetForm }) => {
    dispatch(createDisciplinaRequest(data));
    resetForm();
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
            <a href="/modules">Gerenciar Disciplinas</a>
            <a href="/listprofessors">Professores</a>
            <a href="/listalunos">Alunos</a>
            <a href="/listdisciplinasalunos">Alunos e Disciplinas</a>
            <button type="button" onClick={handleSignOut}>
              <MdExitToApp color="#6a5acd" size={15} />
              Sair
            </button>
          </div>
        </div>
        <div className="usuario">
          <strong>Bem-vind@, Administrador</strong>
        </div>
      </Menu>
      <Container>
        <Content>
          <h1>Cadastro de Disciplina</h1>
          <Form onSubmit={handleSubmit} schema={schema}>
            <h2>Código da Disciplina </h2>
            <Input name="codigo" type="number" />
            <h2>Nome</h2>
            <Input name="nome" />
            <h2>Carga Horária</h2>
            <Input name="carga_horaria" type="number" />
            <h2>Horario</h2>
            <Input name="horario" />
            <h2>Matricula Professor</h2>
            <Input name="professor_ass" type="number" />
            <div className="botoes">
              <button type="submit">Cadastrar</button>
            </div>
          </Form>

          <div className="back">
            <Link to="/modules">
              <img src={voltar} alt="voltar" />
            </Link>
          </div>
        </Content>
      </Container>
    </>
  );
}

New.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

New.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};
