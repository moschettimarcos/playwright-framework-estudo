# Documentação Técnica Interna do Framework Playwright

Este documento detalha a arquitetura, configurações, organização dos scripts de teste e a esteira de CI/CD do framework de automação E2E baseado em Playwright.

---

## 1. Configuração Global (`playwright.config.js`)

O arquivo de configuração define o comportamento global da execução dos testes. Suas principais diretrizes são:

- **`testDir`**: Aponta para `./tests`, indicando onde o runner deve buscar os arquivos `.spec.js`.
- **`fullyParallel: true`**: Habilita a execução paralela de testes, maximizando a utilização dos recursos (Workers) para reduzir o tempo de execução.
- **`retries`**: Configurado dinamicamente (`process.env.CI ? 2 : 0`). Testes instáveis (flaky) são reexecutados até 2 vezes no ambiente de CI para evitar falsos positivos; localmente os retries são desabilitados para facilitar o debug.
- **`reporter`**: Utiliza múltiplos reporters: `html` para interface gráfica detalhada, `list` para output no terminal e `junit` para integração com painéis de CI/CD.
- **`use.baseURL`**: Define a URL base do projeto (ex: `https://demoqa.com`), permitindo navegação relativa (ex: `page.goto('/elements')`) e facilitando transições entre ambientes (Staging/QA/Prod).
- **Coleta de Evidências (`trace`, `screenshot`, `video`)**: Configurados como `'retain-on-failure'`. As evidências só são mantidas em disco caso o teste falhe, otimizando o consumo de armazenamento na máquina/CI.
- **`projects`**: Estrutura matriz de testes cruzados, definindo as propriedades (viewport, user-agent) de execução para `chromium`, `firefox`, `webkit`, bem como parâmetros de emulação mobile.

---

## 2. Scripts de Execução (`package.json`)

A seção `scripts` encapsula comandos do CLI do Playwright:

- **`npm test`**: Executa a suíte de testes padrão em modo headless (sem interface gráfica).
- **`npm run test:ui`**: Inicia o Playwright UI Mode, fornecendo uma interface com ferramentas de time-travel, console e inspecionador de rede para debugging contínuo.
- **`npm run test:headed`**: Força a renderização do navegador para acompanhamento visual da execução.

---

## 3. Cobertura de Testes (`tests/`)

O diretório `tests/` contém scripts divididos por categorias e componentes de testes E2E e API.

### E2E / Exemplos Funcionais (`tests/examples/`)

- **`01-navegacao.spec.js`**: Operações de navegação de página. Cobre `goto()`, manipulação do histórico do navegador (`goBack()`, `goForward()`) e requisições de recarregamento (`reload()`).
- **`02-interacoes-basico.spec.js`**: Interações de teclado e mouse. Cobre diferenças estruturais entre `fill()` e `type()` (simulação de eventos keypress). Aborda cliques e pressões de teclas de controle (`Enter`, `Escape`). **Implementa Data-Driven Testing (DDT)** via iterações lendo o arquivo `users.json`.
- **`03-checkboxes-radio-buttons.spec.js`**: Validação de inputs baseados em estado. O Playwright utiliza `check()` e `uncheck()` verificando nativamente o estado atual do DOM. Emprega a flag `{ force: true }` para suprimir bloqueios de interação causados por sobreposição de elementos na UI.
- **`04-dropdowns.spec.js`**: Interação com elementos `<select>` nativos (via `selectOption`) e renderizações de dropdown customizados (ex: React Select), lidando com visibilidade assíncrona de itens do menu.
- **`05-upload-download.spec.js`**: Tratamento de sistema de arquivos. Uploads simulados via `Buffer` injetado na memória (`setInputFiles()`) e captura de eventos de `download` gravados no disco via módulo `path` do Node.
- **`06-screenshots.spec.js`**: Regressões de evidência. Implementa captações em formato _Full Page_ e de componentes individuais. Apresenta o parâmetro `mask` para omitir seletores com informações sensíveis em screenshots.
- **`07-locators.spec.js`**: Estratégias de localização. Prioriza a utilização de seletores semânticos e acessíveis (`getByRole`, `getByTestId`), evidenciando a fragilidade de seletores XPath absolutos ou CSS atrelados diretamente a classes dinâmicas.
- **`08-assertions.spec.js`**: Baseado na biblioteca interna `expect`. Cobre validações de estados (`toBeVisible`, `toBeDisabled`), atributos, classes e URLs. Emprega _Soft Assertions_ (`expect.soft()`) para permitir a coleta de múltiplas falhas antes de reprovar uma suíte.
- **`09-waits.spec.js`**: Implementa sincronização. Substitui chamadas fixas (`sleep`/`waitForTimeout`) por Auto-Waiting nativo, aguardando resoluções de estados de rede (`waitForLoadState('networkidle')`) e promessas de resposta HTTP (`waitForResponse()`).
- **`10-hooks.spec.js`**: Administração do ciclo de vida dos testes via blocos `beforeAll`, `afterAll`, `beforeEach` e `afterEach`. Usado para setup de ambiente, autenticação prévia e limpeza de cookies.
- **`11-network.spec.js`**: Monitoramento e interceptação da camada de rede. Bloqueia requisições externas (como tracking e imagens) ou realiza falsificação de respostas (Mocking) modificando status code ou corpo da resposta.
- **`12-visual-quality.spec.js`**: Testes de regressão visual. Implementa validação pixel-by-pixel, permitindo customizações de limites (`maxDiffPixelRatio`) para comparação e identificação de inconsistências no layout.
- **`13-mobile-emulation.spec.js`**: Validação de responsividade. Executa os fluxos emulando _Viewports_ de dispositivos, falsificação de _User-Agent_, densidade de pixels e validações de eventos _touch_ (exceto motores incompatíveis nativamente com a flag `isMobile`, como o Firefox).

