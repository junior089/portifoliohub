# Plano de Testes

| ID | Teste | Resultado esperado | Status |
|---|---|---|---|
| TC-01 | Abrir `index.html` ou servir a pasta localmente | Página carrega sem etapa de build | Aprovado |
| TC-02 | Navegação por âncoras | Scroll até a seção correta e link ativo no menu | Aprovado |
| TC-03 | Tema claro/escuro | Tema alterna e preferência fica salva no navegador | Aprovado |
| TC-04 | Filtro de projetos | Cards filtrados por categoria | Aprovado |
| TC-05 | Busca de projetos | Projeto correspondente permanece visível e os demais são ocultados | Aprovado |
| TC-06 | Busca sem resultado | Estado vazio é exibido sem quebrar o layout | Aprovado |
| TC-07 | GitHub API | Dados do repositório aparecem no painel | Aprovado com fallback |
| TC-08 | API indisponível | Layout continua funcional com dados locais | Aprovado |
| TC-09 | Links internos | Documentos, relatório e slides abrem pelos links da página | Aprovado |
| TC-10 | Segurança da página | CSP presente e sem uso de scripts inline | Aprovado |
| TC-11 | Gestão de usuários | Matriz IAM exibida na seção de acesso | Aprovado |
| TC-12 | Controle Git/GitHub | Fluxo de branch, PR e publicação documentado na interface | Aprovado |

## Observação

O teste da GitHub API depende de internet e do limite público de requisições do GitHub. Por isso, o projeto possui fallback local para manter a página utilizável.
