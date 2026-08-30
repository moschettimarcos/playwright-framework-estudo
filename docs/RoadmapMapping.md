# Mapeamento de Conceitos por Fase do Roadmap

Este documento associa todos os conceitos abordados no framework com suas respectivas fases do roadmap.

---

## Fase 1 - Fundamentos

### Conceitos:
- **Playwright**: Framework de automação de testes end-to-end
- **Node.js**: Runtime JavaScript necessário para executar Playwright
- **npm**: Gerenciador de pacotes do Node.js
- **package.json**: Arquivo de configuração do projeto
- **Dependencies**: Dependências de produção e desenvolvimento
- **Scripts**: Comandos npm para executar tarefas
- **npx**: Executor de pacotes npm
- **Framework**: Estrutura organizacional de testes
- **Comparações**: Playwright vs Selenium vs Cypress

### Arquivos:
- `package.json`: Configuração do projeto
- `README.md`: Documentação do projeto

### Quando usar:
- Início do projeto
- Configuração inicial
- Entendimento de conceitos básicos

---

## Fase 2 - Estrutura Inicial

### Conceitos:
- **playwright.config.js**: Configuração principal do Playwright
- **.gitignore**: Arquivos a ignorar no Git
- **Estrutura de diretórios**: Organização de arquivos
- **Configuração de testes**: Diretório de testes
- **Reporters**: Configuração de relatórios
- **Projects**: Configuração de múltiplos projetos
- **Browsers**: Configuração de navegadores

### Arquivos:
- `playwright.config.js`: Configuração completa
- `.gitignore`: Exclusão de arquivos
- `README.md`: Documentação atualizada

### Quando usar:
- Configuração inicial do projeto
- Setup do ambiente
- Organização de arquivos

---

## Fase 3 - Testes Básicos

### Conceitos:
- **page.goto()**: Navegação para URL
- **page.url()**: Obter URL atual
- **page.title()**: Obter título da página
- **page.goBack()**: Navegar para trás
- **page.goForward()**: Navegar para frente
- **page.reload()**: Recarregar página
- **click()**: Clique em elementos
- **fill()**: Preencher campos de texto
- **check()**: Marcar checkbox
- **uncheck()**: Desmarcar checkbox
- **selectOption()**: Selecionar opção de dropdown
- **setInputFiles()**: Upload de arquivos
- **page.waitForEvent('download')**: Download de arquivos
- **screenshot()**: Captura de tela

### Arquivos:
- `tests/examples/01-navegacao.spec.js`: Navegação
- `tests/examples/02-interacoes-basico.spec.js`: Interações
- `tests/examples/03-checkboxes-radio-buttons.spec.js`: Checkboxes e radio buttons
- `tests/examples/04-dropdowns.spec.js`: Dropdowns
- `tests/examples/05-upload-download.spec.js`: Upload e download
- `tests/examples/06-screenshots.spec.js`: Screenshots

### Quando usar:
- Primeiros testes
- Testes de funcionalidades básicas
- Aprendizado de Playwright

---

## Fase 4 - Locators

### Conceitos:
- **getByRole()**: Locator por role ARIA
- **getByText()**: Locator por texto
- **getByLabel()**: Locator por label
- **getByPlaceholder()**: Locator por placeholder
- **getByTestId()**: Locator por data-testid
- **locator()**: Locator genérico
- **CSS Selectors**: Seletores CSS
- **XPath**: Seletores XPath
- **Filtros**: Filtragem de locators
- **Chaining**: Encadeamento de locators

### Arquivos:
- `tests/examples/07-locators.spec.js`: Exemplos de locators

### Quando usar:
- Seleção de elementos
- Estratégias de localização
- Melhoria de seletores

---

## Fase 5 - Assertions

### Conceitos:
- **toBeVisible()**: Verifica visibilidade
- **toBeHidden()**: Verifica invisibilidade
- **toHaveText()**: Verifica texto exato
- **toContainText()**: Verifica texto parcial
- **toHaveURL()**: Verifica URL
- **toHaveTitle()**: Verifica título
- **toBeChecked()**: Verifica se marcado
- **toHaveValue()**: Verifica valor
- **toBeEnabled()**: Verifica se habilitado
- **toBeDisabled()**: Verifica se desabilitado
- **toHaveAttribute()**: Verifica atributo
- **toHaveClass()**: Verifica classe
- **toHaveCount()**: Verifica quantidade
- **Soft assertions**: Assertions não fatais

### Arquivos:
- `tests/examples/08-assertions.spec.js`: Exemplos de assertions

### Quando usar:
- Validação de testes
- Verificação de resultados
- Testes de comportamento

---

## Fase 6 - Waits

### Conceitos:
- **Auto-waiting**: Espera automática do Playwright
- **waitForSelector()**: Espera por seletor
- **waitForURL()**: Espera por URL
- **waitForResponse()**: Espera por resposta de rede
- **waitForLoadState()**: Espera por estado de carregamento
- **waitForFunction()**: Espera por função JavaScript
- **Por que não usar sleep**: Problemas de waitForTimeout

