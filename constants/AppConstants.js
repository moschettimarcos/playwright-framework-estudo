/**
 * Constants - AppConstants
 * 
 * Fase do Roadmap: Fase 4 - Estrutura Profissional
 * 
 * O QUE SÃO CONSTANTES:
 * - Valores que não mudam durante a execução
 * - Configurações estáticas do projeto
 * - URLs, timeouts, mensagens, etc.
 * 
 * POR QUE USAR CONSTANTES:
 * + Centraliza valores em um lugar
 * + Facilita manutenção (mudança em um lugar)
 * + Evita "magic numbers" e "magic strings"
 * + Melhora legibilidade do código
 * + Facilita refatoração
 * + Reduz erros de digitação
 * 
 * ONDE USAR CONSTANTES:
 * - URLs de ambientes
 * - Timeouts padrão
 * - Mensagens de erro/sucesso
 * - Seletores que não podem ser data-testid
 * - Configurações de teste
 * - Valores de configuração
 * 
 * BOAS PRÁTICAS:
 * - Usar UPPER_CASE para nomes
 * - Agrupar constantes relacionadas
 * - Documentar cada constante
 * - Usar constantes em vez de valores literais
 */

class AppConstants {
  // ============================================
  // URLs E AMBIENTES
  // ============================================
  
  /**
   * URLs base dos diferentes ambientes
   * 
   * Por que ter constantes de URL:
   * - Facilita mudança de ambiente
   * - Centraliza configuração
   * - Evita URLs duplicadas no código
   */
  static URLS = {
    PRODUCTION: 'https://demoqa.com',
    STAGING: 'https://staging.demoqa.com',
    DEVELOPMENT: 'https://dev.demoqa.com',
    LOCAL: 'http://localhost:3000'
  };

  /**
   * URLs específicas de páginas
   */
  static PAGE_URLS = {
    HOME: '/',
    ELEMENTS: '/elements',
    TEXT_BOX: '/text-box',
    CHECKBOX: '/checkbox',
    RADIO_BUTTON: '/radio-button',
    WEB_TABLES: '/webtables',
    BUTTONS: '/buttons',
    LINKS: '/links',
    UPLOAD_DOWNLOAD: '/upload-download',
    DYNAMIC_PROPERTIES: '/dynamic-properties',
    FORMS: '/automation-practice-form',
    ALERTS: '/alerts',
    FRAMES: '/frames',
    WINDOWS: '/windows',
    NESTED_FRAMES: '/nestedframes',
    MODALS: '/modal-dialogs',
    BOOKS: '/books'
  };

  // ============================================
  // TIMEOUTS
  // ============================================
  
  /**
   * Timeouts padrão para diferentes operações
   * 
   * Por que ter constantes de timeout:
   * - Valores consistentes em todo o projeto
   * - Fácil ajuste em um lugar
   * - Documenta valores usados
   */
  static TIMEOUTS = {
    /**
     * Timeout para ações (click, fill, etc.)
     * Tempo máximo para uma ação completar
     */
    ACTION: 30000, // 30 segundos
    
    /**
     * Timeout para navegação
     * Tempo máximo para página carregar
     */
    NAVIGATION: 30000, // 30 segundos
    
    /**
     * Timeout para assertions
     * Tempo máximo para validação passar
     */
    ASSERTION: 5000, // 5 segundos
    
    /**
     * Timeout para espera explícita
     * Tempo máximo para waits explícitos
     */
    EXPLICIT_WAIT: 10000, // 10 segundos
    
    /**
     * Timeout para resposta de rede
     * Tempo máximo para requisição API
     */
    NETWORK: 15000, // 15 segundos
    
    /**
     * Timeout curto para operações rápidas
     * Usado quando se espera resposta rápida
     */
    SHORT: 3000, // 3 segundos
    
    /**
     * Timeout longo para operações lentas
     * Usado para páginas pesadas ou operações complexas
     */
    LONG: 60000 // 60 segundos
  };

  // ============================================
  // MENSAGENS
  // ============================================
  
