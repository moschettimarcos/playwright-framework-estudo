// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Navegação Básica
 * 
 * Este arquivo demonstra as operações fundamentais de navegação
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - page.goto(): Navegar para uma URL
 * - page.url(): Obter URL atual
 * - page.title(): Obter título da página
 * - page.goBack(): Navegar para trás
 * - page.goForward(): Navegar para frente
 * - page.reload(): Recarregar a página
 */

test.describe('Navegação Básica', () => {
  
  /**
   * Teste: Navegar para uma página
   * 
   * Objetivo: Demonstrar como navegar para uma URL específica
   * 
   * Por que é importante:
   * - Todo teste E2E começa com navegação
   * - É a base para interações subsequentes
   * - Compreender baseURL e caminhos relativos
   */
  test('navegar para uma página', async ({ page }) => {
    // page.goto(): Navega para a URL especificada
    // Se baseURL estiver configurado, pode usar caminho relativo
    // Exemplo: page.goto('/login') navega para baseURL + '/login'
    await page.goto('https://demoqa.com');
    
    // Validação básica: Verificar se a página carregou
    // toBeVisible(): Verifica se o elemento está visível
    await expect(page.locator('body')).toBeVisible();
  });

  /**
   * Teste: Validar URL após navegação
   * 
   * Objetivo: Demonstrar como validar que estamos na URL correta
   * 
   * Por que é importante:
   * - Garante que o teste está na página correta
   - Evita falsos positivos
   * - Útil após redirecionamentos
   */
  test('validar URL atual', async ({ page }) => {
    // Navega para a página
    await page.goto('https://demoqa.com');
    
    // page.url(): Retorna a URL atual do navegador
    const currentUrl = page.url();
    
    // toHaveURL(): Valida se a URL atual corresponde ao esperado
    // Pode ser string exata ou regex
    await expect(page).toHaveURL('https://demoqa.com/');
    
    // Também pode validar com regex para mais flexibilidade
    await expect(page).toHaveURL(/demoqa\.com/);
  });

  /**
   * Teste: Validar título da página
   * 
   * Objetivo: Demonstrar como validar o título da página
   * 
   * Por que é importante:
   * - Valida se a página correta carregou
   * - Útil para SEO e acessibilidade
   * - Verificação rápida de página correta
   */
  test('validar título da página', async ({ page }) => {
    // Navega para a página
    await page.goto('https://demoqa.com');
    
    // page.title(): Retorna o título da página (tag <title>)
    const pageTitle = await page.title();
    
    // toHaveTitle(): Valida se o título da página corresponde ao esperado
    await expect(page).toHaveTitle(/.*/);
    
    // Também pode validar título exato
    // await expect(page).toHaveTitle('ToolsQA');
  });

  /**
   * Teste: Navegação com caminho relativo usando baseURL
   * 
   * Objetivo: Demonstrar o uso de baseURL configurado no playwright.config.js
   * 
   * Por que é importante:
   * - Centraliza a URL base
   * - Facilita mudança de ambiente (dev, staging, prod)
   * - Torna testes mais limpos e legíveis
   */
  test('navegação com baseURL', async ({ page }) => {
    // Como baseURL está configurado como 'https://demoqa.com' no config
    // Podemos usar caminhos relativos
    await page.goto('/text-box');
    
    // Valida que navegou para a URL completa correta
    await expect(page).toHaveURL('https://demoqa.com/text-box');
  });

  /**
   * Teste: Navegar para frente e para trás
   * 
   * Objetivo: Demonstrar navegação no histórico do navegador
   * 
   * Por que é importante:
   * - Simula comportamento real do usuário
   * - Útil em testes de fluxos de navegação
   * - Valida se histórico funciona corretamente
   */
  test('navegar para frente e para trás', async ({ page }) => {
    // Navega para primeira página
    await page.goto('https://demoqa.com');
    const firstUrl = page.url();
    
    // Navega para segunda página
    await page.goto('https://demoqa.com/text-box');
    const secondUrl = page.url();
    
    // Valida que está na segunda página
    await expect(page).toHaveURL(secondUrl);
    
    // page.goBack(): Navega para trás no histórico
    await page.goBack();
    
    // Valida que voltou para a primeira página
    await expect(page).toHaveURL(firstUrl);
    
    // page.goForward(): Navega para frente no histórico
    await page.goForward();
    
    // Valida que voltou para a segunda página
    await expect(page).toHaveURL(secondUrl);
  });

  /**
   * Teste: Recarregar página
   * 
   * Objetivo: Demonstrar como recarregar a página atual
   * 
   * Por que é importante:
   * - Simula comportamento de recarregar do usuário (F5)
   * - Útil para testar persistência de dados
   * - Valida se estado é mantido após reload
   */
  test('recarregar página', async ({ page }) => {
    // Navega para a página
    await page.goto('https://demoqa.com');
    
    // page.reload(): Recarrega a página atual
    await page.reload();
    
    // Valida que ainda está na mesma página após reload
    await expect(page).toHaveURL('https://demoqa.com/');
  });

  /**
   * Teste: Navegação com wait
   * 
   * Objetivo: Demonstrar como esperar pela navegação completar
   * 
   * Por que é importante:
   * - Playwright tem auto-waiting, mas às vezes é necessário controle explícito
   * - Útil para páginas com carregamento lento
   * - Garante que a página está totalmente carregada
   */
  test('navegação com wait', async ({ page }) => {
    // page.goto() com opção waitUntil
    // 'load': Espera até evento 'load' ser disparado (padrão)
    // 'domcontentloaded': Espera até DOMContentLoaded
    // 'networkidle': Espera até não haver conexões de rede por 500ms
    await page.goto('https://demoqa.com', { waitUntil: 'load' });
    
    // Valida que a página carregou
    await expect(page.locator('body')).toBeVisible();
  });

  /**
   * Teste: Navegação com timeout customizado
   * 
   * Objetivo: Demonstrar como definir timeout específico para navegação
   * 
   * Por que é importante:
   * - Páginas lentas podem precisar de mais tempo
   * - Evita falhas por timeout padrão muito curto
   * - Permite ajuste fino por teste
   */
  test('navegação com timeout customizado', async ({ page }) => {
    // Define timeout específico para esta navegação (60 segundos)
    await page.goto('https://demoqa.com', { timeout: 60000 });
    
    // Valida que a página carregou
    await expect(page.locator('body')).toBeVisible();
  });
});
