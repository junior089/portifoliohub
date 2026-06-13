# Política de Segurança

## Escopo

Este projeto é uma aplicação estática para entrega acadêmica. Não há backend, banco de dados, autenticação real ou armazenamento de dados sensíveis.

## Decisões de segurança

- Não armazenar tokens, senhas, chaves de API ou arquivos `.env` no repositório.
- Usar uma simulação local do assistente Gemini para evitar exposição de chave no navegador.
- Restringir fontes de script, imagem e conexão por Content Security Policy.
- Utilizar GitHub para controle de versão e registro de mudanças.
- Documentar a matriz de acesso e o fluxo de colaboração.

## Recomendação para o GitHub

Ativar, quando disponível no repositório:

- Branch Protection para `main`.
- Pull Request antes de merge.
- Bloqueio de force push.
- Secret Scanning.
- Dependabot alerts.

## Reporte

Em caso de falha, registrar uma issue no repositório com: descrição, impacto, passos de reprodução e sugestão de correção.
