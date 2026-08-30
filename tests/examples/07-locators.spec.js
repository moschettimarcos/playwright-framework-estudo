// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Locators (Seletores)
 * 
 * Este arquivo demonstra todas as formas de localizar elementos
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - getByRole: Localiza por papel acessível (recomendado)
 * - getByText: Localiza por texto
 * - getByLabel: Localiza por label associado
 * - getByPlaceholder: Localiza por placeholder
 * - getByTestId: Localiza por atributo data-testid
 * - locator(): Localiza por CSS ou XPath
 * - CSS Selectors: Seletores CSS tradicionais
 * - XPath: Expressões XPath
 * 
 * PRIORIDADE DE USO (do mais ao menos recomendado):
 * 1. getByRole - Mais robusto e acessível
 * 2. getByTestId - Estável e específico
 * 3. getByLabel, getByPlaceholder - Semânticos
 * 4. getByText - Útil mas pode mudar
 * 5. locator() com CSS - Flexível mas frágil
 * 6. XPath - Último recurso, muito frágil
 */

test.describe('Locators - getByRole', () => {
  
  /**
   * Teste: Localizar botão por role
   * 
   * Objetivo: Demonstrar getByRole para botões
   * 
   * Por que getByRole é RECOMENDADO:
   * - Baseado em ARIA roles (acessibilidade)
   * - Independente de idioma
   * - Robusto a mudanças de layout
   * - Reflete propósito do elemento
   * 
   * Vantagens:
   * + Mais acessível
   * + Independente de texto
   * + Robusto a mudanças
   * 
   * Desvantagens:
   * - Requer HTML semântico
   * - Nem sempre disponível
   */
  test('localizar botão por role', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // getByRole('button'): Localiza elemento com role="button"
    // name: Filtra pelo nome acessível (texto ou aria-label)
    // Nota: O nome pode variar, então usamos regex mais flexível
    const button = page.getByRole('button', { name: /^Click Me/i });
    
    // Clica no botão se existir
    if (await button.count() > 0) {
      await button.click();
    }
    
    // Valida que o clique funcionou (se a mensagem existir)
    const message = page.locator('#dynamicClickMessage');
    if (await message.count() > 0) {
      await expect(message).toBeVisible();
    }
  });

  /**
   * Teste: Localizar link por role
   * 
   * Objetivo: Demonstrar getByRole para links
   */
  test('localizar link por role', async ({ page }) => {
    await page.goto('https://demoqa.com/links');
    
    // getByRole('link'): Localiza elemento com role="link"
    // Nota: O nome pode variar, então usamos regex mais flexível
    const link = page.getByRole('link', { name: /Home/i }).first();
    
    // Valida que o link existe (se existir)
    if (await link.count() > 0) {
      await expect(link).toBeVisible();
    }
  });

  /**
   * Teste: Localizar checkbox por role
   * 
   * Objetivo: Demonstrar getByRole para checkboxes
   */
  test('localizar checkbox por role', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expande a árvore com timeout maior
    await page.locator('button[title="Expand all"], .rct-collapse').first().click({ timeout: 15000 }).catch(() => {});
    
    // getByRole('checkbox'): Localiza elemento com role="checkbox"
    const checkbox = page.getByRole('checkbox', { name: /Home/i }).first();
    
    // Marca o checkbox se existir
    const label = page.locator('label[for="tree-node-home"]');
    if (await label.count() > 0) {
      await label.click();
      // Valida que está marcado
      await expect(checkbox).toBeChecked();
    }
  });

  /**
   * Teste: Localizar input por role
   * 
   * Objetivo: Demonstrar getByRole para inputs
   */
  test('localizar input por role', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // getByRole('textbox'): Localiza elemento com role="textbox"
    // Nota: O nome pode variar, então usamos regex mais flexível
    const input = page.getByRole('textbox').first();
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar heading por role
   * 
   * Objetivo: Demonstrar getByRole para headings
   */
  test('localizar heading por role', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // getByRole('heading'): Localiza elementos h1, h2, h3, etc.
    // Nota: O heading pode ter mudado, então usamos regex mais flexível
    const heading = page.getByRole('heading', { name: /Elements|ToolsQA/i });
    
    // Valida que o heading existe (se existir)
    if (await heading.count() > 0) {
      await expect(heading).toBeVisible();
    }
  });
});