  /**
   * Mensagens de sucesso
   * 
   * Por que ter constantes de mensagem:
   * - Validação de mensagens na UI
   * - Centraliza textos
   * - Facilita tradução
   * - Evita erros de digitação
   */
  static MESSAGES = {
    SUCCESS: {
      LOGIN: 'Login realizado com sucesso',
      REGISTRATION: 'Cadastro realizado com sucesso',
      SAVE: 'Dados salvos com sucesso',
      DELETE: 'Registro excluído com sucesso',
      UPDATE: 'Dados atualizados com sucesso',
      UPLOAD: 'Arquivo enviado com sucesso',
      DOWNLOAD: 'Download concluído'
    },
    ERROR: {
      LOGIN_INVALID: 'Usuário ou senha inválidos',
      REQUIRED_FIELD: 'Campo obrigatório',
      INVALID_EMAIL: 'Email inválido',
      INVALID_PASSWORD: 'Senha inválida',
      DUPLICATE_RECORD: 'Registro já existe',
      NETWORK_ERROR: 'Erro de conexão',
      SERVER_ERROR: 'Erro no servidor',
      TIMEOUT: 'Tempo de espera excedido'
    },
    VALIDATION: {
      REQUIRED: 'Este campo é obrigatório',
      MIN_LENGTH: 'Mínimo de caracteres não atingido',
      MAX_LENGTH: 'Máximo de caracteres excedido',
      INVALID_FORMAT: 'Formato inválido',
      MISMATCH: 'Os valores não conferem'
    }
  };

  // ============================================
  // DADOS DE TESTE
  // ============================================
  
  /**
   * Dados de usuário para testes
   * 
   * Por que ter constantes de teste:
   * - Usuários padrão para testes
   * - Credenciais conhecidas
   * - Dados consistentes
   */
  static TEST_USERS = {
    ADMIN: {
      USERNAME: 'admin',
      PASSWORD: 'admin123',
      EMAIL: 'admin@example.com',
      ROLE: 'admin'
    },
    STANDARD: {
      USERNAME: 'user',
      PASSWORD: 'user123',
      EMAIL: 'user@example.com',
      ROLE: 'user'
    },
    GUEST: {
      USERNAME: 'guest',
      PASSWORD: 'guest123',
      EMAIL: 'guest@example.com',
      ROLE: 'guest'
    }
  };

  // ============================================
  // SELETORES (QUANDO NÃO PODE USAR DATA-TEST-ID)
  // ============================================
  
  /**
   * Seletores CSS que não podem ser data-testid
   * 
   * Por que ter constantes de seletores:
   * - Centraliza seletores
   * - Facilita manutenção
   * - Evita duplicação
   * - Documenta seletores usados
   * 
   * NOTA: Priorize sempre data-testid quando possível
   * Use estes apenas quando não há alternativa
   */
  static SELECTORS = {
    /**
     * Seletores comuns
     */
    COMMON: {
      BODY: 'body',
      HEADER: 'header',
      FOOTER: 'footer',
      NAV: 'nav',
      MAIN: 'main',
      BUTTON: 'button',
      INPUT: 'input',
      SELECT: 'select',
      TEXTAREA: 'textarea',
      FORM: 'form',
      TABLE: 'table',
      MODAL: '.modal',
      TOAST: '.toast',
      ALERT: '.alert'
    },
    
    /**
     * Seletores específicos da aplicação
     */
    APP: {
      BANNER: '.banner-image',
      HEADER: '.main-header',
      CARD: '.card',
      MENU_ITEM: '.menu-item',
      SUBMIT_BUTTON: 'button[type="submit"]',
      CANCEL_BUTTON: 'button[type="button"]',
      ERROR_MESSAGE: '.error-message',
      SUCCESS_MESSAGE: '.success-message'
    }
  };

  // ============================================
  // CONFIGURAÇÕES DE VIEWPORT
  // ============================================
  
  /**
   * Tamanhos de viewport comuns
   * 
   * Por que ter constantes de viewport:
   * - Tamanhos padrão para testes
   * - Configurações consistentes
   * - Documenta tamanhos usados
   */
  static VIEWPORTS = {
    /**
     * Desktop
     */
    DESKTOP: {
      HD: { width: 1280, height: 720 },
      FULL_HD: { width: 1920, height: 1080 },
      WQHD: { width: 2560, height: 1440 }
    },
    
    /**
     * Tablet
     */
    TABLET: {
      PORTRAIT: { width: 768, height: 1024 },
      LANDSCAPE: { width: 1024, height: 768 }
    },
    
    /**
     * Mobile
     */
    MOBILE: {
      SMALL: { width: 320, height: 568 },
      MEDIUM: { width: 375, height: 667 },
      LARGE: { width: 414, height: 896 }
    }
  };

