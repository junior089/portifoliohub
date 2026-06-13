# Plano de Testes

| ID | Teste | Resultado esperado | Status |
|---|---|---|---|
| TC-01 | Abrir `index.html` | Página carrega sem build | Aprovado |
| TC-02 | Navegação por âncoras | Scroll até a seção correta | Aprovado |
| TC-03 | Tema claro/escuro | Tema alterna e persiste | Aprovado |
| TC-04 | Filtro de projetos | Cards filtrados por categoria | Aprovado |
| TC-05 | GitHub API | Dados do repositório aparecem | Aprovado com fallback |
| TC-06 | API indisponível | Layout não quebra | Aprovado |
| TC-07 | Assistente local | Responde por tópicos | Aprovado |
| TC-08 | Segurança do chat | Entrada do usuário vira texto, não HTML | Aprovado |
| TC-09 | Links internos | Documentos e slides abrem | Aprovado |
| TC-10 | Relatório PDF | PDF atualizado foi gerado | Aprovado |

## Observação

O teste da GitHub API depende de internet e do limite público de requisições do GitHub. Por isso, o projeto possui fallback local.
