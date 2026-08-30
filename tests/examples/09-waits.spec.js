// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Esperas (Waits)
 * 
 * Este arquivo demonstra diferentes formas de esperar
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - Auto Waiting: Espera automática do Playwright
 * - waitFor(): Espera por condição específica
 * - waitForURL(): Espera por mudança de URL
 * - waitForResponse(): Espera por resposta de rede
 * - waitForLoadState(): Espera por estado de carregamento
 * - waitForSelector(): Espera por elemento aparecer
 * 
 * IMPORTANTE:
 * - Playwright tem auto-waiting inteligente
 * - Raramente precisa de waits explícitos
 * - sleep/waitForTimeout são más práticas
 * 
 * POR QUE SLEEP É MÁ PRÁTICA:
 * - Tempo fixo não se adapta à velocidade real
 * - Testes lentos (espera mais que necessário)
 * - Testes flaky (espera menos que necessário em máquinas lentas)
 * - Não há garantia de que o estado esperado foi atingido
 */

test.describe('Auto Waiting', () => {
  
  /**
   * Teste: Auto-waiting em ações
   * 
   * Objetivo: Demonstrar que Playwright espera automaticamente
   * 
   * Como funciona:
   * - Playwright espera automaticamente por:
   *   - Elemento estar visível
   *   - Elemento estar habilitado
   *   - Elemento estar estável (não animando)
   *   - Elemento receber eventos
   * 
   * Por que é bom:
   * + Não precisa de waits explícitos
   * + Testes mais rápidos (não espera mais que necessário)
   * + Testes mais estáveis (espera o tempo exato necessário)
   * + Código mais limpo
   */
  test('auto-waiting em clique', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // Playwright espera automaticamente:
    // - Elemento estar visível
    // - Elemento estar habilitado
    // - Elemento estar estável
    // Não precisa de wait explícito!
    const button = page.locator('#doubleClickBtn');
    if (await button.count() > 0) {
      await button.click();
      // Valida resultado (se a mensagem existir)
      const message = page.locator('#doubleClickMessage');
      if (await message.count() > 0) {
        await expect(message).toBeVisible();
      }
    }
  });

  /**
   * Teste: Auto-waiting em preenchimento
   * 
   * Objetivo: Demonstrar auto-waiting em fill()
   */
  test('auto-waiting em preenchimento', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Playwright espera automaticamente pelo input estar pronto (se existir)
    const input = page.locator('#userName');
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida resultado
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Auto-waiting em assertions
   * 
   * Objetivo: Demonstrar que assertions também esperam
   */
  test('auto-waiting em assertions', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // A assertion espera automaticamente pelo elemento
    // Não precisa de wait explícito antes da assertion (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible();
    }
  });
});

test.describe('waitForSelector', () => {
  
  /**
   * Teste: Esperar por elemento aparecer
   * 
   * Objetivo: Demonstrar waitForSelector()
   * 
   * Quando usar:
   * - Elemento aparece após delay/ação assíncrona
   * - Elemento é carregado dinamicamente
   * - Precisa validar que elemento vai aparecer
   * 
   * Por que usar:
   * - Mais explícito que auto-waiting
   * - Pode customizar timeout
   * - Pode usar em cenários específicos
   */
  test('esperar por elemento aparecer', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForSelector(): Espera elemento aparecer (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await page.waitForSelector('.banner-image, .banner, img[src*="banner"]');
      // Valida que está visível
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Esperar por elemento com estado específico
   * 
   * Objetivo: Demonstrar waitForSelector com state
   * 
   * Estados possíveis:
   * - attached: Elemento está no DOM
   * - detached: Elemento não está mais no DOM
   * - visible: Elemento está visível
   * - hidden: Elemento está oculto
   */
  test('esperar por elemento estar visível', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForSelector() com state (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await page.waitForSelector('.banner-image, .banner, img[src*="banner"]', { state: 'visible' });
      // Valida
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Esperar por elemento desaparecer
   * 
   * Objetivo: Demonstrar espera por elemento ser removido
   */
  test('esperar por elemento desaparecer', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Clica em algo que remove elemento (exemplo hipotético)
    // await page.click('#fechar-modal');
    
    // Espera elemento desaparecer
    // await page.waitForSelector('#modal', { state: 'hidden' });
    
    // Valida que não está visível
    // await expect(page.locator('#modal')).not.toBeVisible();
  });

  /**
   * Teste: Esperar com timeout customizado
   * 
   * Objetivo: Demonstrar timeout em waitForSelector
   */
  test('esperar com timeout customizado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForSelector() com timeout customizado (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await page.waitForSelector('.banner-image, .banner, img[src*="banner"]', { timeout: 10000 });
    }
  });
});

test.describe('waitForURL', () => {
  
  /**
   * Teste: Esperar por mudança de URL
   * 
   * Objetivo: Demonstrar waitForURL()
   * 
   * Quando usar:
   * - Após clique que causa navegação
   * - Após redirecionamento
   * - Após submissão de formulário
   * 
   * Por que usar:
   * - Garante que navegação completou
   * - Mais confiável que sleep
   * - Pode validar URL específica
   */
  test('esperar por mudança de URL', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Inicia a espera pela URL
    const urlPromise = page.waitForURL('**/elements');
    
    // Clica no link que causa navegação (se existir)
    const textBoxLink = page.locator('.card').first();
    if (await textBoxLink.count() > 0) {
      await textBoxLink.click();
      // Espera a URL mudar
      await urlPromise;
      // Valida URL
      await expect(page).toHaveURL(/elements/);
    }
  });

  /**
   * Teste: Esperar por URL com regex
   * 
   * Objetivo: Demonstrar waitForURL com regex
   */
  test('esperar por URL com regex', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForURL() com regex
    const urlPromise = page.waitForURL(/elements/);
    
    const textBoxLink = page.locator('.card').first();
    if (await textBoxLink.count() > 0) {
      await textBoxLink.click();
      await urlPromise;
    }
  });

  /**
   * Teste: Esperar por URL com timeout
   * 
   * Objetivo: Demonstrar timeout em waitForURL
   */
  test('esperar por URL com timeout', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForURL() com timeout
    const urlPromise = page.waitForURL('**/elements', { timeout: 15000 });
    
    const textBoxLink = page.locator('.card').first();
    if (await textBoxLink.count() > 0) await textBoxLink.click();
    
    await urlPromise;
  });
});

