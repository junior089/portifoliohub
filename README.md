# PortfolioHUB - Entrega Final

Projeto acadêmico de implantação do **PortfolioHUB + IA Gemini**. A entrega demonstra uma plataforma estática para centralizar projetos e documentação, usando GitHub como ambiente de versionamento, GitHub Pages como publicação e Google Gemini como apoio ao planejamento, segurança, testes e apresentação.

## Objetivo

Implantar uma plataforma de portfólio digital com:

- plano de implantação documentado;
- integração com GitHub e consumo da GitHub REST API;
- política de gestão de usuários, segurança e controle de acesso;
- documentação do fluxo de versionamento e colaboração;
- testes de validação da entrega;
- relatório final em PDF e roteiro para vídeo no YouTube.

## Como visualizar

O projeto é 100% estático. Basta abrir o arquivo `index.html` no navegador.

```bash
gh repo clone junior089/portfoliohub
cd portfoliohub
start index.html
```

No macOS/Linux:

```bash
open index.html
# ou
xdg-open index.html
```

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
│   ├── js/main.js
│   └── img/evidencias/
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

## Funcionalidades implementadas

- Página inicial responsiva com navegação por seções.
- Tema claro/escuro com persistência em `localStorage`.
- Filtro de projetos por categoria.
- Painel que consulta a GitHub REST API.
- Fallback local caso a API esteja indisponível.
- Documentação de suporte e orientações geradas pelo Google Gemini.
- Política de Content Security Policy no `index.html`.
- Documentação de segurança, controle de acesso, testes e apresentação.

## Segurança aplicada/documentada

- CSP restritiva, sem `unsafe-inline` no `index.html`.
- Nenhuma credencial no código-fonte.
- Nenhuma chamada externa ou chaves de API expostas no código.
- Recomendação de branch protection para `main`.
- Pull Request Template para revisão de alterações.
- Documentos de IAM e políticas de colaboração em `docs/`.

## Entregáveis

- Site: `index.html`
- Relatório final: `documentos/relatorio-final.pdf`
- Relatório editável: `documentos/relatorio-final.html`
- Slides: `slides/apresentacao.html`
- Roteiro de vídeo: `docs/video-roteiro.md`
- Checklist: `docs/checklist-entrega.md`

## Links

- Repositório: `https://github.com/junior089/portfoliohub`
- GitHub Pages: `https://junior089.github.io/portfoliohub/`
- Vídeo final no YouTube: substituir pelo link final publicado.

## Autor

Carlos Alberto Junior
