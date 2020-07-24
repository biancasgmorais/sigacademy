import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #c0c0c0;
  display: flex;
  justify-content: center;
  align-center: center;
`;

export const Content = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    margin-top: 30px;
    height: 155px;
  }

  h1 {
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #6a5acd;
  }

  a {
    color: #6a5acd;
    margin-top: 20px;
    margin-right: 10px;
    font: 16px 'Roboto', sans-serif;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }

  h2 {
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: #6a5acd;
  }

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      height: 25px;
      font: 14px 'Roboto', sans-serif;
      color: #c0c0c0;
      background-color: #6a5acd;
      border: 1px solid #191970;
      border-radius: 4px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #e91010;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 10px 0 0;
      width: 150px;
      height: 44px;
      font: 21px 'Roboto', sans-serif;
      font-weight: bold;
      color: #c0c0c0;
      background: #6a5acd;
      border: 1px solid #191970;
      border-radius: 6px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#6A5ACD')};
      }
    }

    a {
      color: #6a5acd;
      margin-top: 10px;
      font: 16px 'Roboto', sans-serif;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  h3 {
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: bold;
    color: #6a5acd;
  }
`;
