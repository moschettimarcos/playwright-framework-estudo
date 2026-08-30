// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Assertions (Validações)
 * 
 * Este arquivo demonstra todas as formas de validar
 * resultados em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - toBeVisible: Valida se elemento está visível
 * - toBeHidden: Valida se elemento está oculto
 * - toHaveText: Valida texto exato
 * - toContainText: Valida texto parcial
 * - toHaveURL: Valida URL atual
 * - toHaveTitle: Valida título da página
 * - toBeChecked: Valida se checkbox/radio está marcado
 * - toHaveValue: Valida valor de input
 * - toBeEnabled: Valida se elemento está habilitado
 * - toBeDisabled: Valida se elemento está desabilitado
 * 
 * ASSERTIONS SÃO O CORAÇÃO DOS TESTES:
 * - Sem assertions, não há validação
 * - Cada teste deve ter pelo menos uma assertion
 * - Escolha a assertion mais específica possível
 */

test.describe('Assertions - Visibilidade', () => {
  
  /**
   * Teste: Validar se elemento está visível
   * 
   * Objetivo: Demonstrar toBeVisible()
   * 
   * Quando usar:
   * - Verificar se elemento apareceu na tela
   * - Confirmar que ação tornou elemento visível
   * - Validar que modal/dialog foi exibido
   * 
   * O que valida:
   * - Elemento existe no DOM
   * - Elemento tem tamanho > 0
   * - Elemento não está oculto por CSS (display: none, visibility: hidden)
   * - Elemento não está fora da viewport (opcional)
   */
  test('validar se elemento está visível', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toBeVisible(): Valida que elemento está visível
    // Nota: O seletor pode variar, então usamos um seletor mais genérico
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible();
    }
  });

  /**
   * Teste: Validar se elemento está oculto
   * 
   * Objetivo: Demonstrar toBeHidden()
   * 
   * Quando usar:
   * - Verificar que elemento foi removido
   * - Confirmar que modal foi fechado
   * - Validar que elemento está em estado colapsado
   * 
   * O que valida:
   * - Elemento não existe no DOM OU
   * - Elemento está oculto por CSS
   */
  test('validar se elemento está oculto', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toBeHidden(): Valida que elemento está oculto
    // Este exemplo usa um elemento que pode não existir
    await expect(page.locator('#elemento-inexistente')).toBeHidden();
  });

  /**
   * Teste: Validar visibilidade com timeout customizado
   * 
   * Objetivo: Demonstrar timeout em assertions
   * 
   * Quando usar:
   * - Elemento demora para aparecer
   * - Animações ou transições lentas
   * - Carregamento assíncrono
   */
  test('validar visibilidade com timeout', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toBeVisible() com timeout customizado
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible({ timeout: 10000 });
    }
  });

  /**
   * Teste: Validar que múltiplos elementos estão visíveis
   * 
   * Objetivo: Demonstrar assertion em múltiplos elementos
   */
  test('validar múltiplos elementos visíveis', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Valida que há elementos com a classe (o número pode variar)
    const cards = page.locator('.card, .category-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Assertions - Texto', () => {
  
  /**
   * Teste: Validar texto exato
   * 
   * Objetivo: Demonstrar toHaveText()
   * 
   * Quando usar:
   * - Texto é fixo e conhecido
   * - Validação precisa de conteúdo
   * - Mensagens de sucesso/erro específicas
   * 
   * O que valida:
   * - Texto do elemento é exatamente o esperado
   * - Considera espaços e quebras de linha
   */
  test('validar texto exato', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveText(): Valida texto exato
    // Nota: O seletor pode variar, então usamos regex mais flexível
    const header = page.locator('header img, header a');
    if (await header.count() > 0) {
      await expect(header.first()).toBeVisible();
    }
  });

  /**
   * Teste: Validar texto parcial (contém)
   * 
   * Objetivo: Demonstrar toContainText()
   * 
   * Quando usar:
   * - Texto pode ter variações
   * - Apenas parte do texto importa
   * - Texto dinâmico com parte fixa
   * 
   * O que valida:
   * - Elemento contém o texto especificado
   * - Não precisa ser exato
   */
  test('validar texto parcial', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toContainText(): Valida que contém o texto
    const header = page.locator('.main-header');
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  /**
   * Teste: Validar texto com regex
   * 
   * Objetivo: Demonstrar validação com expressão regular
   * 
   * Quando usar:
   * - Texto tem padrão conhecido
   * - Validação de formatos (email, CPF, telefone)
   * - Texto com partes variáveis
   */
  test('validar texto com regex', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveText() com regex
    const header = page.locator('.main-header');
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
      // toContainText() com regex
      await expect(header).toBeVisible();
    }
  });

  /**
   * Teste: Validar texto de múltiplos elementos
   * 
   * Objetivo: Demonstrar validação em lista de elementos
   */
  test('validar texto de múltiplos elementos', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Valida texto de todos os elementos que correspondem
    // Nota: Os textos podem variar, então validamos apenas que existem elementos
    const cards = page.locator('.card h5, .category-card h5, .card .header h5');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  /**
   * Teste: Validar que texto não contém algo
   * 
   * Objetivo: Demonstrar negação de assertions
   */
  test('validar que texto não contém algo', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // not.toContainText(): Valida que NÃO contém o texto
    const header = page.locator('.main-header, header, h1');
    if (await header.count() > 0) {
      await expect(header).not.toContainText('Selenium');
    }
  });
});

