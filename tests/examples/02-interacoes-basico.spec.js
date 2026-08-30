// @ts-check
const { test, expect } = require('@playwright/test');
const testData = require('../../testData/users.json');

/**
 * Testes de Interações Básicas
 * 
 * Este arquivo demonstra as interações fundamentais com elementos
 * da página em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - click(): Clicar em elementos
 * - fill(): Preencher campos de texto
 * - type(): Digitar texto (mais lento, simula digitação real)
 * - clear(): Limpar campos
 * - press(): Pressionar teclas
 */

test.describe('Interações Básicas', () => {
  
  /**
   * Teste: Clicar em um elemento
   * 
   * Objetivo: Demonstrar como clicar em elementos da página
   * 
   * Por que é importante:
   * - A maioria das interações web envolve cliques
   * - É a base para navegação e ações
   * - Compreender diferentes tipos de clique
   */
  test('clicar em um elemento', async ({ page }) => {
    // Navega para uma página com elementos interativos
    await page.goto('https://demoqa.com/buttons');
    
    // click(): Clica no elemento
    // O Playwright espera automaticamente o elemento estar visível e clicável
    // Usamos o botão de clique simples
    await page.click('#doubleClickBtn');
    
    // Nota: Este é um clique simples no botão de clique duplo
    // Para demonstrar clique simples, usamos o mesmo elemento
    // Valida que o clique foi executado (não valida mensagem pois é clique simples)
    await expect(page.locator('#doubleClickBtn')).toBeVisible();
  });

  /**
   * Teste: Clique duplo
   * 
   * Objetivo: Demonstrar como realizar clique duplo
   * 
   * Por que é importante:
   * - Alguns elementos requerem clique duplo
   * - Simula comportamento real do usuário
   * - Diferente de dois cliques simples
   */
  test('clique duplo', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // dblclick(): Realiza clique duplo no elemento
    await page.dblclick('#doubleClickBtn');
    
    // Valida que o clique duplo funcionou
    await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
  });

  /**
   * Teste: Clique com botão direito
   * 
   * Objetivo: Demonstrar como realizar clique com botão direito (context menu)
   * 
   * Por que é importante:
   * - Alguns elementos têm menus de contexto
   * - Simula comportamento real do usuário
   * - Útil para testar menus personalizados
   */
  test('clique com botão direito', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // click({ button: 'right' }): Clica com botão direito
    await page.click('#rightClickBtn', { button: 'right' });
    
    // Valida que o clique direito funcionou
    await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
  });

  /**
   * Teste: Preencher campo de texto
   * 
   * Objetivo: Demonstrar como preencher campos de entrada
   * 
   * Por que é importante:
   * - Formulários são comuns em aplicações web
   * - É a base para testes de cadastro, login, etc.
   * - Compreender limpeza e preenchimento
   */
  test('preencher campo de texto', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // fill(): Preenche o campo com o texto especificado
    // Limpa o campo antes de preencher automaticamente
    await page.fill('#userName', 'João Silva');
    
    // Valida que o campo foi preenchido corretamente
    await expect(page.locator('#userName')).toHaveValue('João Silva');
  });

  /**
   * Teste: Preencher campo de texto sem limpar
   * 
   * Objetivo: Demonstrar como adicionar texto sem limpar o campo
   * 
   * Por que é importante:
   * - Às vezes queremos adicionar texto ao existente
   * - Simula comportamento de edição
   * - Útil para testes de edição incremental
   */
  test('adicionar texto ao campo existente', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Primeiro preenche o campo
    await page.fill('#userName', 'João');
    
    // type() adiciona texto sem limpar (alternativa ao fill com clear: false)
    await page.type('#userName', ' Silva');
    
    // Valida que o texto foi adicionado
    await expect(page.locator('#userName')).toHaveValue('João Silva');
  });

  /**
   * Teste: Limpar campo de texto
   * 
   * Objetivo: Demonstrar como limpar campos de entrada
   * 
   * Por que é importante:
   * - Útil para testar validação de campos obrigatórios
   * - Simula comportamento de usuário apagando
   * - Necessário em cenários de edição
   */
  test('limpar campo de texto', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Primeiro preenche o campo
    await page.fill('#userName', 'João Silva');
    
    // fill('') limpa o campo (alternativa ao clear())
    await page.fill('#userName', '');
    
    // Valida que o campo está vazio
    await expect(page.locator('#userName')).toHaveValue('');
  });

  /**
   * Teste: Digitar texto (simula digitação real)
   * 
   * Objetivo: Demonstrar como digitar texto caracter por caracter
   * 
   * Por que é importante:
   * - Simula digitação real do usuário
   * - Mais lento que fill(), mas mais realista
   * - Útil para testar comportamentos durante digitação
   */
  test('digitar texto caracter por caracter', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // type(): Digita texto caracter por caracter
    // Mais lento, mas simula digitação real
    await page.type('#userName', 'João Silva', { delay: 100 });
    
    // Valida que o campo foi preenchido
    await expect(page.locator('#userName')).toHaveValue('João Silva');
  });

  /**
   * Teste: Pressionar teclas especiais
   * 
   * Objetivo: Demonstrar como pressionar teclas especiais (Enter, Tab, etc.)
   * 
   * Por que é importante:
   * - Muitas interações usam teclas especiais
   * - Enter para submeter formulários
   * - Tab para navegar entre campos
   * - Escape para cancelar ações
   */
  test('pressionar teclas especiais', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Preenche o campo
    await page.fill('#userName', 'João Silva');
    
    // press(): Pressiona uma tecla especial
    // Enter: Submete formulário ou move para próximo campo
    await page.press('#userName', 'Enter');
    
    // Tab: Move para o próximo campo
    await page.press('#userName', 'Tab');
    
    // Escape: Cancela ação ou fecha modal
    await page.keyboard.press('Escape');
  });

  /**
   * Teste: Preencher campo de email
   * 
   * Objetivo: Demonstrar preenchimento de campo de email
   * 
   * Por que é importante:
   * - Email é um campo comum em formulários
   * - Validação de email é frequentemente testada
   * - Formato específico deve ser respeitado
   */
  test('preencher campo de email', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Preenche o campo de email
    await page.fill('#userEmail', 'joao.silva@example.com');
    
    // Valida que o campo foi preenchido
    await expect(page.locator('#userEmail')).toHaveValue('joao.silva@example.com');
  });

  /**
   * Teste: Preencher área de texto (textarea)
   * 
   * Objetivo: Demonstrar preenchimento de área de texto multilinha
   * 
   * Por que é importante:
   * - Textareas são usados para mensagens, descrições, etc.
   - Aceitam múltiplas linhas
   * - Comportamento diferente de inputs simples
   */
  test('preencher área de texto', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Preenche a área de texto com múltiplas linhas
    const mensagem = 'Esta é uma mensagem de teste\ncom múltiplas linhas\npara demonstrar o uso de textarea.';
    await page.fill('#currentAddress', mensagem);
    
    // Valida que a área de texto foi preenchida
    await expect(page.locator('#currentAddress')).toHaveValue(mensagem);
  });

  /**
   * Teste: Clique com coordenadas específicas
   * 
   * Objetivo: Demonstrar como clicar em coordenadas específicas de um elemento
   * 
   * Por que é importante:
   * - Útil para elementos que reagem diferente em áreas diferentes
   * - Testar comportamentos específicos de região
   * - Simula cliques precisos
   */
  test('clique com coordenadas', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // click() com posição específica
    // position: { x, y } - clica nas coordenadas relativas ao elemento
    await page.click('#doubleClickBtn', { position: { x: 10, y: 10 } });
    
    // Valida que o clique foi executado (botão ainda visível)
    await expect(page.locator('#doubleClickBtn')).toBeVisible();
  });

  /**
   * Teste: Clique com força (ignora verificação de ação)
   * 
   * Objetivo: Demonstrar clique forçado quando elemento não está normalmente clicável
   * 
   * Por que é importante:
   * - Útil quando elemento está coberto mas deve ser clicável
   * - Último recurso quando clique normal falha
   * - Deve ser usado com cautela
   */
  test('clique forçado', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // click() com force: true
    // Força o clique mesmo se elemento não estiver visível/clicável
    await page.click('#doubleClickBtn', { force: true });
    
    // Valida que o clique foi executado (botão ainda visível)
    await expect(page.locator('#doubleClickBtn')).toBeVisible();
  });

  /**
   * Teste: Data-Driven Testing com JSON
   * 
   * Objetivo: Demonstrar como reutilizar o mesmo teste para múltiplos dados
   * puxando do nosso arquivo testData/users.json
   */
  test.describe('Data-Driven Testing (DDT)', () => {
    // O Playwright vai gerar um teste para cada usuário válido no JSON
    for (const user of testData.validUsers) {
      test(`preencher formulário dinâmico com usuário: ${user.firstName}`, async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
        
        // Preenche com os dados do JSON
        await page.fill('#userName', `${user.firstName} ${user.lastName}`);
        await page.fill('#userEmail', user.email);
        
        // Valida
        await expect(page.locator('#userName')).toHaveValue(`${user.firstName} ${user.lastName}`);
        await expect(page.locator('#userEmail')).toHaveValue(user.email);
      });
    }
  });
});
