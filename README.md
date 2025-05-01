# SIGAcademy

**SIGAcademy** é um sistema de gerenciamento acadêmico online desenvolvido na disciplina de **Tópicos Especiais em Engenharia de Software**, utilizando **Node.js**, **React** e **PostgreSQL**. O sistema permite que **alunos** e **professores** interajam com as informações acadêmicas de maneira simples e eficiente.

## Linguagens Utilizadas

- **Frontend**: ReactJS
- **Backend**: Node.js

## Resumo do Sistema

O **SIGAcademy** tem como objetivo fornecer um ambiente online para o gerenciamento de informações acadêmicas. Ele oferece funcionalidades para alunos e professores de forma independente:

### **Alunos**:
- Login para acessar a plataforma.
- Visualizar disciplinas e aulas cadastradas.
- Ver informações sobre os professores de cada aula.
- Editar seus dados pessoais.
  
### **Professores**:
- Editar informações de suas disciplinas.
- Adicionar mensagens para os alunos matriculados nas disciplinas.
- Registrar notas e gerenciar os alunos de suas disciplinas.
- Editar seus próprios dados pessoais.

### **Administrador**:
- Liberação de acesso a usuários (professores e alunos).
- Cadastro de professores nas disciplinas.
- Visualização de dados de todos os usuários cadastrados no sistema.

## Descrição

- **Autenticação**: Utiliza **JWT** para autenticação de usuários.
- **Segurança**: Senhas são criptografadas utilizando **bcrypt**.
- **Validação de Dados**: A validação dos dados é realizada com o protocolo **Yup**.

## Rodando o Projeto

### **Pré-requisitos**
- **PostgreSQL** instalado e configurado.
- **Node.js** instalado.
- **Yarn** como gerenciador de pacotes.

### **Backend**

1. Instale as dependências necessárias:
   ```bash
   yarn
   ```

2. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente com suas credenciais de desenvolvimento.

3. Com o código do backend aberto na sua IDE, execute o seguinte comando para criar as tabelas no banco de dados:
   ```bash
   yarn sequelize db:migrate
   ```

4. Para rodar o backend em modo desenvolvedor, use o comando:
   ```bash
   yarn dev
   ```

### **Frontend**

1. Instale as dependências necessárias:
   ```bash
   yarn
   ```

2. Para rodar o frontend em modo desenvolvedor, use o comando:
   ```bash
   yarn start
   ```
