# Seguranca

## Principios adotados

- Menor privilegio para permissoes no GitHub.
- Separacao entre documentacao, codigo e evidencias.
- Nao exposicao de credenciais.
- Revisao de alteracoes por Pull Request.
- Publicacao estatica sem backend e sem dados sensiveis.

## Content Security Policy

A pagina principal usa CSP para limitar a origem de scripts, estilos, imagens e conexoes:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; connect-src 'self' https://api.github.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests">
```

## GitHub

Recomendacoes para o repositorio:

- Branch `main` protegida.
- Pull Request para alteracao relevante.
- Bloqueio de force push.
- Secret Scanning ativo, quando disponivel.
- Dependabot alerts ativo, quando aplicavel.

## Tokens e chaves

- Nao inserir token do GitHub em `index.html`, CSS ou JavaScript publico.
- Como o PortfolioHUB e estatico e roda no navegador, qualquer token colocado no front-end fica exposto para visitantes.
- A integracao do painel usa apenas dados publicos da GitHub REST API.
- Se algum token for compartilhado por engano, ele deve ser revogado imediatamente no GitHub.
- Token so deve ser usado em um backend seguro, GitHub Action ou servico proxy que nao exponha o segredo ao navegador.

## Login demonstrativo

- O painel possui usuarios de demonstracao para evidenciar gestao de acesso no PortfolioHUB.
- As contas `admin`, `editor` e `viewer` aplicam permissoes diferentes na interface.
- A sessao e salva em `sessionStorage`; projetos criados ou editados ficam em `localStorage`.
- Esta abordagem nao substitui autenticacao real. Para uso em producao, seria necessario backend, OAuth/GitHub Login ou outro provedor de identidade.
