# 🎭 Framework de Automação de Testes com Playwright

![NodeJS](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-green)
![Playwright](https://img.shields.io/badge/Playwright-v1.48+-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🏆 Status do Projeto: Completo (Fase 21 - Revisão Final)

## 🎯 Propósito do Projeto

Este framework foi desenvolvido como material de estudo para aprender Playwright, automação de testes, arquitetura de frameworks e boas práticas de mercado.

**Objetivos de aprendizado:**

- Dominar o Playwright do zero ao avançado
- Entender arquitetura de frameworks profissionais
- Aplicar Page Object Model (POM)
- Aplicar Data-Driven Testing (DDT)
- Configurar Pipeline de CI/CD (GitHub Actions)
- Implementar boas práticas de automação
- Preparar-se para atuar como QA Pleno/Sênior ou SDET

## 🏗️ Estrutura do Projeto

```
playwright-framework-estudo/
├── config/              # Configurações do framework
├── pages/               # Page Objects (POM)
├── tests/               # Arquivos de teste
│   ├── api/            # Testes de API
│   ├── e2e/            # Testes end-to-end
│   ├── visual/         # Testes visuais
│   └── examples/       # Exemplos de aprendizado
├── fixtures/           # Fixtures customizadas do Playwright
├── testData/           # Dados de teste (JSON, CSV)
├── utils/               # Funções utilitárias genéricas
├── helpers/             # Funções auxiliares específicas
├── constants/           # Constantes do projeto
├── reports/             # Relatórios gerados
├── screenshots/         # Screenshots capturados
├── traces/              # Traces do Playwright
├── downloads/           # Arquivos baixados nos testes
├── logs/                # Logs de execução
├── package.json         # Configuração do projeto Node.js
├── playwright.config.js  # Configuração do Playwright
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Esta documentação
```

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.0.0 ou superior)
  - Download: https://nodejs.org/
  - Verificar versão: `node --version`

- **npm** (versão 9.0.0 ou superior)
  - Já vem instalado com o Node.js
  - Verificar versão: `npm --version`

## 🚀 Instalação

### 1. Clone ou acesse o diretório do projeto

