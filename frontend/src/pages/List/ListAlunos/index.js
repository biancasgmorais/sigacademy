/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from '../../../services/api';

import { signOut } from '../../../store/modules/auth/action';

import { Menu, Container } from './styles';
import voltar from '../../../assets/voltar.png';
import searchFunction from '../../../components/searchFunction';

export default function ListAlunos() {
  const dispatch = useDispatch();
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('alunos');

      setAlunos(response.data);
    };
    loadDados();
  }, []);

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
        <h1>Alunos</h1>
        <div className="nv">
          <input id="myInput" placeholder="Busca" onChange={searchFunction} />
        </div>
        <div className="tabela">
          <table
            border="1"
            border-color="transparent"
            cellPadding="3"
            id="myTable"
          >
            <tr className="header">
              <th>Nome</th>
              <th>Matricula</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>

            {alunos.map((al) => (
              <tr key={al.id}>
                <td>{al.name}</td>
                <td>{al.matricula_aluno}</td>
                <td>{al.email}</td>
                <td>{al.telefone}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="back">
          <Link to="/modules">
            <img src={voltar} alt="voltar" />
          </Link>
        </div>
      </Container>
    </>
  );
}