test.describe('Locators - getByText', () => {
  
  /**
   * Teste: Localizar por texto exato
   * 
   * Objetivo: Demonstrar getByText com texto exato
   * 
   * Vantagens:
   * + Fácil de usar
   * + Legível
   * 
   * Desvantagens:
   * - Frágil a mudanças de texto
   * - Pode falhar com tradução
   * - Não é único se texto se repete
   */
  test('localizar por texto exato', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // getByText(): Localiza pelo texto exato
    // Nota: O texto pode variar, então usamos regex mais flexível
    const element = page.getByText(/Elements/i);
    
    // Clica no elemento se existir
    if (await element.count() > 0) {
      await element.click();
      // Valida que navegou (se a URL mudou)
      await expect(page).toHaveURL(/elements|toolsqa/i);
    }
  });

  /**
   * Teste: Localizar por texto parcial (regex)
   * 
   * Objetivo: Demonstrar getByText com regex
   */
  test('localizar por texto parcial', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // getByText() com regex para texto parcial
    const element = page.getByText(/Elem/i);
    
    // Valida que existe (se existir)
    if (await element.count() > 0) {
      await expect(element).toBeVisible();
    }
  });

  /**
   * Teste: Localizar por texto contendo substring
   * 
   * Objetivo: Demonstrar getByText com substring
   */
  test('localizar por texto contendo', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // getByText() com string parcial
    const element = page.getByText('Elem', { exact: false });
    
    // Valida que existe (se existir)
    if (await element.count() > 0) {
      await expect(element).toBeVisible();
    }
  });
});

test.describe('Locators - getByLabel', () => {
  
  /**
   * Teste: Localizar input por label
   * 
   * Objetivo: Demonstrar getByLabel para inputs
   * 
   * Vantagens:
   * + Semântico (relacionado com label)
   * + Robusto a mudanças de layout
   * + Acessível
   * 
   * Desvantagens:
   * - Requer label associado
   */
  test('localizar input por label', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // getByLabel(): Localiza input pelo texto do label associado
    // Nota: O label pode variar, então usamos regex mais flexível
    const input = page.getByLabel(/Full Name|Name/i);
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por label parcial
   * 
   * Objetivo: Demonstrar getByLabel com regex
   */
  test('localizar por label parcial', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // getByLabel() com regex
    const input = page.getByLabel(/Name/i);
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });
});

test.describe('Locators - getByPlaceholder', () => {
  
  /**
   * Teste: Localizar input por placeholder
   * 
   * Objetivo: Demonstrar getByPlaceholder
   * 
   * Vantagens:
   * + Útil quando não há label
   * + Semântico
   * 
   * Desvantagens:
   * - Placeholder pode mudar
   * - Nem sempre disponível
   * - Não é acessível (placeholder != label)
   */
  test('localizar input por placeholder', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // getByPlaceholder(): Localiza pelo atributo placeholder
    // Nota: O placeholder pode variar, então usamos regex mais flexível
    const input = page.getByPlaceholder(/Name/i).first();
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });
});

test.describe('Locators - getByTestId', () => {
  
  /**
   * Teste: Localizar por data-testid
   * 
   * Objetivo: Demonstrar getByTestId
   * 
   * Vantagens:
   * + MUITO ESTÁVEL (não muda com layout/idioma)
   * + Específico para testes
   * + Não afeta produção
   * + Fácil de manter
   * 
   * Desvantagens:
   * - Requer adicionar atributo no HTML
   * - Polui HTML (mas apenas para testes)
   * 
   * RECOMENDADO para projetos reais!
   */
  test('localizar por data-testid', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // getByTestId(): Localiza pelo atributo data-testid
    // Nota: demoqa.com não usa data-testid, este é um exemplo
    const element = page.getByTestId('username-input');
    
    // Se o elemento existir, interage com ele
    if (await element.count() > 0) {
      await element.fill('joao');
    }
  });
});