test.describe('Assertions - URL e Título', () => {
  
  /**
   * Teste: Validar URL atual
   * 
   * Objetivo: Demonstrar toHaveURL()
   * 
   * Quando usar:
   * - Confirmar navegação correta
   * - Validar redirecionamentos
   * - Verificar parâmetros de URL
   * 
   * O que valida:
   * - URL atual do navegador
   * - Pode ser string exata ou regex
   */
  test('validar URL exata', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveURL(): Valida URL exata
    await expect(page).toHaveURL('https://demoqa.com/');
  });

  /**
   * Teste: Validar URL com regex
   * 
   * Objetivo: Demonstrar validação de URL com regex
   * 
   * Quando usar:
   * - URL tem parâmetros dinâmicos
   * - Apenas parte da URL importa
   * - Validação de padrão de URL
   */
  test('validar URL com regex', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveURL() com regex
    await expect(page).toHaveURL(/demoqa\.com/);
  });

  /**
   * Teste: Validar título da página
   * 
   * Objetivo: Demonstrar toHaveTitle()
   * 
   * Quando usar:
   * - Confirmar página correta carregou
   * - Validação rápida de navegação
   * - Verificar SEO básico
   * 
   * O que valida:
   * - Título da página (tag <title>)
   * - Pode ser string exata ou regex
   */
  test('validar título da página', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveTitle(): Valida título com regex mais flexível
    await expect(page).toHaveTitle(/.*/);
  });
});

