/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { MdExitToApp, MdModeEdit } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../services/api';

import { signOut } from '../../../store/modules/authprofessor/action';

import { Menu, Container } from './styles';
import voltar from '../../../assets/voltar.png';
import filterTable from '../../../components/filterTable';
import searchFunction from '../../../components/searchFunction';

export default function ListNotas() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.prof.profile);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadProf = async () => {
      const response = await api.get('disciplinasnota');
      const data = response.data.map((disciplina) => ({
        ...disciplina,
        disciplinaForm: disciplina.disciplina,
        nomealunoForm: disciplina.nomealuno,
        nota1Form: disciplina.nota1,
        nota2Form: disciplina.nota2,
        nota3Form: disciplina.nota3,
        recForm: disciplina.rec,
      }));

      setDisciplinas(data);
    };
    loadProf();
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
        <h1>Notas</h1>
        <div className="box">
          {' '}
          <select id="mySelector" onInput={filterTable}>
            <option>Escolha a disciplina</option>
            {disciplinas.map((disciplina) => (
              <option>{disciplina.disciplinaForm}</option>
            ))}
          </select>
        </div>

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
              <th>Disciplina</th>
              <th>Aluno</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Recuperação</th>
              <th>Adicionar/Editar Notas</th>
              <th>Recuperação</th>
            </tr>

            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}>
                <td>{disciplina.disciplinaForm}</td>
                <td>{disciplina.nomealunoForm}</td>
                <td>{disciplina.nota1Form}</td>
                <td>{disciplina.nota2Form}</td>
                <td>{disciplina.nota3Form}</td>
                <td>{disciplina.recForm}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/cadastrarnotas/${disciplina.id}`,
                      state: { disciplinasLocated: disciplina },
                    }}
                  >
                    <MdModeEdit color="#191970" size={30} />
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/cadastrarrecuperacao/${disciplina.id}`,
                      state: { disciplinasLocated: disciplina },
                    }}
                  >
                    <MdModeEdit color="#191970" size={30} />
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="back">
          <Link to="/modulesprofessor">
            <img src={voltar} alt="voltar" />
          </Link>
        </div>
      </Container>
    </>
  );
}
