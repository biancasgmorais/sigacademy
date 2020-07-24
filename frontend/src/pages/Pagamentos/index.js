/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { MdExitToApp } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/authaluno/action';
import { Menu, Container, Content } from './styles';

import toPdf from './toPdf';
import api from '../../services/api';
import voltar from '../../assets/voltar.png';

export default function Pagamentos() {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.aluno.profile);
  const [aluno, setAluno] = useState([]);

  useEffect(() => {
    const loadDados = async () => {
      const response = await api.get('updatealuno');
      setAluno(response.data);
    };
    loadDados();
  }, []);

  function handleSignOut() {
    dispatch(signOut());
  }

  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const date2 = `${today.getDate() + 5}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

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
          <h1>BOLETO</h1>
          <div className="tabela">
            <table
              border="1"
              border-color="#243e6a"
              cellPadding="3"
              id="myTable"
            >
              <tr>
                <th>Código</th>
                <th>
                  {Math.floor(Math.random() * 90000) + 10000}.
                  {Math.floor(Math.random() * 90000) + 10000} {'    '}
                  {Math.floor(Math.random() * 90000) + 10000}.
                  {Math.floor(Math.random() * 900000) + 100000} {'  '}
                  {Math.floor(Math.random() * 90000) + 10000}.
                  {Math.floor(Math.random() * 900000) + 100000}
                  {'       '}
                  {Math.floor(Math.random() * 9) + 1}
                  {'   '}
                  {Math.floor(Math.random() * 90000) + 10000}000000
                  {Math.floor(Math.random() * 90000) + 10000}
                </th>
              </tr>
              <tr>
                <th>BANCO S.A</th>
                <th>400-0</th>
              </tr>

              <tr>
                <th>Local de pagamento</th>
                <th>Vencimento</th>
              </tr>

              <tr>
                <td>
                  Pagavel em qualquer agencia até o vencimento, após somente no
                  Banco do Brasil
                </td>
                <td>{date2}</td>
              </tr>

              <tr>
                <th>Beneficiário - CPF/CNPJ</th>
                <th>Agencia/Codigo do Beneficiario</th>
              </tr>
              <tr>
                <td>SIGACADEMY MERCADO PAGO SA - 0000.0000.000-00</td>
                <td>00000/0000</td>
              </tr>

              <tr>
                <th>Data do Documento</th>
                <th>Numero do Documento</th>
              </tr>

              <tr>
                <td>{date}</td>
                <td>000000000</td>
              </tr>

              <tr>
                <th>Especie</th>
                <th>Aceite</th>
              </tr>

              <tr>
                <td>ME</td>
                <td>N</td>
              </tr>

              <tr>
                <th>Data do Processamento</th>
                <th>Valor a Pagar</th>
              </tr>
              <tr>
                <td>{date}</td>
                <td>600,00 R$</td>
              </tr>
              <tr>
                <th>Pagador</th>
                <th>CPF</th>
              </tr>
              <tr>
                <td>{aluno.name}</td>
                <td>{aluno.cpf}</td>
              </tr>
            </table>
          </div>
          <button type="button" onClick={toPdf}>
            Gerar PDF
          </button>
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
