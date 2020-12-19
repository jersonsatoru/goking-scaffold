<h1 align="center">StarBem API</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=nodejs&message=framework&color=green&style=for-the-badge&logo=NODE"/>
  <img src="https://img.shields.io/static/v1?label=javascript&message=language&color=yellow&style=for-the-badge&logo=JAVASCRIPT"/>
  <img src="http://img.shields.io/static/v1?label=DOCKER&message=Containers&color=blue&style=for-the-badge&logo=DOCKER"/>
  <img src="http://img.shields.io/static/v1?label=JENKINS&message=CI/CD&color=red&style=for-the-badge&logo=JENKINS"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=PRODUCAO&color=GREEN&style=for-the-badge"/>
</p>

<p align="center">Aplicação responsavel pelas regras de negocios e bancos de dados da StarBem.</p>

### Deep Code

[![deepcode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6Imdvay1kZXYiLCJyZXBvMSI6InN0YXJiZW0tYXBpIiwiaW5jbHVkZUxpbnQiOmZhbHNlLCJhdXRob3JJZCI6MjI5MDMsImlhdCI6MTYwNTkzMjIxN30.jP7HD4iR7F9r41BVL9z9tmFMcmkfPHl9pSSrzJ6NMAg)](https://www.deepcode.ai/app/gh/gok-dev/starbem-api/_/dashboard?utm_content=gh%2Fgok-dev%2Fstarbem-api)

### Pré-requisitos

- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Lint

- Este projeto está configurado para seguir algumas regras de lint e possui identação e organização de códigos automatica com o uso do Prettier.

## Como rodar a aplicação :arrow_forward:

Clone o repositório usando:

```
$ git clone https://github.com/gok-dev/starbem-api.git
```

## Intalar Dependencias

- Acesse a pasta do projeto e instale as dependencias utilizando o comando abaixo:

```
$ yarn install
```

## Colletion Insominia/Postman

- Acesse a pasta do projeto "/app/insominia" e importe dentro do seu insominia ou postman

## Scripts Disponiveis

- No diretório do projeto execute o comando abaixo para rodar em modo de desenvolvimento:

```
$ yarn start:dev

```

- Para rodar o projeto em produção execute o comando:

```
$ yarn start:prod
```

## Fluxo de Trabalho

Para este projeto utilizaremos o modelo conhecido como Git Flow adaptado para o modelo de SCM. Podemos utilizar o conceito de Feature branch, o desenvolvimento de novas features deverá ser feito em cima da branch develop.

### Diagrama do Fluxo

<img src="https://static.imasters.com.br/wp-content/uploads/2015/04/git-workflow-release-cycle-4maintenance.png" alt="Diagrama de Fluxo do Git Flow" />

### Detalhes das Branches

### Detalhes dos fluxos

#### Desenvolvimento de uma nova feature

- 1 - Cria-se o Feature Branch da estória a partir do Branch Develop (ex: feature/JIRA-????) esse formato deverá ser: feature/JIRA_ESTORIA;

- 2 - Time de desenvolvimento implementa a estória no FB1;

- 3 - Uma vez aprovada nos testes unitários, o time de desenvolvimento promove a história para o branch Develop/Release e move o card do Jira no Board para [Ready for QA/Automation Integration];

- 4 - A equipe de Arquitetura/Líder do Projeto + Revisores de código ficaram responsáveis por realizar o code review aprovar/rejeitar o PR. Após a aprovação a feature deverá ser mergeada para Develop/Release e o card no Jira deverá ser movido para Approved.

- 5 - Após a aprovação dos testes de automatizados a branch de Develop/Release deverá ser promovida para Master através de Job no Jenkins ou PRs.

- 6 - Após os testes de homologação deverá realizar o deploy do artefato em produção e a geração de uma tag com a versão referente.

#### Correção de bugs encontrado na fase de Homologação QA ou Integrados

Um bug dessa natureza pode ser encontrado entre os passos 4 e 5 da demanda Desenvolvimento de uma nova feature do sprint

Quando um bug de QA é encontrado, os seguintes passos devem ser executados:

- 1 - A equipe de desenvolvimento deverá corrigir o bug no Feature Branch relacionado a estória em questão (FB). Uma vez implementada a correção, o fluxo segue idêntico ao Desenvolvimento de uma nova feature do sprint, a partir do passo 3.

#### Correção de bugs encontrado em Homologação

Um bug dessa natureza pode ser encontrado no passo 5 da demanda Desenvolvimento de uma nova feature do sprint

Quando um bug em Homologação é encontrado, os seguintes passos deverão ser executados:

- 1- Um branch bugfix é criado a partir da release no formato: bugfix/JIRA_ID, onde a equipe de desenvolvimento deverá corrigir o problema. Uma vez implementada a correção, o fluxo deverá ser o Pull Request para a branch Release e após os testes novamente e a confirmação da correção do problema a branch develop deverá receber Pull Request de bugfix, para que a branch develop possa receber todas as correções.

#### Correção de bugs encontrados em produção

Um bug dessa natureza pode ser encontrado no passo 6 da demanda Desenvolvimento de uma nova feature do sprint

Quando um bug em Produção é encontrado, os seguintes passos deverão ser executados:

- 1- Um branch Hotfix é criado a partir da tag de produção, onde a equipe de desenvolvimento deverá corrigir o problema. Uma vez implementada a correção, o fluxo deverá ser o Pull Request para a branch Release e realizar homologação, após isso deverá realizar outro PR para branch Master, próximo passo será o deploy do artefato em produção gerar uma tag da versão e atualizar a branch develop para atualizar com as Features/Bugs/Hots.

## Padrões

### Criação de Branch

- A Feature branch deverá seguir o padrão de criação: <feature branch - Ex: feature/JIRA_ESTORIA>

- O Bugfix deverá seguir o padrão de criação: <bugfix - Ex: bugfix/JIRA_BUGFIX>

- O Hotfix deverá seguir o padrão de criação: <hotfix - Ex: hotfix/JIRA_HOTFIX>

- O Release deverá seguir o padrão de criação: <release - Ex: release/1.0.0>

#### Main branch

- O origin/master/tag é o branch principal que sempre reflete o production.
- A branch master poderá refletir também o momento de homologação/piloto em algumas ocasiões.

#### Development branch

- Branch develop deverá ser utilizada para centralizar todas as features branchs de desenvolvimento para ser realizado a homologação (QA + Automation Integration) das features.
- Será feito o merge sempre que tiver feature branch pronta para ser realizado a homologação QA.

#### Bug Fix branch

- Utilizado para correções de bugs de testes automation integration em cenarios de develop e release (homologação/piloto)

#### Hot Fix branch

- Utilizado para correções de bugs de produção, permitindo que o time continue o trabalho em novas features, enquanto outra parte do time trabalha na correção do bug.

- Deverá sair da Tag de produção a branch de hotfix.

- Deverá seguir o fluxo de trabalho como release, ou seja, após correção, um PR deverá ser criado para branch de Master;

### Commit (Importante seguir essa regra)

- Formato comentarios: <jira sub-task ID-n>: <comentário>
- Exemplo: [CDB-059]: Criado o arquivo de tema

- git commit -m "[task-code]: comments"

### Desenvolvedores

| [<img src="https://avatars2.githubusercontent.com/u/9826351?s=460&u=2b24ccb249af71cb7f2574b35484b4931b9fff0a&v=4" width=115 > <br> <sub> Michael Regis </sub>](https://github.com/Michaelito) | [<img src="https://avatars0.githubusercontent.com/u/6018181?s=400&u=001e15b337ba35ccdf57dc5697480cfd0ede30f3&v=4" width=115 > <br> <sub> Eduardo Olimpio </sub>](https://github.com/debianx) | [<img src="https://avatars0.githubusercontent.com/u/39813875?s=460&v=4" width=115 > <br> <sub> Julio Augusto </sub>](https://github.com/JulioAugustoS) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |

## Licença

The [MIT License]() (MIT)

Copyright StarBem 2020 - StarBem API
