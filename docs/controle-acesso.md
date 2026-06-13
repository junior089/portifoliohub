# Controle de Acesso

## Matriz IAM

| Papel | Permissão | Uso recomendado |
|---|---:|---|
| Owner | Administração total | Apenas responsável pelo projeto |
| Maintainer | Escrita e revisão | Manutenção técnica do repositório |
| Collaborator | Escrita via branch/PR | Desenvolvimento de funcionalidades |
| Reader/Avaliador | Leitura | Correção acadêmica e auditoria |

## Fluxo de colaboração

1. Criar branch de trabalho.
2. Realizar commits semânticos.
3. Abrir Pull Request.
4. Validar checklist de segurança.
5. Fazer merge somente após revisão.

## Regras recomendadas para `main`

- Exigir Pull Request.
- Bloquear force push.
- Bloquear exclusão da branch.
- Exigir status checks quando houver automação.
