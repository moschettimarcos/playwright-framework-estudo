// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration File
 * 
 * Este arquivo configura o framework Playwright para execução de testes.
 * Todas as configurações globais são definidas aqui.
 * 
 * Fase do Roadmap: Fase 1 - Primeiros Passos
 */

/**
 * defineConfig: Função que cria a configuração do Playwright
 * Recebe um objeto com todas as configurações do framework
 */
module.exports = defineConfig({
  // ============================================
  // CONFIGURAÇÕES GERAIS
  // ============================================
  
  /**
   * testDir: Diretório onde os testes estão localizados
   * O Playwright buscará todos os arquivos .spec.js ou .spec.ts neste diretório
   * 
   * Por que usar 'tests': É a convenção padrão e torna o projeto organizado
   */
  testDir: './tests',
  
  /**
   * testMatch: Padrão para encontrar arquivos de teste
   * Pode ser usado para filtrar quais arquivos são considerados testes
   * 
   * Padrão: busca recursivamente arquivos terminados em .spec.js ou .spec.ts
   */
  testMatch: '**/*.spec.{js,ts}',
  
  /**
   * fullyParallel: Executa testes em paralelo por padrão
   * true: Todos os testes executam simultaneamente (mais rápido)
   * false: Testes executam sequencialmente (útil para testes que dependem uns dos outros)
   * 
   * Por que true: Maximiza performance e aproveita recursos da máquina
   */
  fullyParallel: true,
  
  /**
   * forbidOnly: Impede o uso de test.only em produção
   * true: Se houver test.only, a execução falha
   * false: Permite test.only (útil em desenvolvimento)
   * 
   * Por que true em CI: Evita que testes marcados como only sejam esquecidos no código
   */
  forbidOnly: !!process.env.CI,
  
  /**
   * retries: Número de tentativas em caso de falha
   * Útil para testes flaky (que falham intermitentemente)
   * 
   * 0: Sem retries
   * 1-2: Recomendado para testes flaky
   * 
   * Por que usar: Testes flaky são comuns em automação web devido a timing, network, etc.
   */
  retries: process.env.CI ? 2 : 0,
  
  /**
   * workers: Número de workers (processos paralelos)
   * '50%': Usa 50% dos núcleos da CPU
   * Número específico: Usa exatamente N workers
   * 
   * Por que '50%': Equilibra performance e uso de recursos
   */
  workers: process.env.CI ? '50%' : undefined,
  
  /**
   * reporter: Configuração de relatórios
   * Define como os resultados dos testes serão exibidos
   * 
   * 'html': Gera relatório visual interativo
   * 'list': Mostra lista de testes no console
   * 
   * Por que ambos: HTML para análise detalhada, list para feedback rápido no console
   */
  reporter: [
    ['html', { 
      outputFolder: './reports/html-report',  // Onde salvar o relatório HTML
      open: 'never'                           // Não abrir automaticamente (útil em CI)
    }],
    ['list']
  ],
  
  /**
   * use: Configurações padrão aplicadas a todos os projetos
   * Estas configurações são herdadas por todos os testes
   */
  use: {
    // ============================================
    // CONFIGURAÇÕES DE NAVEGAÇÃO
    // ============================================
    
    /**
     * baseURL: URL base para todos os testes
     * Evita repetir a URL em cada teste
     * 
     * Exemplo: Se baseURL = 'https://example.com'
     * page.goto('/login') navega para 'https://example.com/login'
     * 
     * Por que usar: Centraliza a URL, facilita mudanças de ambiente
     */
    baseURL: 'https://demoqa.com',
    
    /**
     * trace: Configuração de trace viewer
     * 'retain-on-failure': Salva trace apenas quando teste falha
     * 'on': Salva trace sempre
     * 'off': Não salva trace
     * 
     * Por que 'retain-on-failure': Economiza espaço, mas mantém debug info quando necessário
     */
    trace: 'retain-on-failure',
    
    /**
     * screenshot: Configuração de screenshots
     * 'only-on-failure': Tira screenshot apenas quando teste falha
     * 'on': Tira screenshot sempre
     * 'off': Não tira screenshot
     * 
     * Por que 'only-on-failure': Economiza espaço, mas mantém evidência visual de falhas
     */
    screenshot: 'only-on-failure',
    
    /**
     * video: Configuração de gravação de vídeo
     * 'retain-on-failure': Grava vídeo apenas quando teste falha
     * 'on': Grava vídeo sempre
     * 'off': Não grava vídeo
     * 
     * Por que 'retain-on-failure': Economiza espaço, mas mantém evidência de falhas
     */
    video: 'retain-on-failure',
    
    // ============================================
    // CONFIGURAÇÕES DE TIMEOUT
    // ============================================
    
    /**
     * actionTimeout: Timeout para ações (click, fill, etc.)
     * Tempo máximo que o Playwright espera por uma ação completar
     * 
     * 0: Usa timeout padrão (30s)
     * Número: Define timeout específico em milissegundos
     * 
     * Por que 0: Timeout padrão é adequado para maioria dos casos
     */
    actionTimeout: 0,
    
    /**
     * navigationTimeout: Timeout para navegação
     * Tempo máximo para uma navegação completar
     * 
     * 0: Usa timeout padrão (30s)
     * Número: Define timeout específico em milissegundos
     * 
     * Por que 0: Timeout padrão é adequado para maioria dos casos
     */
    navigationTimeout: 0,
    
    // ============================================
    // CONFIGURAÇÕES DE VIEWPORT
    // ============================================
    
    /**
     * viewport: Tamanho da janela do navegador
     * Define a resolução da tela em pixels
     * 
     * { width: 1280, height: 720 }: Resolução HD comum
     * 
     * Por que 1280x720: Resolução padrão para testes desktop
     */
    viewport: { width: 1280, height: 720 },
    
    // ============================================
    // CONFIGURAÇÕES DE LOCALE E TIMEZONE
    // ============================================
    
    /**
     * locale: Idioma/localização do navegador
     * Afeta formatação de datas, números, etc.
     * 
     * 'pt-BR': Português Brasil
     * 'en-US': Inglês EUA
     * 
     * Por que 'pt-BR': Testes em português para contexto brasileiro
     */
    locale: 'pt-BR',
    
    /**
     * timezoneId: Fuso horário do navegador
     * Afeta exibição de datas e horas
     * 
     * 'America/Sao_Paulo': Fuso horário de São Paulo
     * 
     * Por que 'America/Sao_Paulo': Contexto brasileiro
     */
    timezoneId: 'America/Sao_Paulo',
  },
  
  // ============================================
  // PROJETOS (CONFIGURAÇÕES POR NAVEGADOR)
  // ============================================
  
  /**
   * projects: Array de configurações para diferentes navegadores/dispositivos
   * Cada projeto pode ter configurações específicas
   * 
   * Por que usar múltiplos projetos: Testar em diferentes navegadores garante compatibilidade
   */
  projects: [
    {
      /**
       * name: Nome do projeto
       * Usado para identificar o projeto em relatórios e comandos
       */
      name: 'chromium',
      
      /**
       * use: Configurações específicas para este projeto
       * Sobrescreve as configurações globais do 'use'
       */
      use: { 
        /**
         * ...devices['Desktop Chrome']: Herda configurações pré-definidas do Chrome Desktop
         * Inclui userAgent, viewport, etc.
         * 
         * Por que usar: Configurações otimizadas já fornecidas pelo Playwright
         */
        ...devices['Desktop Chrome'],
      },
    },
    
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },
    
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
      },
    },
    
    // ============================================
    // PROJETOS MOBILE
    // ============================================
    
    /**
     * Projetos para emulação de dispositivos móveis
     * Útil para testar responsividade e comportamento mobile
     * 
     * Fase do Roadmap: Fase 8 - Navegadores e Dispositivos
     */
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],  // Emula um Pixel 5 (Android)
      },
    },
    
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],  // Emula um iPhone 12 (iOS)
      },
    },
    
    // ============================================
    // PROJETO PARA TESTES DE API
    // ============================================
    
    /**
     * Projeto específico para testes de API
     * Não usa navegador, apenas requisições HTTP
     * 
     * Fase do Roadmap: Fase 6 - APIs e Backend
     */
    {
      name: 'api-tests',
      testMatch: '**/api/**/*.spec.{js,ts}',  // Executa apenas testes na pasta api
      use: {
        // Configurações específicas para API (sem navegador)
      },
    },
  ],
  
  // ============================================
  // CONFIGURAÇÕES DE OUTPUT
  // ============================================
  
  /**
   * outputDir: Diretório para artefatos de teste
   * Onde salvar traces, screenshots, vídeos, etc.
   * 
   * Por que separar: Organiza artefatos em local dedicado
   */
  outputDir: './test-results',
  
  // ============================================
  // CONFIGURAÇÕES DE WEB SERVER
  // ============================================
  
  /**
   * webServer: Configuração para iniciar um servidor local
   * Útil para testar aplicações locais durante os testes
   * 
   * Exemplo de uso:
   * webServer: {
   *   command: 'npm run start',
   *   port: 3000,
   *   timeout: 120 * 1000,
   * }
   * 
   * Por que comentado: Neste projeto usamos uma URL externa (demoqa.com)
   */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