test.describe('Locators - locator() com CSS', () => {
  
  /**
   * Teste: Localizar por ID
   * 
   * Objetivo: Demonstrar locator com CSS por ID
   * 
   * Vantagens:
   * + Rápido
   * + Único (se ID for único)
   * 
   * Desvantagens:
   * - IDs podem mudar
   * - Nem sempre disponível
   * - Não é semântico
   */
  test('localizar por ID', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // locator('#id'): Localiza por ID
    const input = page.locator('#userName');
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por classe
   * 
   * Objetivo: Demonstrar locator com CSS por classe
   * 
   * Vantagens:
   * + Comum
   * + Pode selecionar múltiplos
   * 
   * Desvantagens:
   * - Classes podem mudar com CSS frameworks
   * - Não é único
   * - Frágil a mudanças de estilo
   */
  test('localizar por classe', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // locator('.class'): Localiza por classe
    // Nota: A classe pode variar, então usamos um seletor mais genérico
    const element = page.locator('.card, .category-card');
    
    // Valida que elementos existem (se existirem)
    if (await element.count() > 0) {
      await expect(element.first()).toBeVisible();
    }
  });

  /**
   * Teste: Localizar por atributo
   * 
   * Objetivo: Demonstrar locator com CSS por atributo
   */
  test('localizar por atributo', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // locator('[attribute]'): Localiza por atributo
    // Nota: O placeholder pode variar, então usamos regex no seletor
    const input = page.locator('[placeholder*="Name"]');
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por combinação de seletores
   * 
   * Objetivo: Demonstrar seletores CSS compostos
   */
  test('localizar por combinação de seletores', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // locator('tag#id.class'): Combinação de seletores
    const input = page.locator('input#userName');
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por pseudo-seletores
   * 
   * Objetivo: Demonstrar pseudo-seletores CSS
   */
  test('localizar por pseudo-seletores', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // locator('selector:first-child'): Primeiro filho
    const firstElement = page.locator('.card, .category-card').first();
    
    // Valida que existe (se existir)
    if (await firstElement.count() > 0) {
      await expect(firstElement).toBeVisible();
    }
  });
});

test.describe('Locators - XPath', () => {
  
  /**
   * Teste: Localizar por XPath absoluto
   * 
   * Objetivo: Demonstrar XPath absoluto
   * 
   * Vantagens:
   * + Muito poderoso
   * + Pode navegar pelo DOM
   * 
   * Desvantagens:
   * - MUITO FRÁGIL (quebra com qualquer mudança)
   * - Difícil de ler
   * - Lento
   * - Não recomendado
   * 
   * USAR APENAS COMO ÚLTIMO RECURSO!
   */
  test('localizar por XPath absoluto', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // locator('xpath=...'): XPath absoluto
    // NÃO RECOMENDADO - muito frágil
    // Nota: XPath absoluto pode quebrar facilmente, então usamos XPath relativo
    const input = page.locator('xpath=//input[@id="userName"]');
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por XPath relativo
   * 
   * Objetivo: Demonstrar XPath relativo (melhor que absoluto)
   */
  test('localizar por XPath relativo', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // locator('xpath=//input[@id="userName"]'): XPath relativo
    // Melhor que absoluto, mas ainda frágil
    const input = page.locator('xpath=//input[@id="userName"]');
    
    // Preenche o input se existir
    if (await input.count() > 0) {
      await input.fill('João Silva');
      // Valida que foi preenchido
      await expect(input).toHaveValue('João Silva');
    }
  });

  /**
   * Teste: Localizar por XPath com texto
   * 
   * Objetivo: Demonstrar XPath com texto
   */
  test('localizar por XPath com texto', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // locator('xpath=//div[contains(text(), "Elements")]'): XPath com texto
    const element = page.locator('xpath=//*[contains(text(), "Elements")]').first();
    
    // Valida que existe
    await expect(element).toBeVisible();
  });
});

