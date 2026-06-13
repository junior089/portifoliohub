# PortfolioHUB + IA GEMINI

PortfolioHUB é um repositório acadêmico e profissional criado para organizar projetos, documentação e materiais de apresentação. Esta versão representa a **Entrega Final: Implantação PortfolioHUB + IA GEMINI**, incorporando integrações dinâmicas de API, políticas recomendadas por Inteligência Artificial (OWASP, Segurança, Controle de Acesso) e um chatbot assistente interativo baseado no Google Gemini.

O projeto foi desenvolvido por Carlos Alberto Junior como parte do desafio final.

---

## Objetivo Acadêmico

Demonstrar a implantação completa de uma aplicação web estática no **GitHub Pages**, aplicando práticas de governança de segurança (IAM, proteção de branches), integrando APIs de terceiros (GitHub REST API) e demonstrando o uso de IA Generativa (Google Gemini) no planejamento e no produto final.

---

## Principais Integrações da Entrega Final

1. **Assistente de IA Gemini Integrado**: Widget de chat interativo na home page estilizado com o design system do Gemini. Responde em tempo real a perguntas sobre o planejamento, segurança e os projetos do portfólio.
2. **Integração Dinâmica com GitHub API**: Painel "GitHub Live Stats" que consome dados do repositório em tempo real (estrelas, forks, issues) com tratamento de erros e fallback offline.
3. **Políticas de Segurança & IAM**: Implementação de Content Security Policy (CSP), varredura automatizada contra vulnerabilidades (Dependabot, Secret Scanning) e documentação de papéis IAM (Owner, Collaborator, Reader).

---

## Estrutura do Repositório

```text
portfoliohub-entrega-intermediaria/
├── index.html            # Página inicial consolidada da Entrega Final
├── README.md             # Esta documentação
├── LICENSE               # Licença MIT
├── .gitignore            # Arquivos ignorados pelo Git
├── assets/
│   ├── css/
│   │   └── styles.css    # Estilização completa do portfólio e novos componentes
│   ├── js/
│   │   └── main.js       # Lógica do tema, API do GitHub e Chatbot Gemini
│   └── img/
│       └── .gitkeep
├── documentos/
│   ├── relatorio-final.html  # Relatório Final completo (6 capítulos)
│   └── relatorio-final.pdf   # Cópia em PDF para submissão
├── slides/
│   └── apresentacao.html # Slides e roteiro de fala para o vídeo de 5 minutos
└── projetos/
    ├── academicos/
    │   └── portfoliohub/
    └── pessoais/
        ├── asclepio/     # Aplicativo de Saúde e Bem-estar (Flutter)
        ├── amet/         # Assistente de Salas de Vídeo Sincronizadas
        └── plantao/      # Consulta de escalas do Hospital de Planaltina
```

---

## Como Visualizar Localmente

Abra o arquivo `index.html` diretamente no navegador. O projeto é construído em HTML5, CSS3 e JavaScript nativos, sem necessidade de processos de build, compiladores ou instalação de dependências.

---

## Como Hospedar e Configurar Segurança

### 1. Publicação no GitHub Pages
1. Acesse o repositório no GitHub.
2. Entre em **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/root`.
5. Ative a opção **Enforce HTTPS** para garantir a criptografia em trânsito.

### 2. Políticas de Segurança Recomendadas (IA)
- **Branch Protection Rules**: Acesse **Settings > Branches** e adicione uma regra para a branch `main` exigindo Pull Requests para mesclagem de código, revisão de colaboradores e bloqueando force push.
- **Content Security Policy (CSP)**: Integrada nativamente nas meta tags do HTML para prevenir injeção de código (XSS).
- **Segurança de Segredos**: Ative Dependabot e Secret Scanning em **Settings > Code security and analysis**.

---

## Histórico de Versionamento (Git)

O histórico do projeto foi organizado em commits semânticos separados por features de implantação:

- `chore: estrutura inicial do PortfolioHUB`
- `feat: adiciona página principal do portfólio`
- `docs: adiciona documentação dos projetos e relatório final`
- `docs: adiciona apresentação em HTML para vídeo final`
- `feat: adiciona widget interativo do assistente Gemini e lógica do chat`
- `feat: consome API do GitHub para exibir estatísticas em tempo real`
- `security: adiciona meta tag de Content Security Policy (CSP) na home`
- `docs: atualiza relatorio final de implantacao com as seis seções da entrega`
- `chore: atualiza slides de apresentacao e cria roteiro final de video`

### Tags de Versão:
- **v1.0**: Primeira versão estável da entrega intermediária.
- **v2.0-final**: Versão final consolidada com integração de API, segurança IAM e assistente de IA Gemini.

---

## Links e Contatos

- **Repositório GitHub**: `https://github.com/junior089/portfoliohub-entrega-intermediaria`
- **GitHub Pages**: `https://junior089.github.io/portfoliohub-entrega-intermediaria/`
- **LinkedIn**: `https://www.linkedin.com/in/carlos-alberto-soares-de-oliveira-j%C3%BAnior-48127b220/`
- **Vídeo de Apresentação (YouTube)**: `https://youtu.be/U9jnTajrpV4` (Vídeo da entrega intermediária, a ser atualizado com o vídeo final de 5 minutos).

---

## Licença

Este projeto está licenciado sob a licença MIT.