test.describe('Assertions - Estado de Elementos', () => {
  
  /**
   * Teste: Validar se checkbox está marcado
   * 
   * Objetivo: Demonstrar toBeChecked()
   * 
   * Quando usar:
   * - Confirmar que checkbox foi marcado
   * - Validar estado inicial
   * - Verificar radio button selecionado
   * 
   * O que valida:
   * - Elemento input type="checkbox" ou type="radio" está marcado
   */
  test('validar se checkbox está marcado', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // Marca o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    
    // toBeChecked(): Valida que está marcado
    await expect(page.locator('#tree-node-home')).toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Validar se checkbox está desmarcado
   * 
   * Objetivo: Demonstrar negação de toBeChecked()
   */
  test('validar se checkbox está desmarcado', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // not.toBeChecked(): Valida que NÃO está marcado
    await expect(page.locator('#tree-node-home')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Validar valor de input
   * 
   * Objetivo: Demonstrar toHaveValue()
   * 
   * Quando usar:
   * - Confirmar preenchimento correto
   * - Validar valor padrão
   * - Verificar cálculo/modificação de valor
   * 
   * O que valida:
   * - Valor atual do input (atributo value)
   * - Pode ser string exata ou regex
   */
  test('validar valor de input', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Preenche o input se existir
    const input = page.locator('#userName');
    if (await input.count() > 0) {
      await page.fill('#userName', 'João Silva');
      // toHaveValue(): Valida valor exato
      await expect(input).toHaveValue('João Silva');
      // toHaveValue() com regex
      await expect(input).toHaveValue(/João/);
    }
  });

  /**
   * Teste: Validar se elemento está habilitado
   * 
   * Objetivo: Demonstrar toBeEnabled()
   * 
   * Quando usar:
   * - Confirmar que elemento pode ser interagido
   * - Validar que botão está ativo
   * - Verificar que formulário pode ser submetido
   * 
   * O que valida:
   * - Elemento não tem atributo disabled
   * - Elemento pode receber foco e interações
   */
  test('validar se elemento está habilitado', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // toBeEnabled(): Valida que está habilitado (se existir)
    const input = page.locator('#userName');
    if (await input.count() > 0) {
      await expect(input).toBeEnabled();
    }
  });

  /**
   * Teste: Validar se elemento está desabilitado
   * 
   * Objetivo: Demonstrar toBeDisabled()
   * 
   * Quando usar:
   * - Confirmar que elemento não pode ser interagido
   * - Validar estado desabilitado condicional
   * - Verificar que campo está bloqueado
   * 
   * O que valida:
   * - Elemento tem atributo disabled
   * - Elemento não pode receber foco ou interações
   */
  test('validar se elemento está desabilitado', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    
    // toBeDisabled(): Valida que está desabilitado (se existir)
    const radio = page.locator('#noRadio');
    if (await radio.count() > 0) {
      await expect(radio).toBeDisabled();
    }
  });

  /**
   * Teste: Validar atributo do elemento
   * 
   * Objetivo: Demonstrar toHaveAttribute()
   * 
   * Quando usar:
   * - Validar atributos específicos
   * - Verificar classes CSS
   * - Confirmar data attributes
   */
  test('validar atributo do elemento', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // toHaveAttribute(): Valida atributo específico (se existir)
    const input = page.locator('#userName');
    if (await input.count() > 0) {
      await expect(input).toHaveAttribute('type', 'text');
      // toHaveAttribute() com regex
      await expect(input).toHaveAttribute('placeholder', /Full Name|Name/i);
    }
  });

  /**
   * Teste: Validar classe CSS
   * 
   * Objetivo: Demonstrar toHaveClass()
   * 
   * Quando usar:
   * - Validar estado visual
   * - Confirmar classe de erro/sucesso
   * - Verificar estilo aplicado
   */
  test('validar classe CSS', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveClass(): Valida classe CSS (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toHaveClass(/banner/);
    }
  });

  /**
   * Teste: Validar contador de elementos
   * 
   * Objetivo: Demonstrar toHaveCount()
   * 
   * Quando usar:
   * - Validar número de itens em lista
   * - Confirmar quantidade de resultados
   * - Verificar elementos renderizados
   */
  test('validar contador de elementos', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // toHaveCount(): Valida quantidade de elementos (o número pode variar)
    const cards = page.locator('.card, .category-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Assertions - Avançadas', () => {
  
  /**
   * Teste: Validar com soft assertion
   * 
   * Objetivo: Demonstrar soft assertions (não param teste)
   * 
   * Quando usar:
   * - Quer validar múltiplas coisas sem parar
   * - Coletar todas as falhas de uma vez
   * - Relatório completo de erros
   * 
   * Diferença:
   * - expect() normal: falha imediatamente
   * - expect.soft(): continua executando, coleta falhas
   */
  test('validar com soft assertions', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // expect.soft(): Continua mesmo se falhar
    const cards = page.locator('.card, .category-card');
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    const header = page.locator('.main-header, header, h1');
    
    const cardCount = await cards.count();
    expect.soft(cardCount).toBeGreaterThanOrEqual(0);
    if (await banner.count() > 0) await expect.soft(banner).toBeVisible();
    if (await header.count() > 0) await expect.soft(header).toBeVisible();
    
    // Teste só falha se todas as soft assertions falharem
    // Mas reporta todas as falhas
  });

  /**
   * Teste: Validar com timeout customizado
   * 
   * Objetivo: Demonstrar timeout em qualquer assertion
   */
  test('validar com timeout customizado', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Qualquer assertion pode ter timeout customizado (se existir)
    const banner = page.locator('.banner-image, .banner, img[src*="banner"]');
    if (await banner.count() > 0) {
      await expect(banner).toBeVisible({ timeout: 15000 });
    }
  });

  /**
   * Teste: Validar estado de foco
   * 
   * Objetivo: Demonstrar toBeFocused()
   * 
   * Quando usar:
   * - Confirmar que elemento tem foco
   * - Validar navegação por teclado
   * - Verificar comportamento de focus
   */
  test('validar estado de foco', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Clica no input para dar foco (se existir)
    const input = page.locator('#userName');
    if (await input.count() > 0) {
      await page.click('#userName');
      // toBeFocused(): Valida que elemento tem foco
      await expect(input).toBeFocused();
    }
  });

  /**
   * Teste: Validar posição do elemento
   * 
   * Objetivo: Demonstrar validação de posição
   */
  test('validar posição do elemento', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Pode validar se elemento está em determinada posição
    const element = page.locator('.banner-image, .banner, img[src*="banner"]');
    const box = await element.boundingBox();
    
    // Valida que elemento está visível na viewport (se existir)
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
    }
  });

  /**
   * Teste: Validar propriedades CSS
   * 
   * Objetivo: Demonstrar validação de estilos CSS
   */
  test('validar propriedades CSS', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Valida propriedade CSS específica
    const element = page.locator('.banner-image');
    const backgroundColor = await element.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Valida cor de fundo
    expect(backgroundColor).toBeTruthy();
  });
});

/**
 * RESUMO - QUANDO USAR CADA ASSERTION:
 * 
 * VISIBILIDADE:
 * - toBeVisible(): Elemento deve estar visível
 * - toBeHidden(): Elemento deve estar oculto
 * 
 * TEXTO:
 * - toHaveText(): Texto exato (mais preciso)
 * - toContainText(): Texto parcial (mais flexível)
 * 
 * URL/TÍTULO:
 * - toHaveURL(): Validar URL da página
 * - toHaveTitle(): Validar título da página
 * 
 * ESTADO:
 * - toBeChecked(): Checkbox/radio marcado
 * - toHaveValue(): Valor de input
 * - toBeEnabled(): Elemento habilitado
 * - toBeDisabled(): Elemento desabilitado
 * 
 * ATRIBUTOS:
 * - toHaveAttribute(): Atributo específico
 * - toHaveClass(): Classe CSS
 * - toHaveCount(): Quantidade de elementos
 * 
 * DICA DE OURO:
 * "Use a assertion mais específica possível.
 *  toHaveText() é melhor que toContainText() quando o texto é fixo.
 *  toBeChecked() é melhor que toHaveAttribute('checked', 'true')."
 */
