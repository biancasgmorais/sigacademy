/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';

import { createUploadsRequest } from '../../store/modules/uploads/action';
import { signOut } from '../../store/modules/authprofessor/action';
import { Menu, Container, Content } from './styles';

import voltar from '../../assets/voltar.png';

const schema = Yup.object().shape({
  codigodisciplina: Yup.number().required(),
  link: Yup.string().required(),
  descricao: Yup.string().required(),
});

export default function Uploads({ location }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.prof.profile);
  const { disciplinasLocated } = location.state || {};
  const [uploads] = useState(disciplinasLocated);

  const handleSubmit = (data) => {
    dispatch(createUploadsRequest(data));
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
          <strong>Bem-vind@, Professor(a) {profile.name}</strong>
        </div>
      </Menu>
      <Container>
        <Content>
          <h1>Uploads</h1>
          <Form onSubmit={handleSubmit} schema={schema} autoComplete="on">
            <h2>Código da Disciplina</h2>
            <Input
              name="codigodisciplina"
              type="number"
              value={uploads.codigoForm}
            />
            <h2>Link</h2>
            <Input name="link" type="ulr" />
            <h2>Descrição</h2>
            <Input type="text" name="descricao" />
            <div className="botoes">
              <button type="submit">Cadastrar</button>
            </div>
          </Form>

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

Uploads.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

Uploads.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};
