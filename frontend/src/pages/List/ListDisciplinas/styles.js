import styled from 'styled-components';
import { darken } from 'polished';

export const Menu = styled.div`
  /* Dropdown Button */
  background-color: #6a5acd;
  .dropbtn {
    background-color: #6a5acd;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content button {
    background: none;
    border: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #ddd;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #6a5acd;
  }

  .usuario {
    float: right;
    margin-right: 30px;
    margin-top: 15px;
    strong {
      display: block;
      color: #ffff;
    }
  }
`;
export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  display: flex;
  max-width: 900px;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 10px;
    text-align: center;
    width: 150px;
    height: 30px;
    font: 16px 'Roboto', sans-serif;
    font-weight: bold;
    color: #c0c0c0;
    background: #6a5acd;
    border: 4px solid #6a5acd;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .nv {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    input {
      width: 300px;
      font-size: 14px;
      color: #191970;
      padding: 12px 20px 12px 40px;
      background: #c0c0c0;
      border: 2px solid #6a5acd;
      margin-right: 10px;
    }

    button {
      margin-right: 10px;
      width: 150px;
      height: 50px;
      font: 14px 'Roboto', sans-serif;
      font-weight: bold;
      color: #c0c0c0;
      background: #6a5acd;
      border: 1px solid #191970;
      border-radius: 6px;
      transition: background 0.2s;
      text-transform: uppercase;

      &:hover {
        background: ${darken(0.08, '#6a5acd')};
      }
    }
  }

  .tabela {
    table {
      margin-top: 10px;
      align-items: center;
      justify-content: center;
      width: 800px;
      display: block;
      position: relative;
      overflow-y: scroll;
      height: 300px;

      th {
        width: 800px;
        height: 30px;
        font: 14px 'Roboto', sans-serif;
        font-weight: bold;
        color: #c0c0c0;
        background-color: #6a5acd;
        border: 2px transparent;
      }

      td {
        width: 800px;
        height: 30px;
        text-align: center;
        align-items: center;
        font: 14px 'Roboto', sans-serif;
        color: #191970;
        background-color: #c0c0c0;
        border: 2px solid #6a5acd;
        padding: 5px 5px;

        a {
          margin-right: 5px;
        }

        button {
          background: none;
          border: none;
          margin-right: 2px;
        }
      }
    }
  }

  .back {
    margin-top: 10px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    justify-content: center;
    a {
      background: transparent;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }
  }
`;
