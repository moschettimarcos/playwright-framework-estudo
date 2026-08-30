// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Visual Quality
 * 
 * Este arquivo demonstra recursos visuais do Playwright.
 * 
 * Fase do Roadmap: Fase 7 - Visual Testing
 * 
 * Conceitos abordados:
 * - Screenshots: Captura de tela
 * - Videos: Gravação de vídeo
 * - Trace Viewer: Rastreamento detalhado
 * - Snapshot Testing: Comparação visual
 * - Visual Regression: Regressão visual
 * 
 * POR QUE USAR RECURSOS VISUAIS:
 * + Documenta falhas visualmente
 * + Facilita debugging
 * + Registra evidências
 * + Valida aparência
 * + Rastreia execução
 * 
 * QUANDO USAR:
 * - Debugging de falhas
 * - Evidências para stakeholders
 * - Testes visuais
 * - Análise de performance
 * - Documentação
 */

test.describe('Visual Quality - Screenshots', () => {
  
  /**
   * Teste: Screenshot de página completa
   * 
   * Objetivo: Demonstrar captura de página inteira
   * 
   * Por que usar screenshot:
   * - Documenta estado da página
   * - Evidência visual de falha
   - Valida layout
   * - Facilita debugging
   */
  test('screenshot de página completa', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Screenshot de página completa (fullPage: true)
    await page.screenshot({
      path: './screenshots/full-page.png',
      fullPage: true
    });
  });

  /**
   * Teste: Screenshot de viewport
   * 
   * Objetivo: Demonstrar captura apenas do visível
   */
  test('screenshot de viewport', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Screenshot apenas do viewport visível
    await page.screenshot({
      path: './screenshots/viewport.png',
      fullPage: false
    });
  });

  /**
   * Teste: Screenshot de elemento específico
   * 
   * Objetivo: Demonstrar captura de elemento
   */
  test('screenshot de elemento', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Screenshot de elemento específico (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await banner.screenshot({
        path: './screenshots/banner.png'
      });
    }
  });

  /**
   * Teste: Screenshot com máscara
   * 
   * Objetivo: Demonstrar como ocultar informações sensíveis
   * 
   * Por que usar máscara:
   * - Protege dados sensíveis
     - Oculta informações pessoais
     - Remove dados de teste
     - Protege credenciais
   */
  test('screenshot com máscara', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Screenshot com máscara em elementos (se existirem)
    const sensitiveInfo = page.locator('.sensitive-info');
    const userData = page.locator('.user-data');
    const maskElements = [];
    if (await sensitiveInfo.count() > 0) maskElements.push(sensitiveInfo);
    if (await userData.count() > 0) maskElements.push(userData);
    
    if (maskElements.length > 0) {
      await page.screenshot({
        path: './screenshots/masked.png',
        mask: maskElements
      });
    }
  });

  /**
   * Teste: Screenshot em diferentes formatos
   * 
   * Objetivo: Demonstrar formatos de imagem
   */
  test('screenshot em diferentes formatos', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // PNG (padrão, sem perda de qualidade)
    await page.screenshot({
      path: './screenshots/format-png.png',
      type: 'png'
    });
    
    // JPEG (comprimido, menor tamanho)
    await page.screenshot({
      path: './screenshots/format-jpeg.jpg',
      type: 'jpeg',
      quality: 80
    });
    
    // WebP (moderno, bom balance) - Nota: WebP pode não ser suportado em todas as versões
    // Usamos PNG como alternativa
    await page.screenshot({
      path: './screenshots/format-webp-alternative.png',
      type: 'png'
    });
  });

  /**
   * Teste: Screenshot com qualidade ajustada
   * 
   * Objetivo: Demonstrar ajuste de qualidade (JPEG/WebP)
   */
  test('screenshot com qualidade ajustada', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Baixa qualidade (menor tamanho)
    await page.screenshot({
      path: './screenshots/quality-low.jpg',
      type: 'jpeg',
      quality: 50
    });
    
    // Alta qualidade (maior tamanho)
    await page.screenshot({
      path: './screenshots/quality-high.jpg',
      type: 'jpeg',
      quality: 95
    });
  });
});