### Testes de API (`tests/api/`)

- **`01-api-basics.spec.js`**: Utiliza o pacote de requests do Playwright (`request`) para validação de Back-End, abstraindo contextos UI. Cobre requisições HTTP (GET, POST, PUT, DELETE), envio de parâmetros via Query e Body Payload, e validações de Headers, Contratos (Schema) e Status Code.

---

## 4. Padrões Arquiteturais

### Page Object Model (POM) - `pages/`

Padrão de projeto implementado (ex: `HomePage.js`) para abstrair os locators e métodos de interação de uma UI.

- **Vantagens Implementadas**: Reduz a duplicação de código e facilita manutenções escaláveis. Se as propriedades HTML da interface mudarem, o ajuste ocorre de forma centralizada em uma classe em vez de nos arquivos `.spec.js`.

### Data-Driven Testing (DDT) - `testData/`

Abordagem de injeção de dados. Retira as strings estáticas ("hardcoded") dos scripts de testes.

- **Vantagens Implementadas**: Os testes rodam múltiplos cenários com base no arquivo externo (`users.json`), facilitando a gestão da massa de dados independente da lógica de verificação.

---

## 5. Pipeline de Integração Contínua (CI/CD)

O framework contém integração pronta via GitHub Actions, definida em `.github/workflows/playwright.yml`. O pipeline atende as demandas de execução contínua:

1. **Gatilhos (Triggers)**: Executado on `push` ou `pull_request` contra a branch principal.
2. **Estratégia de Matriz (`matrix`)**: Roda testes em paralelo utilizando as versões do Node.js (18.x e 20.x), prevenindo quebra de compatibilidade em runtimes atualizados.
3. **Etapas (Steps)**:
   - Faz o checkout do código via `actions/checkout`.
   - Realiza instalação estrita de dependências via `npm ci`.
   - Efetua download de dependências dos navegadores nativos (`playwright install --with-deps`).
   - Passa a variável de ambiente `CI=true` para desativar interfaces gráficas e reforçar o comportamento headless.
4. **Publicação de Artefatos**: Coleta report HTML, _Traces_ (arquivo ZIP consumido pelo Trace Viewer), e screenshots quando ocorrem falhas, preservando-os por 30 ou 7 dias como artefato anexado à _action_.
5. **Resultados e Comentários**: Incorpora os resultados em formato `junit.xml` para exibição nativa no painel, e realiza interações de bot para comentar resultados de sucesso ou falha na discussão de PRs em aberto.
