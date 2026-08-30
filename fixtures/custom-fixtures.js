/**
 * Custom Fixtures
 * 
 * Fase do Roadmap: Fase 5 - Arquitetura de Framework
 * 
 * O QUE SÃO FIXTURES:
 * - Funções que configuram o ambiente de teste
 * - São injetadas nos testes automaticamente
 * - Permitem reutilização de código
 * - Facilitam setup e teardown
 * 
 * INJEÇÃO DE DEPENDÊNCIAS:
 * - Playwright injeta fixtures automaticamente nos testes
 * - Basta declarar como parâmetro no teste
 * - O Playwright cria e destrói automaticamente
 * 
 * FIXTURES PADRÃO DO PLAYWRIGHT:
 * - page: Instância de página do navegador
 * - browser: Instância do navegador
 * - context: Contexto do navegador
 * - request: Contexto de requisição API
 * 
 * POR QUE CRIAR FIXTURES CUSTOMIZADAS:
 * + Encapsular setup complexo
 * + Reutilizar código entre testes
 * + Abstrair lógica de negócio
 * + Facilitar manutenção
 * + Testes mais limpos
 * 
 * ESCOPO DAS FIXTURES:
 * - Test: Criada antes de cada teste, destruída após
 * - Worker: Criada uma vez por worker, compartilhada entre testes
 */

const { test as base } = require('@playwright/test');

// ============================================
// FIXTURE SIMPLES
// ============================================

/**
 * Fixture que retorna a URL base
 * 
 * Por que ter esta fixture:
 * - Centraliza URL base
 * - Facilita mudança de ambiente
 * - Reutilização em múltiplos testes
 */
const test = base.extend({
  /**
   * baseURLFixture
   * 
   * Retorna a URL base configurada
   * 
   * @param {{ baseURL: string }} options
   * @returns {string} URL base
   */
  baseURL: async ({}, use) => {
    // URL base pode vir de variável de ambiente ou configuração
    const baseURL = process.env.BASE_URL || 'https://demoqa.com';
    await use(baseURL);
  }
});

// ============================================
// FIXTURE COM PAGE OBJECT
// ============================================

/**
 * Fixture que fornece uma instância de HomePage
 * 
 * Por que ter esta fixture:
 * - Cria Page Object automaticamente
 * - Reutilização em múltiplos testes
 * - Testes mais limpos
 * - Abstração de criação de Page Object
 */
const testWithPageObjects = test.extend({
  /**
   * homePage
   * 
   * Cria e retorna uma instância de HomePage
   * 
   * @param {{ page: Page }} options
   * @returns {HomePage} Instância de HomePage
   */
  homePage: async ({ page }, use) => {
    const HomePage = require('../pages/HomePage');
    const homePage = new HomePage(page);
    await use(homePage);
  }
});

// ============================================
// FIXTURE COM AUTENTICAÇÃO
// ============================================

/**
 * Fixture que realiza login automático
 * 
 * Por que ter esta fixture:
 * - Encapsula lógica de login
 * - Reutilização em testes que requerem autenticação
 * - Testes mais limpos
 * - Facilita manutenção
 */
const testWithAuth = test.extend({
  /**
   * authenticatedPage
   * 
   * Cria uma página já autenticada
   * 
   * @param {{ page: Page }} options
   * @returns {Page} Página autenticada
   */
  authenticatedPage: async ({ page }, use) => {
    // Navega para página de login
    await page.goto('https://demoqa.com/login');
    
    // Realiza login
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-button');
    
    // Espera login completar
    await page.waitForURL('**/dashboard');
    
    // Usa a página autenticada
    await use(page);
    
    // Cleanup: Logout após o teste
    await page.click('#logout-button');
  }
});

// ============================================
// FIXTURE COM DADOS DE TESTE
// ============================================

/**
 * Fixture que fornece dados de teste
 * 
 * Por que ter esta fixture:
 * - Centraliza dados de teste
 * - Gera dados dinâmicos
 * - Reutilização em múltiplos testes
 * - Facilita data-driven testing
 */
const testWithTestData = test.extend({
  /**
   * userData
   * 
   * Fornece dados de usuário para testes
   * 
   * @returns {object} Dados de usuário
   */
  userData: async ({}, use) => {
    const DataHelper = require('../helpers/DataHelper');
    const userData = DataHelper.generateUser();
    await use(userData);
  }
});

// ============================================
// FIXTURE COM ESCOPO WORKER
// ============================================

/**
 * Fixture com escopo worker
 * 
 * Por que usar escopo worker:
 * - Criada uma vez por worker (não por teste)
 * - Compartilhada entre testes do mesmo worker
 * - Útil para recursos pesados
 * - Melhor performance
 * 
 * CUIDADO:
 * - Estado compartilhado pode causar problemas
 * - Testes não devem depender de estado compartilhado
 * - Use apenas para recursos imutáveis ou que são resetados
 */
const testWithWorkerFixture = test.extend({
  /**
   * databaseConnection
   * 
   * Conexão com banco de dados (escopo worker)
   * 
   * @returns {object} Conexão com banco
   * 
   * NOTA: Este é um exemplo, implementação real depende do banco
   */
  databaseConnection: [async ({}, use) => {
    // Cria conexão com banco (uma vez por worker)
    const connection = {
      connect: () => console.log('Conectando ao banco...'),
      disconnect: () => console.log('Desconectando do banco...'),
      query: () => console.log('Executando query...')
    };
    
    connection.connect();
    
    // Usa a conexão
    await use(connection);
    
    // Cleanup: Fecha conexão após todos os testes do worker
    connection.disconnect();
  }, { scope: 'worker' }]
});