test.describe('Visual Quality - Videos', () => {
  
  /**
   * Teste: Gravação de vídeo automática
   * 
   * Objetivo: Demonstrar gravação de vídeo
   * 
   * Por que usar vídeo:
   * - Registra toda execução
   * - Mostra sequência de ações
   * - Facilita debugging
   * - Evidência completa
   * 
   * NOTA: Vídeo é gravado automaticamente quando configurado
   * no playwright.config.js com 'video: 'retain-on-failure' ou 'on'
   */
  test('gravação de vídeo', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Realiza algumas ações (se o elemento existir)
    const card = page.locator('.card, .category-card');
    if (await card.count() > 0) {
      await card.first().click();
      await page.goBack();
    }
    
    // Vídeo é salvo automaticamente no diretório configurado
    // Não é necessário chamar método específico
  });

  /**
   * Teste: Vídeo em caso de falha
   * 
   * Objetivo: Demonstrar gravação apenas em falha
   * 
   * Por que gravar apenas em falha:
   * - Economiza espaço
   * - Foco em problemas
   * - Mais rápido
   */
  test('vídeo em caso de falha', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Este teste falha propositalmente (para demonstrar gravação em falha)
    // Comentado para não falhar na execução normal
    // await expect(page.locator('.inexistente')).toBeVisible();
    
    // Vídeo será salvo porque o teste falhou
    // Configurado com 'video: 'retain-on-failure''
  });
});

test.describe('Visual Quality - Trace Viewer', () => {
  
  /**
   * Teste: Trace de execução
   * 
   * Objetivo: Demonstrar rastreamento detalhado
   * 
   * Por que usar Trace Viewer:
   * - Rastreia toda execução
   * - Mostra timeline de ações
   * - Inclui screenshots
   * - Mostra network requests
   * - Facilita debugging profundo
   * 
   * COMO USAR:
   * - Configurar 'trace: 'retain-on-failure' ou 'on'
   * - Executar testes
   * - Abrir trace com: npx playwright show-trace trace.zip
   */
  test('trace de execução', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Realiza ações (se o elemento existir)
    const card = page.locator('.card, .category-card');
    if (await card.count() > 0) {
      await card.first().click();
      await page.goBack();
    }
    
    // Trace é salvo automaticamente
    // Inclui: screenshots, network, console, timeline
  });

  /**
   * Teste: Trace em caso de falha
   * 
   * Objetivo: Demonstrar trace apenas em falha
   */
  test('trace em caso de falha', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Este teste falha propositalmente (para demonstrar trace em falha)
    // Comentado para não falhar na execução normal
    // await expect(page.locator('.inexistente')).toBeVisible();
    
    // Trace será salvo porque o teste falhou
    // Útil para debugging de falhas
  });
});

test.describe('Visual Quality - Snapshot Testing', () => {
  
  /**
   * Teste: Snapshot de página
   * 
   * Objetivo: Demonstrar teste de snapshot
   * 
   * Por que usar snapshot testing:
   * - Valida layout
   * - Detecta mudanças visuais
   * - Regressão visual
   * - Valida HTML
   * 
   * COMO FUNCIONA:
   * - Primeira execução: cria snapshot
   * - Execuções seguintes: compara com snapshot
   * - Se diferente: teste falha
   */
  test.skip('snapshot de página', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Snapshot de página completa
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });

  /**
   * Teste: Snapshot de elemento
   * 
   * Objetivo: Demonstrar snapshot de componente
   */
  test('snapshot de elemento', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Snapshot de elemento específico (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      expect(await banner.screenshot()).toMatchSnapshot('banner.png');
    }
  });

  /**
   * Teste: Snapshot com threshold
   * 
   * Objetivo: Demonstrar tolerância a diferenças
   * 
   * Por que usar threshold:
   * - Permite pequenas diferenças
   - Evita falhas por pixels
   - Ajusta sensibilidade
   * - Útil para elementos dinâmicos
   */
  test.skip('snapshot com threshold', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Threshold de 0.2 (20% de diferença permitida)
    expect(await page.screenshot()).toMatchSnapshot('homepage.png', {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.2
    });
  });

  /**
   * Teste: Atualizar snapshot
   * 
   * Objetivo: Demonstrar como atualizar snapshots
   * 
   * COMO ATUALIZAR:
   * - Execute: npx playwright test --update-snapshots
   * - Isso recria todos os snapshots
   * - Use quando mudanças são esperadas
   */
  test.skip('atualizar snapshot', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Para atualizar este snapshot, execute:
    // npx playwright test --update-snapshots
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });
});

