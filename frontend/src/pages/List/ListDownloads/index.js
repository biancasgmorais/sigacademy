/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../services/api';

import { signOut } from '../../../store/modules/authaluno/action';

import { Menu, Container } from './styles';
import voltar from '../../../assets/voltar.png';
import filterTable from './filterTable';
import searchFunction from '../../../components/searchFunction';

export default function ListDownloads() {
  const dispatch = useDispatch();

  const perfil = useSelector((state) => state.aluno.profile);
  const [uploads, setUploads] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const loadUploads = async () => {
      const response = await api.get('uploadsal');
      const data = response.data.map((upload) => ({
        ...upload,
        linkForm: upload.link,
        descricaoForm: upload.descricao,
        codigodisciplinaForm: upload.codigodisciplina,
        nomedisciplinaForm: upload.nomedisciplina,
      }));

      setUploads(data);
    };
    loadUploads();
  }, []);

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
        <h1>Notas</h1>
        <div className="box">
          <select id="mySelector" onInput={filterTable}>
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
              <th>Código da Disciplina</th>
              <th>Link</th>
              <th>Descrição</th>
            </tr>

            {uploads.map((upload) => (
              <tr key={upload.id}>
                <td>{upload.nomedisciplinaForm}</td>
                <td>{upload.codigodisciplinaForm}</td>
                <td>{upload.linkForm}</td>
                <td>{upload.descricaoForm}</td>
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
