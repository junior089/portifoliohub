# Plano de Testes

| ID | Teste | Resultado esperado | Status |
|---|---|---|---|
| TC-01 | Abrir `index.html` ou servir a pasta localmente | Pagina carrega sem etapa de build | Aprovado |
| TC-02 | Navegacao por ancoras | Scroll ate a secao correta e link ativo no menu | Aprovado |
| TC-03 | Tema claro/escuro | Tema alterna e preferencia fica salva no navegador | Aprovado |
| TC-04 | Filtro de projetos | Cards filtrados por categoria | Aprovado |
| TC-05 | Busca de projetos | Projeto correspondente permanece visivel e os demais sao ocultados | Aprovado |
| TC-06 | Busca sem resultado | Estado vazio e exibido sem quebrar o layout | Aprovado |
| TC-07 | GitHub API | Dados do repositorio aparecem no painel | Aprovado com fallback |
| TC-08 | API indisponivel | Layout continua funcional com dados locais | Aprovado |
| TC-09 | Links internos | Documentos, relatorio e slides abrem pelos links da pagina | Aprovado |
| TC-10 | Seguranca da pagina | CSP presente e sem uso de scripts inline | Aprovado |
| TC-11 | Gestao de usuarios | Login demonstrativo inicia sessao e exibe permissoes | Aprovado |
| TC-12 | Controle Git/GitHub | Fluxo de branch, PR e publicacao documentado na interface | Aprovado |
| TC-13 | Login admin | `admin/admin123` habilita cadastro, edicao e exclusao | Aprovado |
| TC-14 | Permissoes Reader | `viewer/viewer123` visualiza projetos, mas nao altera dados | Aprovado |
| TC-15 | Cadastro de projeto | Admin cria projeto e card aparece no hub | Aprovado |
| TC-16 | Exclusao de projeto | Admin remove projeto e lista e atualizada | Aprovado |

## Observacao

O teste da GitHub API depende de internet e do limite publico de requisicoes do GitHub. Por isso, o projeto possui fallback local para manter a pagina utilizavel.

O login e uma simulacao local para demonstrar controle de acesso em uma entrega estatica. Em producao, autenticacao e senhas devem ser tratadas por backend, provedor OAuth ou servico de identidade.