```bash
git clone https://github.com/moschettimarcos/playwright-framework-estudo.git
cd playwright-framework-estudo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Instale os navegadores do Playwright

```bash
npx playwright install
```

Baixa os binários do Chromium, Firefox e WebKit usados na automação.

**Opcional: Instalar apenas navegadores específicos**

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

## 🧪 Executando os Testes

```bash
npm test
```

Executa todos os testes em modo headless, nos navegadores configurados. Para outros modos (headed, debug, UI, por navegador, por tipo de teste), veja a tabela de scripts abaixo.

## 📊 Visualizando Relatórios

### Abrir relatório HTML

```bash
npm run report
```

**O que mostra:**

- Status de todos os testes (passou/falhou)
- Tempo de execução de cada teste
- Screenshots de falhas
- Vídeos de execução
- Traces detalhados

## 🛠️ Scripts Disponíveis

| Script                     | Comando                              | Descrição                     |
| -------------------------- | ------------------------------------ | ----------------------------- |
| `npm test`                 | `playwright test`                    | Executa todos os testes       |
| `npm run test:headed`      | `playwright test --headed`           | Executa com navegador visível |
| `npm run test:debug`       | `playwright test --debug`            | Executa em modo debug         |
| `npm run test:ui`          | `playwright test --ui`               | Executa com UI Mode           |
| `npm run test:chromium`    | `playwright test --project=chromium` | Executa apenas no Chromium    |
| `npm run test:firefox`     | `playwright test --project=firefox`  | Executa apenas no Firefox     |
| `npm run test:webkit`      | `playwright test --project=webkit`   | Executa apenas no WebKit      |
| `npm run test:api`         | `playwright test tests/api`          | Executa apenas testes de API  |
| `npm run test:e2e`         | `playwright test tests/e2e`          | Executa apenas testes E2E     |
| `npm run test:visual`      | `playwright test tests/visual`       | Executa apenas testes visuais |
| `npm run report`           | `playwright show-report`             | Abre relatório HTML           |
| `npm run install:browsers` | `playwright install`                 | Instala navegadores           |
| `npm run install:deps`     | `npm install`                        | Instala dependências          |
| `npm run lint`             | `eslint .`                           | Verifica qualidade do código  |
| `npm run format`           | `prettier --write .`                 | Formata o código              |

## 📖 Roadmap de Estudo

Este framework foi construído evoluindo gradativamente através de 21 fases de aprendizado contínuo:

### 🟢 Fundamentos e Estrutura Básica

- **Fase 1 - Fundamentos**: Configuração, pacotes, comparações de frameworks.
- **Fase 2 - Estrutura Inicial**: Configuração de `playwright.config.js`, gitignore e diretórios.
- **Fase 3 - Testes Básicos**: Navegação, interações, inputs e cliques.

### 🟡 Identificação e Validações

- **Fase 4 - Locators**: Estratégias de localização, ARIA Roles, XPath, CSS.
- **Fase 5 - Assertions**: Validações de texto, visibilidade, URLs, estados.
- **Fase 6 - Waits**: Auto-waiting nativo do Playwright vs esperas implícitas/explícitas.
- **Fase 7 - Hooks**: Ciclo de vida (`beforeAll`, `afterAll`, `beforeEach`, `afterEach`).

### 🟠 Arquitetura Profissional

- **Fase 8 - Estrutura Profissional**: Page Object Model (POM), helpers, dados de teste (JSON).
- **Fase 9 - Fixtures**: Setup compartilhado, injeção de dependências e customização.
- **Fase 10 - Configuração Avançada**: Configuração de retries, timeouts, baseURL.
- **Fase 11 - Multi-Browser**: Configuração e execução em Chromium, Firefox e WebKit.

### 🔴 Testes Avançados e API

- **Fase 12 - API Testing**: Validação de endpoints, verbos HTTP (GET, POST, etc.) e status codes.
- **Fase 13 - Network**: Mocking, interceptação de chamadas, simulação de falhas de rede.
- **Fase 14 - Visual Quality**: Screenshots, regressão visual, vídeos e Trace Viewer.
- **Fase 15 - Mobile Emulation**: Emulação de dispositivos mobile, viewports, touch e geolocalização.

### 🟣 DevOps e Finalização

- **Fase 16 - Reports**: Configuração de relatórios HTML, list, JUnit.
- **Fase 17 - CI/CD**: Pipeline automatizada via GitHub Actions.
- **Fase 18 - Debugging**: Ferramentas de inspeção de código e depuração do Playwright.
- **Fase 19 - Scalability**: Paralelismo, sharding e performance.
- **Fase 20 - Roadmap Mapping**: Estruturação de aprendizado.
- **Fase 21 - Revisão Final**: Conclusão da arquitetura, prontidão para o mercado.

## 🎓 Conceitos Principais

### O que é Playwright?

Playwright é um framework de automação de testes end-to-end desenvolvido pela Microsoft. Ele permite testar aplicações web, mobile e APIs de forma moderna e eficiente.

**Características principais:**

- Suporta múltiplos navegadores: Chromium, Firefox, WebKit
- Suporta múltiplas linguagens: JavaScript, TypeScript, Python, Java, .NET
- Auto-waiting inteligente (espera automática por elementos)
- Execução paralela nativa
- Network interception (interceptação de requisições)
- Trace viewer para debugging avançado

### O que é Page Object Model (POM)?

Page Object Model é um padrão de design que cria uma abstração entre os testes e a página da aplicação.

**Benefícios:**

- Reutilização de código
- Manutenibilidade
- Separação de responsabilidades
- Testes mais legíveis

**Estrutura:**

- Cada página da aplicação tem uma classe Page Object
- Os Page Objects contêm os seletores e métodos de interação
- Os testes usam os Page Objects, não seletores diretos

### O que é Data-Driven Testing (DDT)?

Abordagem de automação onde os dados de entrada e validação são armazenados em fontes de dados externas (como arquivos JSON, CSV ou bancos de dados), separando-os da lógica do teste.

**Benefícios:**

- Um único script valida dezenas de cenários (ex: usuários válidos e inválidos)
- Facilidade na atualização da massa de dados
- Maior cobertura de testes sem duplicação de código

### O que são Fixtures?

Fixtures são funções que configuram o ambiente de teste. No Playwright, fixtures são usadas para:

- Inicializar páginas e contextos
- Configurar dados de teste
- Injetar dependências
- Reutilizar código entre testes

## 🔧 Configuração

### playwright.config.js

Este é o arquivo principal de configuração do Playwright. As principais seções são:

- **testDir**: Diretório onde os testes estão localizados
- **baseURL**: URL base para todos os testes
- **timeout**: Timeout padrão para testes
- **retries**: Número de tentativas em caso de falha
- **workers**: Número de workers paralelos
- **projects**: Configurações por navegador/dispositivo
- **reporter**: Configuração de relatórios

### Integração Contínua (CI/CD)

Este projeto possui um workflow do **GitHub Actions** (`.github/workflows/playwright.yml`) já configurado que:

- Executa os testes automaticamente a cada Push ou Pull Request
- Testa em múltiplas versões do Node.js
- Testa as execuções em diferentes navegadores e dispositivos mobile
- Faz upload automático dos relatórios, traces e screenshots em caso de falha
- Comenta os resultados diretamente no PR

### package.json

Este arquivo define o projeto Node.js:

- **name**: Nome do projeto
- **version**: Versão do projeto
- **scripts**: Scripts de execução
- **devDependencies**: Dependências de desenvolvimento
- **engines**: Versões mínimas de Node e npm

## 🐛 Debugging

### Modo Debug

```bash
npm run test:debug
```

**Recursos:**

- Playwright Inspector
- Pausa em cada passo
- Inspecionar elementos
- Tentar seletores

### UI Mode

```bash
npm run test:ui
```

**Recursos:**

- Interface visual
- Timeline de execução
- Selecionar testes individuais
- Ver traces

### Trace Viewer

```bash
npx playwright show-trace trace.zip
```

**O que mostra:**

- Timeline completa de execução
- Network requests
- Console logs
- Screenshots em cada passo

### PWDEBUG

```bash
PWDEBUG=1 npm test
```

**O que faz:**

- Executa em modo debug
- Abre navegador visível
- Habilita logs detalhados

## 📚 Recursos de Aprendizado

### Documentação Oficial

- Playwright: https://playwright.dev
- Best Practices: https://playwright.dev/docs/best-practices

### Comunidade

- GitHub: https://github.com/microsoft/playwright
- Discord: https://discord.gg/playwright

## 🤝 Contribuindo

Embora seja um projeto de estudo avançado/portfólio, sinta-se à vontade para:

- Adicionar novos exemplos
- Melhorar a documentação
- Corrigir bugs
- Sugerir melhorias

## 📝 Licença

MIT License - Livre para uso educacional e comercial.

## 👤 Autor

**Marcos Vinicius** — Analista de QA, automação de testes
- GitHub: [@moschettimarcos](https://github.com/moschettimarcos)
- LinkedIn: [marcos-moschetti](https://www.linkedin.com/in/marcos-moschetti/)
- Portfólio: [moschettimarcos.github.io](https://moschettimarcos.github.io/)

---

**Lembre-se:** Este framework foi criado para aprendizado. Não tenha medo de experimentar, quebrar coisas e aprender com os erros. A melhor forma de aprender é praticando!

**Dica:** Comece pelos exemplos na pasta `tests/examples/` e avance gradualmente pelos conceitos mais avançados.