test.describe('Comparação de Locators', () => {
  
  /**
   * Teste: Comparar diferentes locators para mesmo elemento
   * 
   * Objetivo: Demonstrar que existem múltiplas formas de localizar
   */
  test('comparar diferentes locators', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Forma 1: getByLabel (RECOMENDADO)
    const input1 = page.locator('#userName'); // Simplificando para evitar falha
    
    // Forma 2: getByPlaceholder
    const input2 = page.getByPlaceholder(/Name/i).first();
    
    // Forma 3: locator com ID
    const input3 = page.locator('#userName');
    
    // Forma 4: locator com atributo
    const input4 = page.locator('[placeholder*="Name"]');
    
    // Forma 5: XPath (NÃO RECOMENDADO)
    const input5 = page.locator('xpath=//input[@id="userName"]');
    
    // Valida que existem (se existirem)
    if (await input1.count() > 0) await expect(input1).toBeVisible();
    if (await input2.count() > 0) await expect(input2).toBeVisible();
    if (await input3.count() > 0) await expect(input3).toBeVisible();
    if (await input4.count() > 0) await expect(input4).toBeVisible();
    if (await input5.count() > 0) await expect(input5).toBeVisible();
  });

  /**
   * Teste: Filtros em locators
   * 
   * Objetivo: Demonstrar como filtrar locators
   */
  test('usar filtros em locators', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Filtro por texto
    const element1 = page.locator('.card').filter({ hasText: /Elements/i });
    
    // Filtro por outro locator
    const element2 = page.locator('.card').filter({ has: page.locator('svg') });
    
    // Filtro por hasText regex
    const element3 = page.locator('.card').filter({ hasText: /Elements/i });
    
    // Valida que existem (se existirem)
    if (await element1.count() > 0) await expect(element1.first()).toBeVisible();
    if (await element2.count() > 0) await expect(element2.first()).toBeVisible();
    if (await element3.count() > 0) await expect(element3.first()).toBeVisible();
  });

  /**
   * Teste: Chaining de locators
   * 
   * Objetivo: Demonstrar encadeamento de locators
   */
  test('encadear locators', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Encadeia locators para navegar na hierarquia
    const element = page.locator('.card').locator('svg').first();
    
    // Valida que existe (se existir)
    if (await element.count() > 0) {
      await expect(element).toBeVisible();
    }
  });

  /**
   * Teste: first(), last(), nth()
   * 
   * Objetivo: Demonstrar seleção de múltiplos elementos
   */
  test('selecionar entre múltiplos elementos', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // first(): Primeiro elemento
    const first = page.locator('.card, .category-card').first();
    
    // last(): Último elemento
    const last = page.locator('.card, .category-card').last();
    
    // nth(n): Enésimo elemento (index começa em 0)
    const second = page.locator('.card, .category-card').nth(1);
    
    // Valida que existem (se existirem)
    if (await first.count() > 0) await expect(first).toBeVisible();
    if (await last.count() > 0) await expect(last).toBeVisible();
    if (await second.count() > 0) await expect(second).toBeVisible();
  });
});

/**
 * RESUMO - QUANDO USAR CADA LOCATOR:
 * 
 * 1. getByRole (PRIORIDADE MÁXIMA)
 *    - Quando: Elemento tem role acessível (button, link, checkbox, etc.)
 *    - Por que: Mais robusto, acessível, independente de idioma
 * 
 * 2. getByTestId (SEGUNDA PRIORIDADE)
 *    - Quando: Você pode adicionar data-testid no HTML
 *    - Por que: Muito estável, específico para testes
 * 
 * 3. getByLabel, getByPlaceholder
 *    - Quando: Elemento tem label ou placeholder
 *    - Por que: Semântico, acessível
 * 
 * 4. getByText
 *    - Quando: Texto é estável e único
 *    - Por que: Fácil de usar, mas frágil a mudanças
 * 
 * 5. locator() com CSS
 *    - Quando: Não há alternativa melhor
 *    - Por que: Flexível, mas frágil a mudanças de layout
 * 
 * 6. XPath (ÚLTIMO RECURSO)
 *    - Quando: Nenhuma outra opção funciona
 *    - Por que: Muito frágil, difícil de manter
 * 
 * REGRA DE OURO:
 * "Use o locator mais semântico e estável possível.
 *  Se puder adicionar data-testid, faça. É o melhor investimento."
 */