  // ============================================
  // CONFIGURAÇÕES DE ARQUIVO
  // ============================================
  
  /**
   * Tipos de arquivo suportados
   */
  static FILE_TYPES = {
    IMAGES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    DOCUMENTS: ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'],
    ARCHIVES: ['zip', 'rar', '7z', 'tar']
  };

  /**
   * Tamanhos máximos de arquivo (em bytes)
   */
  static FILE_SIZES = {
    SMALL: 1024, // 1KB
    MEDIUM: 1024 * 1024, // 1MB
    LARGE: 10 * 1024 * 1024, // 10MB
    MAX: 50 * 1024 * 1024 // 50MB
  };

  // ============================================
  // CONFIGURAÇÕES DE LOCALE
  // ============================================
  
  /**
   * Configurações de localização
   */
  static LOCALE = {
    PT_BR: 'pt-BR',
    EN_US: 'en-US',
    ES_ES: 'es-ES'
  };

  /**
   * Timezones
   */
  static TIMEZONE = {
    SAO_PAULO: 'America/Sao_Paulo',
    NEW_YORK: 'America/New_York',
    LONDON: 'Europe/London',
    TOKYO: 'Asia/Tokyo'
  };

  // ============================================
  // STATUS E ESTADOS
  // ============================================
  
  /**
   * Status comuns em aplicações
   */
  static STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
    SUCCESS: 'success'
  };

  /**
   * Estados de elementos
   */
  static ELEMENT_STATE = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    CHECKED: 'checked',
    UNCHECKED: 'unchecked',
    ATTACHED: 'attached',
    DETACHED: 'detached'
  };

  // ============================================
  // CONFIGURAÇÕES DE RETRY
  // ============================================
  
  /**
   * Configurações de retry para testes
   */
  static RETRY = {
    /**
     * Número de retries em desenvolvimento
     */
    DEV: 0,
    
    /**
     * Número de retries em CI
     */
    CI: 2,
    
    /**
     * Número de retries para testes flaky
     */
    FLAKY: 3
  };

  // ============================================
  // CONFIGURAÇÕES DE PARALELISMO
  // ============================================
  
  /**
   * Configurações de workers paralelos
   */
  static WORKERS = {
    /**
     * Número de workers em desenvolvimento
     */
    DEV: 1,
    
    /**
     * Número de workers em CI
     */
    CI: '50%',
    
    /**
     * Número máximo de workers
     */
    MAX: 4
  };

  // ============================================
  // CAMINHOS DE DIRETÓRIO
  // ============================================
  
  /**
   * Caminhos relativos de diretórios
   */
  static PATHS = {
    SCREENSHOTS: './screenshots',
    REPORTS: './reports',
    DOWNLOADS: './downloads',
    TRACES: './traces',
    LOGS: './logs',
    TEST_DATA: './testData',
    PAGES: './pages',
    HELPERS: './helpers',
    UTILS: './utils',
    FIXTURES: './fixtures'
  };

  // ============================================
  - NAVEGADORES
  // ============================================
  
  /**
   * Navegadores suportados
   */
  static BROWSERS = {
    CHROMIUM: 'chromium',
    FIREFOX: 'firefox',
    WEBKIT: 'webkit',
    CHROME: 'chrome',
    EDGE: 'msedge',
    SAFARI: 'safari'
  };

  // ============================================
  - DISPOSITIVOS
  // ============================================
  
  /**
   * Dispositivos móveis para emulação
   */
  static DEVICES = {
    /**
     * Android
     */
    PIXEL_5: 'Pixel 5',
    GALAXY_S21: 'Galaxy S21',
    
    /**
     * iOS
     */
    IPHONE_12: 'iPhone 12',
    IPHONE_13: 'iPhone 13',
    IPHONE_14: 'iPhone 14',
    IPAD_PRO: 'iPad Pro'
  };
}

module.exports = AppConstants;
