// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Testes de Captura de Screenshots
 * 
 * Este arquivo demonstra como capturar screenshots em testes
 * de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 7 - Qualidade Visual
 * 
 * Conceitos abordados:
 * - screenshot(): Capturar screenshot da página
 * - screenshot() de elemento específico
 * - screenshot() em caso de falha
 * - screenshot() com diferentes formatos
 * - Comparação de screenshots (visual regression)
 */

test.describe('Captura de Screenshots', () => {
  
  /**
   * Teste: Capturar screenshot da página inteira
   * 
   * Objetivo: Demonstrar como capturar screenshot da página completa
   * 
   * Por que é importante:
   * - Documentar estado da aplicação
   * - Evidência visual de testes
   * - Debugging visual de falhas
   */
  test('capturar screenshot da página inteira', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // screenshot(): Captura screenshot da página
    // fullPage: true - captura a página inteira (com scroll)
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/pagina-completa.png'),
      fullPage: true 
    });
    
    // Valida que o arquivo foi criado
    const fs = require('fs');
    expect(fs.existsSync(path.join(__dirname, '../../screenshots/pagina-completa.png'))).toBe(true);
  });

  /**
   * Teste: Capturar screenshot da viewport atual
   * 
   * Objetivo: Demonstrar como capturar apenas o que está visível
   * 
   * Por que é importante:
   * - Captura apenas área visível (sem scroll)
   * - Mais rápido que fullPage
   * - Foco no conteúdo atual
   */
  test('capturar screenshot da viewport', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // screenshot() sem fullPage captura apenas viewport
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/viewport.png')
    });
    
    // Valida que o arquivo foi criado
    const fs = require('fs');
    expect(fs.existsSync(path.join(__dirname, '../../screenshots/viewport.png'))).toBe(true);
  });

  /**
   * Teste: Capturar screenshot de elemento específico
   * 
   * Objetivo: Demonstrar como capturar screenshot de um elemento
   * 
   * Por que é importante:
   * - Foco em componente específico
   * - Evidência de elemento problemático
   * - Testes visuais de componentes
   */
  test('capturar screenshot de elemento', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // screenshot() em um elemento específico
    await page.locator('.banner-image').screenshot({ 
      path: path.join(__dirname, '../../screenshots/elemento.png')
    });
    
    // Valida que o arquivo foi criado
    const fs = require('fs');
    expect(fs.existsSync(path.join(__dirname, '../../screenshots/elemento.png'))).toBe(true);
  });

  /**
   * Teste: Capturar screenshot em diferentes formatos
   * 
   * Objetivo: Demonstrar diferentes formatos de screenshot
   * 
   * Por que é importante:
   * - PNG: Sem perda de qualidade (padrão)
   * - JPEG: Comprimido, menor tamanho
   * - Escolher formato adequado ao uso
   */
  test('capturar screenshot em PNG', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Formato PNG (padrão, sem perda)
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/formato-png.png'),
      type: 'png'
    });
  });

  test('capturar screenshot em JPEG', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Formato JPEG (comprimido)
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/formato-jpeg.jpg'),
      type: 'jpeg',
      quality: 80 // Qualidade de 0 a 100
    });
  });

  /**
   * Teste: Capturar screenshot com qualidade ajustada
   * 
   * Objetivo: Demonstrar ajuste de qualidade em JPEG
   * 
   * Por que é importante:
   * - Balancear qualidade e tamanho
   * - Menor qualidade = arquivo menor
   * - Maior qualidade = arquivo maior
   */
  test('capturar screenshot com qualidade baixa', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // JPEG com qualidade baixa (arquivo menor)
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/qualidade-baixa.jpg'),
      type: 'jpeg',
      quality: 50
    });
  });

  test('capturar screenshot com qualidade alta', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // JPEG com qualidade alta (arquivo maior)
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/qualidade-alta.jpg'),
      type: 'jpeg',
      quality: 95
    });
  });

  /**
   * Teste: Capturar screenshot automaticamente em caso de falha
   * 
   * Objetivo: Demonstrar configuração automática de screenshot em falha
   * 
   * Por que é importante:
   * - Evidência automática de falhas
   * - Facilita debugging
   * - Configurado no playwright.config.js
   * 
   * Nota: Este teste falha propositalmente para demonstrar
   */
  test.skip('capturar screenshot em caso de falha', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Faz algo que vai falhar
    await expect(page.locator('#elemento-inexistente')).toBeVisible();
    // O Playwright capturará screenshot automaticamente
  });

  /**
   * Teste: Capturar screenshot antes e depois de ação
   * 
   * Objetivo: Demonstrar captura de antes/depois
   * 
   * Por que é importante:
   * - Comparar estados
   * - Documentar mudanças
   * - Evidência de transformação
   */
  test('capturar screenshot antes e depois', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Screenshot antes
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/antes.png')
    });
    
    // Realiza ação
    await page.fill('#userName', 'João Silva');
    
    // Screenshot depois
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/depois.png')
    });
  });

  /**
   * Teste: Capturar screenshot com máscara (ocultar elementos)
   * 
   * Objetivo: Demonstrar como ocultar elementos sensíveis
   * 
   * Por que é importante:
   * - Proteger dados sensíveis (senhas, tokens)
   * - Ocultar elementos dinâmicos (data, hora)
   * - Foco no conteúdo relevante
   */
  test('capturar screenshot com máscara', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // screenshot() com mask para ocultar elementos
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/com-mascara.png'),
      mask: [
        page.locator('.elemento-sensivel'), // Oculta elemento sensível
        page.locator('.data-hora') // Oculta data/hora dinâmica
      ]
    });
  });

  /**
   * Teste: Capturar screenshot com estilo customizado
   * 
   * Objetivo: Demonstrar como aplicar estilos antes do screenshot
   * 
   * Por que é importante:
   * - Remover elementos que atrapalham
   * - Destacar elementos importantes
   * - Padronizar aparência para testes
   */
  test('capturar screenshot com estilo customizado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Aplica estilos antes do screenshot
    await page.addStyleTag({
      content: `
        .elemento-destacar {
          border: 3px solid red !important;
        }
        .elemento-ocultar {
          display: none !important;
        }
      `
    });
    
    // Captura screenshot com estilos aplicados
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/com-estilo.png')
    });
  });

  /**
   * Teste: Capturar screenshot em diferentes viewports
   * 
   * Objetivo: Demonstrar captura em diferentes tamanhos de tela
   * 
   * Por que é importante:
   * - Testar responsividade
   * - Validar layout em diferentes dispositivos
   * - Evidência de design responsivo
   */
  test('capturar screenshot em desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://demoqa.com');
    
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/desktop-1920x1080.png'),
      fullPage: true
    });
  });

  test('capturar screenshot em tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('https://demoqa.com');
    
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/tablet-768x1024.png'),
      fullPage: true
    });
  });

  test('capturar screenshot em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://demoqa.com');
    
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/mobile-375x667.png'),
      fullPage: true
    });
  });

  /**
   * Teste: Capturar screenshot com timeout customizado
   * 
   * Objetivo: Demonstrar configuração de timeout para screenshot
   * 
   * Por que é importante:
   * - Páginas lentas podem precisar de mais tempo
   * - Evita falhas por timeout
   * - Ajuste fino por cenário
   */
  test('capturar screenshot com timeout', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // screenshot() com timeout customizado
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/com-timeout.png'),
      timeout: 30000 // 30 segundos
    });
  });

  /**
   * Teste: Capturar screenshot com animações desabilitadas
   * 
   * Objetivo: Demonstrar como desabilitar animações para screenshot
   * 
   * Por que é importante:
   * - Animações causam screenshots inconsistentes
   * - Testes visuais precisam de consistência
   * - Remove variabilidade
   */
  test('capturar screenshot sem animações', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Desabilita animações via CSS
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
    
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots/sem-animacoes.png')
    });
  });

  /**
   * Teste: Capturar screenshot com nome dinâmico
   * 
   * Objetivo: Demonstrar como gerar nomes dinâmicos
   * 
   * Por que é importante:
   * - Evita sobrescrever screenshots
   * - Inclui timestamp no nome
   * - Organiza por data/hora
   */
  test('capturar screenshot com nome dinâmico', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Gera nome com timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${timestamp}.png`;
    
    await page.screenshot({ 
      path: path.join(__dirname, '../../screenshots', filename)
    });
  });
});