// ============================================
// FIXTURE COM SETUP COMPLEXO
// ============================================

/**
 * Fixture com setup complexo
 * 
 * Por que ter esta fixture:
 * - Encapsula setup multi-etapas
 * - Reutilização de fluxos complexos
 * - Testes mais simples
 */
const testWithComplexSetup = test.extend({
  /**
   * preparedPage
   * 
   * Cria uma página com preparação complexa
   * 
   * @param {{ page: Page }} options
   * @returns {Page} Página preparada
   */
  preparedPage: async ({ page }, use) => {
    // Passo 1: Navega para página
    await page.goto('https://demoqa.com');
    
    // Passo 2: Aceita cookies
    await page.click('#accept-cookies');
    
    // Passo 3: Fecha modal de boas-vindas
    await page.click('#close-welcome-modal');
    
    // Passo 4: Configura preferências
    await page.click('#settings');
    await page.selectOption('#theme', 'dark');
    await page.click('#save-settings');
    
    // Usa a página preparada
    await use(page);
  }
});

// ============================================
// FIXTURE COM ARQUIVOS
// ============================================

/**
 * Fixture que fornece arquivo para upload
 * 
 * Por que ter esta fixture:
 * - Cria arquivo temporário para testes
 * - Limpa arquivo após teste
 * - Reutilização em múltiplos testes
 */
const testWithFile = test.extend({
  /**
   * testFile
   * 
   * Cria um arquivo temporário para teste
   * 
   * @returns {object} Objeto com caminho do arquivo
   */
  testFile: async ({}, use) => {
    const path = require('path');
    const fs = require('fs');
    
    // Cria arquivo temporário
    const filePath = path.join(__dirname, '../testData/temp-test-file.txt');
    const content = 'Conteúdo do arquivo de teste';
    fs.writeFileSync(filePath, content);
    
    // Usa o arquivo
    await use({ path: filePath, content: content });
    
    // Cleanup: Remove arquivo após teste
    fs.unlinkSync(filePath);
  }
});

// ============================================
// FIXTURE COM CONFIGURAÇÃO CUSTOMIZADA
// ============================================

/**
 * Fixture com configuração customizada de página
 * 
 * Por que ter esta fixture:
 * - Configura página com settings específicos
 * - Reutilização de configuração
 * - Testes mais consistentes
 */
const testWithCustomPage = test.extend({
  /**
   * customPage
   * 
   * Cria página com configuração customizada
   * 
   * @param {{ browser: Browser }} options
   * @returns {Page} Página customizada
   */
  customPage: async ({ browser }, use) => {
    // Cria contexto com configurações customizadas
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo',
      permissions: ['geolocation'],
      geolocation: { latitude: -23.5505, longitude: -46.6333 },
      userAgent: 'CustomUserAgent/1.0'
    });
    
    // Cria página do contexto
    const page = await context.newPage();
    
    // Usa a página
    await use(page);
    
    // Cleanup: Fecha contexto
    await context.close();
  }
});

// ============================================
// FIXTURE COM LOGGING
// ============================================

/**
 * Fixture que adiciona logging
 * 
 * Por que ter esta fixture:
 * - Adiciona logging automático
 * - Rastreia ações do teste
 * - Facilita debugging
 */
const testWithLogging = test.extend({
  /**
   * loggedPage
   * 
   * Cria página com logging automático
   * 
   * @param {{ page: Page }} options
   * @returns {Page} Página com logging
   */
  loggedPage: async ({ page }, use) => {
    // Adiciona listener para console
    page.on('console', msg => {
      console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
    });
    
    // Adiciona listener para erros
    page.on('pageerror', error => {
      console.error(`[PAGE ERROR] ${error}`);
    });
    
    // Adiciona listener para requests
    page.on('request', request => {
      console.log(`[REQUEST] ${request.method()} ${request.url()}`);
    });
    
    // Adiciona listener para responses
    page.on('response', response => {
      console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
    });
    
    // Usa a página com logging
    await use(page);
  }
});

// ============================================
// EXPORTAÇÃO DAS FIXTURES
// ============================================

/**
 * Exporta as fixtures customizadas
 * 
 * Por que exportar:
 * - Permite uso em outros arquivos
 * - Organização de fixtures
 * - Reutilização entre projetos
 */
module.exports = {
  test,
  testWithPageObjects,
  testWithAuth,
  testWithTestData,
  testWithWorkerFixture,
  testWithComplexSetup,
  testWithFile,
  testWithCustomPage,
  testWithLogging
};

/**
 * COMO USAR AS FIXTURES:
 * 
 * 1. Importe as fixtures:
 *    const { testWithPageObjects } = require('./fixtures/custom-fixtures');
 * 
 * 2. Use nos testes:
 *    testWithPageObjects('teste com page object', async ({ homePage }) => {
 *      await homePage.navigate();
 *      await homePage.clickElements();
 *    });
 * 
 * 3. Declare as fixtures como parâmetros:
 *    O Playwright injeta automaticamente
 * 
 * BENEFÍCIOS:
 * + Código mais limpo
 * + Reutilização
 * + Manutenibilidade
 * + Abstração
 * + Consistência
 * 
 * BOAS PRÁTICAS:
 * - Use fixtures para setup comum
 * - Mantém fixtures simples
 * - Documente cada fixture
 * - Use escopo apropriado (test ou worker)
 * - Não compartilhe estado mutável em escopo worker
 */