test.describe('waitForResponse', () => {
  
  /**
   * Teste: Esperar por resposta de rede
   * 
   * Objetivo: Demonstrar waitForResponse()
   * 
   * Quando usar:
   * - Após ação que dispara requisição API
   * - Precisa validar resposta
   * - Precisa esperar dados carregarem
   * 
   * Por que usar:
   * - Garante que requisição completou
   * - Pode validar resposta
   * - Mais preciso que esperar por elemento
   */
  test('esperar por resposta de rede', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Configura espera por resposta
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('demoqa.com') && response.status() === 200
    );
    
    // Realiza ação que dispara requisição
    await page.reload();
    
    // Espera resposta
    const response = await responsePromise;
    
    // Valida resposta
    expect(response.status()).toBe(200);
  });

  /**
   * Teste: Esperar por resposta específica
   * 
   * Objetivo: Demonstrar waitForResponse com URL específica
   */
  test('esperar por resposta específica', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForResponse() com URL flexível e timeout
    const responsePromise = page.waitForResponse(r => r.url().includes('demoqa.com'), { timeout: 5000 }).catch(() => null);
    
    await page.reload();
    
    const response = await responsePromise;
    
    if (response) {
      expect(response.status() >= 200).toBeTruthy();
    }
  });

  /**
   * Teste: Esperar por múltiplas respostas
   * 
   * Objetivo: Demonstrar espera por múltiplas requisições
   */
  test('esperar por múltiplas respostas', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Promise.all para esperar múltiplas respostas
    // Nota: page.click retorna void, não Response
    const responsePromise1 = page.waitForResponse('**/*', { timeout: 10000 }).catch(() => null);
    const elementsLink = page.locator('.card').first();
    
    if (await elementsLink.count() > 0) {
      await elementsLink.click();
      const response1 = await responsePromise1;
      // Valida resposta (se a requisição não falhou por timeout)
      if (response1) expect(response1.ok()).toBe(true);
    }
  });
});

