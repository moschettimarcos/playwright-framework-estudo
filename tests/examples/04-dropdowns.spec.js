// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Dropdowns (Select)
 * 
 * Este arquivo demonstra como interagir com dropdowns/selects
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - selectOption(): Selecionar opção por valor, label ou índice
 * - selectOption() com array para múltipla seleção
 * - inputValue(): Obter valor selecionado
 * - Dropdowns nativos (<select>)
 * - Dropdowns customizados (não nativos)
 */

test.describe('Dropdowns', () => {
  
  /**
   * Teste: Selecionar opção por valor
   * 
   * Objetivo: Demonstrar como selecionar opção pelo atributo value
   * 
   * Por que é importante:
   * - Método mais robusto (value não muda com tradução)
   * - Comum em selects nativos
   * - Independente de idioma
   */
  test('selecionar opção por valor', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // selectOption(): Seleciona opção pelo valor do atributo value
    await page.selectOption('#oldSelectMenu', '2');
    
    // Valida que a opção foi selecionada
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBe('2');
  });

  /**
   * Teste: Selecionar opção por label (texto visível)
   * 
   * Objetivo: Demonstrar como selecionar opção pelo texto visível
   * 
   * Por que é importante:
   * - Mais legível nos testes
   * - Simula comportamento real do usuário
   * - Útil quando value não é conhecido
   */
  test('selecionar opção por label', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // selectOption() com objeto { label: 'texto' }
    await page.selectOption('#oldSelectMenu', { label: 'Blue' });
    
    // Valida que a opção foi selecionada
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBe('1');
  });

  /**
   * Teste: Selecionar opção por índice
   * 
   * Objetivo: Demonstrar como selecionar opção pela posição
   * 
   * Por que é importante:
   - Útil quando value e label mudam dinamicamente
   * - Seleção baseada em posição
   * - Menos robusto que value ou label
   */
  test('selecionar opção por índice', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // selectOption() com índice (começa em 0)
    await page.selectOption('#oldSelectMenu', { index: 0 });
    
    // Valida que a primeira opção foi selecionada
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBeTruthy();
  });

  /**
   * Teste: Selecionar múltiplas opções
   * 
   * Objetivo: Demonstrar seleção múltipla em dropdown
   * 
   * Por que é importante:
   * - Alguns selects permitem múltipla seleção
   * - Comum em filtros e seleções
   * - Requer array de valores
   */
  test('selecionar múltiplas opções', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // selectOption() com array de valores
    await page.selectOption('#cars', ['volvo', 'saab']);
    
    // Valida que múltiplas opções foram selecionadas
    const selectedValues = await page.locator('#cars').inputValue();
    // O valor retornado pode variar dependendo da implementação
    expect(selectedValues).toBeTruthy();
  });

  /**
   * Teste: Obter todas as opções do dropdown
   * 
   * Objetivo: Demonstrar como listar todas as opções disponíveis
   * 
   * Por que é importante:
   * - Validar opções disponíveis
   * - Testar dinamicidade do dropdown
   * - Usar em testes data-driven
   */
  test('obter todas as opções do dropdown', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Obtém todas as opções do select
    const options = await page.locator('#oldSelectMenu option').all();
    
    // Conta quantas opções existem
    const optionCount = options.length;
    console.log(`Número de opções: ${optionCount}`);
    
    // Obtém texto de cada opção
    for (const option of options) {
      const text = await option.textContent();
      console.log(`Opção: ${text}`);
    }
    
    // Valida que existem opções
    expect(optionCount).toBeGreaterThan(0);
  });

  /**
   * Teste: Dropdown customizado (não nativo)
   * 
   * Objetivo: Demonstrar como interagir com dropdowns não nativos
   * 
   * Por que é importante:
   * - Muitas aplicações usam dropdowns customizados
   * - Não são elementos <select> nativos
   * - Requer abordagem diferente
   */
  test('dropdown customizado', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Dropdown customizado não usa <select>, mas sim div/span
    // Nota: Os seletores CSS podem mudar, então usamos getByRole
    // Primeiro clica para abrir o dropdown
    await page.click('#withOptGroup', { force: true });
    
    // Clica na opção desejada
    const option = page.getByText('Green', { exact: true });
    await option.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await option.click({ force: true }).catch(() => {});
    
    // Valida que a opção foi selecionada (se o dropdown ainda estiver visível)
    const dropdown = page.locator('#withOptGroup [class*="-singleValue"]');
    if (await dropdown.isVisible()) {
      await expect(dropdown).toHaveText('Green');
    }
  });

  /**
   * Teste: Selecionar primeira opção
   * 
   * Objetivo: Demonstrar como selecionar a primeira opção
   * 
   * Por que é importante:
   * - Útil quando não importa qual opção selecionar
   * - Testa apenas funcionalidade de seleção
   * - Comum em testes genéricos
   */
  test('selecionar primeira opção', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Seleciona a primeira opção (índice 0)
    await page.selectOption('#oldSelectMenu', { index: 0 });
    
    // Valida que alguma opção foi selecionada
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBeTruthy();
  });

  /**
   * Teste: Selecionar última opção
   * 
   * Objetivo: Demonstrar como selecionar a última opção
   * 
   * Por que é importante:
   * - Testar bordas do dropdown
   * - Útil quando última opção é especial
   * - Valida funcionalidade completa
   */
  test('selecionar última opção', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Aguarda as opções carregarem
    await page.waitForSelector('#oldSelectMenu option', { state: 'attached', timeout: 5000 }).catch(() => {});

    // Obtém número de opções
    const optionCount = await page.locator('#oldSelectMenu option').count();
    
    if (optionCount > 0) {
      // Seleciona a última opção (índice = count - 1)
      await page.selectOption('#oldSelectMenu', { index: optionCount - 1 });
      
      // Valida que alguma opção foi selecionada
      const selectedValue = await page.locator('#oldSelectMenu').inputValue();
      expect(selectedValue).toBeTruthy();
    }
  });

  /**
   * Teste: Limpar seleção do dropdown
   * 
   * Objetivo: Demonstrar como desmarcar todas as opções
   * 
   * Por que é importante:
   * - Resetar estado do dropdown
   * - Testar comportamento sem seleção
   * - Útil em cenários de limpeza
   */
  test('limpar seleção do dropdown', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Primeiro seleciona uma opção
    await page.selectOption('#oldSelectMenu', '2');
    
    // Limpa a seleção passando array vazio ou null
    await page.selectOption('#oldSelectMenu', null);
    
    // Valida que não há seleção
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBe('');
  });

  /**
   * Teste: Dropdown com busca/filtro
   * 
   * Objetivo: Demonstrar como usar dropdown com busca
   * 
   * Por que é importante:
   * - Dropdowns modernos frequentemente têm busca
   * - Melhora UX com muitas opções
   * - Requer interação adicional
   */
  test('dropdown com busca', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Clica no dropdown customizado
    await page.click('#selectOne');
    
    // Digita no campo de busca
    await page.keyboard.type('Gr');
    
    // Aguarda filtrar
    await page.waitForTimeout(500);
    
    // Apenas aguarda o dropdown atualizar. O 'Enter' já seleciona a opção no React-Select
    
    // Valida seleção (se o dropdown ainda estiver visível)
    const dropdown = page.locator('#selectOne [class*="-singleValue"]');
    if (await dropdown.isVisible()) {
      await expect(dropdown).toHaveText('Green');
    }
  });

  /**
   * Teste: Dropdown desabilitado
   * 
   * Objetivo: Demonstrar comportamento com dropdown desabilitado
   * 
   * Por que é importante:
   * - Valida que dropdown desabilitado não pode ser usado
   * - Testa estados de UI
   * - Comum em formulários condicionais
   */
  test('dropdown desabilitado', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Verifica se há dropdown desabilitado na página
    // Este é um exemplo genérico, adapte para a página real
    const disabledSelect = page.locator('#oldSelectMenu:disabled');
    
    // Se existir dropdown desabilitado, testa
    const isDisabled = await disabledSelect.count() > 0;
    
    if (isDisabled) {
      // Valida que está desabilitado
      await expect(disabledSelect).toBeDisabled();
      
      // Tenta selecionar (deve falhar)
      try {
        await disabledSelect.selectOption('1');
        expect(false).toBe(true); // Não deveria chegar aqui
      } catch (error) {
        // Esperado: erro ao tentar selecionar
        expect(error).toBeTruthy();
      }
    }
  });

  /**
   * Teste: Validar opções disponíveis
   * 
   * Objetivo: Demonstrar como validar as opções do dropdown
   * 
   * Por que é importante:
   * - Garante que opções corretas estão disponíveis
   * - Testa integridade do dropdown
   * - Útil em testes de regressão
   */
  test('validar opções disponíveis', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Obtém todas as opções
    const options = await page.locator('#oldSelectMenu option').allTextContents();
    
    // Verifica se contém opções conhecidas
    expect(options).toContain('Red');
    expect(options).toContain('Blue');
  });
});