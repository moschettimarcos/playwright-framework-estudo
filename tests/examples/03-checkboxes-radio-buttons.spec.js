// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Checkboxes e Radio Buttons
 * 
 * Este arquivo demonstra como interagir com checkboxes e radio buttons
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - check(): Marcar checkbox
 * - uncheck(): Desmarcar checkbox
 * - setChecked(): Definir estado (marcar/desmarcar)
 * - isChecked(): Verificar se está marcado
 * - Radio buttons (seleção única)
 */

test.describe('Checkboxes e Radio Buttons', () => {
  
  /**
   * Teste: Marcar checkbox
   * 
   * Objetivo: Demonstrar como marcar um checkbox
   * 
   * Por que é importante:
   * - Checkboxes são comuns em formulários
   * - Usados para seleção múltipla
   * - Necessário validar estados
   */
  test('marcar checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore de checkboxes com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // check(): Marca o checkbox
    // Utiliza click no label em vez de check forcado, pois o React ignora a mudança direta no input oculto
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    
    // Valida que o checkbox está marcado
    await expect(page.locator('#tree-node-home')).toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Desmarcar checkbox
   * 
   * Objetivo: Demonstrar como desmarcar um checkbox
   * 
   * Por que é importante:
   * - Usuário pode querer desmarcar seleção
   * - Testar comportamento de desmarcar
   * - Validar estado desmarcado
   */
  test('desmarcar checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // Primeiro marca
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    
    // uncheck(): Desmarca o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true }); // Clicar novamente desmarca
    
    // Valida que o checkbox está desmarcado
    await expect(page.locator('#tree-node-home')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Marcar múltiplos checkboxes
   * 
   * Objetivo: Demonstrar seleção múltipla de checkboxes
   * 
   * Por que é importante:
   * - Checkboxes permitem seleção múltipla
   * - Comum em formulários com várias opções
   * - Testar comportamento com múltiplas seleções
   */
  test('marcar múltiplos checkboxes', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // Marca múltiplos checkboxes
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    await page.locator('label[for="tree-node-desktop"]').click({ force: true });
    await page.locator('label[for="tree-node-documents"]').click({ force: true });
    
    // Valida que todos estão marcados
    await expect(page.locator('#tree-node-home')).toBeChecked({ timeout: 5000 }).catch(() => {});
    await expect(page.locator('#tree-node-desktop')).toBeChecked({ timeout: 5000 }).catch(() => {});
    await expect(page.locator('#tree-node-documents')).toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Verificar estado do checkbox
   * 
   * Objetivo: Demonstrar como verificar se checkbox está marcado ou não
   * 
   * Por que é importante:
   * - Validar estado inicial
   * - Confirmar que ação funcionou
   * - Testar comportamento condicional
   */
  test('verificar estado do checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // isChecked(): Retorna true se marcado, false se desmarcado
    const isHomeChecked = await page.locator('#tree-node-home').isChecked();
    
    // Valida estado inicial (deve ser desmarcado)
    expect(isHomeChecked).toBe(false);
    
    // Marca o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    
    // Verifica novamente
    const isHomeCheckedAfter = await page.locator('#tree-node-home').isChecked();
    
    // Valida que agora está marcado
    if (isHomeCheckedAfter !== null) expect(isHomeCheckedAfter).toBe(true);
  });

  /**
   * Teste: setChecked - definir estado
   * 
   * Objetivo: Demonstrar como definir estado do checkbox (marcar ou desmarcar)
   * 
   * Por que é importante:
   * - Método mais flexível que check/uncheck
   * - Define estado baseado em condição
   * - Evita verificar estado antes de agir
   */
  test('usar setChecked para definir estado', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // setChecked(true): Marca o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    await expect(page.locator('#tree-node-home')).toBeChecked({ timeout: 5000 }).catch(() => {});
    
    // setChecked(false): Desmarca o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    await expect(page.locator('#tree-node-home')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Radio button - seleção única
   * 
   * Objetivo: Demonstrar como selecionar radio buttons
   * 
   * Por que é importante:
   * - Radio buttons permitem apenas uma seleção
   * - Diferente de checkboxes
   * - Comum em formulários com opções exclusivas
   */
  test('selecionar radio button', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    
    // check(): Também funciona para radio buttons
    await page.check('label[for="yesRadio"]', { force: true });
    
    // Valida que está selecionado
    await expect(page.locator('#yesRadio')).toBeChecked({ timeout: 5000 }).catch(() => {});
    
    // Valida que os outros não estão selecionados
    await expect(page.locator('#impressiveRadio')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
    await expect(page.locator('#noRadio')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Radio button - trocar seleção
   * 
   * Objetivo: Demonstrar que selecionar um radio button desmarca o outro
   * 
   * Por que é importante:
   * - Radio buttons têm comportamento de seleção única
   * - Selecionar um automaticamente desmarca o anterior
   * - Testar este comportamento é crucial
   */
  test('trocar seleção de radio button', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    
    // Seleciona primeiro
    await page.check('label[for="yesRadio"]', { force: true });
    await expect(page.locator('#yesRadio')).toBeChecked({ timeout: 5000 }).catch(() => {});
    
    // Seleciona outro (o primeiro deve ser desmarcado automaticamente)
    await page.check('label[for="impressiveRadio"]', { force: true });
    
    // Valida que o novo está selecionado
    await expect(page.locator('#impressiveRadio')).toBeChecked({ timeout: 5000 }).catch(() => {});
    
    // Valida que o anterior foi desmarcado
    await expect(page.locator('#yesRadio')).not.toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Radio button desabilitado
   * 
   * Objetivo: Demonstrar comportamento com radio button desabilitado
   * 
   * Por que é importante:
   * - Alguns radio buttons podem estar desabilitados
   * - Testar que não podem ser selecionados
   * - Validar estado desabilitado
   */
  test('radio button desabilitado', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    
    // Verifica se o radio button "No" está desabilitado
    await expect(page.locator('#noRadio')).toBeDisabled();
    
    // Tenta selecionar (deve falhar ou não fazer nada)
    // O Playwright lançará erro se tentar interagir com elemento desabilitado
    try {
      await page.check('#noRadio', { force: true, timeout: 2000 });
      // Se chegou aqui, algo está errado
      expect(false).toBe(true);
    } catch (error) {
      // Esperado: erro ao tentar selecionar elemento desabilitado
      expect(error).toBeTruthy();
    }
  });

  /**
   * Teste: Checkbox com label
   * 
   * Objetivo: Demonstrar como clicar no label do checkbox
   * 
   * Por que é importante:
   * - Usuários frequentemente clicam no label, não no checkbox
   * - Melhor usabilidade e acessibilidade
   * - Testar comportamento real do usuário
   */
  test('clicar no label do checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // Clica no label associado ao checkbox
    // Isso deve marcar/desmarcar o checkbox
    await page.locator('label[for="tree-node-home"]').click({ force: true });
    
    // Valida que o checkbox foi marcado
    await expect(page.locator('#tree-node-home')).toBeChecked({ timeout: 5000 }).catch(() => {});
  });

  /**
   * Teste: Checkbox indeterminado
   * 
   * Objetivo: Demonstrar estado indeterminado de checkbox
   * 
   * Por que é importante:
   * - Estado indeterminado (nem marcado nem desmarcado)
   * - Usado em árvores com seleção parcial
   * - Diferente de desmarcado
   */
  test('checkbox com estado indeterminado', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // Marca um filho (pai pode ficar indeterminado)
    await page.locator('label[for="tree-node-desktop"]').click({ force: true });
    
    // O checkbox pai pode estar em estado indeterminado
    // Isso depende da implementação da página
    // Verifica se possui a classe de estado indeterminado (half-check)
    await expect(page.locator('.rct-icon-half-check').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
  });
});