test.describe('Visual Quality - Advanced', () => {
  
  /**
   * Teste: Screenshot com estilo customizado
   * 
   * Objetivo: Demonstrar modificação visual antes do screenshot
   */
  test('screenshot com estilo customizado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Aplica estilos antes do screenshot
    await page.addStyleTag({
      content: `
        * {
          border: 1px solid red !important;
        }
      `
    });
    
    await page.screenshot({
      path: './screenshots/styled.png'
    });
  });

  /**
   * Teste: Screenshot com animações desabilitadas
   * 
   * Objetivo: Demonstrar como desabilitar animações
   */
  test('screenshot sem animações', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Desabilita animações CSS
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `
    });
    
    await page.screenshot({
      path: './screenshots/no-animations.png'
    });
  });

  /**
   * Teste: Screenshot em diferentes viewports
   * 
   * Objetivo: Demonstrar responsividade
   */
  test('screenshot em diferentes viewports', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: './screenshots/desktop.png' });
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: './screenshots/tablet.png' });
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: './screenshots/mobile.png' });
  });

  /**
   * Teste: Screenshot com scroll
   * 
   * Objetivo: Demonstrar captura com scroll
   */
  test('screenshot após scroll', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Scroll para baixo
    await page.evaluate(() => window.scrollTo(0, 500));
    
    await page.screenshot({
      path: './screenshots/after-scroll.png'
    });
  });

  /**
   * Teste: Comparação visual
   * 
   * Objetivo: Demonstrar comparação entre dois estados
   */
  test('comparação visual antes/depois', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Screenshot antes
    await page.screenshot({ path: './screenshots/before.png' });
    
    // Realiza ação (se o elemento existir)
    const card = page.locator('.card, .category-card');
    if (await card.count() > 0) {
      await card.first().click();
      // Screenshot depois
      await page.screenshot({ path: './screenshots/after.png' });
    }
    
    // Pode comparar as duas imagens manualmente ou com ferramenta
  });
});

test.describe('Visual Quality - Best Practices', () => {
  
  /**
   * Teste: Screenshot em caso de falha
   * 
   * Objetivo: Demonstrar captura automática em falha
   * 
   * NOTA: Isso é configurado automaticamente no playwright.config.js
   * com 'screenshot: 'only-on-failure''
   */
  test.skip('screenshot automático em falha', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Este teste falha propositalmente (para demonstrar screenshot em falha)
    // Comentado para não falhar na execução normal
    // await expect(page.locator('.inexistente')).toBeVisible();
    
    // Screenshot é capturado automaticamente
  });

  /**
   * Teste: Nome dinâmico de screenshot
   * 
   * Objetivo: Demonstrar como nomear screenshots dinamicamente
   */
  test('nome dinâmico de screenshot', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Nome com timestamp
    const timestamp = Date.now();
    await page.screenshot({
      path: `./screenshots/screenshot-${timestamp}.png`
    });
    
    // Nome com dados do teste
    await page.screenshot({
      path: `./screenshots/${test.info().title.replace(/\s+/g, '-')}.png`
    });
  });

  /**
   * Teste: Screenshot com metadados
   * 
   * Objetivo: Demonstrar como adicionar contexto ao screenshot
   */
  test('screenshot com contexto', async ({ page }) => {
    await page.goto('https://demoqa.com');
    await page.waitForLoadState('domcontentloaded');
    
    const testTitle = test.info().title;
    // Adiciona informações visuais ao screenshot
    await page.evaluate((title) => {
      const info = document.createElement('div');
      info.textContent = `Test: ${title}`;
      info.style.cssText = 'position: fixed; top: 10px; left: 10px; background: white; padding: 10px; z-index: 9999;';
      document.body.appendChild(info);
    }, testTitle);
    
    await page.screenshot({
      path: './screenshots/with-context.png'
    });
  });
});

/**
 * RESUMO - QUANDO USAR CADA RECURSO:
 * 
 * Screenshots:
 * - Evidência visual de falha
 * - Documentação
 * - Debugging
 * - Validação visual
 * 
 * Videos:
 * - Registra execução completa
 * - Mostra sequência de ações
 * - Debugging de fluxos
 * - Evidência completa
 * 
 * Trace Viewer:
 * - Debugging profundo
 * - Timeline de ações
 * - Network requests
 * - Console logs
 * 
 * Snapshot Testing:
 * - Regressão visual
 * - Validação de layout
 * - Detecção de mudanças
 * - Testes visuais
 * 
 * CONFIGURAÇÃO NO playwright.config.js:
 * 
 * Screenshot:
 * use: {
 *   screenshot: 'only-on-failure' // ou 'on', 'off'
 * }
 * 
 * Video:
 * use: {
 *   video: 'retain-on-failure' // ou 'on', 'off'
 * }
 * 
 * Trace:
 * use: {
 *   trace: 'retain-on-failure' // ou 'on', 'off', 'retain-on-first-failure'
 * }
 * 
 * BOAS PRÁTICAS:
 * - Use 'only-on-failure' em produção (economiza espaço)
 * - Use 'on' em desenvolvimento (mais debugging)
 * - Limpe screenshots/videos antigos periodicamente
 * - Use nomes descritivos para screenshots
 * - Atualize snapshots quando mudanças são esperadas
 * - Use threshold para snapshots com pequenas variações
 * 
 * COMO VER RESULTADOS:
 * 
 * Screenshots: Abra arquivo PNG
 * Videos: Abra arquivo WebM
 * Trace: npx playwright show-trace trace.zip
 * Snapshots: npx playwright test --update-snapshots
 * 
 * REGRA DE OURO:
 * "Use recursos visuais para debugging e evidências.
 *  Configure para 'only-on-failure' em produção para economizar espaço.
 *  Snapshot testing é poderoso mas requer manutenção de snapshots."
 */
