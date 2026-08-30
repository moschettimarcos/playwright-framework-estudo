/**
 * Page Object - HomePage
 * 
 * Fase do Roadmap: Fase 4 - Estrutura Profissional
 * 
 * O QUE É PAGE OBJECT MODEL (POM):
 * - Padrão de design para automação de testes
 * - Cria uma abstração para cada página da aplicação
 * - Separa lógica de teste de lógica de página
 * - Encapsula seletores e interações
 * 
 * POR QUE USAR POM:
 * + Reutilização de código
 * + Manutenibilidade (mudanças em um lugar)
 * + Testes mais legíveis
 * + Separação de responsabilidades
 * + Facilita refatoração
 * 
 * RESPONSABILIDADES DE UM PAGE OBJECT:
 * - Definir seletores da página
 * - Fornecer métodos para interações
 * - Encapsular lógica de página
 * - Não ter assertions (isso é responsabilidade do teste)
 */

class HomePage {
  /**
   * Constructor
   * 
   * Recebe a instância de page do Playwright
   * Isso permite que o Page Object interaja com a página
   * 
   * @param {Page} page - Instância de page do Playwright
   */
  constructor(page) {
    this.page = page;
    
    // ============================================
    // SELETORES (LOCATORS)
    // ============================================
    
    /**
     * Por que definir seletores aqui:
     * - Centraliza seletores em um lugar
     * - Facilita manutenção (mudança em um lugar)
     * - Reutilização em múltiplos métodos
     * - Testes mais legíveis
     * 
     * Boas práticas:
     * - Usar getByRole quando possível (mais robusto)
     * - Usar getByTestId para estabilidade
     * - Evitar seletores frágeis (XPath absoluto)
     * - Dar nomes descritivos aos seletores
     */
    
    // Banner principal
    this.bannerImage = page.locator('.banner-image');
    this.mainHeader = page.getByRole('heading', { name: 'DEMOQA' });
    
    // Cards de menu
    this.elementsCard = page.locator('.card').filter({ hasText: 'Elements' });
    this.formsCard = page.locator('.card').filter({ hasText: 'Forms' });
    this.alertsCard = page.locator('.card').filter({ hasText: 'Alerts' });
    this.widgetsCard = page.locator('.card').filter({ hasText: 'Widgets' });
    this.interactionsCard = page.locator('.card').filter({ hasText: 'Interactions' });
    this.bookStoreCard = page.locator('.card').filter({ hasText: 'Book Store' });
    
    // Todos os cards
    this.allCards = page.locator('.card');
  }

  // ============================================
  // MÉTODOS DE NAVEGAÇÃO
  // ============================================
  
  /**
   * Navega para a Home Page
   * 
   * @returns {Promise<void>}
   * 
   * Por que ter método de navegação:
   * - Centraliza URL da página
   * - Facilita mudança de ambiente
   * - Reutilização em múltiplos testes
   */
  async navigate() {
    await this.page.goto('https://demoqa.com');
  }

  // ============================================
  // MÉTODOS DE INTERAÇÃO
  // ============================================
  
  /**
   * Clica no card Elements
   * 
   * @returns {Promise<void>}
   * 
   * Por que encapsular clique:
   * - Abstração de detalhes de implementação
   * - Testes mais legíveis
   * - Fácil de manter
   */
  async clickElements() {
    await this.elementsCard.click();
  }

  /**
   * Clica no card Forms
   * 
   * @returns {Promise<void>}
   */
  async clickForms() {
    await this.formsCard.click();
  }

  /**
   * Clica no card Alerts
   * 
   * @returns {Promise<void>}
   */
  async clickAlerts() {
    await this.alertsCard.click();
  }

  /**
   * Clica no card Widgets
   * 
   * @returns {Promise<void>}
   */
  async clickWidgets() {
    await this.widgetsCard.click();
  }

  /**
   * Clica no card Interactions
   * 
   * @returns {Promise<void>}
   */
  async clickInteractions() {
    await this.interactionsCard.click();
  }

  /**
   * Clica no card Book Store
   * 
   * @returns {Promise<void>}
   */
  async clickBookStore() {
    await this.bookStoreCard.click();
  }

  // ============================================
  // MÉTODOS DE VERIFICAÇÃO (GETTERS)
  // ============================================
  
  /**
   * Verifica se banner está visível
   * 
   * @returns {Promise<boolean>}
   * 
   * Por que ter métodos de verificação:
   * - Encapsula lógica de verificação
   * - Reutilização em múltiplos testes
   * - Testes mais legíveis
   * 
   * NOTA: Page Objects NÃO devem ter assertions
   * Eles devem retornar valores para o teste validar
   */
  async isBannerVisible() {
    return await this.bannerImage.isVisible();
  }

  /**
   * Obtém texto do header principal
   * 
   * @returns {Promise<string>}
   */
  async getHeaderText() {
    return await this.mainHeader.textContent();
  }

  /**
   * Obtém número de cards
   * 
   * @returns {Promise<number>}
   */
  async getCardCount() {
    return await this.allCards.count();
  }

  /**
   * Obtém texto de todos os cards
   * 
   * @returns {Promise<string[]>}
   */
  async getAllCardTexts() {
    return await this.allCards.allTextContents();
  }

  // ============================================
  // MÉTODOS COMPLEXOS (FLUXOS)
  // ============================================
  
  /**
   * Navega para Elements e verifica que carregou
   * 
   * @returns {Promise<void>}
   * 
   * Por que ter métodos de fluxo:
   * - Encapsula sequências de ações
   * - Reutilização de fluxos comuns
   * - Testes mais simples
   */
  async navigateToElements() {
    await this.navigate();
    await this.clickElements();
  }

  /**
   * Navega para Forms e verifica que carregou
   * 
   * @returns {Promise<void>}
   */
  async navigateToForms() {
    await this.navigate();
    await this.clickForms();
  }
}

module.exports = HomePage;
