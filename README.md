# PortfolioHUB - Entrega Final

Projeto academico de implantacao do **PortfolioHUB + IA Gemini**. A entrega demonstra uma plataforma estatica para centralizar, exibir e gerenciar projetos digitais, usando GitHub como ambiente de versionamento, GitHub Pages como publicacao e Google Gemini como apoio ao planejamento, seguranca, testes e apresentacao.

## Objetivo

Implantar uma plataforma de portfolio digital com:

- plano de implantacao documentado;
- integracao com GitHub e consumo da GitHub REST API;
- gestao demonstrativa de usuarios, papeis e permissoes;
- cadastro, edicao, exclusao, busca e filtro de projetos;
- politica de seguranca e controle de acesso;
- documentacao do fluxo de versionamento e colaboracao;
- testes de validacao da entrega;
- relatorio final em PDF e roteiro para video no YouTube.

## Como visualizar

O projeto e 100% estatico. Basta abrir o arquivo `index.html` no navegador ou acessar:

```text
https://junior089.github.io/portfoliohub/
```

Para rodar localmente:

```bash
gh repo clone junior089/portfoliohub
cd portfoliohub
python -m http.server 4173
```

Depois abra `http://localhost:4173`.

## Contas de demonstracao

| Usuario | Senha | Papel | Permissoes |
|---|---|---|---|
| `admin` | `admin123` | Owner | criar, editar, excluir, publicar |
| `editor` | `editor123` | Collaborator | criar, editar |
| `viewer` | `viewer123` | Reader | visualizar |

O login e demonstrativo para atender ao fluxo de gestao de usuarios em uma aplicacao estatica. Em producao, autenticacao real exigiria backend, OAuth/GitHub Login ou outro provedor de identidade.

## Funcionalidades implementadas

- Pagina inicial responsiva com navegacao por secoes.
- Dark mode como padrao e tema claro opcional.
- Login demonstrativo com perfis `admin`, `editor` e `viewer`.
- Gestao local de projetos com cadastro, edicao, exclusao, busca e filtro por categoria.
- Controle de permissoes por papel: Owner, Collaborator e Reader.
- Painel que consulta a GitHub REST API publica.
- Fallback local caso a API esteja indisponivel.
- Documentacao de suporte e orientacoes geradas com apoio do Google Gemini.
- Content Security Policy no `index.html`.
- Documentacao de seguranca, controle de acesso, testes e apresentacao.

## Seguranca aplicada/documentada

- CSP restritiva, sem `unsafe-inline` no `index.html`.
- Nenhum token do GitHub no front-end.
- Consulta somente a dados publicos da GitHub REST API.
- Login demonstrativo sem promessa de seguranca real em producao.
- Recomendacao de branch protection para `main`.
- Pull Request Template para revisao de alteracoes.
- Documentos de IAM e politicas de colaboracao em `docs/`.

## Estrutura

```text
portfoliohub/
├── index.html
├── README.md
├── SECURITY.md
├── .github/
│   └── pull_request_template.md
├── assets/
│   ├── css/styles.css
│   └── js/main.js
├── docs/
│   ├── checklist-entrega.md
│   ├── controle-acesso.md
│   ├── gemini-prompts.md
│   ├── planejamento.md
│   ├── seguranca.md
│   ├── testes.md
│   └── video-roteiro.md
├── documentos/
│   ├── relatorio-final.html
│   └── relatorio-final.pdf
├── projetos/
│   ├── academicos/portfoliohub/README.md
│   └── pessoais/
│       ├── amet/README.md
│       ├── asclepio/README.md
│       └── plantao/README.md
└── slides/
    └── apresentacao.html
```

## Entregaveis

- Site: `index.html`
- Relatorio final: `documentos/relatorio-final.pdf`
- Relatorio editavel: `documentos/relatorio-final.html`
- Slides: `slides/apresentacao.html`
- Roteiro de video: `docs/video-roteiro.md`
- Checklist: `docs/checklist-entrega.md`

## Links

- Repositorio: `https://github.com/junior089/portfoliohub`
- GitHub Pages: `https://junior089.github.io/portfoliohub/`
- Video final no YouTube: substituir pelo link final publicado.

## Autor

Carlos Alberto Junior
