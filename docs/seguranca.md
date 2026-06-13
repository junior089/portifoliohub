# Segurança

## Princípios adotados

- Menor privilégio para permissões no GitHub.
- Separação entre documentação, código e evidências.
- Não exposição de credenciais.
- Revisão de alterações por Pull Request.
- Publicação estática sem backend e sem dados sensíveis.

## Content Security Policy

A página principal usa CSP para limitar a origem de scripts, estilos, imagens e conexões:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; connect-src 'self' https://api.github.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests">
```

## GitHub

Recomendações para o repositório:

- Branch `main` protegida.
- Pull Request para alteração relevante.
- Bloqueio de force push.
- Secret Scanning ativo, quando disponível.
- Dependabot alerts ativo, quando aplicável.