### Arquivos:
- `tests/examples/09-waits.spec.js`: Exemplos de waits

### Quando usar:
- Sincronização de testes
- Espera por elementos
- Espera por eventos

---

## Fase 7 - Hooks

### Conceitos:
- **beforeAll()**: Executa antes de todos os testes
- **afterAll()**: Executa após todos os testes
- **beforeEach()**: Executa antes de cada teste
- **afterEach()**: Executa após cada teste
- **Nested hooks**: Hooks aninhados
- **Escopo**: Escopo de hooks
- **Setup compartilhado**: Configuração compartilhada
- **Cleanup**: Limpeza de recursos

### Arquivos:
- `tests/examples/10-hooks.spec.js`: Exemplos de hooks

### Quando usar:
- Setup de testes
- Cleanup de recursos
- Configuração compartilhada

---

## Fase 8 - Estrutura Profissional

### Conceitos:
- **Page Object Model (POM)**: Padrão de design
- **Helpers**: Funções auxiliares específicas
- **Utilities**: Funções genéricas reutilizáveis
- **Constants**: Valores constantes
- **Test Data**: Dados de teste
- **Organização**: Estrutura de diretórios
- **Separação de responsabilidades**: Separação de código

### Arquivos:
- `pages/HomePage.js`: Page Object
- `helpers/DataHelper.js`: Helper de dados
- `utils/StringUtility.js`: Utility de strings
- `constants/AppConstants.js`: Constantes da aplicação
- `testData/users.json`: Dados de teste

### Quando usar:
- Projetos profissionais
- Crescimento do framework
- Manutenibilidade

---

## Fase 9 - Fixtures

### Conceitos:
- **Fixtures simples**: Funções de setup
- **Fixtures customizadas**: Fixtures específicas
- **Injeção de dependência**: Injeção automática
- **Escopo de fixtures**: Test vs Worker
- **Setup complexo**: Configurações complexas
- **Teardown**: Limpeza automática

### Arquivos:
- `fixtures/custom-fixtures.js`: Fixtures customizadas

### Quando usar:
- Setup complexo
- Reutilização de código
- Configuração compartilhada

---

## Fase 10 - Configuração Avançada

### Conceitos:
- **baseURL**: URL base do projeto
- **timeout**: Timeouts de execução
- **retries**: Tentativas de reexecução
- **workers**: Workers paralelos
- **projects**: Múltiplos projetos
- **browserName**: Navegador específico
- **Configuração ambiente-aware**: Diferentes ambientes

### Arquivos:
- `playwright.config.js`: Configuração avançada
- `config/ConfigurationGuide.md`: Guia de configuração

### Quando usar:
- Configuração avançada
- Diferentes ambientes
- Otimização de execução

---

## Fase 11 - Multi-Browser

### Conceitos:
- **Chromium**: Navegador Chromium
- **Firefox**: Navegador Firefox
- **WebKit**: Navegador WebKit (Safari)
- **Cross-browser**: Testes em múltiplos navegadores
- **Compatibilidade**: Validação de compatibilidade

### Arquivos:
- `playwright.config.js`: Configuração de projetos

### Quando usar:
- Testes cross-browser
- Validação de compatibilidade
- Cobertura de navegadores

---

## Fase 12 - API Testing

### Conceitos:
- **request**: Contexto de requisição API
- **GET**: Obter dados
- **POST**: Criar dados
- **PUT**: Atualizar dados
- **DELETE**: Remover dados
- **Headers**: Cabeçalhos HTTP
- **Authentication**: Autenticação (Bearer, Basic, API Key)
- **Response validation**: Validação de resposta

### Arquivos:
- `tests/api/01-api-basics.spec.js`: Testes de API

### Quando usar:
- Testes de API
- Validação de backend
- Integração de sistemas

---

## Fase 13 - Network

### Conceitos:
- **page.route()**: Interceptação de requisições
- **page.on()**: Monitoramento de eventos
- **Mocking**: Simulação de respostas
- **Blocking**: Bloqueio de requisições
- **Monitoring**: Monitoramento de rede
- **Request interception**: Interceptação de requests
- **Response modification**: Modificação de responses

### Arquivos:
- `tests/examples/11-network.spec.js`: Exemplos de network

### Quando usar:
- Testes de network
- Mocking de APIs
- Monitoramento de requisições

---

## Fase 14 - Visual Quality

### Conceitos:
- **Screenshots**: Captura de tela
- **Videos**: Gravação de vídeo
- **Trace Viewer**: Rastreamento detalhado
- **Snapshot Testing**: Testes visuais
- **Visual Regression**: Regressão visual
- **Evidências**: Documentação visual

### Arquivos:
- `tests/examples/12-visual-quality.spec.js`: Exemplos visuais

### Quando usar:
- Debugging visual
- Evidências de falha
- Testes visuais

---

## Fase 15 - Mobile Emulation

