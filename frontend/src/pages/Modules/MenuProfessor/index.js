/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { signOut } from '../../../store/modules/authprofessor/action';

import { Menu, Container } from './styles';
import api from '../../../services/api';

import searchFunction from '../../../components/searchFunction';

export default function MenuProfessor() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.prof.profile);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('disciplinasprof');
      const data = response.data.map((disciplina) => ({
        ...disciplina,
        nomeForm: disciplina.nome,
        carga_horariaForm: disciplina.carga_horaria,
        codigoForm: disciplina.codigo,
        horarioForm: disciplina.horario,
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
            <RiMenu4Line color="#ffff" size={15} /> MENU{' '}
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
        <h1>Disciplinas</h1>
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
              <th>Nome</th>
              <th>Carga Horária</th>
              <th>Horário</th>
              <th>Uploads</th>
            </tr>

            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}>
                <td>{disciplina.codigoForm}</td>
                <td>{disciplina.nomeForm}</td>
                <td>{disciplina.carga_horariaForm}</td>
                <td>{disciplina.horarioForm}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/uploads/${disciplina.id}`,
                      state: { disciplinasLocated: disciplina },
                    }}
                  >
                    <BsPlusSquare color="#191970" size={30} />
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Container>
    </>
  );
}
