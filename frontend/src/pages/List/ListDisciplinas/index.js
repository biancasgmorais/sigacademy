/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import api from '../../../services/api';

import { signOut } from '../../../store/modules/authaluno/action';

import { Menu, Container } from './styles';
import voltar from '../../../assets/voltar.png';
import searchFunction from '../../../components/searchFunction';

export default function ListDisciplinas() {
  const perfil = useSelector((state) => state.aluno.profile);
  const dispatch = useDispatch();
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('disciplinas');

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
              <th>Nome</th>
              <th>Professor</th>
              <th>Carga Horária</th>
              <th>Horário</th>
              <th>Cadastrar</th>
            </tr>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.nomeprof}</td>
                <td>{disciplina.carga_horaria}</td>
                <td>{disciplina.horario}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/cadastrardisciplinaluno/${disciplina.id}`,
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
        <div className="back">
          <Link to="/modulesaluno">
            <img src={voltar} alt="voltar" />
          </Link>
        </div>
      </Container>
    </>
  );
}