### Conceitos:
- **devices**: Emulação de dispositivos
- **viewport**: Tamanho de tela
- **userAgent**: String de agente
- **deviceScaleFactor**: Densidade de pixels
- **hasTouch**: Simulação de touch
- **isMobile**: Comportamento mobile
- **Orientação**: Portrait/Landscape
- **Geolocation**: Localização

### Arquivos:
- `tests/examples/13-mobile-emulation.spec.js`: Exemplos mobile

### Quando usar:
- Testes mobile
- Responsividade
- Dispositivos específicos

---

## Fase 16 - Reports

### Conceitos:
- **HTML Reporter**: Relatório HTML interativo
- **List Reporter**: Relatório em lista
- **JUnit Reporter**: Relatório JUnit XML
- **JSON Reporter**: Relatório JSON
- **Line Reporter**: Relatório compacto
- **Dot Reporter**: Relatório mínimo
- **Custom Reporter**: Reporter customizado

### Arquivos:
- `config/ReportingGuide.md`: Guia de reports

### Quando usar:
- Visualização de resultados
- CI/CD integration
- Análise de testes

---

## Fase 17 - CI/CD

### Conceitos:
- **GitHub Actions**: Integração com GitHub
- **Workflows**: Configuração de workflows
- **Jobs**: Tarefas do workflow
- **Steps**: Passos do job
- **Artifacts**: Artefatos de execução
- **Triggers**: Disparadores de execução
- **Matrix**: Execução em matriz
- **Scheduled runs**: Execução agendada

### Arquivos:
- `.github/workflows/playwright.yml`: Workflow de CI/CD

### Quando usar:
- Integração contínua
- Deploy contínuo
- Automação de testes

---

## Fase 18 - Debugging

### Conceitos:
- **UI Mode**: Interface gráfica
- **Debug Mode**: Modo debug passo a passo
- **PWDEBUG**: Variável de ambiente
- **Trace Viewer**: Visualizador de traces
- **VS Code Debugger**: Integração com VS Code
- **Headless vs Headed**: Modos de execução
- **Screenshots/Videos**: Evidências de debug

### Arquivos:
- `config/DebuggingGuide.md`: Guia de debugging

### Quando usar:
- Debugging de testes
- Resolução de problemas
- Análise de falhas

---

## Fase 19 - Scalability

### Conceitos:
- **Paralelismo**: Execução paralela
- **Workers**: Processos paralelos
- **Retries**: Tentativas de reexecução
- **Sharding**: Fragmentação de testes
- **Projetos paralelos**: Múltiplos projetos
- **Otimização**: Melhoria de performance
- **Monitoramento**: Métricas de execução

### Arquivos:
- `config/ScalabilityGuide.md`: Guia de escalabilidade

### Quando usar:
- Escalabilidade de testes
- Otimização de performance
- Grandes suítes de testes

---

## Fase 20 - Roadmap Mapping

### Conceitos:
- **Mapeamento**: Associação de conceitos
- **Fases**: Divisão em fases
- **Progressão**: Ordem de aprendizado
- **Referência**: Guia de consulta

### Arquivos:
- `docs/RoadmapMapping.md`: Este documento

### Quando usar:
- Consulta de conceitos
- Planejamento de aprendizado
- Referência rápida

---

## Fase 21 - Revisão Final

### Conceitos:
- **Arquitetura**: Estrutura do framework
- **Fluxo de execução**: Ciclo de vida dos testes
- **Organização**: Estrutura de diretórios
- **Diagrama**: Visualização da estrutura
- **Evolução**: Caminho de evolução

### Arquivos:
- `docs/FinalReview.md`: Revisão final

### Quando usar:
- Revisão completa
- Documentação final
- Onboarding de equipe

---

## Resumo de Progressão

### Iniciante (Fases 1-3)
- Fundamentos
- Estrutura inicial
- Testes básicos

### Intermediário (Fases 4-7)
- Locators
- Assertions
- Waits
- Hooks

### Avançado (Fases 8-11)
- Estrutura profissional
- Fixtures
- Configuração avançada
- Multi-browser

### Especialista (Fases 12-16)
- API testing
- Network
- Visual quality
- Mobile emulation
- Reports

### Mestre (Fases 17-21)
- CI/CD
- Debugging
- Scalability
- Roadmap mapping
- Revisão final

---

## Como Usar Este Guia

### Para Aprendizado:
1. Siga as fases em ordem
2. Estude os conceitos de cada fase
3. Pratique com os exemplos
4. Avance para próxima fase

### Para Consulta:
1. Busque conceito no índice
2. Encontre fase correspondente
3. Consulte arquivos da fase
4. Aplique conhecimento

### Para Planejamento:
1. Revise todas as fases
2. Identifique gaps de conhecimento
3. Planeje estudo das fases necessárias
4. Acompanhe progresso

---

## Próximos Passos

Após completar todas as fases:
1. Revise o framework completo
2. Identifique áreas de melhoria
3. Adicione testes reais do seu projeto
4. Configure CI/CD
5. Monitore e otimize continuamente