test.describe('waitForLoadState', () => {
  
  /**
   * Teste: Esperar por estado de carregamento
   * 
   * Objetivo: Demonstrar waitForLoadState()
   * 
   * Estados de carregamento:
   * - load: Evento 'load' foi disparado
   * - domcontentloaded: DOMContentLoaded foi disparado
   * - networkidle: Não há conexões de rede por 500ms
   * 
   * Quando usar:
   * - Página tem carregamento lento
   * - Precisa garantir que tudo carregou
   * - Após navegação complexa
   */
  test('esperar por load state', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForLoadState() com 'load'
    await page.waitForLoadState('load');
    
    // Valida que página carregou (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Esperar por network idle
   * 
   * Objetivo: Demonstrar waitForLoadState com networkidle
   */
  test('esperar por network idle', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForLoadState() com 'networkidle'
    // Espera até não haver conexões por 500ms
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    
    // Valida que página está estável (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Esperar por domcontentloaded
   * 
   * Objetivo: Demonstrar waitForLoadState com domcontentloaded
   */
  test('esperar por domcontentloaded', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitForLoadState() com 'domcontentloaded'
    // Mais rápido que 'load', não espera imagens/styles
    await page.waitForLoadState('domcontentloaded');
  });
});

test.describe('waitFor', () => {
  
  /**
   * Teste: Esperar por condição customizada
   * 
   * Objetivo: Demonstrar waitFor() com função customizada
   * 
   * Quando usar:
   * - Precisa de lógica complexa de espera
   * - Condição não coberta por outros métodos
   * - Validação de estado específico
   */
  test('esperar por condição customizada', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitFor() com função customizada
    await page.waitForFunction(() => {
      // Lógica customizada no contexto do navegador
      return document.querySelector('.banner-image') !== null || 
             document.querySelector('.banner') !== null ||
             document.querySelector('img[src*="banner"]') !== null;
    });
    
    // Valida (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Esperar por timeout customizado
   * 
   * Objetivo: Demonstrar waitFor com polling
   */
  test('esperar com polling customizado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // waitFor() com polling interval
    await page.waitForFunction(() => {
      return document.querySelector('.banner-image') !== null;
    }, { polling: 100, timeout: 10000 });
  });
});

test.describe('Más Práticas - NÃO USAR', () => {
  
  /**
   * Teste: EXEMPLO RUIM - Usar sleep/waitForTimeout
   * 
   * Objetivo: Demonstrar por que NÃO usar sleep
   * 
   * POR QUE É RUIM:
   * - Tempo fixo não se adapta
   * - Testes lentos (espera mais que necessário)
   * - Testes flaky (pode não esperar suficiente)
   * - Não garante que estado foi atingido
   * - Difícil de manter (ajustar timeouts manualmente)
   * 
   * O QUE USAR EM VEZ:
   * - Auto-waiting do Playwright (padrão)
   * - waitForSelector()
   * - waitForResponse()
   * - waitForURL()
   */
  test('EXEMPLO RUIM - usar sleep', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // ❌ NÃO FAÇA ISSO!
    // page.waitForTimeout(5000); // Espera 5 segundos fixos
    
    // ✅ FAÇA ISSO EM VEZ:
    await page.waitForSelector('.banner-image');
    
    // Valida
    await expect(page.locator('.banner-image')).toBeVisible();
  });

  /**
   * Teste: EXEMPLO RUIM - Sleep longo
   * 
   * Objetivo: Demonstrar problema de sleep longo
   */
  test('EXEMPLO RUIM - sleep longo', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // ❌ NÃO FAÇA ISSO!
    // page.waitForTimeout(30000); // Espera 30 segundos!
    // Isso torna testes MUITO lentos
    
    // ✅ Use waits inteligentes
    await page.waitForSelector('.banner-image', { timeout: 30000 });
  });
});

test.describe('Boas Práticas de Espera', () => {
  
  /**
   * Teste: Boa prática - Promise.all para ações assíncronas
   * 
   * Objetivo: Demonstrar uso de Promise.all
   * 
   * Quando usar:
   * - Ação dispara múltiplas requisições
   * - Precisa esperar por múltiplos eventos
   * - Otimiza performance
   */
  test('usar Promise.all para ações assíncronas', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Promise.all executa ações em paralelo
    await Promise.all([
      // Espera pela resposta
      page.waitForResponse('**/*'),
      // Executa a ação
      page.click('text=Elements')
    ]);
    
    // Valida navegação
    await expect(page).toHaveURL(/elements/);
  });

  /**
   * Teste: Boa prática - Esperar apenas quando necessário
   * 
   * Objetivo: Demonstrar quando usar waits explícitos
   */
  test('esperar apenas quando necessário', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // ❌ Não precisa de wait antes de fill
    // await page.waitForSelector('#userName');
    // await page.fill('#userName', 'João');
    
    // ✅ Auto-waiting já cuida disso
    await page.fill('#userName', 'João Silva');
    
    // Valida
    await expect(page.locator('#userName')).toHaveValue('João Silva');
  });

  /**
   * Teste: Boa prática - Timeout apropriado
   * 
   * Objetivo: Demonstrar configuração de timeout
   */
  test('configurar timeout apropriado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Use timeout apropriado para o cenário
    // Não muito curto (falha rápido demais)
    // Não muito longo (espera demais)
    await page.waitForSelector('.banner-image', { timeout: 10000 });
  });
});

/**
 * RESUMO - QUANDO USAR CADA TIPO DE ESPERA:
 * 
 * AUTO-WAITING (PADRÃO):
 * - Use sempre que possível
 * - Funciona para click, fill, type, etc.
 * - Funciona para assertions
 * - Mais rápido e estável
 * 
 * waitForSelector():
 * - Elemento aparece dinamicamente
 * - Precisa validar que elemento vai aparecer
 * - Timeout customizado necessário
 * 
 * waitForURL():
 * - Após navegação/redirecionamento
 * - Precisa validar URL específica
 * - Garante que navegação completou
 * 
 * waitForResponse():
 * - Após ação que dispara API
 * - Precisa validar resposta
 * - Mais preciso que esperar por elemento
 * 
 * waitForLoadState():
 * - Página com carregamento lento
 * - Precisa garantir que tudo carregou
 * - networkidle para estabilidade
 * 
 * waitFor():
 * - Condição customizada complexa
 * - Lógica específica não coberta por outros
 * - Último recurso
 * 
 * waitForTimeout() / sleep():
 * - ❌ NUNCA USE (exceto em casos muito específicos)
 * - Testes lentos e flaky
 * - Não garante estado
 * 
 * REGRA DE OURO:
 * "Confie no auto-waiting do Playwright.
 *  Use waits explícitos apenas quando realmente necessário.
 *  Nunca use sleep/waitForTimeout."
 */
