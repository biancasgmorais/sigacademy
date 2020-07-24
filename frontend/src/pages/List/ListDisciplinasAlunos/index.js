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

export default function ListDisciplinasAlunos() {
  const dispatch = useDispatch();
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('todosdisciplinasal');

      setDisciplinas(response.data);
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
        <h1>Disciplinas e Alunos</h1>
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
              <th>Código da Disciplina</th>
              <th>Disciplina</th>
              <th>Matricula Professor</th>
              <th>Professor</th>
              <th>Aluno</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Recuperação</th>
            </tr>

            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}>
                <td>{disciplina.codigodisc}</td>
                <td>{disciplina.disciplina}</td>
                <td>{disciplina.professor}</td>
                <td>{disciplina.nomeprofessor}</td>
                <td>{disciplina.nomealuno}</td>
                <td>{disciplina.nota1}</td>
                <td>{disciplina.nota2}</td>
                <td>{disciplina.nota3}</td>
                <td>{disciplina.rec}</td>
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
