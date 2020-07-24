/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../services/api';

import { signOut } from '../../../store/modules/authaluno/action';

import { Menu, Container } from './styles';

import searchFunction from '../../../components/searchFunction';

export default function MenuAluno() {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.aluno.profile);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('disciplinasal');
      const data = response.data.map((disc) => ({
        ...disc,
        codigodiscForm: disc.codigodisc,
        disciplinaForm: disc.disciplina,
        nomeprofessorForm: disc.nomeprofessor,
        horariodiscForm: disc.horariodisc,
        nota1Form: disc.nota1,
        nota2Form: disc.nota2,
        nota3Form: disc.nota3,
        recForm: disc.rec,
      }));

      setDisciplinas(data);
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
        <h1>Disciplinas Matriculadas</h1>
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
              <th>Horário</th>
              <th>Professor</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Recuperação</th>
            </tr>

            {disciplinas.map((disc) => (
              <tr key={disc.id}>
                <td>{disc.codigodiscForm}</td>
                <td>{disc.disciplinaForm}</td>
                <td>{disc.horariodiscForm}</td>
                <td>{disc.nomeprofessorForm}</td>
                <td>{disc.nota1Form}</td>
                <td>{disc.nota2Form}</td>
                <td>{disc.nota3Form}</td>
                <td>{disc.recForm}</td>
              </tr>
            ))}
          </table>
        </div>
      </Container>
    </>
  );
}
