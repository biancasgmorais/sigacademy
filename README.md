# SIGAcademy

**SIGAcademy** é um sistema de gerenciamento acadêmico online. O projeto utiliza **Node.js**, **React**, **PostgreSQL**, e foi desenvolvido com as bibliotecas **Yarn**, **Yup**, e **bcrypt**. O sistema permite que alunos e professores interajam com as informações acadêmicas de maneira simples e eficiente.

## Descrição do Projeto

O **SIGAcademy** tem como objetivo fornecer um ambiente online para o gerenciamento de informações acadêmicas. Ele oferece funcionalidades para alunos e professores de forma independente:

- **Alunos**:
  - Login para acessar a plataforma.
  - Visualizar disciplinas e aulas cadastradas.
  - Ver informações sobre os professores de cada aula.
  - Editar seus dados pessoais.
  
- **Professores**:
  - Editar informações de suas disciplinas.
  - Adicionar mensagens para os alunos matriculados nas disciplinas.
  - Listar alunos inscritos em suas disciplinas.
  - Editar seus próprios dados pessoais.
  - Adicionar e editar notas dos alunos.

---

## Funcionalidades

- **Autenticação JWT**: A autenticação dos usuários (alunos e professores) é realizada através de **JWT**.
- **Criptografia de Senhas**: Utiliza **bcrypt** para garantir a segurança das senhas dos usuários.
- **Validação de Dados**: Os dados fornecidos pelos usuários são validados usando a biblioteca **Yup**.
- **Gerenciamento de Disciplinas**: Professores podem gerenciar suas disciplinas e interagir com os alunos de forma simples.

---

## Tecnologias Utilizadas

- **Frontend**: ReactJS
- **Backend**: Node.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Criptografia de Senhas**: bcrypt
- **Validação de Dados**: Yup
- **Gerenciador de Pacotes**: Yarn

---

## Rodando o Projeto

### Pré-requisitos

- **PostgreSQL** instalado e configurado.
- **Yarn** como gerenciador de pacotes.

### Passos para execução

1. **Instalação das dependências**:
    - Instale as dependências do projeto com o comando:
    ```bash
    yarn
    ```

2. **Configuração do ambiente**:
    - Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente com suas credenciais de desenvolvimento.

3. **Configuração do banco de dados**:
    - Abra o código do backend na sua IDE preferida e execute o seguinte comando para criar as tabelas no banco de dados:
    ```bash
    yarn sequelize db:migrate
    ```

4. **Rodando o backend**:
    - Para rodar o backend em modo desenvolvedor, use o comando:
    ```bash
    yarn dev
    ```

5. **Rodando o frontend**:
    - Abra o diretório do frontend e execute:
    ```bash
    yarn start
    ```
    O frontend estará disponível em `http://localhost:3000`.

---

## Estrutura do Projeto

- **Backend**:
  - **controllers**: Controladores responsáveis por lidar com as requisições HTTP.
  - **models**: Modelos do banco de dados, com definição das tabelas.
  - **routes**: Definições das rotas para as funcionalidades do sistema.
  - **services**: Lógica de negócios, como autenticação, criptografia de senhas e validação de dados.

- **Frontend**:
  - **components**: Componentes reutilizáveis da interface.
  - **pages**: Páginas principais da aplicação, como login e dashboard.
  - **services**: Serviços para comunicação com o backend, como login e CRUD de dados.

---

## Contribuições

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:  
   `git checkout -b nome-da-sua-branch`
3. Realize as alterações.
4. Envie as alterações para o repositório original com um pull request.

---

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
